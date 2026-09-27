// Validate a Kurogane line drawing SVG against the imagery rules.
//
//   node scripts/validate-drawing.mjs <file.svg> [...more.svg] [--out <dir>] [--max-components N]
//
// Checks (see docs/research/2026-09-23-ai-asset-pipeline.md, section 3c):
//   colours        at most 2 distinct colour values, no literal hex/rgb
//   attrs          no fill / stroke / stroke-width on any element below the root <g>
//   root           exactly one root <g> carrying fill="none" stroke="currentColor" stroke-width="2"
//   text           no <text> (type never sits on a drawing)
//   size           file <= 24 KB
//   paths          1..400 path elements, <= 4000 path commands
//   aspect         viewBox width/height within 0.5..2.0
//   width          rasterised stroke half-width (distance-transform ridge, 5th..95th pct) within +-15% of nominal
//   coverage       ink covers 2..20% of the viewBox
//   components     connected ink components after a 3px closing within 1..max-components (default 6)
//
// Rasterisation runs in Playwright's chromium (already a devDependency), and the
// distance transform / component labelling run inside the page, so the script needs
// nothing beyond the repo's node_modules. Writes <out>/<name>.json scorecards and
// exits 1 if any file fails.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const args = process.argv.slice(2);
const files = [];
let outDir = null;
let maxComponents = 6;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--out") outDir = args[++i];
  else if (args[i] === "--max-components") maxComponents = Number(args[++i]);
  else files.push(args[i]);
}
if (files.length === 0) {
  console.error("usage: validate-drawing.mjs <file.svg> [...] [--out <dir>] [--max-components N]");
  process.exit(2);
}

const LIMITS = {
  maxBytes: 24 * 1024,
  maxPaths: 400,
  maxCommands: 4000,
  aspect: [0.5, 2.0],
  widthTolerance: 0.15,
  coverage: [0.02, 0.2],
  components: [1, maxComponents],
  rasterScale: 4,
};

const ALLOWED_COLOURS = new Set(["none", "currentcolor", "var(--ink)", "var(--surface-page)", "var(--highlight)"]);

function staticChecks(svg, bytes) {
  const checks = {};
  const fail = (name, detail) => (checks[name] = { pass: false, ...detail });
  const pass = (name, detail) => (checks[name] = { pass: true, ...detail });

  // size
  bytes <= LIMITS.maxBytes ? pass("size", { bytes }) : fail("size", { bytes, limit: LIMITS.maxBytes });

  // text
  /<text[\s>]/i.test(svg) ? fail("text", { found: true }) : pass("text", { found: false });

  // colours: every fill/stroke/stop-color/color attribute and style colour
  const colourValues = new Set();
  for (const m of svg.matchAll(/\b(fill|stroke|stop-color|color)\s*=\s*"([^"]*)"/g)) colourValues.add(m[2].trim().toLowerCase());
  for (const m of svg.matchAll(/style\s*=\s*"([^"]*)"/g)) {
    for (const d of m[1].split(";")) {
      const [k, v] = d.split(":").map((s) => s && s.trim().toLowerCase());
      if (k && v && /^(fill|stroke|stop-color|color)$/.test(k)) colourValues.add(v);
    }
  }
  const literal = [...colourValues].filter((v) => /^#|^rgb|^hsl/.test(v) || (!ALLOWED_COLOURS.has(v) && v !== ""));
  const distinct = [...colourValues].filter((v) => v !== "none" && v !== "");
  if (literal.length > 0 || distinct.length > 2) fail("colours", { values: [...colourValues], literal, distinct: distinct.length });
  else pass("colours", { values: [...colourValues], distinct: distinct.length });

  // root structure and per-element attributes
  const rootMatch = svg.match(/<svg\b[^>]*>/);
  const viewBox = rootMatch && rootMatch[0].match(/viewBox\s*=\s*"([^"]+)"/);
  const vb = viewBox ? viewBox[1].trim().split(/[\s,]+/).map(Number) : null;
  const gMatches = [...svg.matchAll(/<g\b[^>]*>/g)];
  const rootG = gMatches[0] ? gMatches[0][0] : "";
  const rootOk =
    gMatches.length === 1 &&
    /\bfill="none"/.test(rootG) &&
    /\bstroke="currentColor"/.test(rootG) &&
    /\bstroke-width="2"/.test(rootG) &&
    /\bstroke-linecap="round"/.test(rootG) &&
    /\bstroke-linejoin="round"/.test(rootG);
  rootOk && vb && vb.length === 4 ? pass("root", { groups: gMatches.length, viewBox: vb }) : fail("root", { groups: gMatches.length, rootG, viewBox: vb });

  const offenders = [];
  for (const m of svg.matchAll(/<(path|line|circle|rect|ellipse|polyline|polygon|g)\b([^>]*)>/g)) {
    if (m[0] === rootG) continue;
    if (/\b(fill|stroke|stroke-width|style|opacity|filter|mask|clip-path)\s*=/.test(m[2])) offenders.push(m[0].slice(0, 80));
  }
  /<(image|use|foreignObject|linearGradient|radialGradient|pattern)\b/.test(svg) && offenders.push("disallowed element (image/use/gradient/pattern)");
  offenders.length === 0 ? pass("attrs", { offenders: 0 }) : fail("attrs", { offenders });

  // paths and commands
  const pathEls = [...svg.matchAll(/<path\b[^>]*\bd="([^"]*)"/g)];
  const shapeEls = (svg.match(/<(line|circle|rect|ellipse|polyline|polygon)\b/g) || []).length;
  const commands = pathEls.reduce((n, m) => n + (m[1].match(/[MLHVCSQTAZ]/gi) || []).length, 0);
  const pathCount = pathEls.length + shapeEls;
  pathCount >= 1 && pathCount <= LIMITS.maxPaths && commands <= LIMITS.maxCommands
    ? pass("paths", { paths: pathCount, commands })
    : fail("paths", { paths: pathCount, commands, limits: [LIMITS.maxPaths, LIMITS.maxCommands] });

  // aspect
  if (vb && vb[2] > 0 && vb[3] > 0) {
    const aspect = vb[2] / vb[3];
    aspect >= LIMITS.aspect[0] && aspect <= LIMITS.aspect[1] ? pass("aspect", { aspect: +aspect.toFixed(3) }) : fail("aspect", { aspect: +aspect.toFixed(3), limits: LIMITS.aspect });
  } else fail("aspect", { viewBox: vb });

  return { checks, vb };
}

// Runs inside the browser: rasterise the SVG on a canvas, threshold, then measure.
async function rasterChecks(page, svg, vb, scale) {
  const w = Math.round(vb[2] * scale);
  const h = Math.round(vb[3] * scale);
  const forBrowser = svg.replace(/<svg\b/, `<svg width="${w}" height="${h}"`);
  return page.evaluate(
    async ({ svgText, w, h, scale }) => {
      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const n = w * h;
      const ink = new Uint8Array(n);
      let inkCount = 0;
      for (let i = 0; i < n; i++) { if (data[i * 4] < 128) { ink[i] = 1; inkCount++; } }

      // Euclidean distance transform (Felzenszwalb & Huttenlocher), distance from ink to nearest background pixel.
      const INF = 1e12;
      const f = new Float64Array(Math.max(w, h));
      const d = new Float64Array(Math.max(w, h));
      const v = new Int32Array(Math.max(w, h));
      const z = new Float64Array(Math.max(w, h) + 1);
      function dt1d(len) {
        let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
        for (let q = 1; q < len; q++) {
          let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
          while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
          k++; v[k] = q; z[k] = s; z[k + 1] = INF;
        }
        k = 0;
        for (let q = 0; q < len; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
      }
      const g = new Float64Array(n);
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) f[y] = ink[y * w + x] ? INF : 0;
        dt1d(h);
        for (let y = 0; y < h; y++) g[y * w + x] = d[y];
      }
      const edt = new Float64Array(n);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) f[x] = g[y * w + x];
        dt1d(w);
        for (let x = 0; x < w; x++) edt[y * w + x] = Math.sqrt(d[x]);
      }
      // ridge = ink pixels whose EDT is a local maximum among 8 neighbours
      const ridge = [];
      for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
        const i = y * w + x; if (!ink[i]) continue;
        const e = edt[i]; let isMax = true;
        for (let dy = -1; dy <= 1 && isMax; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dy && !dx) continue;
          if (edt[i + dy * w + dx] > e) { isMax = false; break; }
        }
        if (isMax) ridge.push(e);
      }
      ridge.sort((a, b) => a - b);
      const pct = (p) => (ridge.length ? ridge[Math.min(ridge.length - 1, Math.floor(p * ridge.length))] : 0);

      // components after a closing (dilate then erode) with a ~3px kernel at 1x.
      const r = Math.max(1, Math.round(1.5 * scale));
      function dilate(src) {
        const tmp = new Uint8Array(n), out = new Uint8Array(n);
        for (let y = 0; y < h; y++) {
          let run = 0;
          for (let x = 0; x < w + r; x++) {
            if (x < w && src[y * w + x]) run = 2 * r + 1; else if (run > 0) run--;
            const xx = x - r; if (xx >= 0 && xx < w && run > 0) tmp[y * w + xx] = 1;
          }
        }
        for (let x = 0; x < w; x++) {
          let run = 0;
          for (let y = 0; y < h + r; y++) {
            if (y < h && tmp[y * w + x]) run = 2 * r + 1; else if (run > 0) run--;
            const yy = y - r; if (yy >= 0 && yy < h && run > 0) out[yy * w + x] = 1;
          }
        }
        return out;
      }
      const inv = new Uint8Array(n); for (let i = 0; i < n; i++) inv[i] = ink[i] ? 0 : 1;
      const dil = dilate(ink);
      const notDil = new Uint8Array(n); for (let i = 0; i < n; i++) notDil[i] = dil[i] ? 0 : 1;
      const eroded = dilate(notDil);
      const closed = new Uint8Array(n); for (let i = 0; i < n; i++) closed[i] = eroded[i] ? 0 : 1;
      const label = new Int32Array(n); let comps = 0; const stack = [];
      const sizes = [];
      for (let i = 0; i < n; i++) {
        if (!closed[i] || label[i]) continue;
        comps++; let size = 0; label[i] = comps; stack.push(i);
        while (stack.length) {
          const j = stack.pop(); size++;
          const x = j % w, y = (j - x) / w;
          if (x > 0 && closed[j - 1] && !label[j - 1]) { label[j - 1] = comps; stack.push(j - 1); }
          if (x < w - 1 && closed[j + 1] && !label[j + 1]) { label[j + 1] = comps; stack.push(j + 1); }
          if (y > 0 && closed[j - w] && !label[j - w]) { label[j - w] = comps; stack.push(j - w); }
          if (y < h - 1 && closed[j + w] && !label[j + w]) { label[j + w] = comps; stack.push(j + w); }
        }
        sizes.push(size);
      }
      URL.revokeObjectURL(url);
      return { w, h, inkCount, coverage: inkCount / n, ridgeSamples: ridge.length, p05: pct(0.05), p50: pct(0.5), p95: pct(0.95), components: comps, componentSizes: sizes.sort((a, b) => b - a).slice(0, 10) };
    },
    { svgText: forBrowser, w, h, scale },
  );
}

const browser = await chromium.launch();
const page = await browser.newPage();
let anyFail = false;
const summary = [];
for (const file of files) {
  const svg = fs.readFileSync(file, "utf8");
  const bytes = Buffer.byteLength(svg);
  const { checks, vb } = staticChecks(svg, bytes);
  if (vb && vb.length === 4) {
    const m = await rasterChecks(page, svg, vb, LIMITS.rasterScale);
    const nominal = (2 * LIMITS.rasterScale) / 2; // stroke-width 2 at 4x => half-width 4px
    const lo = nominal * (1 - LIMITS.widthTolerance), hi = nominal * (1 + LIMITS.widthTolerance);
    const widthOk = m.ridgeSamples > 0 && m.p05 >= lo && m.p95 <= hi;
    checks.width = { pass: widthOk, nominalHalfWidth: nominal, p05: +m.p05.toFixed(2), p50: +m.p50.toFixed(2), p95: +m.p95.toFixed(2), samples: m.ridgeSamples, tolerance: LIMITS.widthTolerance };
    checks.coverage = { pass: m.coverage >= LIMITS.coverage[0] && m.coverage <= LIMITS.coverage[1], coverage: +m.coverage.toFixed(4), limits: LIMITS.coverage };
    checks.components = { pass: m.components >= LIMITS.components[0] && m.components <= LIMITS.components[1], components: m.components, largest: m.componentSizes, limits: LIMITS.components };
  } else {
    checks.width = { pass: false, reason: "no viewBox" };
    checks.coverage = { pass: false, reason: "no viewBox" };
    checks.components = { pass: false, reason: "no viewBox" };
  }
  const failed = Object.entries(checks).filter(([, c]) => !c.pass).map(([k]) => k);
  const passed = Object.entries(checks).filter(([, c]) => c.pass).map(([k]) => k);
  const card = { file: path.resolve(file), pass: failed.length === 0, passed, failed, checks, limits: LIMITS, checkedAt: new Date().toISOString() };
  if (failed.length) anyFail = true;
  summary.push(card);
  if (outDir) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, path.basename(file, ".svg") + ".json"), JSON.stringify(card, null, 2) + "\n");
  }
  console.log(`${card.pass ? "PASS" : "FAIL"} ${file}${failed.length ? "  failed: " + failed.join(", ") : ""}`);
  for (const [k, c] of Object.entries(checks)) {
    const { pass: _p, ...rest } = c;
    console.log(`   ${c.pass ? "ok  " : "FAIL"} ${k.padEnd(11)} ${JSON.stringify(rest).slice(0, 160)}`);
  }
}
await browser.close();
process.exit(anyFail ? 1 : 0);

#!/usr/bin/env node
/**
 * verify-robot-ref.mjs — runs the §6 verification checklist (V01–V40) of
 * docs/superpowers/specs/robot-com-reference.json against a running homepage.
 *
 *   node scripts/verify-robot-ref.mjs [--url http://localhost:3002/ja/] [--out <results.json>] [--only V05,V19] [--headed]
 *
 * Every item is measured in Playwright the way its `measure` column says: geometry via
 * getBoundingClientRect, colours via getComputedStyle resolved against the Kurogane tokens on
 * :root (a role passes when the computed value equals the token's computed value), timings by
 * sampling on requestAnimationFrame after the trigger, reduced motion via emulateMedia.
 * Tolerances: ±2px geometry, ±10% timing, exact for counts and attributes. Items that need a real
 * clip pass when the <video> has the required attributes and is playing (dev media served).
 * Prints a table and writes a results JSON. Read-only against the site; nothing in the repo changes.
 */
import { chromium } from "playwright";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* ------------------------------------------------------------------ args */
const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : dflt;
};
const URL_ = opt("url", "http://localhost:3002/ja/");
const OUT = opt("out", `${process.env.TMPDIR ?? "/tmp"}/verify-robot-ref/results.json`);
const ONLY = opt("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const HEADED = args.includes("--headed");

const SPEC = fileURLToPath(new URL("../docs/superpowers/specs/robot-com-reference.json", import.meta.url));
const checklist = JSON.parse(readFileSync(SPEC, "utf8")).checklist;

/* ------------------------------------------------------------------ constants */
const VP = { desktop: { width: 1440, height: 900 }, tablet: { width: 768, height: 1024 }, phone: { width: 390, height: 844 } };
const GEO = 2; // px
const TIME = 0.1; // fraction
const EASE = {
  reveal: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  roll: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
  expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",
};

/** Most likely file per item, for the failure report. */
const FILES = {
  V01: "components/home/band.tsx",
  V02: "components/home/band.tsx",
  V03: "components/home/announce-bar.tsx",
  V04: "components/home/announce-bar.tsx",
  V05: "components/site/nav.tsx",
  V06: "components/site/nav.tsx",
  V07: "components/site/nav.tsx",
  V08: "components/site/nav.tsx",
  V09: "components/home/hero.tsx",
  V10: "components/site/video-frame.tsx",
  V11: "components/home/hero.tsx",
  V12: "app/globals.css",
  V13: "components/home/audience-rows.tsx",
  V14: "components/home/band.tsx",
  V15: "app/globals.css",
  V16: "components/home/band.tsx",
  V17: "components/home/band.tsx",
  V18: "components/home/pill.tsx",
  V19: "app/globals.css",
  V20: "app/globals.css",
  V21: "app/globals.css",
  V22: "components/site/footer.tsx",
  V23: "components/home/reveal-heading.tsx",
  V24: "components/home/statement.tsx",
  V25: "components/home/closing-cta.tsx",
  V26: "components/home/product-band.tsx",
  V27: "components/home/product-band.tsx",
  V28: "components/home/stats-bento.tsx",
  V29: "components/home/markets-accordion.tsx",
  V30: "components/home/markets-accordion.tsx",
  V31: "components/home/markets-accordion.tsx",
  V32: "components/home/markets-accordion.tsx",
  V33: "components/home/interlude.tsx",
  V34: "components/home/interlude.tsx",
  V35: "components/site/footer.tsx",
  V36: "components/viz/dot-eyes.tsx",
  V37: "components/home/smooth-scroll.tsx",
  V38: "components/site/nav.tsx",
  V39: "app/globals.css",
  V40: "app/globals.css",
};

/* ------------------------------------------------------------------ in-page helpers */
const HELPERS = `
window.__vr = {
  parse(c) {
    c = String(c).trim(); let m;
    if ((m = c.match(/^#([0-9a-f]{3,8})$/i))) {
      let h = m[1]; if (h.length === 3 || h.length === 4) h = [...h].map((x) => x + x).join("");
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
    }
    if ((m = c.match(/^rgba?\\(([^)]+)\\)$/i))) { const p = m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p[3] ?? 1]; }
    /* Tailwind's bg-brand/60 is color-mix(in oklab, …), which Chromium computes as oklab(L a b / alpha). */
    if ((m = c.match(/^oklab\\(([^)]+)\\)$/i))) {
      const p = m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number); const [L, a, b] = p; const alpha = p[3] ?? 1;
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
      const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
      const lin = [4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s];
      const srgb = lin.map((v) => { v = Math.max(0, Math.min(1, v)); return Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055)); });
      return [srgb[0], srgb[1], srgb[2], alpha];
    }
    if ((m = c.match(/^color\\(srgb ([^)]+)\\)$/i))) { const p = m[1].split(/[\\s\\/]+/).filter(Boolean).map(Number); return [Math.round(p[0] * 255), Math.round(p[1] * 255), Math.round(p[2] * 255), p[3] ?? 1]; }
    if (c === "transparent") return [0, 0, 0, 0];
    return null;
  },
  /* Alpha rounds to 2 decimals: Tailwind serialises rgba(255,255,255,.1) as #ffffff1a, which reads back as 0.102. */
  norm(c) { const p = this.parse(c); return p ? "rgba(" + p[0] + ", " + p[1] + ", " + p[2] + ", " + +p[3].toFixed(2) + ")" : c; },
  raw(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); },
  tok(name) { return this.norm(this.raw(name)); },
  eq(a, b) { return this.norm(a) === this.norm(b); },
  alpha(c) { const p = this.parse(c); return p ? p[3] : null; },
  rgb(c) { const p = this.parse(c); return p ? p.slice(0, 3).join(",") : c; },
  role(color, names) { for (const n of names) if (this.eq(color, this.tok(n))) return n; return null; },
  rect(el) { const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2), right: +r.right.toFixed(2), bottom: +r.bottom.toFixed(2), top: +(r.top + scrollY).toFixed(2) }; },
  cs(el, prop) { return getComputedStyle(el)[prop]; },
  ty(el) { const t = getComputedStyle(el).transform; if (!t || t === "none") return 0; return +new DOMMatrixReadOnly(t).m42.toFixed(3); },
  bands() {
    const names = ["hero", "trusted-by", "statement", "products", "stats", "rows", "markets", "interlude", "closing", "careers"];
    const s = [...document.querySelectorAll("main > section")]; const o = {};
    names.forEach((n, i) => (o[n] = s[i] || null)); o.footer = document.querySelector("footer"); return o;
  },
  band(n) { return this.bands()[n]; },
  q(sel, root) { return (root || document).querySelector(sel); },
  qa(sel, root) { return [...(root || document).querySelectorAll(sel)]; },
  now() { return performance.now(); },
  sample(read, ms) {
    return new Promise((res) => {
      const out = []; const t0 = performance.now();
      const step = () => { const t = performance.now(); out.push({ t: +(t - t0).toFixed(1), abs: +t.toFixed(1), v: read() }); if (t - t0 < ms) requestAnimationFrame(step); else res({ t0: +t0.toFixed(1), samples: out }); };
      requestAnimationFrame(step);
    });
  },
  transitions(filter) {
    return document.getAnimations().filter((a) => a.constructor.name === "CSSTransition" || a.constructor.name === "CSSAnimation").map((a) => {
      const tm = a.effect.getTiming(); const el = a.effect.target;
      return { kind: a.constructor.name, prop: a.transitionProperty || a.animationName, duration: tm.duration, delay: tm.delay, easing: tm.easing, tag: el.tagName.toLowerCase(), cls: String(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className).slice(0, 60), id: el.id || "", text: (el.textContent || "").trim().slice(0, 24) };
    }).filter((t) => !filter || filter(t));
  },
  scrollToDocTop(el, offset) { window.scrollTo(0, el.getBoundingClientRect().top + scrollY - (offset || 0)); },
};
`;

/* ------------------------------------------------------------------ node helpers */
const near = (a, b, tol = GEO) => typeof a === "number" && Math.abs(a - b) <= tol;
const within = (a, lo, hi) => typeof a === "number" && a >= lo && a <= hi;
const pctOk = (a, b, p = TIME) => typeof a === "number" && Math.abs(a - b) <= Math.abs(b) * p;
const r2 = (n) => (typeof n === "number" ? Math.round(n * 100) / 100 : n);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** cubic-bezier(x1,y1,x2,y2) as a function of progress x. */
function bezier(x1, y1, x2, y2) {
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 40; i++) {
      const cx = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
      if (Math.abs(cx - x) < 1e-6) break;
      if (cx < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
  };
}
const CURVE = {
  roll: bezier(0.455, 0.03, 0.515, 0.955),
  outCubic: bezier(0.215, 0.61, 0.355, 1),
  reveal: bezier(0.25, 0.46, 0.45, 0.94),
  power3InOut: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  expoOut: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
};
/**
 * Fit rAF samples to the spec's tween: `from` → `to` over `duration` ms on `ease`, starting `delay` ms after the
 * transition begins, where the transition may begin 0..maxOffset ms after the triggering event (t0 = event time in
 * page ms; a CSS transition started by a React state change needs a frame or two). Returns the best start offset
 * and the largest deviation from the curve, so a pass means the site runs the same tween as robot.com.
 */
function fitCurve(samples, t0, { from, to, duration, ease, delay = 0, maxOffset = 60, map = (v) => v }) {
  const pts = samples.map((s) => ({ t: s.abs - t0, v: map(s.v) })).filter((p) => p.t >= 0 && typeof p.v === "number");
  let best = null;
  for (let off = 0; off <= maxOffset; off += 1) {
    let maxErr = 0;
    for (const p of pts) {
      const x = Math.min(1, Math.max(0, (p.t - off - delay) / duration));
      maxErr = Math.max(maxErr, Math.abs(p.v - (from + (to - from) * ease(x))));
    }
    if (!best || maxErr < best.maxErr) best = { offset: off, maxErr: r2(maxErr) };
  }
  return best || { offset: null, maxErr: Infinity };
}
/** Arm a one-shot listener that records the page time of the next `type` event (capture phase). */
const armEvent = (page, type, sel = null) => ev(page, ({ type, sel }) => { window.__t0 = null; (sel ? document.querySelector(sel) : document).addEventListener(type, () => { if (window.__t0 === null) window.__t0 = performance.now(); }, { capture: true, once: true }); }, { type, sel });
const eventT0 = (page) => ev(page, () => window.__t0);

/** Value of the sample nearest to t (ms after t0). */
function at(samples, t, t0 = 0) {
  let best = null;
  for (const s of samples) {
    const tt = s.abs !== undefined && t0 ? s.abs - t0 : s.t;
    if (!best || Math.abs(tt - t) < Math.abs(best.tt - t)) best = { tt, v: s.v };
  }
  return best ? best.v : undefined;
}
/** First time (ms after t0) at which pred(v) holds. */
function firstT(samples, pred, t0 = 0) {
  for (const s of samples) {
    const tt = s.abs !== undefined && t0 ? s.abs - t0 : s.t;
    if (pred(s.v)) return tt;
  }
  return null;
}
/** First time after which pred holds for every later sample. */
function settleT(samples, pred, t0 = 0) {
  let t = null;
  for (const s of samples) {
    const tt = s.abs !== undefined && t0 ? s.abs - t0 : s.t;
    if (pred(s.v)) {
      if (t === null) t = tt;
    } else t = null;
  }
  return t;
}

class Result {
  constructor(item) {
    this.id = item.id;
    this.assertion = item.assertion;
    this.expected = item.expected;
    this.tolerance = item.tolerance;
    this.measured = {};
    this.fails = [];
    this.notes = [];
    this.status = "pass";
  }
  set(key, value) {
    this.measured[key] = value;
    return value;
  }
  /** Record one check. */
  check(ok, label, measured) {
    if (measured !== undefined) this.measured[label] = measured;
    if (!ok) this.fails.push(measured === undefined ? label : `${label}: ${JSON.stringify(measured)}`);
    return !!ok;
  }
  note(s) {
    this.notes.push(s);
  }
  skip(why) {
    this.status = "skip";
    this.note(why);
  }
  finish() {
    if (this.status !== "skip") this.status = this.fails.length ? "fail" : "pass";
    return this;
  }
}

/* ------------------------------------------------------------------ browser */
let browser;
/** Uncaught page errors seen while the current item ran (hydration mismatches show up here). */
const pageErrors = new Set();
async function open({ vp = VP.desktop, reduce = false, init = null, url = URL_ } = {}) {
  const context = await browser.newContext({ viewport: vp, reducedMotion: reduce ? "reduce" : "no-preference", deviceScaleFactor: 1 });
  await context.addInitScript(HELPERS);
  if (init) await context.addInitScript(init);
  const page = await context.newPage();
  page.on("pageerror", (e) => pageErrors.add(e.message.split("\n")[0].slice(0, 160)));
  await page.goto(url, { waitUntil: "load" });
  await page.waitForSelector("#hero", { timeout: 30000 });
  await page.waitForSelector("html[data-header-theme]", { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1500);
  return { page, context };
}
const ev = (page, fn, arg) => page.evaluate(fn, arg);
const scrollTo = async (page, y, wait = 150) => {
  await ev(page, (y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(wait);
};
/** performance.now() in the page, used as the trigger timestamp for samplers. */
const pnow = (page) => ev(page, () => performance.now());
/** Start an rAF sampler without awaiting it; `readSrc` is the source of a zero-arg function evaluated in the page. */
const startSampler = (page, readSrc, ms) => ev(page, ({ src, ms }) => window.__vr.sample(new Function("return (" + src + ")")(), ms), { src: readSrc, ms });

/* ------------------------------------------------------------------ items */
const items = {};

items.V01 = async (r) => {
  for (const [name, vp] of Object.entries(VP)) {
    const { page, context } = await open({ vp });
    const m = await ev(page, () => {
      const slab = window.__vr.q("#hero > div");
      return { rect: window.__vr.rect(slab), innerWidth: innerWidth };
    });
    r.check(near(m.rect.x, 5) && near(m.rect.w, m.innerWidth - 10), `${name} hero slab`, { x: m.rect.x, w: m.rect.w, expectW: m.innerWidth - 10 });
    await context.close();
  }
};

items.V02 = async (r) => {
  for (const [name, vp] of Object.entries(VP)) {
    const { page, context } = await open({ vp });
    const m = await ev(page, async () => {
      const H = document.documentElement.scrollHeight;
      for (let y = 0; y <= H; y += innerHeight) {
        window.scrollTo(0, y);
        await new Promise((res) => setTimeout(res, 80));
      }
      window.scrollTo(0, 0);
      await new Promise((res) => setTimeout(res, 150));
      return { scrollWidth: document.documentElement.scrollWidth, innerWidth: innerWidth, bodyScrollWidth: document.body.scrollWidth };
    });
    r.check(m.scrollWidth === m.innerWidth, `${name} scrollWidth`, m);
    await context.close();
  }
};

items.V03 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const a = window.__vr.q("[data-announce] > a");
    const cs = getComputedStyle(a);
    return { rect: window.__vr.rect(a), radius: cs.borderRadius, padding: cs.padding, bg: cs.backgroundColor, highlight: window.__vr.tok("--highlight"), bgIsHighlight: window.__vr.eq(cs.backgroundColor, window.__vr.tok("--highlight")) };
  });
  r.check(near(m.rect.x, 5) && near(m.rect.y, 5) && near(m.rect.w, 1430) && near(m.rect.h, 38.83), "box 1430x38.83 at (5,5)", m.rect);
  r.check(m.radius === "24px", "radius 24", m.radius);
  r.check(m.padding === "12px 20px", "padding 12px 20px", m.padding);
  r.check(m.bgIsHighlight, "bg --highlight", m.bg);
  await context.close();
};

items.V04 = async (r) => {
  const { page, context } = await open();
  await scrollTo(page, 1500, 250);
  const m = await ev(page, () => {
    const w = window.__vr.q("[data-announce]");
    return { position: getComputedStyle(w).position, top: window.__vr.rect(w).y, scrollY };
  });
  // In flow (not sticky/fixed). `relative` is accepted: the Arclin dismiss control positions against the wrapper.
  r.check(m.position === "static" || m.position === "relative", "wrapper in flow (static or relative)", m.position);
  if (m.position === "relative") r.note("wrapper is position: relative for the dismiss control (robot.com: static); it still scrolls away.");
  r.check(near(m.top, -1495), "rect.top -1495 at scrollY 1500", m.top);
  await context.close();
};

const BAR = "header > div > div.glass";
items.V05 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, (BAR) => {
    const bar = window.__vr.q(BAR);
    const cs = getComputedStyle(bar);
    return { rect: window.__vr.rect(bar), radius: cs.borderRadius, backdrop: cs.backdropFilter, bg: cs.backgroundColor, glassOnBrand: window.__vr.tok("--glass-on-brand"), theme: document.documentElement.dataset.headerTheme };
  }, BAR);
  r.check(near(m.rect.w, 368) && near(m.rect.h, 48), "bar 368x48", { w: m.rect.w, h: m.rect.h });
  r.check(near(m.rect.x, 536) && near(m.rect.y, 60), "bar at (536,60)", { x: m.rect.x, y: m.rect.y });
  r.check(m.radius === "24px", "radius 24", m.radius);
  r.check(m.backdrop === "blur(26px)", "backdrop-filter blur(26px)", m.backdrop);
  r.check(m.bg === m.glassOnBrand || (await ev(page, (b) => window.__vr.eq(b, window.__vr.tok("--glass-on-brand")), m.bg)), "bg --glass-on-brand", m.bg);
  if (!near(m.rect.w, 368)) r.note("nav.tsx documents a deviation: at >=1280 the bar is max-content wide to keep the five links visible (robot.com: 368).");
  await context.close();
};

items.V06 = async (r) => {
  const { page, context } = await open();
  const sweep = [
    [0, 60],
    [20, 40],
    [40, 20],
    [44, 16],
    [600, 16],
    [0, 60],
  ];
  const out = [];
  for (const [y, exp] of sweep) {
    await scrollTo(page, y, 150);
    const m = await ev(page, (BAR) => ({ offset: document.documentElement.style.getPropertyValue("--announcement-offset"), y: window.__vr.rect(window.__vr.q(BAR)).y }), BAR);
    out.push({ scrollY: y, offset: m.offset, barY: m.y, exp });
    r.check(near(m.y, exp), `bar y at scrollY ${y} = ${exp}`, m.y);
  }
  r.set("sweep", out);
  await context.close();
};

items.V07 = async (r) => {
  const { page, context } = await open();
  const widths = [];
  for (const y of [0, 200, 600, 1500]) {
    await scrollTo(page, y, 150);
    const m = await ev(page, (BAR) => {
      const bar = window.__vr.q(BAR);
      const cs = getComputedStyle(bar);
      return { rect: window.__vr.rect(bar), radius: cs.borderRadius, transform: cs.transform, headerTransform: getComputedStyle(bar.closest("header")).transform, visibility: cs.visibility, opacity: cs.opacity };
    }, BAR);
    widths.push(m.rect.w);
    r.check(near(m.rect.h, 48) && m.radius === "24px" && m.transform === "none" && m.headerTransform === "none" && m.opacity === "1", `at scrollY ${y}: h48 r24 transform none`, { w: m.rect.w, h: m.rect.h, radius: m.radius, transform: m.transform });
    r.check(near(m.rect.w, 368), `at scrollY ${y}: width 368`, m.rect.w);
  }
  r.check(widths.every((w) => near(w, widths[0])), "width constant across the sweep", widths);
  await context.close();
};

items.V08 = async (r) => {
  const { page, context } = await open();
  // Brand (hero) → page (trusted by): put the probe line (y 40) inside the trusted-by band.
  const target = await ev(page, () => window.__vr.rect(window.__vr.band("trusted-by")).top - 30);
  const sampler = startSampler(page, `() => ({ theme: document.documentElement.dataset.headerTheme, bg: getComputedStyle(document.querySelector("${BAR}")).backgroundColor })`, 700);
  const tB = await pnow(page);
  await ev(page, (y) => window.scrollTo(0, y), target);
  const tA = await pnow(page);
  // Poll the transitions the swap starts on the CTA and the wordmark.
  const seen = new Map();
  for (let i = 0; i < 25; i++) {
    const list = await ev(page, () => window.__vr.transitions((t) => t.kind === "CSSTransition" && (t.prop === "color" || t.prop === "background-color")));
    for (const t of list) seen.set(`${t.tag}.${t.cls}|${t.prop}|${t.text}`, t);
    await sleep(20);
  }
  const { samples } = await sampler;
  const t0 = (tB + tA) / 2;
  const themeChange = samples.findIndex((s) => s.v.theme !== samples[0].v.theme);
  const bgChange = samples.findIndex((s) => s.v.bg !== samples[0].v.bg);
  r.check(themeChange >= 0 && bgChange >= 0 && Math.abs(bgChange - themeChange) <= 1, "bar bg swaps within 1 frame of the theme swap", { themeFrame: themeChange, bgFrame: bgChange, from: samples[0].v, to: samples[samples.length - 1].v, triggerMs: r2(t0 - samples[0].abs) });
  const list = [...seen.values()];
  const cta = list.filter((t) => t.cls.includes("pill--lg"));
  const logo = list.filter((t) => t.cls.includes("font-display") || t.text === "Arclin" || t.text === "智渡仁");
  r.set("transitions", list.map((t) => `${t.tag}.${t.cls.split(" ")[0]} ${t.prop} ${t.duration}ms ${t.easing} "${t.text}"`));
  r.check(cta.some((t) => t.prop === "background-color" && pctOk(t.duration, 450) && t.easing === EASE.expoOut) && cta.some((t) => t.prop === "color" && pctOk(t.duration, 450) && t.easing === EASE.expoOut), "CTA bg + colour 450ms expo-out", cta.map((t) => `${t.prop} ${t.duration} ${t.easing}`));
  r.check(logo.some((t) => t.prop === "color" && pctOk(t.duration, 350) && t.easing === EASE.expoOut), "logo colour 350ms expo-out", logo.map((t) => `${t.prop} ${t.duration} ${t.easing}`));
  await context.close();
};

items.V09 = async (r) => {
  const exp = { desktop: 890, tablet: 1014, phone: 834 };
  for (const [name, vp] of Object.entries(VP)) {
    const { page, context } = await open({ vp });
    const m = await ev(page, () => {
      const slab = window.__vr.q("#hero > div");
      const cs = getComputedStyle(slab);
      return { rect: window.__vr.rect(slab), radius: cs.borderRadius, padding: cs.padding, innerHeight: innerHeight };
    });
    r.check(near(m.rect.h, m.innerHeight - 10) && near(m.rect.h, exp[name]), `${name} height innerHeight-10 (${exp[name]})`, m.rect.h);
    r.check(near(m.rect.x, 5) && near(m.rect.w, vp.width - 10), `${name} x 5 / width`, { x: m.rect.x, w: m.rect.w });
    if (name === "desktop") {
      r.check(near(m.rect.y, 48.83), "y 48.83", m.rect.y);
      r.check(m.radius === "24px" && m.padding === "24px", "radius 24 padding 24", { radius: m.radius, padding: m.padding });
    }
    await context.close();
  }
};

items.V10 = async (r) => {
  const { page, context } = await open();
  const read = () => {
    const v = document.querySelector("#hero video");
    if (!v) return null;
    return { muted: v.muted, mutedAttr: v.hasAttribute("muted"), loop: v.hasAttribute("loop"), playsinline: v.hasAttribute("playsinline"), preload: v.getAttribute("preload"), poster: !!v.getAttribute("poster"), autoplayAttr: v.hasAttribute("autoplay"), paused: v.paused, currentTime: v.currentTime, readyState: v.readyState, objectFit: getComputedStyle(v).objectFit, src: v.currentSrc || (v.querySelector("source") || {}).src };
  };
  const a = await ev(page, read);
  if (!a) {
    r.skip("no <video> in the hero: the site is not served with NEXT_PUBLIC_DEV_MEDIA=1");
    await context.close();
    return;
  }
  await page.waitForTimeout(1200);
  const b = await ev(page, read);
  r.check(a.muted && a.loop && a.playsinline && a.preload === "none" && a.poster, "muted loop playsinline preload=none poster", { muted: a.muted, mutedAttr: a.mutedAttr, loop: a.loop, playsinline: a.playsinline, preload: a.preload, poster: a.poster });
  r.check(!b.paused && b.currentTime - a.currentTime >= 1.0, "playing: currentTime advances >=1s in 1.2s", { paused: b.paused, advance: r2(b.currentTime - a.currentTime) });
  r.check(b.objectFit === "cover", "object-fit cover", b.objectFit);
  r.check(b.readyState === 4, "readyState 4", b.readyState);
  r.set("autoplayAttr", a.autoplayAttr);
  if (a.autoplayAttr) r.note("robot.com has no autoplay attribute (play() from JS); the frame renders autoplay — passes under the dev-media rule (required attributes + playing).");
  await context.close();
};

items.V11 = async (r) => {
  const init = `(() => {
    window.__heroSamples = []; let started = null;
    const step = () => {
      const h1 = document.querySelector("#hero h1"); const cta = document.querySelector("#hero a.pill");
      const t = performance.now();
      if (h1 && cta) {
        if (started === null) started = t;
        const a = getComputedStyle(h1), b = getComputedStyle(cta);
        window.__heroSamples.push({ t: +(t - started).toFixed(1), h1: [a.opacity, a.transform], cta: [b.opacity, b.transform] });
        if (t - started > 3000) return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  })();`;
  const { page, context } = await open({ init });
  await page.waitForTimeout(2000);
  const s = await ev(page, () => window.__heroSamples);
  const bad = s.filter((x) => x.h1[0] !== "1" || x.h1[1] !== "none" || x.cta[0] !== "1" || x.cta[1] !== "none");
  r.check(s.length > 60 && bad.length === 0, "h1 and CTA opacity 1 transform none in every frame 0–3s", { frames: s.length, spanMs: s.length ? s[s.length - 1].t : 0, offending: bad.slice(0, 3) });
  await context.close();
};

items.V12 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const out = {};
    for (const n of ["trusted-by", "stats", "rows", "markets", "interlude"]) {
      const b = window.__vr.band(n);
      const g = b && b.querySelector(".grid-24");
      if (!g) { out[n] = null; continue; }
      const cs = getComputedStyle(g);
      const tracks = cs.gridTemplateColumns.split(" ").map((t) => parseFloat(t));
      out[n] = { tracks: tracks.length, track: tracks[0], lastTrack: tracks[tracks.length - 1], allEqual: tracks.every((t) => Math.abs(t - tracks[0]) < 0.01), gap: cs.gap, width: window.__vr.rect(g).w };
    }
    const stats = window.__vr.band("stats"), rows = window.__vr.band("rows");
    out.span6 = stats ? window.__vr.rect(stats.querySelector("article")).w : null;
    out.span12 = rows ? window.__vr.rect(rows.querySelector("article")).w : null;
    return out;
  });
  for (const n of ["stats", "rows", "markets", "interlude"]) {
    const g = m[n];
    r.check(g && g.tracks === 24 && near(g.track, 55.75, 0.5) && g.allEqual && g.gap === "4px" && near(g.width, 1430), `${n}: 24 x 55.75 gap 4 width 1430`, g);
  }
  // §2 row 4: robot.com's trusted-by grid is 24 x 55.578 plus one 0px implicit track (the list ends at line 26), so 25 tracks.
  const tb = m["trusted-by"];
  r.check(tb && ((tb.tracks === 24 && near(tb.track, 55.75, 0.5) && tb.allEqual) || (tb.tracks === 25 && near(tb.track, 55.578, 0.5) && near(tb.lastTrack, 0, 0.5))) && tb.gap === "4px" && near(tb.width, 1430), "trusted-by: 24 x 55.75 (or §2's 24 x 55.578 + 0px implicit) gap 4 width 1430", tb);
  r.check(near(m.span6, 354.5, 0.5), "span 6 = 354.5", m.span6);
  r.check(near(m.span12, 713, 0.5), "span 12 = 713", m.span12);
  await context.close();
};

items.V13 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => window.__vr.qa("article", window.__vr.band("rows")).map((a) => { const cs = getComputedStyle(a); return { rect: window.__vr.rect(a), radius: cs.borderRadius, padding: cs.padding, bg: cs.backgroundColor, raised: window.__vr.eq(cs.backgroundColor, window.__vr.tok("--surface-raised")) }; }));
  r.check(m.length === 2, "two cards", m.length);
  const xs = [5, 722];
  m.forEach((c, i) => {
    r.check(near(c.rect.w, 713) && near(c.rect.h, 713) && near(c.rect.x, xs[i]), `card ${i + 1} 713x713 at x ${xs[i]}`, { x: c.rect.x, w: c.rect.w, h: c.rect.h });
    r.check(c.radius === "24px" && c.padding === "18px 24px" && c.raised, `card ${i + 1} r24 padding 18px 24px bg raised`, { radius: c.radius, padding: c.padding, bg: c.bg });
  });
  await context.close();
};

items.V14 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const b = window.__vr.bands(); const out = {};
    const read = (el) => { const cs = getComputedStyle(el); return { pt: cs.paddingTop, pb: cs.paddingBottom, bgPage: window.__vr.eq(cs.backgroundColor, window.__vr.tok("--surface-page")), bg: cs.backgroundColor }; };
    for (const n of ["statement", "products", "stats", "rows", "markets", "interlude", "closing", "trusted-by"]) out[n] = b[n] ? read(b[n]) : null;
    out.footer = read(b.footer);
    out.trustedByGridPt = getComputedStyle(b["trusted-by"].querySelector(".grid-24")).paddingTop;
    return out;
  });
  for (const n of ["statement", "products", "stats", "rows", "markets", "interlude", "closing"]) r.check(m[n] && m[n].pt === "4px" && m[n].pb === "0px" && m[n].bgPage, `${n} padding 4/0 bg page`, m[n]);
  r.check(m["trusted-by"].pt === "0px" && m["trusted-by"].pb === "0px" && m.trustedByGridPt === "5px" && m["trusted-by"].bgPage, "trusted-by 0/0, grid padding-top 5", { ...m["trusted-by"], gridPt: m.trustedByGridPt });
  r.check(m.footer.pt === "4px" && m.footer.pb === "4px" && m.footer.bgPage, "footer 4/4", m.footer);
  await context.close();
};

items.V15 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const b = window.__vr.bands(); const rad = (el) => (el ? getComputedStyle(el).borderRadius : null);
    const pill = window.__vr.q("a.pill");
    return {
      hero: rad(b.hero.querySelector(":scope > div")), cards: window.__vr.qa("article", b.rows).map(rad), accordionRows: window.__vr.qa(".mkt__row").map(rad), interlude: rad(b.interlude.querySelector(":scope > div")), footer: rad(b.footer.querySelector(":scope > div")),
      statement: rad(b.statement.querySelector(":scope > div")), cta: rad(b.closing.querySelector(":scope > a")), radiusXl: window.__vr.raw("--radius-xl"),
      pill: rad(pill), pillH: window.__vr.rect(pill).h, navToggle: rad(window.__vr.q("header button[aria-expanded]")),
    };
  });
  r.check(m.hero === "24px" && m.cards.every((x) => x === "24px") && m.accordionRows.every((x) => x === "24px") && m.interlude === "24px" && m.footer === "24px", "24 on hero/cards/accordion rows/interlude/footer", { hero: m.hero, cards: m.cards, accordionRows: m.accordionRows, interlude: m.interlude, footer: m.footer });
  const slab26 = (v) => v === "26px" || v === m.radiusXl;
  r.check(slab26(m.statement) && slab26(m.cta), "26 on statement and CTA (or --radius-xl per the Foundation note)", { statement: m.statement, cta: m.cta, radiusXl: m.radiusXl });
  if (m.statement !== "26px") r.note("statement/CTA render --radius-xl (24) — globals.css records robot.com's 26 as collapsed to 24.");
  const pillR = parseFloat(m.pill);
  r.check(pillR >= 22 && (pillR === 22 || pillR >= m.pillH / 2), "pill content radius 22 (a full pill)", { pill: m.pill, pillH: m.pillH });
  r.check(m.navToggle === "4px", "nav toggle radius 4", m.navToggle);
  await context.close();
};

items.V16 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const b = window.__vr.bands();
    const bg = (el) => (el ? getComputedStyle(el).backgroundColor : null);
    const role = (el) => (el ? window.__vr.role(bg(el), ["--surface-brand", "--highlight", "--surface-raised", "--surface-sunken", "--surface-page"]) : null);
    const stats = window.__vr.qa("article", b.stats);
    const productCards = window.__vr.qa("[data-pinned-strip] article");
    const partner = window.__vr.qa(":scope > .grid-24 > div, li", b["trusted-by"]);
    return {
      brand: { statement: role(b.statement.querySelector(":scope > div")), accordionRows: window.__vr.qa(".mkt__row").map(role), interlude: role(b.interlude.querySelector(":scope > div")), footer: role(b.footer.querySelector(":scope > div")), statsA: role(stats[0]) },
      highlight: { productBand: role(window.__vr.q("[data-band-content]")), announce: role(window.__vr.q("[data-announce] > a")), statsB: role(stats[1]) },
      raised: { statsC: role(stats[2]), statsD: role(stats[3]), statsE: role(stats[4]), productCards: productCards.map(role), partner: partner.map(role) },
      sunken: { accordionMedia: role(window.__vr.q(".mkt__media")) },
    };
  });
  const all = (o, want) => Object.entries(o).every(([, v]) => (Array.isArray(v) ? v.length && v.every((x) => x === want) : v === want));
  r.check(all(m.brand, "--surface-brand"), "brand: statement, accordion rows, interlude, footer, stats A", m.brand);
  r.check(all(m.highlight, "--highlight"), "highlight: product band, announce, stats B", m.highlight);
  r.check(all(m.raised, "--surface-raised"), "raised: cards C/D/E, product cards, partner cards", m.raised);
  r.check(all(m.sunken, "--surface-sunken"), "sunken: accordion media", m.sunken);
  await context.close();
};

items.V17 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const b = window.__vr.bands();
    const col = (el) => (el ? getComputedStyle(el).color : null);
    const role = (el) => (el ? window.__vr.role(col(el), ["--ink", "--ink-muted", "--ink-subtle", "--on-brand", "--on-brand-muted", "--on-highlight"]) : null);
    return {
      inkHeading: role(b["trusted-by"].querySelector("h2")), inkMutedBody: role(b.rows.querySelector("p.t-body-s")), onBrand: role(b.statement.querySelector("h3")), onBrandMuted: role(b.footer.querySelector("a.footer-small")), onHighlight: role(b.closing.querySelector("h3")),
    };
  });
  // --ink, --on-highlight and --surface-brand share one value in Kurogane light, so the role is checked on the value.
  r.check(m.inkHeading === "--ink", "headings on page = --ink", m.inkHeading);
  r.check(m.inkMutedBody === "--ink-muted", "body copy on page = --ink-muted", m.inkMutedBody);
  r.check(m.onBrand === "--on-brand", "text on brand = --on-brand", m.onBrand);
  r.check(m.onBrandMuted === "--on-brand-muted", "secondary on brand = --on-brand-muted", m.onBrandMuted);
  r.check(m.onHighlight === "--ink" || m.onHighlight === "--on-highlight", "text on highlight = --on-highlight", m.onHighlight);
  await context.close();
};

items.V18 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () =>
    window.__vr.qa(".pill").map((p) => {
      const track = p.querySelector(".pill__track"); const labels = [...p.querySelectorAll(".pill__label")];
      const l2 = labels[1]; const l2cs = l2 ? getComputedStyle(l2) : null;
      const trackH = track ? track.getBoundingClientRect().height : null; const l1H = labels[0] ? labels[0].getBoundingClientRect().height : null;
      return { text: (labels[0] || p).textContent.trim().slice(0, 20), labels: labels.length, ariaHidden: l2 ? l2.getAttribute("aria-hidden") : null, absolute: l2cs ? l2cs.position === "absolute" : false, ty: l2 ? window.__vr.ty(l2) : null, overflow: track ? getComputedStyle(track).overflow : null, trackH, l1H };
    }),
  );
  const bad = m.filter((p) => !(p.labels === 2 && p.ariaHidden === "true" && p.absolute && near(p.ty, p.trackH, 0.5) && p.overflow === "hidden" && near(p.l1H, p.trackH, 0.5)));
  r.check(m.length > 0 && bad.length === 0, `${m.length} pills: 2 labels, 2nd aria-hidden absolute translateY(100%), track overflow hidden, label = line box`, { pills: m.length, bad: bad.slice(0, 4) });
  await context.close();
};

/** Shared by V19–V21: hover the hero CTA, sample copy 1's translateY. */
async function pillRoll(page) {
  const sel = "#hero a.pill";
  const info = await ev(page, (sel) => { const p = document.querySelector(sel); const l = p.querySelectorAll(".pill__label"); const cs = getComputedStyle(p); return { H: l[0].getBoundingClientRect().height, rect: window.__vr.rect(p), bg: cs.backgroundColor, color: cs.color }; }, sel);
  await page.mouse.move(700, 700);
  await page.waitForTimeout(100);
  await armEvent(page, "pointerover", sel);
  const sampler = startSampler(page, `() => { const l = document.querySelectorAll("${sel} .pill__label"); return [window.__vr.ty(l[0]), window.__vr.ty(l[1])]; }`, 600);
  await page.mouse.move(info.rect.x + info.rect.w / 2, info.rect.y + info.rect.h / 2);
  const during = await ev(page, (sel) => { const p = document.querySelector(sel); const cs = getComputedStyle(p); const l = getComputedStyle(p.querySelector(".pill__label")); return { bg: cs.backgroundColor, color: cs.color, transition: `${l.transitionProperty} ${l.transitionDuration} ${l.transitionTimingFunction}` }; }, sel);
  const hoverIn = await sampler;
  const t0 = await eventT0(page);
  return { sel, info, t0, hoverIn, during };
}

items.V19 = async (r) => {
  const { page, context } = await open();
  const { info, t0, hoverIn, during } = await pillRoll(page);
  const s = hoverIn.samples;
  const v = (t) => (at(s, t, t0) || [])[0];
  r.set("labelH", r2(info.H));
  r.set("fromHover", { 150: r2(v(150)), 200: r2(v(200)), 350: r2(v(350)), robot: [-7.1, -12.1, -17.1] });
  // The robot.com samples embed its own hover latency; the check fits the whole curve to the spec's 300ms ease-roll tween.
  const fit = fitCurve(s, t0, { from: 0, to: -info.H, duration: 300, ease: CURVE.roll, map: (v) => v[0] });
  r.check(fit.maxErr <= 1 && fit.offset <= 40, "copy 1 follows translateY 0 → -H over 300ms ease-roll (≤1px, start ≤40ms after hover)", fit);
  r.check(near(v(350), -info.H, 1), "copy 1 at -H (≈-17.1) @350", r2(v(350)));
  r.check(during.transition === `transform 0.3s ${EASE.roll}`, "transition transform .3s ease-roll while hovered", during.transition);
  r.set("curve", s.filter((x, i) => i % 3 === 0).map((x) => `${r2(x.abs - t0)}:${x.v[0]}`).join(" "));
  await context.close();
};

items.V20 = async (r) => {
  const { page, context } = await open();
  const { sel, info } = await pillRoll(page);
  await page.waitForTimeout(400);
  await armEvent(page, "pointerout", sel);
  const sampler = startSampler(page, `() => { const l = document.querySelectorAll("${sel} .pill__label"); return [window.__vr.ty(l[0]), window.__vr.ty(l[1])]; }`, 120);
  await page.mouse.move(700, 700);
  const { samples } = await sampler;
  const t0 = await eventT0(page);
  const a18 = at(samples, 18, t0), a50 = at(samples, 50, t0);
  r.check(a18 && near(a18[0], 0, 0.5) && near(a18[1], info.H, 0.5), "both copies at rest @18ms", a18);
  r.check(a50 && near(a50[0], 0, 0.5) && near(a50[1], info.H, 0.5), "both copies at rest @50ms", a50);
  const rest = await ev(page, (sel) => { const l = getComputedStyle(document.querySelector(sel + " .pill__label")); return { duration: l.transitionDuration, transition: `${l.transitionProperty} ${l.transitionDuration}` }; }, sel);
  r.check(rest.duration === "0s", "rest transition none / 0s", rest.transition);
  await context.close();
};

items.V21 = async (r) => {
  const { page, context } = await open();
  const { sel, info, during } = await pillRoll(page);
  await page.mouse.move(700, 700);
  await page.waitForTimeout(350);
  const after = await ev(page, (sel) => { const cs = getComputedStyle(document.querySelector(sel)); return { bg: cs.backgroundColor, color: cs.color }; }, sel);
  r.check(info.bg === during.bg && during.bg === after.bg, "background-color unchanged", { before: info.bg, during: during.bg, after: after.bg });
  r.check(info.color === during.color && during.color === after.color, "color unchanged", { before: info.color, during: during.color, after: after.color });
  await context.close();
};

items.V22 = async (r) => {
  const { page, context } = await open();
  const sel = "footer a.footer-small";
  await ev(page, (sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), sel);
  await page.waitForTimeout(400);
  const rect = await ev(page, (sel) => window.__vr.rect(document.querySelector(sel)), sel);
  await page.mouse.move(rect.x + 400, rect.y);
  await page.waitForTimeout(100);
  const rest = await ev(page, (sel) => getComputedStyle(document.querySelector(sel)).opacity, sel);
  r.check(rest === "0.55", "rest opacity .55", rest);
  const src = `() => +getComputedStyle(document.querySelector("${sel}")).opacity`;
  await armEvent(page, "pointerover", sel);
  let sampler = startSampler(page, src, 500);
  await page.mouse.move(rect.x + rect.w / 2, rect.y + rect.h / 2);
  let { samples } = await sampler;
  let t0 = await eventT0(page);
  const v150 = at(samples, 150, t0), v250 = at(samples, 250, t0), v350 = at(samples, 350, t0);
  r.set("in", { 150: r2(v150), 250: r2(v250), 350: r2(v350), robot: [".69–.74", ".93–.96", "1"] });
  let fit = fitCurve(samples, t0, { from: 0.55, to: 1, duration: 300, ease: CURVE.roll });
  r.check(fit.maxErr <= 0.05 && fit.offset <= 40 && v350 >= 0.99, "in: .55 → 1 over 300ms ease-roll (≤.05), 1 @350", { ...fit, at350: r2(v350) });
  await armEvent(page, "pointerout", sel);
  sampler = startSampler(page, src, 500);
  await page.mouse.move(rect.x + 400, rect.y);
  ({ samples } = await sampler);
  t0 = await eventT0(page);
  const o150 = at(samples, 150, t0), o250 = at(samples, 250, t0), o350 = at(samples, 350, t0);
  r.set("out", { 150: r2(o150), 250: r2(o250), 350: r2(o350), robot: [".81", ".59", ".55"] });
  fit = fitCurve(samples, t0, { from: 1, to: 0.55, duration: 300, ease: CURVE.roll });
  r.check(fit.maxErr <= 0.05 && fit.offset <= 40 && near(o350, 0.55, 0.02), "out: 1 → .55 over 300ms ease-roll (≤.05), .55 @350", { ...fit, at350: r2(o350) });
  await context.close();
};

const REVEAL_SEL = ".reveal-line__inner, .mkt__title-move, [data-pinned-strip] h3 span span, [data-pinned-strip] p span span";
items.V23 = async (r) => {
  const { page, context } = await open();
  const rule = await ev(page, () => {
    const el = document.querySelector(".reveal-line__inner");
    if (!el) return null;
    const cs = getComputedStyle(el);
    const notIn = [...document.querySelectorAll(".reveal-line__inner")].find((e) => !e.closest(".is-in"));
    return { property: cs.transitionProperty, duration: cs.transitionDuration, easing: cs.transitionTimingFunction, delay: cs.transitionDelay, count: document.querySelectorAll(".reveal-line__inner").length, restTy: notIn ? window.__vr.ty(notIn) : null, restH: notIn ? notIn.getBoundingClientRect().height : null };
  });
  r.check(rule && rule.property === "transform" && rule.duration === "0.4s" && rule.easing === EASE.reveal, ".line > * transition transform .4s ease-reveal", rule);
  r.check(rule && rule.restTy !== null && near(rule.restTy, rule.restH, 1), "rest state translateY(100%)", rule && { ty: rule.restTy, h: rule.restH });
  const sweep = async (pollMs) => {
    const seen = new Map();
    const H = await ev(page, () => document.documentElement.scrollHeight - innerHeight);
    for (let y = 0; y <= H + 300; y += 300) {
      await ev(page, (y) => window.scrollTo(0, y), Math.min(y, H));
      for (let t = 0; t < pollMs; t += 40) {
        const list = await ev(page, (sel) => window.__vr.transitions((t) => t.kind === "CSSTransition" && t.prop === "transform" && t.duration >= 300 && t.duration <= 500).map((t) => ({ ...t, reveal: !![...document.querySelectorAll(sel)].length })), REVEAL_SEL);
        for (const t of list) seen.set(`${t.text}|${t.delay}|${t.cls}`, t);
        await sleep(40);
      }
    }
    return [...seen.values()];
  };
  const first = await sweep(640);
  const bucket = (d) => first.filter((t) => pctOk(t.delay, d, 0.12)).length;
  const buckets = { 150: bucket(150), 250: bucket(250), 350: bucket(350), 450: bucket(450) };
  r.set("firstSweep", { transitions: first.length, buckets, easings: [...new Set(first.map((t) => t.easing))], durations: [...new Set(first.map((t) => t.duration))] });
  r.check(first.length > 0 && first.every((t) => pctOk(t.duration, 400) && t.easing === EASE.reveal), "every reveal transition 400ms ease-reveal", { durations: [...new Set(first.map((t) => t.duration))], easings: [...new Set(first.map((t) => t.easing))] });
  r.check(buckets[150] > 0 && buckets[250] > 0, "delay buckets 150/250 present (350/450 when lines exist)", buckets);
  await scrollTo(page, 0, 300);
  const second = await sweep(200);
  r.check(second.length === 0, "second sweep sees no reveal transition (fires once)", second.length);
  await context.close();
};

/** M5/M6 per-word opacity at scrub progress p. */
function wordOpacity(p, i, n) {
  const total = 0.15 + 0.1 * (n - 1);
  const x = Math.min(1, Math.max(0, (p * total - i * 0.1) / 0.15));
  return 0.3 + 0.7 * (1 - (1 - x) * (1 - x));
}
async function wordScrub(page, r, { slabSel, wordSel, staticSel }) {
  const g = await ev(page, ({ slabSel, wordSel }) => { const slab = document.querySelector(slabSel); return { bandTop: window.__vr.rect(slab).top, H: innerHeight, n: document.querySelectorAll(wordSel).length }; }, { slabSel, wordSel });
  const start = g.bandTop - g.H, end = g.bandTop - g.H / 4;
  r.set("scrub", { bandTop: r2(g.bandTop), start: r2(start), end: r2(end), words: g.n });
  if (!g.n) {
    r.check(false, "scrub words present", g.n);
    return;
  }
  const points = [-0.17, 0, 0.2, 0.42, 0.64, 0.87, 1, 1.31];
  const readings = [];
  let maxErr = 0;
  for (const p of points) {
    const y = Math.round(start + p * (end - start));
    await scrollTo(page, y, 1300);
    const m = await ev(page, ({ wordSel, staticSel }) => ({ words: window.__vr.qa(wordSel).map((w) => +getComputedStyle(w).opacity), statics: staticSel ? window.__vr.qa(staticSel).map((w) => +getComputedStyle(w).opacity) : [] }), { wordSel, staticSel });
    const pc = Math.min(1, Math.max(0, p));
    const exp = m.words.map((_, i) => wordOpacity(pc, i, m.words.length));
    const err = Math.max(...m.words.map((v, i) => Math.abs(v - exp[i])));
    maxErr = Math.max(maxErr, err);
    readings.push({ p, scrollY: y, lit: m.words.filter((v) => v >= 0.99).length, min: r2(Math.min(...m.words)), max: r2(Math.max(...m.words)), err: r2(err), statics: m.statics.length ? r2(Math.min(...m.statics)) : undefined });
    if (m.statics.length) r.check(m.statics.every((v) => v === 1), `static words at 1 (p=${p})`, r2(Math.min(...m.statics)));
  }
  r.set("readings", readings);
  r.check(readings[0].max <= 0.35 && readings[1].max <= 0.35, "all words .3 at or before start", { atStart: readings[1].max });
  r.check(readings[6].min >= 0.95 && readings[7].min >= 0.95, "all words 1 at or after end", { atEnd: readings[6].min });
  r.check(maxErr <= 0.05, "per-word opacity within .05 of the M5 curve at every point", r2(maxErr));
}
items.V24 = async (r) => {
  const { page, context } = await open();
  await wordScrub(page, r, { slabSel: "#statement > div", wordSel: "#statement .word" });
  await context.close();
};
items.V25 = async (r) => {
  const { page, context } = await open();
  await wordScrub(page, r, { slabSel: "#closing > a", wordSel: "#closing .word", staticSel: "#closing .pill__label" });
  await context.close();
};

items.V26 = async (r) => {
  const { page, context } = await open();
  const g = await ev(page, () => {
    const spacer = document.querySelector("[data-pin-spacer]"); const dots = document.querySelector("[data-dots]"); const band = window.__vr.band("products");
    return { spacerH: window.__vr.rect(spacer).h, spacerPb: getComputedStyle(spacer).paddingBottom, dotsTop: window.__vr.rect(dots).top, maskH: window.__vr.rect(document.querySelector("svg[data-dot-mask]")).h, bandTop: window.__vr.rect(band).top, H: innerHeight, landingH: window.__vr.rect(document.querySelector("[data-landing]")).h };
  });
  const start = g.dotsTop - g.H, end = start + 1079;
  r.set("geometry", { spacerH: g.spacerH, spacerPaddingBottom: g.spacerPb, landingH: g.landingH, start: r2(start), end: r2(end), bandTop: r2(g.bandTop) });
  r.check(near(g.spacerH, 1315), "pin-spacer 1315 tall", g.spacerH);
  // robot.com reserves the travel with padding-bottom; here the ghost landing row + the two 4px gaps + the mask height are the same 1079.
  const reserve = g.maskH + 4 + g.landingH + 4;
  r.check(g.spacerPb === "1079px" || near(reserve, 1079, 3), "padding-bottom 1079 (or an equivalent 1079 landing reserve)", { paddingBottom: g.spacerPb, landingReserve: r2(reserve) });
  r.check(near(start, 1161) && near(end, 2240), "pin start 1161 / end 2240", { start: r2(start), end: r2(end) });
  if (!near(start, 1161)) r.note(`pin start is off by ${r2(start - 1161)}px because the bands above end ${r2(g.bandTop - 1816.92)}px from robot.com's 1816.92 (see the band-top diagnostic).`);
  const out = [];
  for (const y of [1000, 1900, 2300, 2900]) {
    await scrollTo(page, y, 250);
    const m = await ev(page, () => ({ ty: window.__vr.ty(document.querySelector("[data-pinned-strip]")), cardTop: window.__vr.rect(document.querySelector("[data-pinned-strip] article")).top }));
    const exp = Math.min(1079, Math.max(0, y - start));
    out.push({ scrollY: y, ty: m.ty, expected: r2(exp), cardTop: m.cardTop });
    r.check(near(m.ty, exp), `strip translateY at scrollY ${y} = ${r2(exp)}`, m.ty);
  }
  r.set("samples", out);
  r.check(near(out[3].cardTop - g.bandTop, 606), "cards land at bandTop+606", r2(out[3].cardTop - g.bandTop));
  await context.close();
};

items.V27 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const svg = document.querySelector("svg[data-dot-mask]"); const path = svg.querySelector("path"); const d = path.getAttribute("d");
    const wrap = svg.parentElement; const band = window.__vr.band("products");
    const fill = getComputedStyle(path).fill;
    return { rect: window.__vr.rect(svg), viewBox: svg.getAttribute("viewBox"), holes: (d.match(/C/g) || []).length / 4, fill, fillIsHighlight: window.__vr.eq(fill, window.__vr.tok("--highlight")), maskImage: [getComputedStyle(wrap).maskImage, getComputedStyle(band).maskImage, getComputedStyle(svg).maskImage], clipPath: [getComputedStyle(wrap).clipPath, getComputedStyle(band).clipPath, getComputedStyle(svg).clipPath] };
  });
  r.check(near(m.rect.w, 1430) && near(m.rect.h, 358), "svg 1430x358", { w: m.rect.w, h: m.rect.h });
  r.check(m.viewBox === "0 0 1458 365", "viewBox 0 0 1458 365", m.viewBox);
  r.check(m.holes === 64, "64 circle holes", m.holes);
  r.check(m.fillIsHighlight, "fill --highlight", m.fill);
  r.check(m.maskImage.every((v) => v === "none") && m.clipPath.every((v) => v === "none"), "no mask-image / clip-path", { maskImage: m.maskImage, clipPath: m.clipPath });
  await context.close();
};

items.V28 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => { const b = window.__vr.band("stats"); const T = window.__vr.rect(b).top; return { T, cards: window.__vr.qa("article", b).map((a) => { const cs = getComputedStyle(a); const rc = window.__vr.rect(a); return { x: rc.x, dy: +(rc.top - T).toFixed(2), w: rc.w, h: rc.h, radius: cs.borderRadius, padding: cs.padding }; }) }; });
  const exp = [
    ["A", 5, 4, 354.5, 354.5],
    ["B", 363.5, 4, 354.5, 175.31],
    ["C", 363.5, 183.31, 354.5, 175.31],
    ["D", 722, 4, 354.5, 354.5],
    ["E", 1080.5, 4, 354.5, 354.5],
  ];
  r.check(m.cards.length === 5, "five cards", m.cards.length);
  exp.forEach(([n, x, dy, w, h], i) => {
    const c = m.cards[i];
    r.check(c && near(c.x, x) && near(c.dy, dy) && near(c.w, w) && near(c.h, h), `${n} (${x},+${dy - 4},${w}x${h})`, c && { x: c.x, dy: c.dy, w: c.w, h: c.h });
    r.check(c && c.radius === "24px" && c.padding === "24px", `${n} r24 padding 24`, c && { radius: c.radius, padding: c.padding });
  });
  await context.close();
};

const accordionState = () => ({ widths: window.__vr.qa(".mkt__row").map((e) => window.__vr.rect(e).w), heights: window.__vr.qa(".mkt__row").map((e) => window.__vr.rect(e).h), radii: window.__vr.qa(".mkt__row").map((e) => getComputedStyle(e).borderRadius), expanded: window.__vr.qa(".mkt__toggle").map((b) => b.getAttribute("aria-expanded")), active: document.querySelectorAll(".mkt__row.is-active").length, media: (() => { const m = document.querySelector(".mkt__media"); const rc = window.__vr.rect(m); return { w: rc.w, h: rc.h, bottom: rc.bottom, radius: getComputedStyle(m).borderRadius }; })(), rowTop: window.__vr.rect(document.querySelector(".mkt__row")).y });
items.V29 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, accordionState);
  r.check(near(m.widths[0], 591) && near(m.widths[1], 57) && near(m.widths[2], 57), "widths 591/57/57", m.widths.map(r2));
  r.check(m.heights.every((h) => near(h, 638.8)), "height 638.8", m.heights.map(r2));
  r.check(near(m.media.w, 713) && near(m.media.h, 638.8) && m.media.radius === "24px", "media 713x638.8 r24", m.media);
  r.check(m.expanded.join() === "true,false,false", "aria-expanded true/false/false", m.expanded);
  r.check(m.active === 1, "single-open", m.active);
  await context.close();
};

async function accordionOpen(page, rowIndex) {
  await ev(page, () => window.__vr.scrollToDocTop(window.__vr.band("markets"), 100));
  await page.waitForTimeout(700);
  const rows = await ev(page, () => window.__vr.qa(".mkt__row").map((e) => window.__vr.rect(e)));
  const row = rows[rowIndex];
  await armEvent(page, "click");
  const sampler = startSampler(page, `() => { const rows = window.__vr.qa(".mkt__row"); return { w: rows.map((e) => e.getBoundingClientRect().width), h: rows.map((e) => e.getBoundingClientRect().height), o: +getComputedStyle(rows[${rowIndex}].querySelector(".mkt__inner")).opacity }; }`, 1200);
  await page.mouse.click(row.x + row.w / 2, row.y + row.h / 2);
  const { samples } = await sampler;
  const t0 = await eventT0(page);
  return { rows, samples, t0 };
}
items.V30 = async (r) => {
  const { page, context } = await open();
  const { samples, t0 } = await accordionOpen(page, 1);
  const p2 = (t) => { const v = at(samples, t, t0); return v ? (v.w[1] - 57) / (591 - 57) : null; };
  const o = (t) => { const v = at(samples, t, t0); return v ? v.o : null; };
  const final = samples[samples.length - 1].v.w;
  r.set("fromClick", { p2At300: r2(p2(300)), p2At450: r2(p2(450)), oAt605: r2(o(605)), oAt1005: r2(o(1005)), robot: [".526", "≥.97", ".44", "≥.99"] });
  // Fit the whole tween: flex-grow 57 → 591 over 600ms power3.inOut (M27); the transition may start a frame or two after the click.
  const fitW = fitCurve(samples, t0, { from: 0, to: 1, duration: 600, ease: CURVE.power3InOut, map: (v) => (v.w[1] - 57) / 534 });
  r.check(fitW.maxErr <= 0.05 && fitW.offset <= 60, "row 2 width follows 600ms power3.inOut (progress ≤.05, start ≤60ms after click)", fitW);
  const settleW = settleT(samples, (v) => Math.abs(v.w[1] - final[1]) <= 1, t0);
  r.check(settleW !== null && settleW <= 660 + fitW.offset && near(final[1], 591), "row 2 settled (±1) by 600, at 591", { settleMs: r2(settleW), final: r2(final[1]) });
  const fitW1 = fitCurve(samples, t0, { from: 1, to: 0, duration: 600, ease: CURVE.power3InOut, map: (v) => (v.w[0] - 57) / 534 });
  r.check(fitW1.maxErr <= 0.05 && near(final[0], 57), "row 1 shrinks symmetrically", { ...fitW1, finalRow1: r2(final[0]) });
  const fitO = fitCurve(samples, t0, { from: 0, to: 1, duration: 600, delay: 500, ease: CURVE.outCubic, map: (v) => v.o });
  r.check(fitO.maxErr <= 0.05 && fitO.offset <= 60, "new inner opacity 0 → 1 over 600ms out-cubic after 500ms (M28)", fitO);
  r.check(o(1005 + fitO.offset) >= 0.99 || o(1100) >= 0.99, "new inner opacity ≥.99 @1005", r2(o(1005)));
  r.set("curve", samples.filter((x, i) => i % 4 === 0).map((x) => `${r2(x.abs - t0)}:${r2(x.v.w[1])}/${r2(x.v.o)}`).join(" "));
  await context.close();
};

items.V31 = async (r) => {
  const { page, context } = await open();
  await ev(page, () => window.__vr.scrollToDocTop(window.__vr.band("markets"), 100));
  await page.waitForTimeout(700);
  const before = await ev(page, () => window.__vr.qa(".mkt__row").map((e) => window.__vr.rect(e)));
  const open1 = before[0];
  await page.mouse.click(open1.x + open1.w - 20, open1.y + 12);
  await page.waitForTimeout(700);
  const after = await ev(page, () => ({ w: window.__vr.qa(".mkt__row").map((e) => window.__vr.rect(e).w), url: location.pathname }));
  r.check(after.w.every((w, i) => near(w, before[i].w, 1)), "widths unchanged 700ms after clicking the open row", { before: before.map((b) => r2(b.w)), after: after.w.map(r2) });
  r.check(after.url === new URL(URL_).pathname, "no navigation", after.url);
  await context.close();
};

items.V32 = async (r) => {
  const { page, context } = await open({ vp: VP.phone });
  await ev(page, () => window.__vr.scrollToDocTop(window.__vr.band("markets"), 10));
  await page.waitForTimeout(700);
  const m = await ev(page, accordionState);
  r.check(near(m.media.w, 380) && near(m.media.h, 299) && m.media.bottom <= m.rowTop + 1, "media 380x299 above the rows", { w: m.media.w, h: m.media.h, mediaBottom: m.media.bottom, rowTop: m.rowTop });
  r.check(near(m.heights[0], 200, 2) && m.radii[0] === "24px", "open row ≈200 tall r24", { h: r2(m.heights[0]), radius: m.radii[0] });
  r.check(near(m.heights[1], 57) && near(m.heights[2], 57) && m.radii[1] === "48px", "closed rows 57 r48", { h: m.heights.slice(1).map(r2), radius: m.radii[1] });
  if (!near(m.heights[0], 200, 2)) r.note("open row height is content-driven (JA title + two sentences incl. a [GAP] marker + pill); robot.com's 199.56 holds a shorter p.");
  const { samples, t0 } = await accordionOpen(page, 1);
  const final = samples[samples.length - 1].v.h[1];
  const fitH = fitCurve(samples, t0, { from: 57, to: final, duration: 600, ease: CURVE.power3InOut, map: (v) => v.h[1] });
  const settle = settleT(samples, (v) => Math.abs(v.h[1] - final) <= 1, t0);
  const p300 = at(samples, 300, t0);
  r.check(settle !== null && within(settle - fitH.offset, 495, 605) && fitH.maxErr <= (final - 57) * 0.05 && fitH.offset <= 60 && final > 100, "row 2 height tween (600ms power3.inOut) settles ≈550ms", { settleMs: r2(settle), startOffset: fitH.offset, maxErrPx: fitH.maxErr, final: r2(final), at300: r2(p300 && p300.h[1]) });
  r.set("curve", samples.filter((x, i) => i % 4 === 0).map((x) => `${r2(x.abs - t0)}:${r2(x.v.h[1])}`).join(" "));
  await context.close();
};

items.V33 = async (r) => {
  const { page, context } = await open();
  const g = await ev(page, () => ({ bandTop: window.__vr.rect(window.__vr.band("interlude").querySelector(":scope > div")).top, H: innerHeight }));
  const out = [];
  for (const [d, exp] of [
    [-800, -30 * (800 / g.H)],
    [-300, -30 * (300 / g.H)],
    [0, 0],
    [300, 30 * (300 / g.H)],
    [600, 30 * (600 / g.H)],
  ]) {
    await scrollTo(page, g.bandTop + d, 250);
    const ty = await ev(page, () => window.__vr.ty(document.querySelector("#interlude .will-change-transform")));
    out.push({ d, ty, exp: r2(exp) });
    r.check(near(ty, exp, 3), `bg translateY at bandTop${d >= 0 ? "+" : ""}${d} ≈ ${r2(exp)}`, ty);
  }
  r.check(out.every((s, i) => i === 0 || s.ty >= out[i - 1].ty), "monotonic", out.map((s) => s.ty));
  await context.close();
};

items.V34 = async (r) => {
  const { page, context } = await open();
  await ev(page, () => window.__vr.scrollToDocTop(window.__vr.band("interlude").querySelector(":scope > div"), 0));
  await page.waitForTimeout(500);
  const sel = '#interlude button[aria-haspopup="dialog"]';
  const m = await ev(page, (sel) => { const t = document.querySelector(sel); const play = t.querySelectorAll(":scope > span")[1]; return { thumb: window.__vr.rect(t), radius: getComputedStyle(t).borderRadius, play: window.__vr.rect(play), playRadius: getComputedStyle(play).borderRadius }; }, sel);
  r.check(near(m.thumb.w, 474) && near(m.thumb.h, 331) && near(m.thumb.x, 483) && m.radius === "24px", "thumb 474x331 at x 483 r24", { ...m.thumb, radius: m.radius });
  r.check(near(m.play.w, 40) && near(m.play.h, 40) && m.playRadius === "6px", "play box 40x40 r6", { w: m.play.w, h: m.play.h, radius: m.playRadius });
  await armEvent(page, "click");
  const sampler = startSampler(page, `() => +getComputedStyle(document.querySelector('[role="dialog"][aria-modal="true"]')).opacity`, 600);
  await page.mouse.click(m.thumb.x + m.thumb.w / 2, m.thumb.y + m.thumb.h / 2);
  const { samples } = await sampler;
  const t0 = await eventT0(page);
  const fit = fitCurve(samples, t0, { from: 0, to: 1, duration: 300, ease: CURVE.roll });
  r.check((at(samples, 270, t0) >= 0.97 || at(samples, 297, t0) >= 0.97) && fit.maxErr <= 0.05, "overlay opacity 0 → 1 over 300ms ease-roll, ≥.97 by 270ms", { ...fit, at104: r2(at(samples, 104, t0)), at187: r2(at(samples, 187, t0)), at270: r2(at(samples, 270, t0)) });
  if (fit.maxErr <= 0.05 && fit.offset > 30) r.note(`the fade itself matches (max error ${fit.maxErr}) but starts ${fit.offset}ms after the click; robot.com's .97 @270 counts from the click.`);
  await page.waitForTimeout(900);
  const o = await ev(page, () => {
    const d = document.querySelector('[role="dialog"][aria-modal="true"]'); const cs = getComputedStyle(d); const rc = window.__vr.rect(d); const v = d.querySelector("video");
    return { position: cs.position, rect: { x: rc.x, y: rc.y, w: rc.w, h: rc.h }, z: +cs.zIndex, bg: cs.backgroundColor, alpha: window.__vr.alpha(cs.backgroundColor), bgRole: window.__vr.rgb(cs.backgroundColor) === window.__vr.rgb(window.__vr.tok("--surface-brand")) ? "--surface-brand" : window.__vr.rgb(cs.backgroundColor) === "0,0,0" ? "black" : "other", video: v ? { controls: v.hasAttribute("controls"), playsinline: v.hasAttribute("playsinline"), paused: v.paused, currentTime: v.currentTime } : null, innerWidth: innerWidth, innerHeight: innerHeight, scrollY };
  });
  r.check(o.position === "fixed" && near(o.rect.x, 0) && near(o.rect.y, 0) && near(o.rect.w, o.innerWidth) && near(o.rect.h, o.innerHeight) && o.z >= 1000, "overlay fixed inset 0 z≥1000", { position: o.position, rect: o.rect, z: o.z });
  r.check(near(o.alpha, 0.6, 0.02) && (o.bgRole === "black" || o.bgRole === "--surface-brand"), "overlay rgba(0,0,0,.6) (brand at 60% per the colour map)", { bg: o.bg, role: o.bgRole });
  r.check(o.video && o.video.controls && o.video.playsinline && !o.video.paused, "native <video controls playsinline> autoplays", o.video);
  await page.mouse.move(700, 450);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);
  const afterWheel = await ev(page, () => scrollY);
  r.check(near(afterWheel, o.scrollY, 0.5), "wheel blocked while open", { before: o.scrollY, after: afterWheel });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  const closed = await ev(page, () => { const d = document.querySelector('[role="dialog"][aria-modal="true"]'); return { opacity: getComputedStyle(d).opacity, hidden: d.getAttribute("aria-hidden"), inDom: !!d }; });
  r.check(closed.inDom && closed.opacity === "0" && closed.hidden === "true", "Escape closes (overlay stays in the DOM)", closed);
  await context.close();
};

items.V35 = async (r) => {
  const { page, context } = await open();
  const m = await ev(page, () => {
    const f = document.querySelector("footer"); const slab = f.querySelector(":scope > div"); const cs = getComputedStyle(slab); const grid = f.querySelector(".footer-grid"); const gcs = getComputedStyle(grid);
    const tracks = gcs.gridTemplateColumns.split(" ").map(parseFloat);
    const cells = [...grid.querySelectorAll(":scope > .cell-24")].map((c) => ({ ...window.__vr.rect(c), col: getComputedStyle(c).gridColumnStart + " / " + getComputedStyle(c).gridColumnEnd }));
    return { slab: window.__vr.rect(slab), radius: cs.borderRadius, padding: cs.padding, brand: window.__vr.eq(cs.backgroundColor, window.__vr.tok("--surface-brand")), grid: { w: window.__vr.rect(grid).w, tracks: tracks.length, track: tracks[0], gap: gcs.gap }, cells };
  });
  r.check(near(m.slab.w, 1430) && near(m.slab.h, 903) && m.radius === "24px" && m.padding === "26px 40px 40px" && m.brand, "slab 1430x903 r24 padding 26px 40px 40px bg brand", { w: m.slab.w, h: m.slab.h, radius: m.radius, padding: m.padding, brand: m.brand });
  r.check(near(m.grid.w, 1350) && m.grid.tracks === 24 && near(m.grid.track, 52.406, 0.5) && m.grid.gap === "4px", "grid 1350 = 24 x 52.406 gap 4", m.grid);
  const [logo, nav1, nav2, legals] = m.cells;
  r.check(logo && near(logo.w, 898.5) && near(logo.x, 45), "logo column span 16", logo && { x: logo.x, w: logo.w, col: logo.col });
  r.check(nav1 && near(nav1.x, 947.66) && near(nav1.w, 221.62) && nav2 && near(nav2.x, 1173.33), "nav columns span 4 at x 947.66 / 1173.33", { nav1: nav1 && { x: nav1.x, w: nav1.w }, nav2: nav2 && { x: nav2.x, w: nav2.w } });
  r.check(legals && near(legals.w, 1350) && near(legals.h, 12), "legals span 24, 12px tall", legals && { w: legals.w, h: legals.h });
  await context.close();
};

items.V36 = async (r) => {
  const { page, context } = await open();
  const g = await ev(page, () => {
    const svg = document.querySelector("footer svg"); const groups = svg.querySelectorAll("g"); const dots = [...groups[0].querySelectorAll("circle")];
    const rc = (c) => c.getBoundingClientRect();
    const a = rc(dots[0]), b = rc(dots[1]), c = rc(dots[47]);
    const wrap = document.querySelector(".footer-dots");
    return { count: dots.length, w: window.__vr.rect(svg).w, pitchX: +(b.x - a.x).toFixed(2), pitchY: +(c.y - a.y).toFixed(2), dot: +a.width.toFixed(2), wrapTop: window.__vr.rect(wrap).top, wrapBottom: window.__vr.rect(wrap).top + window.__vr.rect(wrap).h, H: innerHeight, maxScroll: document.documentElement.scrollHeight - innerHeight };
  });
  r.check(g.count === 47 * 15, "47 x 15 dots", g.count);
  r.check(near(g.w, 1350) && near(g.pitchX, 28.72, 1) && near(g.dot, 22.9, 1), "1350 wide, pitch ≈28.7, dot ≈22.9", { w: g.w, pitchX: g.pitchX, pitchY: g.pitchY, dot: g.dot });
  // Entry: wrapper bottom at the viewport bottom.
  const enterY = Math.min(g.maxScroll, g.wrapBottom - g.H);
  await scrollTo(page, enterY - 400, 300);
  await armEvent(page, "scroll");
  const sampler = startSampler(page, `() => { const s = document.querySelector("footer svg"); return { playing: s.hasAttribute("data-playing"), frame: +s.dataset.frame }; }`, 5300);
  await ev(page, (y) => window.scrollTo(0, y), enterY);
  const { samples } = await sampler;
  const t0 = await eventT0(page);
  const startT = firstT(samples, (v) => v.playing, t0);
  r.check(startT !== null && startT <= 60 + 16, "animated state within 60ms of entry", { startMs: r2(startT) });
  const arcs = samples.filter((s) => s.abs - t0 >= 1520 && s.abs - t0 <= 1870).map((s) => s.v.frame);
  r.check(arcs.includes(4), "arcs state (frame 4) at 1620–1770ms", { framesSeen1520to1870: [...new Set(arcs)] });
  const f5000 = at(samples, 5000, t0);
  r.check(f5000 && f5000.frame === 13 && f5000.playing, "open-eyes hold (frame 13) at 5000ms", f5000);
  const leaveY = Math.max(0, g.wrapTop - g.H - 50);
  await scrollTo(page, leaveY, 300);
  const left = await ev(page, () => { const s = document.querySelector("footer svg"); return { playing: s.hasAttribute("data-playing"), frame: +s.dataset.frame }; });
  r.check(!left.playing && left.frame === 0, "static again once the wrapper top is below the viewport", left);
  await context.close();
  const ph = await open({ vp: VP.phone });
  const hidden = await ev(ph.page, () => { const s = document.querySelector("footer svg"); return s ? getComputedStyle(s).display : "absent"; });
  r.check(hidden === "none" || hidden === "absent", "hidden at 390", hidden);
  await ph.context.close();
};

items.V37 = async (r) => {
  const { page, context } = await open();
  await page.mouse.move(720, 450);
  await page.waitForTimeout(200);
  await armEvent(page, "wheel");
  const sampler = startSampler(page, "() => scrollY", 1500);
  await page.mouse.wheel(0, 500);
  const { samples } = await sampler;
  const t0 = await eventT0(page);
  const first = firstT(samples, (v) => v > 0.5, t0);
  const v400 = at(samples, 400, t0);
  const final = samples[samples.length - 1].v;
  const settle = settleT(samples, (v) => Math.abs(v - 500) <= 0.5, t0);
  r.check(near(final, 500, 0.5), "0 → 500", final);
  r.check(first !== null && first <= 99, "first movement ≤90ms", r2(first));
  r.check(v400 >= 430, "≥86% by 400ms", r2(v400));
  r.check(settle !== null && within(settle, 900, 1375), "settled ±0.5 between 1000 and 1250ms", r2(settle));
  r.set("curve", samples.filter((x, i) => i % 5 === 0).map((x) => `${r2(x.abs - t0)}:${r2(x.v)}`).join(" "));
  await scrollTo(page, 0, 400);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(150);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1700);
  const two = await ev(page, () => scrollY);
  r.check(near(two, 600, 1), "two 300px ticks 150ms apart accumulate to 600", r2(two));
  await context.close();
};

items.V38 = async (r) => {
  const { page, context } = await open();
  await page.keyboard.press("Tab");
  await page.waitForTimeout(300);
  const readFocused = () => {
    const a = document.activeElement; const cs = getComputedStyle(a);
    return { href: a.getAttribute("href"), text: (a.textContent || "").trim().slice(0, 30), position: cs.position, rect: window.__vr.rect(a), radius: cs.borderRadius, brand: window.__vr.eq(cs.backgroundColor, window.__vr.tok("--surface-brand")), onBrand: window.__vr.eq(cs.color, window.__vr.tok("--on-brand")), outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor} offset ${cs.outlineOffset}`, outlineRole: window.__vr.role(cs.outlineColor, ["--on-brand", "--focus-ring-inverse", "--focus-ring"]), outlineWidth: cs.outlineWidth, outlineOffset: cs.outlineOffset, opacity: cs.opacity };
  };
  const first = await ev(page, readFocused);
  r.check(first.href === "#main", "first Tab focuses [href=#main]", { href: first.href, text: first.text });
  let m = first;
  if (first.href !== "#main") {
    // Measure the skip link itself so the geometry report does not describe whatever came first in the tab order.
    r.note("the skip link is not the first focusable (it sits inside <header>, after the announcement bar in DOM order); geometry below is measured with the skip link focused directly.");
    await page.focus('a[href="#main"]');
    await page.waitForTimeout(300);
    m = await ev(page, readFocused);
  }
  r.check(m.position === "fixed" && near(m.rect.x, 24) && near(m.rect.y, 32) && near(m.rect.h, 48) && m.opacity === "1", "fixed at (24,32), 48 tall, visible", { position: m.position, x: m.rect.x, y: m.rect.y, h: m.rect.h, opacity: m.opacity });
  r.check(near(m.rect.w, 135.7), "width 135.7", m.rect.w);
  r.check(m.radius === "24px" && m.brand && m.onBrand, "r24 bg brand colour on-brand", { radius: m.radius, brand: m.brand, onBrand: m.onBrand });
  const white1 = m.outlineWidth === "1px" && m.outlineOffset === "-1px" && m.outlineRole === "--on-brand";
  const kurogane = m.outlineWidth === "2px" && m.outlineOffset === "3px" && m.outlineRole === "--focus-ring-inverse";
  r.check(white1 || kurogane, "1px inner white outline (or Kurogane's 2px inverse ring, §3.9)", m.outline);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  const active = await ev(page, () => { const a = document.activeElement; return { tag: a.tagName.toLowerCase(), id: a.id, hash: location.hash }; });
  r.check(active.tag === "main" && active.id === "main", "Enter focuses main#main", active);
  await context.close();
};

items.V39 = async (r) => {
  const { page, context } = await open();
  const seen = [];
  const readRing = () => {
    const a = document.activeElement; const cs = getComputedStyle(a);
    const scope = a.closest(".on-highlight, .on-brand");
    const expect = !scope ? "--focus-ring" : scope.classList.contains("on-highlight") ? "--on-highlight" : "--focus-ring-inverse";
    const role = window.__vr.role(cs.outlineColor, [expect, "--focus-ring", "--focus-ring-inverse", "--on-highlight"]);
    return { el: `${a.tagName.toLowerCase()}${a.id ? "#" + a.id : ""} "${(a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 18)}"`, outline: `${cs.outlineWidth} ${cs.outlineStyle}`, offset: cs.outlineOffset, color: role, rawColor: cs.outlineColor, expect, transition: cs.transitionProperty.includes("outline-color") || cs.transitionProperty === "all" ? cs.transitionDuration : null, ok: cs.outlineWidth === "2px" && cs.outlineStyle === "solid" && cs.outlineOffset === "3px" && role === expect, h: window.__vr.rect(a).h };
  };
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(60);
    const now = await ev(page, readRing); // the ring must be right at once, not after a colour tween
    await page.waitForTimeout(400);
    const later = await ev(page, readRing);
    seen.push({ ...now, laterColor: later.color, okLater: later.ok });
  }
  const bad = seen.filter((s) => !s.ok);
  r.set("focusables", seen.map((s) => `${s.el} ${s.outline} ${s.offset} ${s.color ?? s.rawColor}${s.ok ? "" : " (expected " + s.expect + (s.okLater ? ", right after " + s.transition + " tween" : "") + ")"}`));
  r.check(bad.length === 0, "2px solid --focus-ring offset 3 (inverse inside .on-brand) on the first 8 focusables, at once", bad.map((s) => s.el));
  if (bad.length && bad.every((s) => s.okLater && s.transition)) r.note(`the ring colour is right after ${bad[0].transition}: these links carry Tailwind's transition-colors, which tweens outline-color, so the ring fades in instead of appearing at once.`);
  const wm = await ev(page, () => window.__vr.rect(document.querySelector('header a[href$="/ja/"], header a[aria-label]')).h);
  r.check(wm >= 14, "wordmark link height ≥14", wm);
  await context.close();
};

items.V40 = async (r) => {
  const { page, context } = await open({ reduce: true });
  const m = await ev(page, () => {
    const heads = [...document.querySelectorAll("h1, h2, h3")];
    const bad = [];
    // Excluded by design: the pill's aria-hidden second copy (parked below the clip) and the titles of collapsed accordion rows (hidden with their panel on robot.com too).
    const skip = (el) => el.closest('[aria-hidden="true"], .mkt__row:not(.is-active)');
    for (const h of heads) for (const el of [h, ...h.querySelectorAll("*")]) { if (skip(el)) continue; const cs = getComputedStyle(el); if (cs.opacity !== "1" || cs.transform !== "none") bad.push({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 30), opacity: cs.opacity, transform: cs.transform }); }
    const words = [...document.querySelectorAll(".word")].map((w) => +getComputedStyle(w).opacity);
    return { headings: heads.length, bad: bad.slice(0, 5), badCount: bad.length, words: words.length, wordsLit: words.every((v) => v === 1), lenis: document.documentElement.classList.contains("smooth-scroll"), reveal: document.querySelectorAll(".reveal-line__inner").length };
  });
  r.check(m.headings > 0 && m.badCount === 0, "headings opacity 1 transform none without scrolling", { headings: m.headings, offending: m.bad });
  r.check(m.wordsLit, "scrub words at 1", { words: m.words });
  r.check(!m.lenis, "Lenis off under reduce", m.lenis);
  // Interact (hover a pill, open the accordion, sweep) and collect every transition longer than 1ms.
  const long = new Map();
  const collect = async () => { const list = await ev(page, () => window.__vr.transitions((t) => t.duration > 1)); for (const t of list) long.set(`${t.tag}.${t.cls}|${t.prop}`, t); };
  const pill = await ev(page, () => window.__vr.rect(document.querySelector("#hero a.pill")));
  await page.mouse.move(pill.x + 10, pill.y + 10);
  for (let i = 0; i < 6; i++) { await collect(); await sleep(30); }
  const H = await ev(page, () => document.documentElement.scrollHeight - innerHeight);
  for (let y = 0; y <= H; y += 600) { await ev(page, (y) => window.scrollTo(0, y), y); for (let i = 0; i < 4; i++) { await collect(); await sleep(50); } }
  await ev(page, () => window.__vr.scrollToDocTop(window.__vr.band("markets"), 100));
  await page.waitForTimeout(200);
  const row2 = await ev(page, () => window.__vr.rect(window.__vr.qa(".mkt__row")[1]));
  await page.mouse.click(row2.x + row2.w / 2, row2.y + row2.h / 2);
  for (let i = 0; i < 8; i++) { await collect(); await sleep(40); }
  r.check(long.size === 0, "no CSSTransition/CSSAnimation longer than 1ms", [...long.values()].map((t) => `${t.tag}.${t.cls.split(" ")[0]} ${t.prop} ${t.duration}ms`));
  await scrollTo(page, 0, 300);
  await page.mouse.move(720, 450);
  const sampler = startSampler(page, "() => scrollY", 400);
  await page.mouse.wheel(0, 500);
  const { samples } = await sampler;
  const iFirst = samples.findIndex((s) => s.v > 0.5), iDone = samples.findIndex((s) => Math.abs(s.v - 500) <= 0.5);
  r.check(iFirst >= 0 && iDone >= 0 && iDone - iFirst <= 2, "500px wheel jumps in ≤2 frames", { firstFrame: iFirst, doneFrame: iDone, final: samples[samples.length - 1].v });
  await context.close();
};

/* ------------------------------------------------------------------ band-top diagnostic (not a checklist item) */
/** robot.com section tops at 1440x900, derived from the §2 band table (announcement 5 + 38.83, then each band's height + 4px seam). */
const ROBOT_TOPS = { hero: 44.83, "trusted-by": 938.83, statement: 1315.36, products: 1816.92, stats: 3135.92, rows: 3494.55, markets: 4211.55, interlude: 4854.35, closing: 5758.35, careers: 5958.62, footer: 6762.62 };
async function layoutDiagnostic() {
  const { page, context } = await open();
  const tops = await ev(page, () => { const b = window.__vr.bands(); const o = {}; for (const [n, el] of Object.entries(b)) o[n] = el ? { top: window.__vr.rect(el).top, h: window.__vr.rect(el).h } : null; o.docHeight = document.documentElement.scrollHeight; return o; });
  await context.close();
  const rows = Object.entries(ROBOT_TOPS).map(([n, robot]) => ({ band: n, top: tops[n] && r2(tops[n].top), height: tops[n] && r2(tops[n].h), robotTop: robot, drift: tops[n] && r2(tops[n].top - robot) }));
  return { rows, docHeight: tops.docHeight, robotDocHeight: 7673.77 };
}

/* ------------------------------------------------------------------ run */
async function main() {
  browser = await chromium.launch({ headless: !HEADED, args: ["--disable-smooth-scrolling", "--autoplay-policy=no-user-gesture-required"] });
  const results = [];
  const todo = checklist.filter((c) => !ONLY.length || ONLY.includes(c.id));
  for (const item of todo) {
    const r = new Result(item);
    r.file = FILES[item.id];
    const fn = items[item.id];
    process.stdout.write(`${item.id} ${item.assertion} … `);
    const t = Date.now();
    pageErrors.clear();
    if (!fn) r.skip("no measurement implemented");
    else {
      try {
        await fn(r);
      } catch (e) {
        r.fails.push(`error: ${e.message.split("\n")[0]}`);
      }
    }
    for (const e of pageErrors) r.note(`page error: ${e}`);
    r.finish();
    r.ms = Date.now() - t;
    console.log(`${r.status.toUpperCase()} (${r.ms}ms)${r.fails.length ? "\n    - " + r.fails.join("\n    - ") : ""}`);
    results.push(r);
  }
  let layout = null;
  if (!ONLY.length || ONLY.includes("layout")) {
    try {
      layout = await layoutDiagnostic();
    } catch (e) {
      layout = { error: e.message };
    }
  }
  await browser.close();

  const counts = { passed: results.filter((r) => r.status === "pass").length, failed: results.filter((r) => r.status === "fail").length, skipped: results.filter((r) => r.status === "skip").length };
  console.log("\n| ID  | Status | Assertion | Fails |\n|-----|--------|-----------|-------|");
  for (const r of results) console.log(`| ${r.id} | ${r.status} | ${r.assertion} | ${r.fails.map((f) => f.split(":")[0]).join("; ").slice(0, 110)} |`);
  if (layout && layout.rows) {
    console.log("\nBand tops at 1440x900 vs robot.com (§2), px:\n| band | top | height | robot top | drift |\n|------|-----|--------|-----------|-------|");
    for (const l of layout.rows) console.log(`| ${l.band} | ${l.top} | ${l.height} | ${l.robotTop} | ${l.drift} |`);
    console.log(`document height ${layout.docHeight} (robot.com ${layout.robotDocHeight})`);
  }
  console.log(`\n${counts.passed} passed, ${counts.failed} failed, ${counts.skipped} skipped — ${OUT}`);
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ url: URL_, at: new Date().toISOString(), tolerances: { geometryPx: GEO, timing: TIME }, ...counts, items: results, layout }, null, 2));
  process.exitCode = counts.failed ? 1 : 0;
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

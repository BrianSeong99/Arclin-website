// Renders public/og-{ja,zh}.png (1200x630) from the site copy. Run after changing meta text:
//   node scripts/og.mjs
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const copy = {
  ja: { line1: "ロボットを、", line2: "日本の介護の力へ。", sub: "ロボティクス企業と日本の介護現場をつなぐ、ローカライズ・導入パートナー", font: "Zen Maru Gothic" },
  zh: { line1: "让机器人，", line2: "成为日本介护的力量。", sub: "连接机器人企业与日本介护现场的本地化・落地伙伴", font: "Resource Han Rounded SC", local: "ResourceHanRoundedSC-Medium" },
};

// Kurogane: surface-page, ink, surface-brand slab, the three-leaf mark; Coustard Black wordmark. The mark is the same
// SVG as components/site/mark.tsx; the Chinese face is the vendored Resource Han Rounded SC subset.
const coustard = readFileSync("public/fonts/Coustard-Black.woff2").toString("base64");
const localFace = (c) => (c.local ? `@font-face{font-family:"${c.font}";src:url(data:font/woff2;base64,${readFileSync(`public/fonts/${c.local}.woff2`).toString("base64")}) format("woff2")}` : "");
const MARK = `<svg viewBox="26 32 568 568" width="108" height="108"><mask id="am-gold"><rect width="620" height="632" fill="#fff"/><ellipse cx="207.8" cy="375.0" rx="162" ry="177" transform="rotate(240 207.8 375.0)" fill="#000"/></mask><linearGradient id="ag-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbeab8"/><stop offset=".5" stop-color="#e3c06a"/><stop offset="1" stop-color="#bd9440"/></linearGradient><mask id="am-sage"><rect width="620" height="632" fill="#fff"/><ellipse cx="412.2" cy="375.0" rx="162" ry="177" transform="rotate(120 412.2 375.0)" fill="#000"/></mask><linearGradient id="ag-sage" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#adc9b0"/><stop offset=".5" stop-color="#7fa085"/><stop offset="1" stop-color="#54755f"/></linearGradient><mask id="am-dark"><rect width="620" height="632" fill="#fff"/><ellipse cx="310.0" cy="198.0" rx="162" ry="177" transform="rotate(0 310.0 198.0)" fill="#000"/></mask><linearGradient id="ag-dark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#276b52"/><stop offset=".5" stop-color="#0d3a2f"/><stop offset="1" stop-color="#05221a"/></linearGradient><radialGradient id="ah" cx=".32" cy=".26" r=".62"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="as" cx=".78" cy=".82" r=".75"><stop offset="0" stop-color="#000" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient><g mask="url(#am-gold)"><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="url(#ag-gold)"/><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="url(#ah)"/><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="url(#as)"/></g><g mask="url(#am-sage)"><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="url(#ag-sage)"/><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="url(#ah)"/><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="url(#as)"/></g><g mask="url(#am-dark)"><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="url(#ag-dark)"/><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="url(#ah)"/><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="url(#as)"/></g></svg>`;
const html = (c) => `<!doctype html><html><head>
${c.local ? "" : `<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(c.font)}:wght@500&display=swap" rel="stylesheet">`}
<style>
  @font-face{font-family:"Coustard";src:url(data:font/woff2;base64,${coustard}) format("woff2");font-weight:900}
  ${localFace(c)}
  body{margin:0;width:1200px;height:630px;background:#fbf7ef;color:#102e24;font-family:"${c.font}",sans-serif;position:relative;overflow:hidden}
  .slab{position:absolute;right:0;top:0;bottom:0;width:220px;background:#102e24}
  .mark{position:absolute;right:56px;top:56px;width:108px;height:108px}
  .wrap{position:absolute;inset:0;padding:72px 84px;width:820px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:baseline;gap:14px}
  .brand b{font-family:"Coustard",serif;font-weight:900;font-size:44px;letter-spacing:-.015em}
  .brand span{font-size:20px;letter-spacing:.16em;color:#5e6f68}
  h1{font-size:72px;line-height:1.2;margin:0;font-weight:500}
  .sub{font-size:24px;line-height:1.6;color:#47594f;margin-top:20px}
  .foot{font-size:16px;letter-spacing:.22em;color:#5e6f68;text-transform:uppercase}
</style></head><body><div class="slab"></div><div class="mark">${MARK}</div>
<div class="wrap"><div class="brand"><b>Arclin</b><span>智渡仁</span></div>
<div><h1>${c.line1}<br>${c.line2}</h1><div class="sub">${c.sub}</div></div>
<div class="foot">Arclin K.K. · 株式会社智渡仁</div></div></body></html>`;

const browser = await chromium.launch();
for (const [loc, c] of Object.entries(copy)) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  writeFileSync(`public/og-${loc}.png`, await page.screenshot());
  console.log(`public/og-${loc}.png`);
  await page.close();
}
await browser.close();

// Renders public/og-{ja,zh}.png (1200x630) from the site copy. Run after changing meta text:
//   node scripts/og.mjs
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const copy = {
  ja: { line1: "中国のロボットを、", line2: "日本の介護現場へ。", sub: "介護ロボットの日本ローカライズパートナー", font: "Zen Kaku Gothic New" },
  zh: { line1: "把中国的机器人，", line2: "带进日本的介护现场。", sub: "介护机器人日本本地化落地伙伴", font: "Noto Sans SC" },
};

const html = (c) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(c.font)}:wght@500&family=Instrument+Serif:ital@1&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
<style>
  body{margin:0;width:1200px;height:630px;background:#efece2;color:#171b1a;font-family:"${c.font}",sans-serif;position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(23,27,26,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(23,27,26,.06) 1px,transparent 1px);background-size:40px 40px}
  .wrap{position:absolute;inset:0;padding:72px 84px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:baseline;gap:14px}
  .brand b{font-family:"Instrument Serif",serif;font-style:italic;font-weight:400;font-size:44px}
  .brand span{font-size:22px;letter-spacing:.2em;color:#6d726d}
  h1{font-size:76px;line-height:1.15;margin:0;font-weight:500;letter-spacing:-.01em}
  .sub{font-size:26px;color:#3d423f;margin-top:22px}
  .foot{font-family:"IBM Plex Mono",monospace;font-size:18px;letter-spacing:.2em;color:#1e4d46}
  .bar{position:absolute;right:0;top:0;bottom:0;width:18px;background:#1e4d46}
</style></head><body><div class="grid"></div><div class="bar"></div>
<div class="wrap"><div class="brand"><b>Arclin</b><span>智渡仁</span></div>
<div><h1>${c.line1}<br>${c.line2}</h1><div class="sub">${c.sub}</div></div>
<div class="foot">ARCLIN K.K. · 株式会社智渡仁</div></div></body></html>`;

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

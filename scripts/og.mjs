// Renders public/og-{ja,zh}.png (1200x630) from the site copy. Run after changing meta text:
//   node scripts/og.mjs
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const copy = {
  ja: { line1: "ロボットを、", line2: "日本の介護の力へ。", sub: "ロボティクス企業と日本の介護現場をつなぐ、ローカライズ・導入パートナー", font: "Zen Maru Gothic" },
  zh: { line1: "让机器人，", line2: "成为日本介护的力量。", sub: "连接机器人企业与日本介护现场的本地化・落地伙伴", font: "Noto Sans SC" },
};

// Kurogane: surface-page, ink, surface-brand slab, one Soga mark; Italiana wordmark.
const italiana = readFileSync("public/fonts/Italiana-Regular.woff2").toString("base64");
const html = (c) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(c.font)}:wght@500&display=swap" rel="stylesheet">
<style>
  @font-face{font-family:"Italiana";src:url(data:font/woff2;base64,${italiana}) format("woff2")}
  body{margin:0;width:1200px;height:630px;background:#fbf7ef;color:#102e24;font-family:"${c.font}",sans-serif;position:relative;overflow:hidden}
  .slab{position:absolute;right:0;top:0;bottom:0;width:220px;background:#102e24}
  .mark{position:absolute;right:56px;top:56px;width:108px;height:108px;border-radius:24px;background:#f7ed92}
  .wrap{position:absolute;inset:0;padding:72px 84px;width:820px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:baseline;gap:14px}
  .brand b{font-family:"Italiana",serif;font-weight:400;font-size:48px;letter-spacing:.01em}
  .brand span{font-size:20px;letter-spacing:.16em;color:#5e6f68}
  h1{font-size:72px;line-height:1.2;margin:0;font-weight:500}
  .sub{font-size:24px;line-height:1.6;color:#47594f;margin-top:20px}
  .foot{font-size:16px;letter-spacing:.22em;color:#5e6f68;text-transform:uppercase}
</style></head><body><div class="slab"></div><div class="mark"></div>
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

import { chromium } from "playwright";
const out = process.argv[2];
const browser = await chromium.launch();
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  for (const loc of ["ja", "zh"]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(`http://localhost:4173/${loc}/`, { waitUntil: "networkidle" });
    // scroll through to trigger in-view animations
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += h * 0.7) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(250); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${out}/${loc}-${name}.png`, fullPage: true });
    console.log(loc, name, "height", total, errors.length ? "ERRORS: " + errors.join(" | ") : "no console errors");
    await page.close();
  }
}
await browser.close();

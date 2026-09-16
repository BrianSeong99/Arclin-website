import { chromium } from "playwright";
const [out, loc = "ja", width = "1440"] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
await page.goto(`http://localhost:4173/${loc}/`, { waitUntil: "networkidle" });
for (const id of ["top", "about", "walls", "bridge", "mimamori", "careos", "value", "method", "trust", "partner", "company", "contact"]) {
  const el = page.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  await el.screenshot({ path: `${out}/${loc}-${width}-${id}.png` });
}
await browser.close();

import { chromium } from "playwright";
const [out, loc = "ja", width = "1440"] = process.argv.slice(2);
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: Number(width), height: 900 } });
await p.goto(`http://localhost:4173/${loc}/`, { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
for (const id of ["top", "about", "walls", "mimamori", "careos", "value", "method", "trust", "company"]) {
  const el = p.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded();
  // scroll through the section slowly so scroll-driven pieces settle
  const box = await el.boundingBox();
  if (box) for (let y = 0; y < box.height; y += 400) { await p.mouse.wheel(0, 400); await p.waitForTimeout(120); }
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1800);
  await el.screenshot({ path: `${out}/${loc}-${width}-${id}.png` });
}
await p.locator("footer").screenshot({ path: `${out}/${loc}-${width}-footer.png` });
await b.close();

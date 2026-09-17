import { chromium } from "playwright";
const out = process.argv[2];
const b = await chromium.launch();
async function run(name, vp, mobile) {
  const p = await b.newPage({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const errs = []; p.on("pageerror", e => errs.push(String(e))); p.on("console", m => m.type() === "error" && errs.push(m.text()));
  await p.goto("http://localhost:4173/ja/", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  const total = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
  for (const id of ["top", "about", "walls", "bridge", "mimamori", "careos", "value", "method", "trust", "contact"]) {
    const el = p.locator(`#${id}`); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
    await el.screenshot({ path: `${out}/${name}-${id}.png` });
  }
  console.log(name, "height", total, errs.length ? "ERRORS: " + errs.slice(0, 3).join(" | ") : "no errors");
  await p.close();
}
await run("d", { width: 1440, height: 900 }, false);
await run("m", { width: 390, height: 844 }, true);
await b.close();

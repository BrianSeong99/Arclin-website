// Builds the component library into dist/ for /design-sync:
//   dist/index.js   ESM bundle (react + react-dom external)
//   dist/index.css  compiled Tailwind v4 stylesheet + font faces
//   dist/types/     .d.ts tree (tsc, declaration only)
import { build } from "esbuild";
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

await build({
  entryPoints: ["lib/ds/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  external: ["react", "react-dom", "react/jsx-runtime"],
  tsconfig: "tsconfig.json",
  sourcemap: false,
  logLevel: "info",
});

execSync("pnpm exec tailwindcss -i app/globals.css -o dist/tailwind.css --minify", { stdio: "inherit" });
writeFileSync("dist/index.css", readFileSync("lib/ds/fonts.css", "utf8") + "\n" + readFileSync("dist/tailwind.css", "utf8"));
rmSync("dist/tailwind.css");

execSync("pnpm exec tsc -p tsconfig.dist.json", { stdio: "inherit" });
console.log("dist/ built");

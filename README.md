# Arclin K.K. (株式会社智渡仁) — corporate website

Single-page, bilingual (JA / ZH) marketing site for Arclin K.K., the Japan localisation partner
for Chinese care-robotics companies. Static export, no backend.

## Stack

- Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript
- Tailwind CSS v4; tokens in `app/globals.css` come from the **Kurogane** design system
  (claude.ai/artifact/LPV5WVcV8esMeHutAnp4XP): Kurogane green, Soga yellow, Italiana + Chillax,
  Zen Maru Gothic (JA) / Noto Sans SC (ZH). Fonts vendored in `public/fonts/`.
- Page rhythm after robot.com: floating nav pill, brand/highlight slabs, stats bento, numbered accordion
- `motion` for in-view animation (240–320ms, all honour `prefers-reduced-motion`)
- All visuals are SVG line drawings at one stroke weight; no WebGL
- Storybook 10 (`@storybook/nextjs-vite`) for every component and section
- pnpm

## Commands

```bash
pnpm install
pnpm dev              # http://localhost:3000 → redirects to /ja/ or /zh/
pnpm build            # static export to ./out
pnpm lint
pnpm storybook        # http://localhost:6006
pnpm build-storybook  # ./storybook-static
node scripts/og.mjs   # regenerate public/og-{ja,zh}.png after changing hero copy
```

## Layout

```
app/
  (redirect)/page.tsx   root: remembers / detects locale, redirects to /ja/ or /zh/
  [locale]/             /ja/ and /zh/ — per-locale <html lang>, metadata, OG
  sitemap.ts robots.ts icon.svg
lib/i18n/
  messages/ja.ts        all Japanese copy (source of truth for the shape)
  messages/zh.ts        all Chinese copy (typed against ja)
  context.tsx           LocaleProvider / useLocale()
components/
  ui/        button, badge, demo-tag, footnote
  site/      announce, nav, footer, wordmark, section chrome, reveal
  viz/       count-up, trend-line, donut-gauge, iso-stack, dot-eyes, illustrations
  sections/  hero, statement, products, stats, process, cta, partners (in page order)
scripts/     og.mjs (OG images), shot*.mjs (Playwright screenshot helpers)
```

## Editing copy

All visible text lives in `lib/i18n/messages/{ja,zh}.ts`. Values marked `確認中` / `确认中`
(company registration, address, email domain, certification status) are placeholders awaiting
confirmation. Statistic footnotes (`source`) must be finalised before launch.

## Content rules (from the brief)

- Every simulated dashboard / timeline / KPI carries the 「演示データ／概念図」 tag — keep it.
- No fundraising amounts, financial models, equity, pricing ranges, competitor matrices, or
  internal milestone terminology.
- Wording: the robot provides *balance support at the moment of standing* (fall prevention);
  it does not lift, carry or transfer. Voice = pattern alert reviewed by staff, never a diagnosis.

## Deploy

Every push to `main` deploys a preview to GitHub Pages at
https://brianseong99.github.io/Arclin-website/ (`.github/workflows/pages.yml`, built with
`BASE_PATH=/Arclin-website`).

Static output in `out/`. Vercel: framework preset Next.js, build `pnpm build`. Domain TBD
(`arclin.ai` / `arclin.jp`); `SITE` in `app/[locale]/layout.tsx`, `sitemap.ts` and `robots.ts`
must be updated once the domain is confirmed.

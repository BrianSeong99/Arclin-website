# Arclin K.K. (株式会社智渡仁) — corporate website

Single-page, bilingual (JA / ZH) marketing site for Arclin K.K., the Japan localisation partner
for Chinese care-robotics companies. Static export, no backend.

## Stack

- Next.js 16 (App Router, `output: "export"`) · React 19 · TypeScript
- Tailwind CSS v4; tokens in `app/globals.css` come from the **Kurogane** design system
  (claude.ai/artifact/LPV5WVcV8esMeHutAnp4XP): Kurogane green, Soga yellow, Coustard Black + Chillax,
  Zen Maru Gothic (JA) / Resource Han Rounded SC (ZH, subset with `scripts/subset-zh-font.py`). Fonts vendored in `public/fonts/`.
- Page rhythm after robot.com: floating nav pill, brand/highlight slabs, stats bento, numbered accordion
- `motion` for in-view animation (240–320ms, all honour `prefers-reduced-motion`)
- All visuals are SVG line drawings at one stroke weight; no WebGL
- Storybook 10 (`@storybook/nextjs-vite`) for every component and section
- pnpm

## Commands

```bash
pnpm install
pnpm dev              # http://localhost:3000 → redirects to /ja/, /en/ or /zh/
pnpm dev:media        # same, with the gitignored placeholder video clips
pnpm build            # static export to ./out
pnpm lint
pnpm storybook        # http://localhost:6006
pnpm build-storybook  # ./storybook-static
node scripts/og.mjs   # regenerate public/og-{ja,zh}.png after changing hero copy
```

## Layout

```
app/
  (redirect)/page.tsx   root: remembers / detects locale, redirects to /ja/, /en/ or /zh/
  [locale]/             /ja/, /en/ and /zh/ — per-locale <html lang>, metadata, OG; layout wraps the page in <SmoothScroll>
  [locale]/page.tsx     homepage: AnnounceBar, Nav, then the components/home bands in robot.com order, Footer
  sitemap.ts robots.ts icon.svg
lib/i18n/
  messages/ja.ts        all Japanese copy (source of truth for the shape); home.* holds the v3 bands
  messages/en.ts zh.ts  English and Chinese copy (typed against ja)
  context.tsx           LocaleProvider / useLocale()
lib/dev-media.ts        placeholder video/poster slots per band (gitignored under public/dev-media/)
components/
  ui/        button, badge, demo-tag, footnote
  site/      nav, footer, wordmark, copy ([GAP] markers), video-frame, section chrome, reveal
  home/      the homepage bands, one file each, in page order: announce-bar, hero, trusted-by, statement,
             product-band, stats-bento, audience-rows, markets-accordion, interlude, closing-cta, careers-slab;
             plus the shared pieces: band (slab + 24-col grid), band-theme (header theme per band),
             smooth-scroll (Lenis), pill (roll-over label), reveal-heading (line reveal)
  viz/       count-up, trend-line, donut-gauge, iso-stack, dot-eyes, illustrations
scripts/     og.mjs (OG images), shot*.mjs (Playwright screenshot helpers)
docs/superpowers/specs/2026-09-23-robot-com-reference.md   the homepage reference spec (band table, components,
             type map, motion table, verification checklist); robot-com-reference.json is the machine-readable copy
```

The homepage is built to match robot.com band for band (order, dimensions, grid, radii, motion), with Kurogane
tokens and Arclin copy substituted. Every band is a `<Band>` (5px page gutter, 4px seam, `--radius-xl` slab) laid
out on the shared 24-column grid; copy strings render through `<Copy>` so `[GAP: …]` placeholders stay visible.

### Dev media

Video slots render a labelled pending frame by default. `pnpm dev:media` (or the `dev-media` launch configuration)
sets `NEXT_PUBLIC_DEV_MEDIA=1`, and `<VideoFrame>` then plays the gitignored placeholder clips from
`lib/dev-media.ts`. Production builds never include them.

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

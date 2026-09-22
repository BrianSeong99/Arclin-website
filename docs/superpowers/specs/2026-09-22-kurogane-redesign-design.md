# Kurogane redesign — design spec

Replace the "paper × control room" visual system with the **Kurogane** design system
(claude.ai/artifact/LPV5WVcV8esMeHutAnp4XP) and restructure the page to the rhythm of
robot.com: fewer, bolder beats; full-bleed colour bands; one floating nav pill.

## Decisions (approved 2026-09-22)

- Restructure to ~8 beats. Existing JA/ZH copy is merged and cut, not rewritten.
- Imagery: keep the SVG line illustrations, redrawn in Kurogane ink at one stroke weight.
- Yellow: two full-bleed `highlight` bands (product band, CTA band). Kurogane README amended.
- Display type: Italiana for Latin taglines and product names; Zen Maru Gothic for JA
  headlines (`jp-display-l` 56px, `jp-display-xl` 72px added to the scale).
- ZH: Noto Sans SC as the `zh` family, same sizes and leading as `jp-*`.
- Single PR on `kurogane-redesign`, cut from `main`.

## Page (in order)

| # | Beat | Surface | Copy keys |
|---|---|---|---|
| 0 | Announcement bar, one line | `highlight` | `announce` (new) |
| 1 | Floating nav pill: wordmark, 4 links, locale toggle, CTA pill | `surface-brand` | `nav` (4), `navContact` |
| 2 | Hero: Italiana tagline, JA headline, two pill CTAs, `HeroIllustration` | `surface-page` | `hero*` |
| 3 | Statement slab: two-tone sentence | `surface-brand` | `statementA/B` (from `bridgeNote`) |
| 4 | Product band: Mimamori / CareOS columns, dot-grid pattern | `highlight` | `products[]` |
| 5 | Stats bento 3×2: stat cards, `TrendLine`, quote, KPI gauges | page + `surface-raised` | `stats`, `kpis`, `quote` |
| 6 | Numbered accordion 1–4: process steps, each with its walls | page | `steps[]` (walls merged in) |
| 7 | CTA band | `highlight` | `contact*` |
| 8 | Partner slab: two cards + trust line | `surface-brand` | `partners`, `trustNote` |
| 9 | Footer: wordmark, two nav columns, company rows, privacy, disclaimer, dot-matrix eyes | `surface-brand` | `footer*`, `company` |

Privacy page: reskinned, same structure.

## Tokens

`app/globals.css` `:root` = Kurogane Paper theme (19 colours, 8 spacing, 4 radii, 2 shadows)
plus `--dur-enter: 240ms` and `--ease-enter`. Night theme values live under
`[data-theme="night"]` (no toggle yet). `@theme inline` exposes them as Tailwind utilities.
Type styles from `tokens.json` become `.t-<style>` classes. No `text-[…px]`, no
`tracking-[…]`, no hard-coded easing curves in components.

Fonts: `next/font/local` Chillax ×4 + Italiana from `public/fonts/`; Google Zen Maru Gothic
and Noto Sans SC. Variables `--font-display`, `--font-ui`, `--font-jp`, `--font-zh`.

## Components

- `ui/`: `Button` (`brand` | `outline` | `ghost` | `on-brand` | `on-highlight`, pill), `Badge`
  (`neutral` | `highlight` | `on-brand`), `DemoTag`, `Footnote` (tone `page` | `brand`).
- `site/`: `Announce`, `Nav` (floating pill), `Footer`, `Wordmark`, `Section` (tone
  `page` | `brand` | `highlight` | `raised`), `Reveal`, `DotGrid`.
- `viz/`: `HeroIllustration`, `SceneIllustration`, `IsoStack`, `TrendLine`, `DonutGauge`,
  `CountUp`, `DotEyes` — all in ink/brand/highlight-edge, one stroke weight.
- `sections/`: `Hero`, `Statement`, `Products`, `Stats`, `Process`, `Cta`, `Partners`.
- Removed: `WhyJapan`, `Walls`, `Bridge`, `Mimamori`, `CareOS`, `Value`, `Method`, `Trust`,
  `Partner`, `Company`, `Contact`, `FloorPlan`, `LayerStack`, `RingTimeline`, `FlowSteps`,
  `SplitFlap`, `ScrollPath`, `Crosshairs`, `TrustIcons`.

## Motion

Enter/leave 240ms, one ease. No springs, no bounce, no auto-advance. `prefers-reduced-motion`
renders static. Accordion: height transition 240ms.

## Content rules (unchanged)

Every simulated panel carries `DemoTag`; every statistic carries `Footnote`. Balance support
at the moment of standing, never lift/carry/transfer. Voice = pattern alert, never diagnosis.
No funding, pricing or competitor content.

## Testing

`pnpm lint`, `pnpm build` (static export), Storybook builds, screenshot pass at 1440 and 375
for `/ja/` and `/zh/`. Contrast: all text pairs on their stated grounds ≥ 4.5:1.

## Kurogane write-back

After the site ships: add `jp-display-l`, `jp-display-xl`, `zh` family, amend the README
yellow rule, and publish component READMEs + previews for the primitives so
claude.ai/design can compose with them. `.design-sync` retargets to the Kurogane artifact.

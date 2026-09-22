# Arclin (智渡仁) site components — how to build with them

Bilingual (JA primary / ZH) marketing components for Arclin K.K., a Japan localisation partner for
care robotics. Visual system: **Kurogane** (claude.ai/artifact/LPV5WVcV8esMeHutAnp4XP) — read its
README first; this file only says how the site consumes it. Page rhythm follows robot.com: a few
full-bleed colour slabs, one floating nav pill, big type. Precompiled Tailwind v4 + CSS variables;
React 19.

## 1. Wrap everything in `LocaleProvider`
Every component that shows copy reads text through `useLocale()` and **throws "useLocale must be
used inside LocaleProvider"** without it. Wrap the app root once:

```tsx
<LocaleProvider locale="ja">   {/* "ja" | "zh" */}
  <Announce />
  <Nav />
  <main id="main"><Hero /><Statement /><Products /><Stats /><Process /><Cta /><Partners /></main>
  <Footer />
</LocaleProvider>
```

Copy is not passed as props — it comes from the bundled `ja` / `zh` message objects
(`useLocale().t`). To change wording, edit those objects; to switch language, change `locale`.

## 2. Styling idiom
Tokens are Kurogane's, on `:root` (Paper theme; Night under `[data-theme="night"]`):
`--surface-page --surface-raised --surface-sunken --surface-brand --hairline --border-strong
--ink --ink-muted --ink-subtle --on-brand --on-brand-muted --highlight --highlight-edge
--on-highlight --focus-ring --focus-ring-inverse --success --attention --danger`,
`--space-1…16`, `--radius-sm/md/lg/pill`, `--shadow-soft/lift`, `--dur-enter --ease-enter`.

Tailwind names: `bg-page bg-raised bg-sunken bg-brand bg-highlight`, `text-ink text-ink-muted
text-ink-subtle text-on-brand text-on-brand-muted text-on-highlight text-highlight-edge`,
`border-hairline border-border-strong`, `rounded-sm rounded-md rounded-lg rounded-pill`,
`shadow-soft shadow-lift`.

Type styles are classes generated from Kurogane `tokens.json`: `t-display-xl t-display-l
t-display-m` (Italiana, Latin only), `t-title-l t-title-m t-title-s t-body-l t-body t-body-s
t-label t-overline t-caption t-numeral` (Chillax), `t-jp-display-xl t-jp-display-l t-jp-display
t-jp-body-l t-jp-body` (Zen Maru Gothic / Noto Sans SC via `--font-body`), `t-statement`
(Chillax, the brand-slab sentence). Never write `text-[Npx]` or `tracking-[…]`.

Fonts: `--font-display` Italiana · `--font-ui` Chillax · `--font-jp` Zen Maru Gothic ·
`--font-zh` Noto Sans SC. `html[lang]` picks `--font-body`; `--font-sans` is Chillax first so Latin
glyphs are Chillax and CJK glyphs fall through.

Bands: `Section tone="page" | "brand" | "highlight" | "sunken"`. Brand and highlight bands are inset
slabs (`mx-2 rounded-lg`). A `brand` or `highlight` band carries the `on-brand` / `on-highlight`
class so focus rings flip to `--focus-ring-inverse`. At most two highlight bands per page
(products, CTA).

## 3. Content rules baked into the components (keep them)
- Every simulated number/panel carries `<DemoTag />` (演示データ／概念図) and statistics carry a
  `<Footnote text="…source…" />`. Do not remove these when composing.
- Wording: the robot gives balance support at the moment of standing (転倒予防の搀扶); it never
  lifts, carries or transfers. Voice = pattern alert reviewed by staff, never a diagnosis.
- No funding, financial, equity, pricing or competitor content anywhere.

## 4. Where the truth lives
- `app/globals.css` → tokens + type classes; `lib/ds/fonts.css` → font faces for non-Next consumers.
- `lib/i18n/messages/ja.ts` → the shape of all copy (`zh.ts` is typed against it).
- Kurogane artifact → the brand book and token source.

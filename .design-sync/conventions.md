# Arclin (智渡仁) design system — how to build with it

Bilingual (JA primary / ZH) marketing components for Arclin K.K., a Japan localisation partner for
care robotics. Two surfaces: warm **paper** (default page) and dark **console** panels for
dashboard-style content. Everything is precompiled Tailwind v4 + CSS variables; React 19.

## 1. Wrap everything in `LocaleProvider`

Every component that shows copy (all `sections/*`, `Nav`, `Footer`, `DemoTag`, `Footnote`,
`LocaleToggle`) reads text through `useLocale()` and **throws "useLocale must be used inside
LocaleProvider"** without it. Wrap the app root once:

```tsx
<LocaleProvider locale="ja">   {/* "ja" | "zh" */}
  <Nav />
  <main id="main"><Hero /><WhyJapan /> ... <Contact /></main>
  <Footer />
</LocaleProvider>
```

Copy is not passed as props — it comes from the bundled `ja` / `zh` message objects
(`useLocale().t`). To change wording, edit those objects; to switch language, change `locale`.

## 2. Styling idiom: tokens via `var(--*)`, plus the compiled utility classes below

The stylesheet is **precompiled** — only utility classes already used by the components exist.
Anything else must be inline `style={{ ... }}` using the tokens. Never invent class names.

Tokens (all on `:root`):

| Family | Names |
|---|---|
| Paper surfaces | `--paper` (page), `--paper-2` (alternate band), `--paper-3` (tracks/borders) |
| Ink text | `--ink`, `--ink-2` (body), `--ink-3` (muted / mono labels) |
| Accent | `--pine`, `--pine-2` (hover), `--pine-3`; `--ember` (demo-data tags, IP boundary) |
| Console (dark panels) | `--console`, `--console-2`, `--console-3`, `--console-line`, `--console-text`, `--console-muted`, `--signal` (teal), `--signal-2` (amber cursor) |
| Lines | `--line` (hairline), `--line-strong` |
| Type | `--font-body` (JA/ZH sans), `--font-mono` (IBM Plex Mono: numbers, labels, section numerals), `--font-display` (Instrument Serif italic: the "Arclin" wordmark, Latin taglines) |
| Misc | `--radius` (6px), `--ease-out-expo` |

Utility classes that exist in the compiled CSS (use these; nothing else is defined):
`bg-paper bg-paper-2 bg-console bg-console-2 bg-console-3 bg-pine bg-ember bg-signal bg-line`
· `text-ink text-ink-2 text-ink-3 text-pine text-ember text-paper text-console-text text-console-muted text-signal`
· `border-line border-line-strong border-pine border-console-line border-ember border-dashed`
· `font-mono font-display font-medium italic uppercase tracking-tight tracking-wide tracking-wider tracking-widest tabular text-balance text-pretty`
· `text-xs text-sm text-base text-lg text-xl text-3xl text-4xl text-5xl text-6xl leading-tight leading-relaxed`
· layout: `container-x` (max-width 76rem + gutters — wrap every section's content in it), `grid grid-cols-1 grid-cols-2 grid-cols-3 flex flex-col flex-wrap items-center items-start justify-between gap-2 gap-3 gap-4 gap-6 gap-8`, `p-3 p-4 p-5 p-6 p-8 px-3 px-4 px-6 py-2 py-3 py-4 py-10 py-12 py-20 mt-2 mt-4 mt-6 mt-8 mb-4 mb-12 mx-auto`, `rounded-sm rounded-md rounded-lg rounded-full`, `max-w-sm max-w-md max-w-lg max-w-xl max-w-2xl max-w-3xl max-w-prose`, `console-grid` (grid-paper background for console panels), `sr-only hidden relative absolute`
· responsive prefixes only where already compiled: `sm:` `md:` `lg:` `xl:` with the classes above (check `_ds_bundle.css` before relying on one).

Section rhythm: paper section → `paper-2` section → console section (`Mimamori`, the KPI panel in
`Value`). Section numerals ("01"–"11") are `font-mono text-xs tracking-[0.2em] text-pine`; use
`SectionHeading` rather than hand-building them.

## 3. Content rules baked into the components (keep them)

- Every simulated number/panel carries `<DemoTag />` (演示データ／概念図) and statistics carry a
  `<Footnote text="…source…" />`. Do not remove these when composing.
- Wording: the robot gives balance support at the moment of standing (転倒予防の搀扶); it never
  lifts, carries or transfers. Voice = pattern alert reviewed by staff, never a diagnosis.
- No funding, financial, equity, pricing or competitor content anywhere.

## 4. Where the truth lives

- `styles.css` → imports `_ds_bundle.css` (tokens + every compiled utility) — read it before styling.
- `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts` for each component's API.
- `README.md` component index below.

## 5. One idiomatic build snippet (verified render)

```tsx
<LocaleProvider locale="ja">
  <section className="bg-paper-2 py-20">
    <div className="container-x">
      <SectionHeading num="05" title="お客様への価値と受入指標" lead="三者それぞれに、測れる価値を。" />
      <div className="console-grid rounded-lg border border-console-line bg-console p-8 text-console-text">
        <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
          <span className="font-mono text-xs tracking-widest uppercase">受入指標の例</span>
          <DemoTag tone="console" />
        </div>
        <div className="grid grid-cols-3 gap-8">
          <DonutGauge value={42} fraction={0.42} unit="dB" label="夜間動作音" />
          <DonutGauge value={96} fraction={0.96} unit="%" label="起立検知精度" />
          <DonutGauge value={92} fraction={0.92} unit="%" label="稼働可用率" />
        </div>
      </div>
    </div>
  </section>
</LocaleProvider>
```

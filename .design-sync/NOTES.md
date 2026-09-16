# design-sync notes — Arclin website

- This repo is a Next.js **app**, not a published package. `pnpm build:ds` (scripts/build-ds.mjs)
  builds a library entry (`lib/ds/index.ts`) to `dist/index.js` + `dist/index.css` + `dist/types/`
  purely for the sync. The app never imports from `dist/`.
- Fonts come from next/font in the app; `lib/ds/fonts.css` (prepended to `dist/index.css`) provides
  the same CSS variables + a Google Fonts `@import` for Storybook and claude.ai/design.
- Components need `LocaleProvider` (lib/i18n/context) for copy — `.storybook/preview.tsx` wraps
  every story in it with `locale="ja"` (toolbar toggle for zh).
- Component files are kebab-case (`components/ui/button.tsx` -> `Button`); story titles are
  `Group/ExportName`, one stories file per component.
- [GENERAL] `.storybook/preview.tsx` imports `app/globals.css` (`@import "tailwindcss"`), which the
  converter's decorator bundle can't resolve -> `! preview decorator bundle failed` -> every
  `useLocale()` component rendered an empty root. Fix: `cfg.provider = LocaleProvider {locale: "ja"}`
  (a bundle export), which replaces the decorator chain for previews.
- DonutGauge `Console` story is three gauges side by side -> `[GRID_OVERFLOW] wide` ->
  `overrides.DonutGauge.cardMode: "column"`.
- [GENERAL] Component files are kebab-case, so the converter's relative-import rule
  (`exportedComponentFor` matches the file basename case-sensitively against export names) did NOT
  redirect `./footnote` -> `window.Arclin.Footnote`; previews bundled a *source copy* of each
  component, whose `LocaleContext` differed from the bundle's -> "useLocale must be used inside
  LocaleProvider" in every localized component even with `cfg.provider` set. Fix:
  `cfg.storyImports.shim: ["/components/", "/lib/i18n/"]` — any story import resolving under those
  paths re-exports `window.Arclin` (all stories use named imports, so the unnamed shim is enough).
- Section components (Hero … Contact, Footer) are full-width, taller than the default 900x700
  capture viewport (compare clips the preview side to the viewport while the storybook side is an
  element shot) -> `overrides.<Section> = {cardMode: "single", primaryStory: "Default",
  viewport: "1280x1600"}` so both sides capture the whole section at page width. Nav is
  `position: fixed` -> `cardMode: "single"`, viewport 1280x160.

## Re-sync risks

- `dist/` is not committed: run `pnpm build:ds` AND rebuild `.design-sync/sb-reference`
  (`pnpm exec storybook build -c .storybook -o .design-sync/sb-reference`) before the driver
  whenever components or copy change — they must move together.
- Fonts are a Google Fonts `@import` in `lib/ds/fonts.css` (`[FONT_REMOTE]` is expected). If the
  brand ever self-hosts fonts, switch to `cfg.extraFonts` and re-grade a text-heavy component.
- `cfg.provider` pins `locale: "ja"`; the zh copy is only verified through the Storybook toolbar,
  never by compare. Adding a locale means re-grading every copy-bearing component.
- `storyImports.shim` re-exports the whole bundle for anything under `/components/` or
  `/lib/i18n/` — a story that *default*-imports a component would get `window.Arclin` instead of
  the component. All current stories use named imports; keep it that way.
- `[RENDER_THIN]`-class warns: none recorded. `[GRID_OVERFLOW]`: DonutGauge (column), Nav (single).
- Section cards capture at 1280x1600; a section taller than that would be clipped on the preview
  side of the compare sheet — raise its `viewport` (≤2000) if one grows.
- Stat sources in `lib/i18n/messages/*.ts` are still marked 「出典の最終確認中」; the numbers in
  WhyJapan will change when the client confirms them (grades re-key automatically via the story
  fingerprint, since stories import `ja`).

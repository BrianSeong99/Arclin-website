# Arclin website — visual redesign (direction A: paper × control room)

Date: 2026-09-17. Status: approved direction, spec for implementation.

## Goal
Raise the site from "correct" to "memorable" without touching content. All copy, sections,
statistics, footnotes, demo-data labels and exclusions from the brief
(`智渡仁_官网开发需求书.docx`) stay exactly as in `lib/i18n/messages/{ja,zh}.ts`.
Only layout, visual treatment, motion and interaction change.

## Non-negotiables
- Palette: original tokens (paper, ink, pine, console) stay the base; small supporting tints may be added where a mechanic needs them, never a new dominant hue. Console dark panels only
  where they exist today (Mimamori, KPI card, Trust). No new hues.
- Every simulated panel keeps `DemoTag`; every statistic keeps its `Footnote`.
- `prefers-reduced-motion`: every mechanic below degrades to a static, complete layout.
- Mobile 4G LCP < 2.5 s: 3D and scroll mechanics load after first paint; static export only.
- JA/ZH routes, nav, SEO, privacy page unchanged.

## Section mechanics (one memorable move per section)
| # | Section | Mechanic | Reference |
|---|---|---|---|
| 0 | Hero | 3D scene becomes a full-bleed stage under the headline (no card). The robot's dashed path exits the scene and becomes a **page-long SVG path** in the left margin, drawn by scroll progress, that passes each section numeral. | Vizcom, Maze |
| 1 | Why Japan | Three oversized display-serif numerals (count-up), sources as inline `Footnote`; trend chart full-width, hairline, projected segment dashed. | Zipline, Legora |
| 2 | Six walls | **Comparison rows**: left "機構が単独で導入すると" (wall body), right "智渡仁の方法" (fix). Rows reveal in stagger; hovered/scrolled row gets pine hairline + ARCLIN tag. Same six items, same text. | Cake, Ploy, MindMarket |
| 3 | Bridge | Three cards joined by the drawn path; center card pine. Minor tightening only. | Maze |
| 4 | Mimamori | **Scroll-pinned**: ring + scene + hour readout sticky on the left for ~3 viewport heights while 日中/夕方/夜間 blocks scroll on the right; active band drives ring/scene. Tabs remain as fallback and on mobile (no pinning < 900 px). Three story cards below unchanged. | Oura, Ada, Samara |
| 5 | CareOS | **Exploded isometric layer stack** (R3F, `flat`, alpha): four rounded slabs stacked; on scroll they separate vertically; the IP boundary is a translucent ember plane between L3 and L2 with a label. Existing `LayerStack` list stays beside it as the accessible/text version. | Mercury, Rox |
| 6 | Value / KPIs | Dark analytics card; gauges as now; the value under each gauge uses a **split-flap counter** (digit columns roll in). | Linear, Railway |
| 7 | Method | Editorial numbered rows (01–04 large serif numerals, title, body) with the section title sticky on the left; on mobile rows stack. `FlowSteps` retired from the page (kept in the library). | Craft Agency, Kalstore |
| 8 | Trust | Dark console 6-cell grid, hairline dividers, one custom line icon per principle (SVG, drawn on reveal). | Dovetail |
| 9 | Partner | As now; add the fit-list checkmarks drawing in. | Claude, Voiceflow |
| 10 | Company | Hairline spec table (`SIGMA`), placeholders muted. | SIGMA |
| 11 | Contact + Footer | Pine band as now. Footer gets an oversized `智渡仁` wordmark (clamp 20–40vw) above the disclaimer. | Mother Design |

Global: section numerals `01–11` in the left margin aligned to the scroll path; grain stays;
motion uses one spring (`0.16,1,0.3,1`), 0.6–0.8 s, stagger 0.06–0.1.

## Components
New: `ScrollPath` (page-level SVG, `useScroll` progress → `pathLength`), `SplitFlap`,
`CareOSStack` (R3F), `PinnedMimamori` (wraps existing `RingTimeline`/`SceneIllustration`),
`ComparisonRows`, `TrustIcon` set. Changed: `Hero`, `WhyJapan`, `Walls`, `Method`, `Trust`,
`Footer`. Untouched: i18n, Nav, viz primitives, privacy page.

## Testing
Build + lint clean; Playwright full-page shots ja/zh × desktop/mobile with no console errors;
reduced-motion shot shows every section complete; Lighthouse mobile LCP < 2.5 s on the Pages
preview. Storybook stories added for each new component; design-sync re-run after.

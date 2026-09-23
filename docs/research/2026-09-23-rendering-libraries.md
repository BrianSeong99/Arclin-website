# Rendering / animation library survey for the Arclin site

Date: 2026-09-23. Read-only investigation; nothing in the repo was modified, no media generated, no credits spent.

## 1. Hard constraints (from the repo and the design-system README)

| Constraint | Source |
|---|---|
| `output: "export"`, `trailingSlash: true`, `images.unoptimized`, optional `basePath` for GitHub Pages | `/Users/bs/Develop/Others/Arclin-website/next.config.ts` |
| next 16.3.5, react 19.2.8, motion ^13.3.0 (13.3.0 installed), tailwindcss ^4, lucide-react; no three/gsap/lenis/rive/lottie today | `/Users/bs/Develop/Others/Arclin-website/package.json`, `node_modules/motion/package.json` |
| Motion tokens: `--dur-enter: 240ms`, `--dur-slow: 320ms`, one ease `cubic-bezier(0.2,0,0,1)`; `html { scroll-behavior: smooth }`; a global `prefers-reduced-motion` rule that forces `animation-duration` and `transition-duration` to 0.001ms | `/Users/bs/Develop/Others/Arclin-website/app/globals.css` lines 48-51, 129-131, 196-201 |
| Brand motion rule: 200-320ms enters/leaves, nothing bounces or springs, nothing auto-advances while someone may be reading. Imagery: botanical line drawings at one stroke weight, no shading, no fills. | `/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/kurogane-out/project/README.md`, "Motion" and "Imagery" sections |
| Static export cannot use rewrites/redirects/headers/route handlers that read the request, so every library must be client-only and self-contained | `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` lines 278-297 |
| `next/dynamic(..., { ssr: false })` is allowed only inside Client Components; that is how any WebGL/wasm library would have to be mounted | `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md` lines 64-72, 94-95 |
| Existing motion usage: `Reveal`/`Stagger`/`StaggerItem` (whileInView, 240/320ms, `useReducedMotion` short-circuits to a plain div), `count-up`, `donut-gauge`, `iso-stack`, `dot-eyes`, `mimamori-scenes` all import from `motion/react` | `components/site/reveal.tsx`, `components/viz/*.tsx`, `lib/motion.ts` |
| Current site has **no `<video>` element and no .mp4/.webm in `public/`** (grep of `app`, `components`, `lib`, `public`). The "page that already has autoplay video" premise describes robot.com and the target design, not the current tree. | grep run 2026-09-23 over `/Users/bs/Develop/Others/Arclin-website/{app,components,lib,public}` |
| three.js + R3F + drei were **already added on 2026-09-17 (commit `86a1635`) and removed the same day (commit `476de48`, "three/R3F removed", replaced by SVG wireframes)** | `git log -S'@react-three/fiber' -- package.json` in the repo |
| Current client JS (last `.next` build present in the tree): four largest chunks are 71 KB, 66 KB, 45 KB, 39 KB gzip, roughly 220 KB gzip total for the largest four | `gzip -c .next/static/chunks/*.js | wc -c` in the repo, 2026-09-23 |

Page bands on the robot.com-shaped Arclin page (from `components/sections/`): `hero`, `partners`, `statement`, `products` (yellow band, Mimamori + CareOS with `SceneIllustration` and `IsoStack`), `stats` (bento), `process` (numbered accordion), `cta`.

## 2. What robot.com actually uses (fetched 2026-09-23)

Source: `https://www.robot.com/` saved to `/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/polish-research/robot-home.html`, and the referenced `/_next/static/chunks/*.js` and `/_next/static/css/*.css` saved under `.../polish-research/robot-chunks/`.

Script srcs on the page:

- `/_next/static/chunks/framework-f75312fc4004b783.js` (React 18.3.1, `version:"18.3.1"` inside), `main-*.js`, `webpack-*.js`, `polyfills-*.js`, `pages/_app-81fa06211e62a52d.js`, `pages/index-*.js`, chunks `380-*.js`, `407-*.js`, `694-*.js`, `_buildManifest.js`, `_ssgManifest.js` -> Next.js **Pages Router** on Vercel (`?dpl=dpl_...` deploy ids), routes `/`, `/[slug]`, `/blog/[slug]`, `/landing-blueprint`.
- `https://cdn-cookieyes.com/client_data/.../script.js`, `//cdn.cookie-script.com/s/....js`, `https://lp.robot.com/rnoid/v1.js` (consent + marketing).
- Stylesheet from `https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css` (icon set).

Animation / 3D libraries identified by string signatures in the chunks:

| Library | Evidence | Present? |
|---|---|---|
| GSAP 3.12.7 core | `version:"3.12.7"` in `407-*.js` and `_app-*.js`; 143 `gsap` hits across chunks | **yes** |
| GSAP ScrollTrigger | `registerPlugin(...ScrollTrigger)` in `380`, `694`, `_app`; options `scrub:!0`, `scrub:1`, `scrub:.5`, `pin:u.current`, `snap:"frame"`, `anticipatePin:0` | **yes** |
| GSAP Observer, ScrollToPlugin, Flip, SplitText 3.13.0 | `registerPlugin(Observer)`, `registerPlugin(ScrollToPlugin)`, `Flip` x4 in `_app`, `w.version="3.13.0"; e.SplitText=v` in `380-*.js` | **yes** |
| GSAP ScrollSmoother | string appears 3x in `_app` but no `ScrollSmoother.create`; Lenis is the smoother in use | referenced only |
| Lenis smooth scroll | `new H({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),direction:"vertical",smooth:!0,smoothTouch:!1,touchMultiplier:2})`, class names `lenis-smooth`, `lenis-scrolling`, `lenis-prevent` | **yes** (desktop only; `smoothTouch:false`) |
| three.js / WebGL | 0 hits for `THREE.`, `WebGLRenderer`; the single `three` hit is the string "three-dot character"; `getContext("2d")` only (3 hits) | **no** |
| Rive | every `rive` hit is inside `getDerivedStateFromProps`/`getDerivedStateFromError`; no `.riv` assets | **no** |
| Lottie / dotLottie | 0 hits | **no** |
| Spline | 0 hits | **no** |
| Webflow | 0 hits; site is Next.js, not Webflow | **no** |
| framer-motion / motion | 0 hits for `framer-motion`, `motion/react` | **no** |
| Canvas 2D image-sequence scrub | `k.current.canvas.getContext("2d")`, frames named `${L}${n.padStart(y,"0")}.webp`, ScrollTrigger `snap:"frame"`, `pin` | **yes** (the "noid" unfolding band, `UnfoldingContent_section`) |
| Video | one `<video preload="none" poster="https://www.datocms-assets.com/166246/1782079765-r-noid-hero.jpg" playsinline loop crossorigin>`; sources on `vz-...b-cdn.net` (Bunny Stream) at 240p/360p/480p/720p plus a DatoCMS mp4 | **yes** (hero, `HeroMedia_hero`) |
| CSS scroll-driven animations | `animation-timeline`, `scroll-timeline`, `view-timeline`: 0 hits in 700 KB of CSS | **no** |
| `prefers-reduced-motion` | 0 hits in CSS; 3 hits in JS (`380`, `_app`) so some JS paths check it | partial |

robot.com's timing register, from its CSS and GSAP calls: CSS transitions mostly `.1s`/`.05s` (hover), `.3s`, `.4s`, `.45s`; eases `cubic-bezier(.25,.46,.45,.94)`, `cubic-bezier(.455,.03,.515,.955)`, `cubic-bezier(.16,1,.3,1)` (expo-out); GSAP durations mostly `1`, `.6`, `.5`, `.8`, `.3` seconds with `expo.out`, `power2.out`, `power3.inOut`. That is slower and more "expo" than the Arclin token set (240/320ms, one ease). A literal 1:1 timing copy would break the brand's 200-320ms rule; a 1:1 *layout and choreography* copy does not need any of robot.com's libraries.

CMS: DatoCMS (`datocms-assets.com`, 93 hits). Not relevant to the static export beyond noting robot.com is also fully static-rendered per page.

## 3. Comparison table

Sizes are minified / gzip from bundlephobia (queried 2026-09-23) unless noted; wasm sizes from jsDelivr file listings. "Static fit" means: works with `output: "export"` when mounted client-side. "PRM" = `prefers-reduced-motion`.

| Library | Current version (npm publish date) | Size | Static-export fit | PRM support | Licence | Maintenance | Verdict | Band on the Arclin page |
|---|---|---|---|---|---|---|---|---|
| **three** | 0.186.0 / r186 (2026-09-08); r185 2026-07-01, r184 2026-04-16 | 736 KB min / **185 KB gz** core (bundlephobia); unpacked 20.4 MB | Client-only; needs `next/dynamic({ssr:false})` in a Client Component; WebGL context per canvas | None built in; you gate it yourself | MIT | Active, ~quarterly releases | **Reject** | none |
| **@react-three/fiber** | 9.8.0 (2026-09-22); peer `react >=19 <19.4`, `three >=0.156` | 163 KB min / **52 KB gz** | Same as three; R3F 9 pairs with React 19 | None | MIT | Active | **Reject** (already tried and removed, commit `476de48`) | none |
| **@react-three/drei** | 10.7.8 (2026-08-05); peers r3f ^9, react ^19 | 1.61 MB min / **500 KB gz** whole package (tree-shakes per helper) | Same | None | MIT | Active | **Reject** | none |
| **Spline (@splinetool/runtime + react-spline)** | runtime 2.0.55 (2026-09-18); react-spline 4.1.0 (2025-07-15) | 967 KB min / **270 KB gz** JS (bundlephobia) plus on-demand wasm: `hana-ui.wasm` 3.36 MB, `physics.wasm` 1.57 MB; `runtime.standalone.webgl.js` 2.2 MB unminified; bundles its own copy of three | Client-only; `@splinetool/react-spline/next` renders a blurred placeholder; scenes load from Spline's CDN by default (self-host `.splinecode` to avoid CORS) | None | **npm `license` field is empty and the package ships no LICENSE file** (jsDelivr listing of 2.0.55); usage governed by `https://spline.design/terms` | Runtime active; react wrapper 14 months old | **Reject** | none |
| **Rive (@rive-app/canvas-lite / canvas / webgl2 + react-canvas)** | 2.43.0 (2026-09-22); react-canvas 4.34.3 (2026-09-16), peer react ^19 | react-canvas 208 KB min / **58 KB gz** JS, plus wasm fetched at runtime: canvas-lite **879 KB**, canvas 1.95 MB, webgl2 2.22 MB (jsDelivr file sizes) | Client-only; wasm is a separate fetch; works on static hosting | **Not automatic**: "Rive does not automatically apply reduced motion"; you read `prefers-reduced-motion` and pause / `autoplay:false` yourself (`https://rive.app/docs/editor/accessibility/reduced-motion`) | MIT | Very active (weekly) | **Hold** | hero: the robot's dot-matrix eyes, only if a designer authors a `.riv`; `components/viz/dot-eyes.tsx` already does this in SVG |
| **lottie-web** | 5.13.0 (2025-05-21) | 306 KB min / **77 KB gz** | Client-only | Not built in; open feature request `https://github.com/airbnb/lottie-web/issues/1986` | MIT | Slow (16 months since release) | **Reject** | none |
| **dotLottie (@lottiefiles/dotlottie-web / -react)** | web 0.80.0, react 0.19.16 (2026-08-28) | web 165 KB min / **33 KB gz** JS plus `dotlottie-player.wasm` **1.24 MB** (webgl 1.37 MB, webgpu 1.40 MB) fetched at runtime | Client-only; wasm needs self-hosting or CDN | Not built in; same as above | MIT | Active | **Reject** | none |
| **OGL / raw WebGL shaders** | 1.0.11 (2025-01-27) | 131 KB min / **34 KB gz** whole package (README claims ~29 KB minzipped: Core 8, Math 6, Extras 15) | Client-only; no React bindings; hand-rolled canvas lifecycle | None | Unlicense (public domain) | Last release 20 months ago | **Reject** for now | none (the LED dot grid the brand wants is already `.dot-grid` in `globals.css`, a radial-gradient at 0 bytes of JS) |
| **CSS scroll-driven animations (`animation-timeline: scroll()/view()`)** | Platform feature | 0 bytes | Pure CSS; ideal for static export | **Caveat**: scroll timelines ignore the existing global `animation-duration: 0.001ms` reduced-motion rule (duration is repurposed as a range unit); you must add `animation-timeline: auto` / `animation: none` under the media query (MDN) | n/a | Chrome/Edge 115+, Firefox 159+, **Safari 26+ / iOS 26+ only**, 87.2% global (caniuse) | **Adopt** as progressive enhancement, no polyfill | `products` (IsoStack layer reveal linked to viewport progress) and `process` (accordion progress rule); `stats` count-up stays on motion |
| **GSAP + ScrollTrigger (+ Observer, SplitText, Flip)** | 3.15.0 (2026-04-13); `@gsap/react` 2.1.2 (2025-01-15) | gsap 71 KB min / **27 KB gz** core; ScrollTrigger and SplitText extra | Client-only; works in static export | Not built in; `gsap.matchMedia("(prefers-reduced-motion: reduce)")` is the documented pattern | **Standard "No Charge" licence from Webflow** since 3.13 (2025-04-29): all plugins free for commercial use; restriction: may not be used in tools that let users build visual animations without code that compete with Webflow, no reverse engineering for competitive products, no removing notices (`https://gsap.com/community/standard-license/`) | Active; owned by Webflow | **Hold** | `products`: only if a pinned, frame-snapped image-sequence scrub (robot.com's "noid unfolding") is demanded 1:1; otherwise none |
| **Lenis** | 1.3.26 (2026-08-05) | 19 KB min / **5.5 KB gz** | Client-only; works in static export | **Yes since 1.3.26**: respects `prefers-reduced-motion: reduce` by default, opt out via `respectReducedMotion:false` (release notes) | MIT | Active (darkroom.engineering) | **Hold** (not in the first pass) | page-wide, not a band; robot.com runs it desktop-only with `duration:1.2` |
| **motion 13** (installed 13.3.0; latest 13.4.1, 2026-09-22) | 13.4.1 (2026-09-22) | 143 KB min / **48 KB gz** whole package; `motion` component 34 KB, `m` + `LazyMotion(domAnimation)` 4.6 + 15 KB, `domMax` +25 KB (motion.dev) | Already in use in Client Components under static export | **Yes**: `useReducedMotion`, `MotionConfig reducedMotion="user"` (transforms drop, opacity kept) | MIT | Very active | **Keep (already adopted)**; add `LazyMotion` if bundle size matters | every band; also `useScroll`/`useTransform` for scroll-linked effects on native `ScrollTimeline` "where possible" (motion.dev) |
| **View Transitions API** (React `<ViewTransition>`) | Platform feature; React canary in Next 16 App Router, no config | 0 bytes | Works client-side under static export; "without browser support, your application works normally; the transitions do not animate" (Next docs) | You wrap `::view-transition-*` rules in the media query yourself | n/a | Chrome/Edge 111+, Safari/iOS 18+, Firefox 144+, 91.75% global (caniuse); React needs Chromium 125+ for transition types | **Hold** | not a band: locale switch crossfade at 240ms, only if the switch is a route navigation rather than in-place state |

## 4. What motion@13 already provides that the others would duplicate

From `https://motion.dev/docs/react-scroll-animations` and `https://motion.dev/docs/react-accessibility`, and what is already in the repo:

- Scroll-triggered reveals: `whileInView`, `useInView` (pooled IntersectionObserver) - already `components/site/reveal.tsx`. Duplicates GSAP ScrollTrigger's enter/leave use, Lottie's play-on-visible, and Rive's play-on-visible.
- Scroll-linked values: `useScroll` (`scrollYProgress`), `useTransform`, run on native `ScrollTimeline` where possible. Duplicates ScrollTrigger `scrub` for anything that is not pinned.
- Layout/shared-element animation: `layout`, `layoutId`, `AnimatePresence` (in `domMax`). Duplicates GSAP Flip and most of what View Transitions would do inside one route.
- Imperative `animate()` - already used for `count-up.tsx` and `donut-gauge.tsx`. Duplicates gsap.to for numeric tweens.
- `useReducedMotion` / `MotionConfig reducedMotion` - already used in every viz component. None of three, Rive, Lottie, GSAP, OGL or Spline provide this.
- SVG path drawing (`pathLength`) - the brand's one-stroke line drawings can "draw on" with motion at 320ms with no Lottie/Rive file and no wasm.

What motion does **not** do: pin a section while scrubbing a canvas frame sequence with frame snapping (ScrollTrigger `pin` + `snap:"frame"`), and smooth-scroll interpolation (Lenis). The first is the only robot.com band mechanic that motion + `position: sticky` cannot reproduce exactly; the second is scroll physics, not a band.

## 5. Performance: cost of adding WebGL to a page with autoplay video

Definitions: LCP counts a `<video>`'s poster load or first-frame presentation, whichever is earlier (`https://web.dev/articles/lcp`), with "good" at 2.5 s at p75; TBT "good" is under 200 ms on average mobile hardware, long task = >50 ms (`https://web.dev/articles/tbt`). JS cost is dominated by download and main-thread CPU; a median phone takes 3-4x longer than a Pixel 3 to execute the same script and a low-end phone over 6x (`https://v8.dev/blog/cost-of-javascript-2019`). Lighthouse mobile throttling is 1.6 Mbps down, 150 ms RTT, 4x CPU slowdown (`https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md`).

Estimates (order of magnitude, not measured; the site has no video today so there is no baseline to run):

| Addition | Extra bytes on the wire | Main-thread cost, mid-range Android (estimate) | LCP effect | TBT effect |
|---|---|---|---|---|
| three r186 + R3F 9 (no drei) | ~237 KB gz (~900 KB parsed) | parse + compile + first `WebGLRenderer` + shader compile: ~300-600 ms in 2-4 long tasks | If in the initial bundle: +1.2 s download at 1.6 Mbps competes with the poster; LCP likely moves from "good" to "needs improvement" on mobile. If lazy-loaded after first paint behind a static frame (what commit `86a1635` did): ~0 | +200-400 ms if it executes before TTI; alone it can exceed the 200 ms budget |
| + drei helpers (tree-shaken, e.g. ContactShadows, Environment) | +50-150 KB gz | +100-200 ms | same | +100 ms |
| Spline runtime | ~270 KB gz JS + 1.5-3.4 MB wasm + scene file from Spline CDN | wasm compile 300-800 ms; scene parse | Same as three if lazy; the scene file fetch competes with video segments | +300-600 ms |
| Rive canvas-lite | ~58 KB gz JS + 879 KB wasm | wasm compile ~150-300 ms | negligible if lazy | +100-200 ms |
| dotLottie | ~33 KB gz JS + 1.24 MB wasm | ~200-350 ms | negligible if lazy | +150-250 ms |
| GSAP + ScrollTrigger | ~35 KB gz | ~30-60 ms | none | +30 ms; ScrollTrigger `pin` forces layout on scroll; with `scrub` on a 2D canvas frame sequence, each frame decode is main-thread |
| Lenis | ~5.5 KB gz | rAF loop every frame while scrolling | none | negligible; but it replaces native scrolling with JS-driven `scrollTo`, so every scroll frame is main-thread work on top of the video decode |
| CSS scroll-driven / View Transitions / motion (already loaded) | 0 | compositor when animating `transform`/`opacity` (Chrome) | none | none |

Additional shared cost: any WebGL canvas beside a decoding `<video>` doubles GPU compositing work on mobile; a hidden or offscreen WebGL context still holds a GPU context, and Rive's own docs note WebGL2 context limits per page (`https://rive.app/docs/runtimes/web/canvas-vs-webgl`). The brand's imagery rule (one stroke weight, no shading, no fills) also means a shaded 3D render would have to be post-processed into a line drawing, which is what the removed R3F scene attempted before the SVG wireframe replaced it.

## 6. Verdicts and the one band each could earn

Ranked recommendation (most likely first):

1. **Nothing beyond motion + CSS.** motion 13 already covers reveals, scroll-linked values, numeric tweens, path drawing, and reduced motion. Add CSS scroll-driven animations for the two scroll-linked moments (`products` IsoStack reveal, `process` progress rule) with `animation-timeline: auto` under `prefers-reduced-motion`. Cost: 0 bytes. This reproduces robot.com's layout and choreography 1:1 at the Arclin timings without its libraries.
2. **Lenis (hold)**: the only cheap way to match robot.com's scroll *feel* 1:1 (5.5 KB gz, MIT, honours reduced motion). Rejected for the first pass because it replaces native scrolling for every visitor, conflicts with CSS scroll-snap, is capped at 60 fps on Safari, and the site already sets `scroll-behavior: smooth`. Revisit only if the 1:1 audit names scroll feel as the remaining gap.
3. **GSAP + ScrollTrigger (hold)**: licence is no longer a blocker (Webflow Standard No Charge, all plugins free). Adopt only for a pinned frame-snapped image-sequence in `products`, and only if a designer produces such a sequence; that sequence would itself have to be line-art frames to satisfy the imagery rule.
4. **View Transitions (hold)**: 0 bytes, but the site is a single page with hash anchors; the only candidate is the locale switch. Not worth the Safari-behaviour caveat until routing changes.
5. **Rive (hold)**: only for a designer-authored dot-eye `.riv`; SVG already does it.
6. **three + R3F + drei, Spline, OGL/raw WebGL, Lottie/dotLottie: reject.** The 3D route was tried on 2026-09-17 and reverted the same day for SVG wireframes; every one of these adds 185 KB-3.4 MB, none honours reduced motion, and none produces the one-stroke line imagery the brand mandates.

## 7. Risks

- Safari: CSS scroll-driven animations need Safari 26 / iOS 26; older Safari users see static (unanimated) states, so every scroll-driven effect must be designed to look finished at rest.
- The global reduced-motion rule in `globals.css` (`animation-duration: 0.001ms`) does **not** neutralise `animation-timeline` animations; adding scroll timelines without an explicit `animation-timeline: auto` under the media query silently breaks the brand's accessibility promise.
- Copying robot.com timings literally (0.5-1.2 s, expo eases, Lenis 1.2 s lerp) violates the 200-320ms / no-spring rule; "1:1" must mean layout and choreography, not durations.
- Spline's npm package carries no licence; using it on a commercial site rests on Spline's service terms, not an OSS licence.
- GSAP's Webflow licence forbids use inside no-code animation builders; irrelevant to a marketing site, but relevant if the design system (`build:ds`, published `dist/`) is ever shipped as a tool.
- Rive/dotLottie/three each require gating with `useReducedMotion` by hand; forgetting it on one band is a regression the existing `Reveal` pattern would not catch.
- Any WebGL canvas plus an autoplay `<video>` on the same mobile viewport is two GPU consumers; the estimate above is unmeasured and should be verified with Lighthouse mobile if any of the "hold" items is adopted.

## 8. Sources

Repo files (read-only):
- `/Users/bs/Develop/Others/Arclin-website/next.config.ts`
- `/Users/bs/Develop/Others/Arclin-website/package.json`
- `/Users/bs/Develop/Others/Arclin-website/app/globals.css`
- `/Users/bs/Develop/Others/Arclin-website/components/site/reveal.tsx`, `components/viz/*.tsx`, `lib/motion.ts`, `components/sections/*.tsx`
- `/Users/bs/Develop/Others/Arclin-website/node_modules/next/dist/docs/01-app/02-guides/static-exports.md`, `lazy-loading.md`, `view-transitions.md`, `upgrading/version-16.md`
- `/Users/bs/Develop/Others/Arclin-website/node_modules/motion/package.json`
- git commits `86a1635`, `476de48` in `/Users/bs/Develop/Others/Arclin-website`
- `/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/kurogane-out/project/README.md`

Saved fetches:
- `/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/polish-research/robot-home.html` and `robot-chunks/`

URLs:
- https://www.robot.com/
- https://registry.npmjs.org/ (versions, dates, licence fields, peers for every package in section 3)
- https://bundlephobia.com/api/size?package=... (three, @react-three/fiber, @react-three/drei, @splinetool/runtime, lottie-web, @lottiefiles/dotlottie-web, ogl, gsap, lenis, motion, @rive-app/react-canvas)
- https://data.jsdelivr.com/v1/packages/npm/... (wasm and bundle file sizes for Rive, dotLottie, Spline, lottie-web)
- https://cdn.jsdelivr.net/npm/@splinetool/runtime@2.0.55/package.json and /README.md
- https://gsap.com/blog/3-13/
- https://gsap.com/community/standard-license/
- https://caniuse.com/mdn-css_properties_animation-timeline
- https://caniuse.com/view-transitions
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://developer.chrome.com/docs/css-ui/scroll-driven-animations
- https://motion.dev/docs/react-accessibility
- https://motion.dev/docs/react-scroll-animations
- https://motion.dev/docs/react-reduce-bundle-size
- https://github.com/darkroomengineering/lenis and https://github.com/darkroomengineering/lenis/releases
- https://github.com/rive-app/rive-wasm
- https://rive.app/docs/runtimes/web/web-js
- https://rive.app/docs/runtimes/web/canvas-vs-webgl
- https://rive.app/docs/editor/accessibility/reduced-motion
- https://github.com/airbnb/lottie-web/issues/1986
- https://github.com/lottiefiles/dotlottie-web
- https://github.com/splinetool/react-spline
- https://spline.design/terms
- https://github.com/pmndrs/react-three-fiber
- https://github.com/pmndrs/drei
- https://github.com/mrdoob/three.js/releases
- https://github.com/oframe/ogl
- https://web.dev/articles/lcp
- https://web.dev/articles/tbt
- https://v8.dev/blog/cost-of-javascript-2019
- https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md

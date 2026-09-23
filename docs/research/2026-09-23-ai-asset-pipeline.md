# Assets research: media tools reachable from this session, and a validated pipeline for Kurogane line drawings

Read-only investigation, 2026-09-23. Nothing was generated, uploaded, purchased or posted. Balance and model catalog were read; two Mobbin searches were run; local tool availability was checked with `command -v`, `brew info`, `npm view`, `pip3 index`.

## 1. Tools this session can reach

### 1a. Higgsfield MCP (server id `02b3045d-3bb3-4b13-a624-cdfe76ac9da1`)

Exact tool names as listed by the session (prefix `mcp__02b3045d-3bb3-4b13-a624-cdfe76ac9da1__`):
`generate_image`, `generate_image_batch`, `generate_video`, `generate_video_batch`, `generate_audio`, `generate_3d`, `models_explore`, `balance`, `show_plans_and_credits`, `transactions`, `media_upload`, `media_upload_widget`, `media_import_url`, `media_confirm`, `remove_background`, `upscale_image`, `upscale_video`, `outpaint_image`, `reframe`, `jobs_wait`, `job_display`, `show_generations`, `show_generation_by_ids`, `sandbox_exec`, `scene_builder_3d_*` (11 tools), plus marketing/TikTok/website tools not relevant here.

Calls made: `models_explore` (list image, list video, get on five models, one recommend) and `balance`. No `generate_*`, no upload, no `show_plans_and_credits` (its description says it opens a pricing/checkout widget, so it was skipped in favour of `balance`).

**Balance**: `{"credits":346,"subscription_plan_type":"plus"}` (`balance` call, this session). The catalog's `unlim` block reports `"available":false` for every model, so the free-trial "unlimited" allowance is not usable on this account right now.

**Cost per generation**: `models_explore` does not return credit costs. The only no-spend way to learn a cost is `generate_image`/`generate_video` with `params.get_cost:true`, which the tool description says "return[s] the cost in credits for this generation without submitting any job". The task forbade calling `generate_*`, so no cost figures were obtained. Costs below are therefore unknown; the next session should preflight with `get_cost:true` before any real run. The one price the catalog states inline: `flux_3_video_edit` "costs 1 credit per second of the processed clip".

**Image models relevant to line drawings** (from `models_explore action=list type=image`):

| id | provider | notes from catalog |
|---|---|---|
| `nano_banana` | Google | "Realistic images, budget-friendly"; text-to-image and image-to-image via `image_references`; supports_unlim |
| `nano_banana_pro` | Google | "Ultimate quality, text and diagrams"; resolution 1k/2k/4k (default 2k); `image_references`; supports_unlim |
| `nano_banana_2` | Google | resolution 1k/2k/4k; `image_references` + `mask`, `is_inpaint`; supports_unlim |
| `nano_banana_2_lite` | Google | 1k only, `thinking` MINIMAL/HIGH, mask/inpaint |
| `recraft_v4_1` | Recraft | `model_type` = standard / **vector** / utility / **utility_vector** ("vector output"); `colors` palette up to 10 `#RRGGBB`; `background_color`; no reference-image input |
| `gpt_image_2_5` | OpenAI | quality low..max, 1k/2k/4k, `background: auto/opaque/transparent`; `image_references` |
| `gpt_image_2` | OpenAI | 1k/2k/4k, quality low/med/high; supports_unlim |
| `flux_2` | BFL | pro/flex/max, 1k/2k, `image_references`; supports_unlim |
| `flux_kontext` | BFL | "context-aware editing and style transfer", `image_references` |
| `seedream_v4_5`, `seedream_v5_lite`, `seedream_v5_pro` | Bytedance | editing/instruction; v5_pro has `remove_bg` |
| `image_background_remover`, `bytedance_image_upscale`, `topaz_image` | — | post-processing |

Output format: the catalog does not expose an output-format field. Nothing in `models_explore` says any model returns SVG; `recraft_v4_1`'s `model_type: vector` / `utility_vector` is described as "vector output" and "SVG-like illustration", but the MCP result type is still an image job and whether the delivered file is SVG or a rasterised PNG cannot be confirmed without spending a credit. Transparent PNG is explicitly supported only by `gpt_image_2_5` (`background: transparent`); `seedream_v5_pro` and `bytedance_image_upscale` have `remove_bg`, and there is a standalone `remove_background` tool. Style reference (image-to-image) is supported by every Google/BFL/Bytedance/OpenAI model above through the `image_references` media role; Recraft V4.1 has no media input at all.

`models_explore action=recommend` for "single-weight black ink botanical line drawing, no shading, no fills, white background" ranked `seedream_v4_5` (100), `ms_image` (70), `recraft_v4_1` (70), `flux_2` (60). The scorer is keyword-based ("match_reason": tags/description hits), so this ranking is not evidence of drawing quality.

**Video models** (from `models_explore action=list type=video`), the ones plausible for a marketing site:

| id | provider | duration | resolution | audio | inputs |
|---|---|---|---|---|---|
| `cinematic_studio_3_0` (Cinema Studio Video 3.0) | Higgsfield | 4–15 s | 480p/720p/1080p/4k | optional | start/end image |
| `cinematic_studio_video_v2` | Higgsfield | 3–12 s | (not stated) | on/off | start/end image; multi-shot |
| `seedance_2_5` | Bytedance | 4–30 s | 480p/720p/1080p | optional | t2v, omni_reference, video_edit, video_extension |
| `seedance_2_0` | Bytedance | 4–15 s | up to 4k | optional | image/video/audio refs; supports_unlim |
| `kling3_0` | Kling | 3–15 s | std/pro/4k | on/off | start/end image; supports_unlim |
| `kling3_0_turbo` | Kling | 3–15 s | 720p/1080p | — | start image; tagged budget |
| `veo3_1` | Google | 4/6/8 s | quality basic/high/ultra | yes | start image |
| `veo3_1_lite` | Google | 4/6/8 s | — | optional | start/end image; tagged budget |
| `gemini_omni_flash_1_1` | Google | 3–10 s | 360p–4k | yes | t2v, i2v, reference, edit |
| `wan3_0` / `wan3_0_prime` | Wan | 2–30 s | 480p–1080p | optional | first/last frame, refs |
| `minimax_h3` | MiniMax | 4–15 s | 2K | — | keyframes, refs; batch_size 1–4 |
| `flux_3_video` | BFL | 5–20 s | 720p/1080p | yes | start/end, refs, continuation |
| `grok_video_v15` | xAI | 2–15 s | 480p–1080p | — | start image, audio refs |

Post-processing video tools: `topaz_video` (1080p/2160p), `bytedance_video_upscale` (1080p/2k/4k, 24–60 fps), `video_deflicker`, `video_background_remover` / `sam_3_video`.

`generate_video`'s description names its defaults: `seedance_2_5` for general video, `kling3_0` for multi-shot/audio/motion transfer, `minimax_h3` for 2K keyframes.

### 1b. Mobbin MCP

Tools: `mcp__mobbin__search_sections`, `mcp__mobbin__search_screens`, `mcp__mobbin__search_flows`. Access confirmed; two searches run.

`search_sections` (query "robotics company homepage hero section with product image and headline", limit 5) returned five sections from two sites, **Fauna Robotics** and **Robot.com**, each as `{id, image_url, mobbin_url, site_name}` plus an inline low-res preview image. Example: https://mobbin.com/sites/sections/591db5e7-4c33-4081-81dc-8e7cf4b28e53 (Robot.com hero: product shot floating on a neutral grey ground, small left-aligned headline "Not someday. Not in a lab. Today.", two pill CTAs) and https://mobbin.com/sites/sections/1f935ff6-b667-475a-8ada-27d0ddeaffaf (Fauna Robotics: centred display headline over a warm off-white page, photo in a `radius-lg` frame, a rounded "Designed in NYC" panel). `has_next_page: true`. `image_url` values are `https://mobbin.com/api/mcp/short/...` short links that the tool says expire after 30 days.

`search_screens` (query "robotics company homepage", platform web, standard mode, limit 5) returned `{id, image_url, mobbin_url, app_name, platform}`; the standard-mode results were weakly relevant (Higgsfield, MagicPath, Plain, Perplexity, Supabase homepages), so for inspiration work `search_sections` or `search_screens mode:"deep"` is the better call. Screens are single full-page captures; sections are cropped bands. `search_flows` (not run) is documented as returning per-screen previews of multi-step flows.

What Mobbin does **not** return: no HTML/CSS, no design tokens, no motion data. It is reference imagery only. Its terms of use should be checked before any screenshot is committed to the repo; keep them in the scratchpad or link by `mobbin_url`.

### 1c. Tools that do NOT exist in this session

- **Photoshop**: `ToolSearch("photoshop")` returned no deferred tool. No Adobe MCP is configured. The Mobbin result for the Higgsfield homepage advertises a "Higgsfield plugin for Photoshop" as a product; that is not a tool available here.
- **"Claude image generation"**: no tool of that name. The `Artifact`/`show_widget` tools render HTML/SVG that Claude writes by hand, which is exactly what the brief says to stop doing ("dont manually create artifacts for illustrations").
- **Nano Banana as a standalone tool**: it exists only as model ids inside the Higgsfield server (`nano_banana`, `nano_banana_pro`, `nano_banana_2`, `nano_banana_2_lite`), invoked through `generate_image`.
- **Figma Weave** (`mcp__figma__weave_find_model`, `weave_run_model`): a second route to image/video models, but calling `weave_find_model("nano banana")` returned "You haven't linked your Figma account to Weave yet" (link at https://app.weavy.ai/settings?section=profile). Unavailable until Brian links it.
- The `paper` MCP server failed to connect (ECONNREFUSED); unrelated to media.

## 2. Brand imagery rules (source: `/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/kurogane-out/project/README.md`, "Imagery" section, lines 51–57, and "Iconography", line 65)

- Botanical line drawings, in `ink` on `surface-page`, at a single constant stroke weight; no shading, no fills, no second weight within one drawing. "They are diagrams of plants, not illustrations of feelings."
- One plant per composition; never lay type over a drawing; never tint a drawing with `highlight`.
- Icons: a single open-source line set at 1.5px stroke "to match the botanical drawings".
- Motion: 200–320 ms for enters/leaves; nothing bounces or springs.
- Photographs: daylight, real residents, no colour wash.

Theme tokens (`/Users/bs/Develop/Others/Arclin-website/app/globals.css`): Paper theme on `:root` with `--surface-page: #fbf7ef`, `--ink: #102e24`; Night theme under `[data-theme="night"]` with `--surface-page: #0b1c16`, `--ink: #f4f1e8`. A drawing that uses `stroke="var(--ink)"` therefore inverts correctly across both themes without a second asset.

Existing robot drawing: `/Users/bs/Develop/Others/Arclin-website/components/viz/hero-illustration.tsx` is a hand-authored 480×420 `viewBox` SVG, `fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"`, `role="img"` with `aria-label` and `<title>`. It deliberately breaks the "no fills" rule in three places: the robot's antenna tip (`fill="var(--ink)"`), a hand circle filled `var(--surface-page)` to occlude the arm line, and two eye dots filled `var(--highlight)` (the file comment calls this "a single Soga mark"). The README says "never tint a drawing with `highlight`", so the eyes are a documented, intentional exception that the pipeline should treat as the only permitted one: at most one `highlight` fill pair, no other fills. Sibling components: `mimamori-scenes.tsx`, `dot-eyes.tsx`, `iso-stack.tsx` (same directory). The site is `output: "export"` static Next 16 with `images: { unoptimized: true }` (`next.config.ts`), so inline SVG components remain the right delivery form.

## 3. Pipeline design: generator → vector → single-weight SVG component → validation → human gate

### 3a. Generator choice and prompt recipe

Two candidates worth a first credit each (preflight with `get_cost:true` first):

1. **`recraft_v4_1`, `model_type: "vector"`** (fallback `utility_vector`), `colors: ["#102e24"]`, `background_color: "#fbf7ef"`, `resolution: "2k"`, aspect 4:3 or 1:1. Rationale: it is the only model in the catalog whose contract includes a palette lock and a flat background colour, and it is described as producing vector-style output for "SVG-like illustration". Risk: no reference-image input, so consistency between drawings relies on prompt text only; and whether the file arrives as SVG is unconfirmed.
2. **`nano_banana_pro`**, `resolution: "2k"`, with `image_references` = a PNG rasterisation of the existing `hero-illustration.tsx` as the style anchor. Rationale: the brief names Nano Banana; the reference-image role gives stroke-style consistency across the set. Output is raster, so vectorisation is mandatory.

Prompt recipe (both models), kept literal because the validators below will reject anything else:

> Technical botanical line drawing of a single [species, e.g. "Japanese maple branch with seven leaves"], centred, isolated on a flat uniform off-white background (#fbf7ef). Black-green ink (#102e24) outline only. Exactly one constant stroke width throughout, as if drawn with a 0.5 mm technical pen. No shading, no hatching, no cross-hatching, no gradients, no fills, no colour, no texture, no paper grain, no shadow, no text, no border, no frame, no second object. Clean closed contours, generous empty space around the plant, engineering-diagram style, not painterly.

For robot drawings in the same idiom, swap the subject for "a rounded two-wheeled companion robot with a pill-shaped body and a rounded rectangular head" and attach the hero PNG as reference; keep everything after the first sentence identical.

Generate 4 variants per subject (`count: 4`), pick by validator score, not by eye, then show the survivor to Brian.

### 3b. Vectorisation (local, no credits)

Availability checked on this Mac (`command -v` and package registries):

- `potrace` — not installed; `brew info potrace` shows stable 1.16 bottled. Produces filled regions from a bitmap (it traces the *outline* of the black ink, so a 6-px-wide raster line becomes a thin filled polygon, not a stroked centreline). Good for closed silhouettes, wrong for our "stroke, no fills" idiom unless followed by a centreline step.
- `autotrace` — not installed; `brew info autotrace` shows 0.31.10 bottled. Has a `-centerline` mode that emits open paths along the ink's spine, which is the behaviour we want; quality on curved botanical lines is historically noisier than potrace and needs smoothing.
- `vtracer` — not in Homebrew (`brew info vtracer`: no formula). Available as PyPI `vtracer` 0.6.15 (`pip3 index versions vtracer`), crates.io `vtracer 1.0.0-alpha.4` (`cargo search`), and npm `@visioncortex/vtracer 1.0.0-alpha.4` (`npm view`). Its "polygon"/"spline" modes trace fills like potrace; it does not emit stroked centrelines.
- Pure-JS options on npm: `imagetracerjs` 1.2.6, `@image-tracer-ts/core` 1.0.2 (both fill-tracers). `svgo` 4.1.0 and `svgson` 5.3.1 for post-processing; `@resvg/resvg-js` 2.6.2 for rasterising SVG in Node without a browser.
- Python already has PIL 12.1.1 and numpy 2.5.1; `scipy` and `cv2` are missing (`ModuleNotFoundError`). `pip3` 26.1.2 is present.

Recommended vectoriser: **skeleton/centreline route**, because the brand rule is "one stroke, no fills" and every fill-tracer would produce two outlines per line. Concretely:

1. Rasterise/normalise the generator output to greyscale, threshold at Otsu (PIL + numpy; `scikit-image` via `pip3 install scikit-image` supplies `threshold_otsu`, `skeletonize`, and `medial_axis` with the distance transform — install needed, not yet verified on this machine).
2. `skimage.morphology.skeletonize` → 1-px centreline mask. Trace the skeleton into polylines (8-connected walk), simplify with Ramer–Douglas–Peucker (tolerance ≈ 1.5 px at 2k), and fit to cubic Béziers (or leave as polylines with `stroke-linejoin="round"`; the hero uses cubic `C` segments so Bézier fit keeps the idiom).
3. Fallback if the skeleton is too fragmented: `autotrace -centerline -output-format svg -despeckle-level 5`, then the same simplify/fit step.

Post-processing to force one stroke width and two colours:

- Strip every `fill`, `stroke-width`, `style`, `opacity`, `filter`, `mask`, `clip-path`, `<image>`, `<text>` from the traced SVG (svgson walk, or an `svgo` config with `removeAttrs` and `removeUselessStrokeAndFill`).
- Set on the root `<svg>` only: `fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"`, matching `hero-illustration.tsx` exactly. Nothing below the root carries colour.
- Rescale the `viewBox` so the plant's bounding box fills ~80% of the frame with equal padding; snap to the 480-wide viewBox family used by the hero.
- Emit a `.tsx` component: `export function <Name>Illustration({ className, title }: { className?: string; title: string })` returning the SVG with `role="img" aria-label={title}` and `<title>{title}</title>`, so it is a drop-in for the hero's contract. Store under `components/viz/<name>-illustration.tsx` with a `.stories.tsx` beside it (every viz component in the repo has one).

### 3c. Automated validation (runs on the emitted `.tsx`, not the generator PNG)

Static checks (Node script, svgson):

1. **Colour count ≤ 2**: collect every `fill`, `stroke`, `stop-color`, `color` attribute and any hex/rgb in `style`; allowed set is `{none, currentColor/var(--ink), var(--surface-page), var(--highlight)}`; `var(--highlight)` permitted only as a fill on at most two circles of equal radius (the documented eye exception); fail on any literal hex.
2. **No fills**: every `fill` outside the root must be absent or `none`, except the exception above and `var(--surface-page)` occluders (max 2, circles only).
3. **Stroke-width uniformity, structural**: no element may carry its own `stroke-width`; root must be exactly `2`.
4. **Stroke-width uniformity, measured**: rasterise the SVG at 4× with `@resvg/resvg-js` (or Playwright), threshold, compute the distance transform on the ink mask (`scipy.ndimage.distance_transform_edt` or `skimage`), take the ridge values along the skeleton; pass when the 5th–95th percentile of local half-width lies within ±15% of the nominal (2 px × 4 / 2 = 4 px). This catches raster-origin artefacts that survived tracing (tapered ends, doubled lines).
5. **One object**: connected-component count on the rasterised ink at native scale, after a 3-px closing, must be 1 (a plant is one connected drawing; the hero has 3 components — floor, chair, person+robot — so this check applies to botanicals only, and robots get a component ceiling of 5).
6. **Aspect ratio**: `viewBox` ratio within the allowed set {4:3, 1:1, 3:4}; ink bounding box occupies 60–85% of each axis.
7. **File size**: `.tsx` ≤ 24 KB and ≤ 400 path commands, so it stays hand-editable and does not bloat the static bundle.
8. **Accessibility**: `role="img"`, non-empty `aria-label`, `<title>` present; no `<text>` element (type never sits on a drawing).
9. **Path hygiene**: no `Z`-closed subpaths whose enclosed area is < 4 px² (tracer speckle); no path shorter than 6 px.

Rendered check with Playwright (browsers already installed: `~/Library/Caches/ms-playwright/chromium-1243`; `playwright ^1.63.0` in devDependencies; the repo's `scripts/shot.mjs` already launches chromium against `localhost:4173` per locale and viewport and collects console errors):

10. Render the component's Storybook story (or a scratch page) twice, once at `:root` (Paper) and once with `document.documentElement.dataset.theme = "night"`. For each: screenshot, then assert (a) the ink pixel colour equals the theme's `--ink` within ΔE < 3, (b) the background equals `--surface-page`, (c) the number of distinct colours after quantisation ≤ 3 (page, ink, optional highlight), (d) the ink coverage ratio is within 2% between the two themes (proves nothing disappeared on inversion), (e) no console errors.
11. Layout check in `hero.tsx` context at 390×844 and 1440×900: the drawing's bounding box must not intersect any text node's bounding box (the "never type over a drawing" rule), measured with `getBoundingClientRect` in the page.

Output: a per-drawing JSON scorecard (`scratchpad/asset-scorecards/<name>.json`) with each check as pass/fail plus the measured numbers, and a contact sheet PNG (Paper | Night | mobile hero context) for the human gate.

### 3d. Human gate

No generated drawing replaces an existing component or ships in a PR until Brian approves it against its contact sheet and scorecard. The loop stops at "candidate ready" and posts the sheet; the replacement commit is a separate, explicitly authorised step. Rejected candidates and their prompts are kept in the scratchpad log so the next run can diff what changed.

## 4. Video

### 4a. What Higgsfield can produce (from the catalog, section 1a)

Clip length 2–30 s depending on model (`seedance_2_5`, `wan3_0` reach 30 s; most sit at 4–15 s). Resolution up to 4k (`cinematic_studio_3_0`, `seedance_2_0`, `kling3_0` mode `4k`, `gemini_omni_flash_1_1`), commonly 720p/1080p. Native audio on most; can be turned off (`generate_audio:false` / `sound:"off"`), which the Kling entry says lowers credits. Image-to-video from a start frame is universal; `cinematic_studio_3_0`, `seedance_2_5`, `kling3_0`, `minimax_h3`, `flux_3_video`, `wan3_0` also accept an end frame, which is what a seamless-loop hero needs (start frame = end frame). Video edit and extension exist on `seedance_2_5`, `gemini_omni_flash_1_1`, `kling_video_edit`, `flux_3_video_edit`. Cost per clip: not exposed by the catalog; use `generate_video` with `get_cost:true` per model/duration/resolution before a real run. With 346 credits on the account and unknown per-clip pricing, assume a small number of hero-length clips before the balance matters.

Brand fit caveat: the README's photography rule ("rooms as they are: daylight, real residents, no staged smiling"; a colour wash means "the wrong photograph") applies to video too. A generated clip of a fictional resident is a staged image by definition, and elder-care footage of synthetic people is a reputational risk for a care brand. The safer generated-video subject is the robot alone or an abstract product motion (turntable, door approach), with people left to real footage.

### 4b. Dev-only placeholder policy (technical shape)

Goal: let the team iterate on generated video locally without committing generated media to the public static build.

- Files live under `public/dev/` (e.g. `public/dev/hero-loop.mp4`, `public/dev/hero-loop.webm`, `public/dev/hero-poster.jpg`). Add `/public/dev/` to `.gitignore` (the existing `.gitignore` already excludes `/out/`, `.env*`, `dist/`; nothing covers `public/dev/` today).
- A `<HeroMedia>` component reads `process.env.NEXT_PUBLIC_DEV_MEDIA === "1"` at build time. Because the site is `output: "export"`, this is a static branch: when unset (CI `pages.yml` sets only `NEXT_PUBLIC_SITE_URL`), the component renders the poster frame only, an `<img>` or the existing `HeroIllustration`, with no `<video>` element at all. When set, it renders `<video autoplay muted loop playsinline poster="/dev/hero-poster.jpg">` with the two sources and `preload="metadata"`, and respects `prefers-reduced-motion` by falling back to the poster.
- Because `next build` copies everything in `public/` into `out/`, "excluded from the static build" has to be enforced twice: (1) the build script for production deletes or skips `public/dev/` (`rm -rf out/dev` as a post-build step, or a `prebuild` guard that fails the build if `out/dev` would be produced with the flag unset); (2) the CI workflow never sets the flag. A lint/CI check greps the exported `out/` for `/dev/` references and fails the deploy if any survive.
- The poster frame is the one committed asset, and it must pass the same imagery rules as photographs. If the poster is itself generated, it goes through the drawing/human gate above.
- `basePath` (set only for GitHub Pages, per `next.config.ts`) must be applied to the `/dev/...` URLs the same way other public assets are, or the preview build 404s.

## 5. Recommendation

Run a two-credit bake-off before writing any pipeline code: one `recraft_v4_1 model_type:"vector"` generation with the palette/background lock, one `nano_banana_pro` generation with the hero PNG as `image_references`, both preflighted with `get_cost:true`. Whichever survives a manual look at "one stroke width, no shading" becomes the generator; build the centreline-skeleton vectoriser (PIL + numpy + scikit-image, `autotrace -centerline` as fallback) rather than potrace/vtracer, because the fill-tracers structurally violate "no fills". Wire the nine static checks and the two-theme Playwright check into a `scripts/validate-drawing.mjs` that writes a scorecard, and keep Brian's approval as the only path from scratchpad to `components/viz/`. Defer video until the drawings pipeline is green: the catalog supports it, but the brand's photography rule and the unknown credit cost make it the lower-value, higher-risk track.

## 6. Risks

- **Credits**: 346 on a `plus` plan, unlim allowance unavailable; per-generation cost unknown until `get_cost` preflights. `count:4` multiplies cost four-fold; video at 1080p/4k is the expensive end. Set a per-loop ceiling (e.g. 40 credits) and read `balance` before and after.
- **Licensing of generated assets**: ownership/commercial-use terms differ per underlying provider (Google, OpenAI, Recraft, Bytedance, BFL, Kling) and are governed by Higgsfield's terms, which were not read in this session. Confirm commercial rights for a marketing site before any generated asset ships; keep the prompt and job id with each asset for provenance.
- **Brand-rule conflicts**: generators default to shading and varying line weight; the validators exist because prompts alone will not hold the rule. `recraft` "vector" output may contain fills that must be stripped. The hero's `highlight` eyes already contradict "never tint a drawing with `highlight`"; decide once whether that exception is policy, and encode the decision in the validator. Synthetic people in video contradict the photography rule.
- **Mobbin**: image links expire in 30 days; screenshots are third-party copyrighted UI, so they stay out of the repo and are cited by `mobbin_url`.
- **Tooling gaps**: potrace/autotrace/vtracer/scipy/scikit-image are not installed; installing them is a separate, explicit step. Figma Weave is unlinked. No Photoshop or "Claude image generation" tool exists; the brief's assumption that they do should be corrected with Brian.
- **Vectoriser quality**: skeletonisation produces spurs at junctions and can merge parallel lines closer than the stroke width; the stroke-width and component-count checks catch most of it, but expect manual path cleanup on some drawings.

## 7. Sources

- Higgsfield model catalog and balance: `mcp__02b3045d-3bb3-4b13-a624-cdfe76ac9da1__models_explore` (list image, list video, get nano_banana_pro / recraft_v4_1 / gpt_image_2_5 / cinematic_studio_3_0 / kling3_0, recommend) and `__balance`, called in this session.
- `generate_image` / `generate_video` tool descriptions (schemas loaded via ToolSearch, not called) for `get_cost`, default models and media roles.
- Mobbin: `mcp__mobbin__search_sections` and `mcp__mobbin__search_screens` results; https://mobbin.com/sites/sections/591db5e7-4c33-4081-81dc-8e7cf4b28e53 ; https://mobbin.com/sites/sections/1f935ff6-b667-475a-8ada-27d0ddeaffaf ; https://mobbin.com/sites/sections/5bbc90c2-05e6-4626-a10c-3da9e38830ce ; https://mobbin.com/sites/sections/11e06bd8-bad1-4ff3-b7cc-00a43fd76490 ; https://mobbin.com/sites/sections/5f102176-119f-4b67-b224-49ca9d2e2b44
- Figma Weave: `mcp__figma__weave_find_model("nano banana")` → account not linked; https://app.weavy.ai/settings?section=profile
- Brand rules: `/private/tmp/claude-501/-Users-bs-Develop-Others-Arclin-website/0d262450-2db9-40c7-a959-1bb58bb547f4/scratchpad/kurogane-out/project/README.md`
- Repo: `/Users/bs/Develop/Others/Arclin-website/components/viz/hero-illustration.tsx`, `/Users/bs/Develop/Others/Arclin-website/components/sections/hero.tsx`, `/Users/bs/Develop/Others/Arclin-website/app/globals.css`, `/Users/bs/Develop/Others/Arclin-website/next.config.ts`, `/Users/bs/Develop/Others/Arclin-website/package.json`, `/Users/bs/Develop/Others/Arclin-website/scripts/shot.mjs`, `/Users/bs/Develop/Others/Arclin-website/.gitignore`, `/Users/bs/Develop/Others/Arclin-website/.github/workflows/pages.yml`
- Local tool availability: `command -v`, `brew info potrace` (1.16), `brew info autotrace` (0.31.10), `brew info vtracer` (no formula), `pip3 index versions vtracer` (0.6.15), `cargo search vtracer` (1.0.0-alpha.4), `npm view @visioncortex/vtracer` (1.0.0-alpha.4), `npm view potrace` (2.1.8), `npm view svgo` (4.1.0), `npm view imagetracerjs` (1.2.6), `npm view @image-tracer-ts/core` (1.0.2), `npm view svgson` (5.3.1), `npm view @resvg/resvg-js` (2.6.2); Python PIL 12.1.1, numpy 2.5.1, scipy/cv2 missing; Playwright chromium-1243 in `~/Library/Caches/ms-playwright`.
- Project tool pages: https://potrace.sourceforge.net/ ; https://autotrace.sourceforge.net/

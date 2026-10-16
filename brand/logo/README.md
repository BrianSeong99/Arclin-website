# Arclin logo

The three-leaf mark and the Arclin wordmark, as vector (`svg/`) and raster (`png/`) files. Every SVG is self-contained:
the lettering is outlined, so nothing needs the fonts installed.

## Files

| Name | What it is |
| --- | --- |
| `mark-colour` | The mark alone, gold / sage / deep-green leaves with the brand shade. Transparent background. |
| `mark-mono-ink`, `mark-mono-white` | The mark in one colour, for print, embossing, dark or light photos. |
| `mark-colour-on-ink`, `mark-colour-on-paper` | The colour mark on the two brand surfaces, with clear space. |
| `wordmark-horizontal-*` | Mark beside "Arclin" with 智渡仁 as a caption. `on-light` (ink type), `on-dark` (white type, transparent), `mono-ink`, `mono-white`. |
| `wordmark-stacked-*` | Mark above "Arclin", 智渡仁 under it. Same variants. |
| `lockup-tagline-*` | The horizontal wordmark with the tagline "A WARMER TOMORROW". |
| `*-preview` | The on-dark variants placed on the ink surface, so you can see them without opening them on a dark layer. |
| `app-icon`, `app-icon-paper` | Rounded-square icon (ink or paper ground) for app stores, favicons, avatars. PNGs at 1024, 512, 180, 32. |

PNG marks come at 1024 and 256 px; wordmarks and lockups at 2× display size. Transparent except the `*-preview` and `*-on-*` files.

## Colours

| Token | Hex |
| --- | --- |
| Ink (deep green, type and dark ground) | `#102e24` |
| Paper (light ground) | `#fbf7ef` |
| Leaf gold | `#fbeab8` → `#e3c06a` → `#bd9440` |
| Leaf sage | `#adc9b0` → `#7fa085` → `#54755f` |
| Leaf dark | `#276b52` → `#0d3a2f` → `#05221a` |
| Caption grey (智渡仁 on light) | `#5e6f68` |

## Type

- Wordmark: Coustard Black (SIL Open Font License), the free stand-in for Cream by Paulo Goode, which is the intended face once licensed.
- 智渡仁: Resource Han Rounded SC Medium (SIL Open Font License).
- Tagline: Chillax Medium, tracked 0.22em.

## Rules

- Keep the leaves' overlap order and the paper gap between them; do not recolour the leaves individually.
- Clear space around the mark: at least a quarter of the mark's width on every side.
- Minimum size: mark 24 px, horizontal wordmark 120 px wide.
- Do not stretch, rotate, outline or add effects. Use the mono versions when colour is not available.

## Source

The mark is drawn in code in `components/site/mark.tsx` (same construction as the "Mark" component in the Arclin Figma file);
the kit is generated from it and the vendored fonts in `public/fonts/`.

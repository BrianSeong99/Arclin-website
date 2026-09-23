/**
 * Kurogane design tokens (tokens.json v2), transcribed as typed data for the styleguide.
 * Values are copied verbatim from the source; the CSS layer lives in app/globals.css.
 * Every entry carries a stable short id (C01, T01, S01, R01, X01) so reviews can point at a row.
 */

export type ThemeId = "paper" | "night";
export type TypeFamily = "display" | "ui" | "jp" | "zh";

export interface Theme {
  id: ThemeId;
  name: string;
}

export interface ColorToken {
  id: string;
  name: string;
  value: Record<ThemeId, string>;
  usage: string;
  /** Present when the token is a text colour; names the surface its usage note states as the ground. */
  textOn?: string;
}

export interface TypeStyle {
  id: string;
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  sample?: string;
  usage?: string;
}

export interface TypeGroup {
  name: string;
  family: TypeFamily;
  styles: TypeStyle[];
}

export interface SpacingToken {
  id: string;
  name: string;
  value: string;
  usage: string;
}

export interface RadiusToken {
  id: string;
  name: string;
  value: string;
  usage: string;
}

export interface ShadowToken {
  id: string;
  name: string;
  value: Record<ThemeId, string>;
  usage: string;
}

export const systemName = "Kurogane";
export const systemVersion = 2;

export const themes: Theme[] = [
  { id: "paper", name: "Paper" },
  { id: "night", name: "Night" },
];

export const colorTokens: ColorToken[] = [
  {
    id: "C01",
    name: "surface-page",
    value: { paper: "#fbf7ef", night: "#0b1c16" },
    usage: "The default page ground. Every screen starts here; ink, ink-muted and ink-subtle are all legible on it.",
  },
  {
    id: "C02",
    name: "surface-raised",
    value: { paper: "#ffffff", night: "#13261e" },
    usage: "Cards, sheets and popovers that sit above the page. Separate it from surface-page with hairline, not with a shadow.",
  },
  {
    id: "C03",
    name: "surface-sunken",
    value: { paper: "#f2ecdf", night: "#071410" },
    usage: "Wells, table stripes and inset fields. Carries ink and ink-muted.",
  },
  {
    id: "C04",
    name: "surface-brand",
    value: { paper: "#102e24", night: "#2a6049" },
    usage:
      "The Kurogane slab: primary buttons, hero panels, footers. Lifted in Night so it stays distinguishable from surface-page; bound it with hairline there. Text on it is on-brand or on-brand-muted.",
  },
  {
    id: "C05",
    name: "hairline",
    value: { paper: "#e2daca", night: "#2a3b32" },
    usage: "Decorative 1px dividers and card edges. Never the only thing carrying meaning — use border-strong for that.",
  },
  {
    id: "C06",
    name: "border-strong",
    value: { paper: "#8e8676", night: "#63736a" },
    usage: "Borders that mean something: input outlines, secondary button edges, selected states. Holds 3:1 on surface-page and surface-raised in both themes.",
  },
  {
    id: "C07",
    name: "ink",
    value: { paper: "#102e24", night: "#f4f1e8" },
    usage: "Body copy and headings on surface-page, surface-raised and surface-sunken.",
    textOn: "surface-page",
  },
  {
    id: "C08",
    name: "ink-muted",
    value: { paper: "#47594f", night: "#b9c6bc" },
    usage: "Secondary copy, captions and metadata on surface-page and surface-raised.",
    textOn: "surface-page",
  },
  {
    id: "C09",
    name: "ink-subtle",
    value: { paper: "#5e6f68", night: "#8fa096" },
    usage: "Labels, overlines and placeholder text on surface-page and surface-raised. The lightest text permitted anywhere — nothing paler than this carries words.",
    textOn: "surface-page",
  },
  {
    id: "C10",
    name: "on-brand",
    value: { paper: "#fbf7ef", night: "#fbf7ef" },
    usage: "Primary text and icons on surface-brand in both themes.",
    textOn: "surface-brand",
  },
  {
    id: "C11",
    name: "on-brand-muted",
    value: { paper: "#c3d0c6", night: "#c3d0c6" },
    usage: "Secondary text on surface-brand in both themes.",
    textOn: "surface-brand",
  },
  {
    id: "C12",
    name: "highlight",
    value: { paper: "#f7ed92", night: "#f7ed92" },
    usage: "Soga. The single accent: one highlighted cell, one active chip, one marked passage per view. Never a page background, never a large fill. Text on it is on-highlight.",
  },
  {
    id: "C13",
    name: "highlight-edge",
    value: { paper: "#a08a2b", night: "#c9b43f" },
    usage: "The readable form of Soga: underlines, borders, small marks and icons that must carry meaning. Holds 3:1 on surface-page in both themes, which highlight itself does not.",
  },
  {
    id: "C14",
    name: "on-highlight",
    value: { paper: "#102e24", night: "#102e24" },
    usage: "Text and icons on highlight, and the focus ring there. Always this — never on-brand, which would be unreadable.",
    textOn: "highlight",
  },
  {
    id: "C15",
    name: "focus-ring",
    value: { paper: "#102e24", night: "#f7ed92" },
    usage: "The 2px focus ring on surface-page, surface-raised and surface-sunken. Solid, never dashed.",
  },
  {
    id: "C16",
    name: "focus-ring-inverse",
    value: { paper: "#f7ed92", night: "#f7ed92" },
    // Corrected from tokens.json line 142, which still says "surface-brand or on highlight": the value is the
    // highlight colour itself (1.00:1 on highlight), so the ring on highlight is on-highlight. Sync upstream
    // (tokens.json focus-ring-inverse and on-highlight usage, README.md line 29) so this file is verbatim again.
    usage:
      "The focus ring when the focused control sits on surface-brand. On highlight use on-highlight — this yellow is the highlight colour and would vanish.",
  },
  {
    id: "C17",
    name: "success",
    value: { paper: "#246b49", night: "#7fc39d" },
    usage: "Confirmation text and icons on surface-page and surface-raised. Always paired with a word — never hue alone against danger.",
    textOn: "surface-page",
  },
  {
    id: "C18",
    name: "attention",
    value: { paper: "#7d5a0c", night: "#e0c170" },
    usage: "Warning text and icons on surface-page and surface-raised. Always paired with a word.",
    textOn: "surface-page",
  },
  {
    id: "C19",
    name: "danger",
    value: { paper: "#94331f", night: "#f0a187" },
    usage: "Error text, destructive actions and validation messages on surface-page and surface-raised. Always paired with a word.",
    textOn: "surface-page",
  },
];

export const typeFamilies: Record<TypeFamily, string> = {
  display: '"Italiana", "Times New Roman", serif',
  ui: '"Chillax", ui-sans-serif, system-ui, sans-serif',
  jp: '"Zen Maru Gothic", "Hiragino Maru Gothic ProN", sans-serif',
  zh: '"Noto Sans SC", "PingFang SC", sans-serif',
};

export const typeGroups: TypeGroup[] = [
  {
    name: "Display",
    family: "display",
    styles: [
      {
        id: "T01",
        name: "display-xl",
        fontSize: "88px",
        lineHeight: "0.95",
        fontWeight: 400,
        letterSpacing: "0.01em",
        sample: "Kurogane",
        usage: "The wordmark and one hero line per page. Never more than eight words.",
      },
      {
        id: "T02",
        name: "display-l",
        fontSize: "62px",
        lineHeight: "1.08",
        fontWeight: 400,
        letterSpacing: "0.01em",
        sample: "A quiet companion",
        usage: "Section openers on marketing surfaces. Set in ink on surface-page.",
      },
      {
        id: "T03",
        name: "display-m",
        fontSize: "40px",
        lineHeight: "1.15",
        fontWeight: 400,
        letterSpacing: "0.015em",
        sample: "Seasonal colours",
        usage: "Editorial subheads and pull quotes. The smallest size Italiana is permitted at — below 40px it thins out.",
      },
    ],
  },
  {
    name: "Text",
    family: "ui",
    styles: [
      {
        id: "T04",
        name: "title-l",
        fontSize: "30px",
        lineHeight: "1.25",
        fontWeight: 600,
        letterSpacing: "-0.015em",
        usage: "Screen titles in the product UI, where Italiana never goes.",
      },
      {
        id: "T05",
        name: "title-m",
        fontSize: "23px",
        lineHeight: "1.3",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        usage: "Card and section headings.",
      },
      {
        id: "T06",
        name: "title-s",
        fontSize: "19px",
        lineHeight: "1.35",
        fontWeight: 600,
        usage: "Dense list headings and dialog titles.",
      },
      {
        id: "T07",
        name: "body-l",
        fontSize: "19px",
        lineHeight: "1.65",
        fontWeight: 400,
        usage: "Body copy on resident-facing screens. The default there — never step below it.",
      },
      {
        id: "T08",
        name: "body",
        fontSize: "17px",
        lineHeight: "1.6",
        fontWeight: 400,
        usage: "Body copy on staff and marketing surfaces. The default everywhere else.",
      },
      {
        id: "T09",
        name: "body-s",
        fontSize: "15px",
        lineHeight: "1.55",
        fontWeight: 400,
        usage: "Secondary copy and table cells on staff surfaces only. Never on a resident-facing screen.",
      },
      {
        id: "T10",
        name: "label",
        fontSize: "14px",
        lineHeight: "1.3",
        fontWeight: 600,
        usage: "Buttons, chips, tabs and form labels. Sentence case, never all caps.",
      },
      {
        id: "T11",
        name: "overline",
        fontSize: "12px",
        lineHeight: "1.4",
        fontWeight: 500,
        letterSpacing: "0.22em",
        usage: "Eyebrow lines above a display heading. Set in ink-subtle, uppercase, one line only.",
      },
      {
        id: "T12",
        name: "caption",
        fontSize: "13px",
        lineHeight: "1.5",
        fontWeight: 400,
        usage: "Image captions, timestamps and helper text. Set in ink-muted.",
      },
      {
        id: "T13",
        name: "numeral",
        fontSize: "40px",
        lineHeight: "1",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        usage: "Times, counts and readings in dashboards. Proportional figures — do not switch on tabular-nums, which splits Chillax's colon and decimal.",
      },
    ],
  },
  {
    name: "Japanese",
    family: "jp",
    styles: [
      {
        id: "T14",
        name: "jp-display-xl",
        fontSize: "72px",
        lineHeight: "1.2",
        fontWeight: 500,
        sample: "ロボットを、日本の介護の力へ。",
        usage: "The one hero headline per page in Japanese or Chinese. Sits under an Italiana display-l tagline; never both languages at this size on one screen.",
      },
      {
        id: "T15",
        name: "jp-display-l",
        fontSize: "56px",
        lineHeight: "1.3",
        fontWeight: 500,
        sample: "一緒に、日本の介護を前へ。",
        usage: "CJK section openers on marketing surfaces, the counterpart of display-l.",
      },
      {
        id: "T16",
        name: "jp-display",
        fontSize: "32px",
        lineHeight: "1.5",
        fontWeight: 500,
        usage: "Japanese headlines. Zen Maru Gothic carries every Japanese string — Italiana has no Japanese glyphs and must never be asked for them.",
      },
      {
        id: "T17",
        name: "jp-body-l",
        fontSize: "19px",
        lineHeight: "1.9",
        fontWeight: 400,
        usage: "Japanese body copy on resident-facing screens.",
      },
      {
        id: "T18",
        name: "jp-body",
        fontSize: "17px",
        lineHeight: "1.85",
        fontWeight: 400,
        usage: "Japanese body copy everywhere else. Japanese always takes looser leading than the Latin beside it.",
      },
    ],
  },
  {
    name: "Chinese",
    family: "zh",
    styles: [
      {
        id: "T19",
        name: "zh-display-xl",
        fontSize: "72px",
        lineHeight: "1.2",
        fontWeight: 500,
        sample: "让机器人，成为日本介护的力量。",
        usage: "Chinese hero headline. Noto Sans SC at the jp-display-xl size and leading; Zen Maru Gothic has no Simplified Chinese glyphs.",
      },
      {
        id: "T20",
        name: "zh-body",
        fontSize: "17px",
        lineHeight: "1.85",
        fontWeight: 400,
        usage: "Chinese body copy, same leading as jp-body.",
      },
    ],
  },
];

export const spacingTokens: SpacingToken[] = [
  { id: "S01", name: "space-1", value: "4px", usage: "Gap between an icon and its label." },
  { id: "S02", name: "space-2", value: "8px", usage: "Chip padding, tight stack gaps." },
  { id: "S03", name: "space-3", value: "12px", usage: "Button padding block, list row gaps." },
  { id: "S04", name: "space-4", value: "16px", usage: "The default gap. Card padding on dense screens." },
  { id: "S05", name: "space-6", value: "24px", usage: "Card padding on resident-facing screens, gaps between form fields." },
  { id: "S06", name: "space-8", value: "32px", usage: "Gaps between cards and between sections of a form." },
  { id: "S07", name: "space-12", value: "48px", usage: "Section spacing inside a page." },
  { id: "S08", name: "space-16", value: "64px", usage: "Page margins and the space above a display heading." },
];

export const radiusTokens: RadiusToken[] = [
  { id: "R01", name: "radius-sm", value: "4px", usage: "Inputs, checkboxes, small marks." },
  { id: "R02", name: "radius-md", value: "10px", usage: "Cards, sheets and panels." },
  { id: "R03", name: "radius-lg", value: "20px", usage: "Hero panels, image frames and the large blocks in brand compositions." },
  { id: "R04", name: "radius-pill", value: "999px", usage: "Buttons, chips and tags. The default for anything tappable — rounded shapes carry this brand." },
];

export const shadowNote =
  "Shadows are a last resort. Separate surfaces with hairline first; reach for these only when something genuinely floats above the page.";

export const shadowTokens: ShadowToken[] = [
  {
    id: "X01",
    name: "shadow-soft",
    value: {
      paper: "0 1px 2px rgba(16,46,36,0.06), 0 4px 12px rgba(16,46,36,0.05)",
      night: "0 1px 2px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4)",
    },
    usage: "Popovers, dropdown menus and toasts resting just above surface-page.",
  },
  {
    id: "X02",
    name: "shadow-lift",
    value: {
      paper: "0 8px 28px rgba(16,46,36,0.10)",
      night: "0 8px 28px rgba(0,0,0,0.55)",
    },
    usage: "Modal sheets and dialogs. The only shadow permitted at this strength.",
  },
];

/* ---- v3 site additions ------------------------------------------------
   Not part of Kurogane v2. Measured from robot.com (docs/superpowers/specs/2026-09-23-robot-com-reference.md §5,
   tokensToAdd) so the v3 homepage can match its choreography; the pending v2 motion specification supersedes them. */

export interface DurationToken {
  id: string;
  name: string;
  value: string;
  /** The easing token this duration is normally paired with. */
  pairsWith: string;
  usage: string;
  source: string;
}

export interface EasingToken {
  id: string;
  name: string;
  value: string;
  usage: string;
  source: string;
}

export interface SiteToken {
  id: string;
  name: string;
  value: string;
  usage: string;
  source: string;
}

const kurogane = "Kurogane tokens.json v2";
const robot = "measured from robot.com";

export const siteAdditions = {
  note: "The v2 motion specification is still pending and will supersede these values when it is supplied.",
  durations: [
    { id: "D01", name: "dur-enter", value: "240ms", pairsWith: "ease-enter", usage: "Kurogane default transition: hovers, fades, the v2 product pages.", source: kurogane },
    { id: "D02", name: "dur-slow", value: "320ms", pairsWith: "ease-enter", usage: "Kurogane fade-up on entering the viewport (Reveal, Stagger).", source: kurogane },
    { id: "D03", name: "dur-reveal", value: "400ms", pairsWith: "ease-reveal", usage: "Heading line reveal, product card title words, accordion title on open (M4, M9, M33).", source: robot },
    { id: "D04", name: "dur-roll", value: "300ms", pairsWith: "ease-roll", usage: "Pill label roll-over, footer link fades, thumb hover, video lightbox, menu backdrop (M16, M22–M26, M36, M37).", source: robot },
    { id: "D05", name: "dur-unfold", value: "600ms", pairsWith: "ease-unfold / ease-out-cubic", usage: "Accordion row grow and shrink, new panel fade, media crossfade, chevron flip (M17, M27, M28, M32).", source: robot },
    { id: "D06", name: "dur-menu", value: "1000ms", pairsWith: "ease-expo-out", usage: "Menu open and close height, submenu slide crossfade (M15, M19, M20).", source: robot },
    { id: "D07", name: "dur-scroll", value: "1200ms", pairsWith: "ease-expo-out", usage: "Lenis wheel scroll: one wheel tick settles in 1.2s (M1).", source: robot },
  ] satisfies DurationToken[],
  easings: [
    { id: "E01", name: "ease-enter", value: "cubic-bezier(0.2, 0, 0, 1)", usage: "The one Kurogane ease. Nothing bounces.", source: kurogane },
    { id: "E02", name: "ease-reveal", value: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", usage: "Line and word reveals.", source: robot },
    { id: "E03", name: "ease-roll", value: "cubic-bezier(0.455, 0.03, 0.515, 0.955)", usage: "Hover roll-overs, opacity fades, lightbox.", source: robot },
    { id: "E04", name: "ease-expo-out", value: "cubic-bezier(0.16, 1, 0.3, 1)", usage: "Menu height, header CTA and logo colour on theme swap, Lenis scroll (as a function).", source: robot },
    { id: "E05", name: "ease-out-cubic", value: "cubic-bezier(0.215, 0.61, 0.355, 1)", usage: "Accordion panel, preview label and index fades.", source: robot },
    { id: "E06", name: "ease-unfold", value: "cubic-bezier(0.65, 0, 0.35, 1)", usage: "Accordion flex-grow tween (GSAP power3.inOut, approximated).", source: robot },
  ] satisfies EasingToken[],
  radius: [
    { id: "R05", name: "radius-xl", value: "24px", usage: "Home slabs and cards. robot.com's 26px on the statement and CTA slabs collapses to this.", source: robot },
  ] satisfies SiteToken[],
  surfaces: [
    { id: "G01", name: "glass-on-brand", value: "rgba(255, 255, 255, 0.1)", usage: "Header bar over brand bands, with .glass (backdrop blur 26px).", source: robot },
    { id: "G02", name: "glass-on-page", value: "rgba(16, 46, 36, 0.075)", usage: "Header bar over page and highlight bands: the ink at 7.5%, with .glass.", source: robot },
  ] satisfies SiteToken[],
};

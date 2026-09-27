/** Shared site constants (non-copy data). */
export const EMAIL = "contact@[PLACEHOLDER]"; // TODO: confirm domain (arclin.ai / arclin.jp)

/** Page keys index `t.common.pageLabels`; paths are locale-relative and end in a slash. */
export type PageKey =
  | "robot"
  | "careHomes"
  | "families"
  | "safety"
  | "deployment"
  | "newsroom"
  | "careers"
  | "contact"
  | "privacy"
  | "terms";

export type PageLink = { key: PageKey; path: `/${string}/` };

/** Header nav, in order. Labels come from `t.common.navLabels` at the same index. */
export const NAV: readonly PageLink[] = [
  { key: "robot", path: "/robot/" },
  { key: "careHomes", path: "/care-homes/" },
  { key: "families", path: "/families/" },
  { key: "safety", path: "/safety/" },
  { key: "contact", path: "/contact/" },
];

/** Footer columns, in order. Labels come from `t.common.pageLabels[key]`. */
export const FOOTER_COLUMNS: readonly (readonly PageLink[])[] = [
  [
    { key: "robot", path: "/robot/" },
    { key: "careHomes", path: "/care-homes/" },
    { key: "families", path: "/families/" },
    { key: "safety", path: "/safety/" },
    { key: "deployment", path: "/deployment/" },
  ],
  [
    { key: "newsroom", path: "/newsroom/" },
    { key: "careers", path: "/careers/" },
    { key: "contact", path: "/contact/" },
    { key: "privacy", path: "/privacy/" },
    { key: "terms", path: "/terms/" },
  ],
];

/** @deprecated v2 one-page anchors, one per `t.nav` entry. Removed with the v2 homepage. */
export const NAV_HREFS = ["#mimamori", "#careos", "#process", "#partners"] as const;

export const TREND_POINTS = [
  { year: 2000, value: 17.4 },
  { year: 2010, value: 23.0 },
  { year: 2020, value: 28.6 },
  { year: 2030, value: 30.8 },
  { year: 2040, value: 34.8 },
  { year: 2050, value: 37.1 },
];
export const TREND_PROJECTED_FROM = 2020;

export function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

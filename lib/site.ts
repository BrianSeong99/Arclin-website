/** Shared site constants (non-copy data). */
export const EMAIL = "contact@[PLACEHOLDER]"; // TODO: confirm domain (arclin.ai / arclin.jp)

/** One href per `t.nav` entry, in order. */
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

/** Shared site constants (mirrors the Claude Design template's non-copy data). */
export const EMAIL = "contact@[PLACEHOLDER]"; // TODO: confirm domain (arclin.ai / arclin.jp)

export const NAV_HREFS = ["#about", "#walls", "#mimamori", "#careos", "#method", "#partner", "#company"] as const;

export const TREND_POINTS = [
  { year: 2000, value: 17.4 },
  { year: 2010, value: 23.0 },
  { year: 2020, value: 28.6 },
  { year: 2030, value: 30.8 },
  { year: 2040, value: 34.8 },
  { year: 2050, value: 37.1 },
];
export const TREND_PROJECTED_FROM = 2020;

export type SegId = "day" | "evening" | "night";
export const RING_SEGMENTS: { id: SegId; start: number; end: number }[] = [
  { id: "day", start: 6, end: 17 },
  { id: "evening", start: 17, end: 21 },
  { id: "night", start: 21, end: 6 },
];
export const SCENE_FOR_SEG = { day: "intake", evening: "standup", night: "patrol" } as const;
export const SEG_HOUR = { day: 10, evening: 18.5, night: 2 } as const;

export function segFor(h: number): SegId {
  return h >= 6 && h < 17 ? "day" : h >= 17 && h < 21 ? "evening" : "night";
}

export function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Header theme per band (spec §3.1, M12). robot.com swaps `Header_dark` / `Header_light` / `Header_yellow`
 * the moment a section enters; here an IntersectionObserver watches every `[data-band-tone]` section
 * (<Band> writes the attribute) against a one-pixel line at the header bar's y, and the tone under that line
 * becomes the header theme: brand and night bands → "brand" (glass-on-brand, on-brand text), everything else → "page".
 * The result is written to `<html data-header-theme>` for CSS consumers and pushed to subscribers (useSyncExternalStore).
 */
import type { BandTone } from "./band";

export type HeaderTheme = "brand" | "page";

/** The line the observer reads, in viewport px: the bar centre once the announcement has scrolled away (16 + 48 / 2). */
export const PROBE_Y = 40;
/** The bar's lowest bottom edge: 16 + 44 (announcement offset) + 48 (§3.1). A band starting above it sits under the bar. */
const BAR_REACH = 108;

const listeners = new Set<() => void>();
let current: HeaderTheme | null = null;

export function toneToTheme(tone: string | null | undefined): HeaderTheme {
  const t = tone as BandTone;
  return t === "brand" || t === "night" ? "brand" : "page";
}

/** The current theme, or `fallback` before the observer has resolved one (server render, first paint). */
export function getHeaderTheme(fallback: HeaderTheme = "page"): HeaderTheme {
  return current ?? fallback;
}

export function subscribeHeaderTheme(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function set(next: HeaderTheme) {
  if (current === next) return;
  current = next;
  document.documentElement.dataset.headerTheme = next;
  listeners.forEach((cb) => cb());
}

function sections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-band-tone]"));
}

/**
 * The band under the probe line: the last section (document order) whose top is at or above the line and whose
 * bottom is below it. With the line over the announcement bar (scrollY 0) the first band counts when the bar
 * still reaches it; anywhere else with no band under the line (a gap, below the footer, a page without bands)
 * the theme is "page".
 */
function resolve(list: HTMLElement[]): HeaderTheme {
  let hit: HTMLElement | null = null;
  for (const el of list) {
    const r = el.getBoundingClientRect();
    if (r.top <= PROBE_Y && r.bottom > PROBE_Y) hit = el;
  }
  if (!hit && list.length) {
    const first = list[0].getBoundingClientRect();
    if (first.top > PROBE_Y && first.top < BAR_REACH) hit = list[0];
  }
  return hit ? toneToTheme(hit.dataset.bandTone) : "page";
}

/**
 * Start observing. Returns a stop function. Re-observes on resize (the root margin depends on the viewport height).
 * The first resolution is synchronous, so a caller in useLayoutEffect gets the right theme before paint.
 */
export function startBandTheme(): () => void {
  let list = sections();
  let io: IntersectionObserver | null = null;
  set(resolve(list));

  const observe = () => {
    io?.disconnect();
    list = sections();
    const below = Math.max(0, window.innerHeight - PROBE_Y - 1);
    io = new IntersectionObserver(() => set(resolve(list)), { rootMargin: `-${PROBE_Y}px 0px -${below}px 0px`, threshold: 0 });
    list.forEach((el) => io?.observe(el));
    set(resolve(list));
  };
  observe();
  window.addEventListener("resize", observe);
  return () => {
    window.removeEventListener("resize", observe);
    io?.disconnect();
    io = null;
  };
}

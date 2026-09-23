import { useSyncExternalStore } from "react";
/** Kurogane motion: 200–320ms, one ease, nothing bounces. Mirrors --dur-enter / --ease-enter in globals.css. */
export const DUR_ENTER = 0.24;
export const DUR_SLOW = 0.32;
export const EASE_ENTER: [number, number, number, number] = [0.2, 0, 0, 1];

/**
 * v3 site additions, measured from robot.com (spec §5). Seconds, for motion@13's `transition`.
 * Mirrors --dur-reveal/roll/unfold/menu/scroll and --ease-* in globals.css.
 */
export const DUR = { reveal: 0.4, roll: 0.3, unfold: 0.6, menu: 1, scroll: 1.2 } as const;

type Bezier = [number, number, number, number];
export const EASE: Record<"reveal" | "roll" | "expoOut" | "outCubic" | "unfold", Bezier> = {
  reveal: [0.25, 0.46, 0.45, 0.94],
  roll: [0.455, 0.03, 0.515, 0.955],
  expoOut: [0.16, 1, 0.3, 1],
  outCubic: [0.215, 0.61, 0.355, 1],
  unfold: [0.65, 0, 0.35, 1],
};

/** Lenis easing for M1: the expo-out curve robot.com runs, as a function of progress. */
export const easeExpoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const readReduce = () => window.matchMedia(REDUCE_QUERY).matches;
const serverReduce = () => false;

/**
 * prefers-reduced-motion as a hydration-safe boolean. motion's `useReducedMotion` returns null on the server and
 * true synchronously on the client, so a component that branches its markup on it renders one tree in the static
 * HTML and another on the first client render (hydration mismatch). This reads `false` for the server snapshot and
 * hydration, then re-renders with the real value after mount (§5 reduced-motion rule: end state, no scrub).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduce, readReduce, serverReduce);
}

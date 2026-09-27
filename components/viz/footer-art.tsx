"use client";
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The footer strip the drawing fills (footer.tsx `.footer-art`): 1350 wide at 1440, robot.com's 1414/449 aspect. */
const VIEW_W = 1350;
const VIEW_H = 428.67;

export interface FooterArtProps {
  className?: string;
}

/** drawn: the end state (the server HTML, every reduced-motion render). hidden: the start state. entering: the end state with the transition on. */
type Phase = "drawn" | "hidden" | "entering";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/** Any part of the element inside the viewport right now: the synchronous check behind the pre-paint decision. */
function onScreen(el: Element) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

/**
 * The once-only entrance. The server render and hydration are the end state, so the static HTML
 * shows the finished art. After hydration and before the first client paint (useLayoutEffect, a no-op on the server),
 * the art goes to its start state only when the strip is off screen and motion is not reduced (read from matchMedia
 * directly: the hook still holds the server's `false` at that moment); `prepare` measures whatever the start state
 * needs. The entrance runs once, when 40% of the strip is in view. Reduced motion at any time is the end state, static.
 */
function useEntrance(ref: RefObject<SVGSVGElement | null>, prepare?: (svg: SVGSVGElement) => void): Phase {
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [phase, setPhase] = useState<Phase>("drawn");

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia(REDUCE_QUERY).matches || onScreen(svg)) return;
    prepare?.(svg);
    setPhase("hidden");
  }, [ref, prepare]);

  if (reduce && phase !== "drawn") setPhase("drawn");
  else if (inView && phase === "hidden") setPhase("entering");
  return phase;
}

/* ---- The camellia (decided 2026-09-23 over a pill-petal blossom field) --------------------------------------- */

/**
 * public/dev/drawings/camellia-recraft_v4_1-1.svg (viewBox 0 0 480 581.9, traced at stroke 2), inlined because dev
 * media is gitignored. Of its 50 paths the 6 shorter than 6 units are dropped (2.7–4.3 units: the tracer's junction
 * spurs at petal and leaf joins); nothing else is edited. 44 paths, in the tracer's order: flower, leaves, stems.
 */
const DRAWING_W = 480;
const DRAWING_H = 581.9;
const CAMELLIA_PATHS: readonly string[] = [
  "M 38.4 185.4 L 51.2 185",
  "M 441.6 217.8 L 427.1 217.8",
  "M 44.4 300.5 L 57.6 298.8",
  "M 257.9 49.5 L 255.3 48.2 L 245.1 47.8 L 239.1 49.1 L 233.6 51.6 L 226.8 58.4 L 221.7 69.9 L 213.6 75.9 L 208 81.9 L 205.1 90 L 205.1 98.5 L 207.6 109.6 L 212.7 123.2",
  "M 258.8 49.5 L 260.9 49.1 L 269 43.1 L 280.1 38.4 L 290.3 39.3 L 302.7 44.8 L 318 44.4 L 326.1 48.2 L 331.2 53.3 L 335.9 61.8 L 337.2 69.1",
  "M 336.8 69.5 L 332.1 69.9 L 329.5 72.1",
  "M 337.6 69.5 L 338.9 70.8 L 352.9 75.9 L 361.5 80.2 L 365.7 84 L 369.6 90 L 370.4 95.5 L 368.7 106.2 L 369.6 109.6 L 373.4 116.4 L 374.7 123.2 L 372.1 133.9 L 365.3 143.7",
  "M 328.7 72.1 L 320.1 63.1 L 316.3 61.4 L 310.3 61 L 289.4 67.8 L 281.3 72.5",
  "M 280.9 72.5 L 274.5 64.8 L 270.3 62.7 L 263.9 61.4 L 257 61.4 L 252.4 63.5 L 249.4 67 L 246 76.3 L 239.1 81.9 L 232.3 90 L 231 94.2 L 231 99.8 L 234.9 114.3",
  "M 329.1 72.5 L 333.3 83.6 L 333.3 85.7 L 327.4 98.9 L 325.7 105.7",
  "M 281.3 72.9 L 282.2 77.2 L 285.6 82.7",
  "M 285.6 82.7 L 291.6 81 L 304.4 86.1 L 308.2 89.5 L 309.9 95.5 L 309.9 109.2",
  "M 285.6 82.7 L 280.9 85.3 L 277.1 90.4 L 272.8 90.8 L 269 92.5 L 266.9 94.7 L 265.1 99.3 L 264.7 110.4 L 265.6 114.7 L 269 124.9 L 273.2 132.6 L 273.2 134.7",
  "M 325.2 106.2 L 318.8 106.6 L 310.3 109.6",
  "M 326.1 106.2 L 331.2 107.9 L 334.2 110.9 L 335.9 114.7 L 335.9 119.8 L 331.2 133.9 L 329.5 135.6 L 321.8 138.6",
  "M 309.9 109.6 L 306.1 123.6 L 301.8 131.7 L 296.3 138.1 L 294.6 142",
  "M 234.5 114.7 L 224.7 116 L 219.1 118.5 L 212.7 123.2",
  "M 235.3 114.7 L 239.6 121.9 L 245.1 127.5 L 250.2 130.5 L 258.8 133.4",
  "M 212.7 123.2 L 208.9 128.3 L 205.5 135.6 L 204.6 147.5 L 206.3 152.2 L 213.6 161.6 L 214.4 175.6 L 216.6 181.2 L 221.7 186.7 L 232.3 191 L 238.7 197 L 243 199.1 L 249.4 200.4 L 265.1 200.4",
  "M 259.6 133.4 L 272.8 135.2",
  "M 259.2 133.9 L 249 147.9 L 247.2 152.2 L 247.7 158.6 L 252.4 162.4 L 261.7 164.6 L 266.4 166.7 L 270.7 170.5 L 276.7 180.8 L 280.9 185 L 288.6 187.6",
  "M 273.7 135.2 L 285.6 147.5 L 294.6 142",
  "M 321.4 138.6 L 306.1 139.4 L 297.5 142 L 294.6 142",
  "M 321.8 139 L 322.3 140.7 L 332.5 150.1 L 335.5 155.2",
  "M 364.9 144.1 L 356.8 148.4 L 342.7 150.5 L 335.9 155.2",
  "M 365.3 144.5 L 367.4 147.9 L 368.3 154.8 L 365.3 165.4 L 360.2 176.5 L 351.7 186.3 L 347.4 188.9 L 335 199.5 L 321.8 203.8 L 308.6 202.5 L 300.9 199.9 L 295.8 197 L 289 188.4",
  "M 335.5 155.6 L 332.1 168.8 L 326.9 176.1 L 321.8 178.2 L 305.6 177.3 L 298.4 180.8 L 288.6 187.6",
  "M 51.6 184.6 L 54.6 181.6 L 66.1 179.1 L 74.6 175.6 L 95.5 161.6 L 110 155.2 L 130 151.8 L 138.1 151.8 L 150.9 153.5 L 162.9 156.5 L 172.7 160.3 L 181.6 165 L 193.1 173.1 L 211 191.4 L 226.8 214 L 227.6 217",
  "M 55.9 185.9 L 57.2 184.6 L 64.4 182.9 L 94.2 179.9 L 119.8 180.3 L 142.8 183.3 L 163.3 188.4 L 194.4 199.9 L 211.9 208.9 L 221.7 214.9 L 223.4 217.4",
  "M 55.9 186.7 L 74.2 194 L 81.4 199.1 L 97.2 214 L 110 222.5 L 121.5 227.2 L 133.9 230.2 L 141.5 231 L 161.2 230.6 L 177.3 227.2 L 204.2 219.5 L 211.9 218.3 L 222.1 218.3 L 223.4 217.4",
  "M 288.2 188.4 L 281.8 194.4 L 272.4 199.1",
  "M 272 199.1 L 265.6 200.4",
  "M 272.4 199.5 L 264.7 228.5 L 257 276.7 L 254.9 301.4 L 255.3 322.3 L 256.2 326.5 L 257 327.4 L 259.2 326.9 L 284.3 301.8 L 286.9 300.9",
  "M 265.6 200.8 L 259.2 231 L 255.8 240.4 L 254.1 242.1 L 248.1 237 L 232.3 220 L 227.6 217.4",
  "M 422.4 216.6 L 421.6 215.3 L 401.1 211.9 L 377.2 210.2 L 362.3 211.9 L 352.9 214 L 344.4 217 L 332.9 223 L 320.6 231.9 L 311.2 241.3 L 300.9 255.3 L 293.3 274.9 L 287.7 296.3 L 287.7 300.1",
  "M 422.4 217 L 421.1 218.3 L 406.7 220 L 381.9 225.9 L 363.6 232.8 L 346.6 241.7 L 327.8 254.9 L 309.9 272 L 298 286.5 L 289.4 299.7",
  "M 225.9 217.8 L 226.8 221.2 L 242.1 236.6 L 246 241.7 L 249.8 248.5 L 251.9 255.3 L 251.1 290.3 L 246.4 375.5 L 245.5 376.4",
  "M 426.7 218.3 L 424.6 221.2 L 413 226.8 L 403.2 234.5 L 393.4 244.7 L 381.1 264.3 L 376 270.7 L 367.9 278.8 L 356.8 286.5 L 346.1 291.6 L 334.6 295 L 326.5 296.3 L 301.8 297.5 L 290.7 300.9 L 289.4 300.5",
  "M 60.6 296.3 L 62.7 293.7 L 78.9 283.9 L 84.9 282.2 L 101.9 280.9 L 123.6 274.1 L 130.9 272.8 L 141.5 272.8 L 159 276.2 L 172.2 282.2 L 180.8 287.7 L 195.2 300.9 L 208.9 318.8 L 217.4 334.6 L 222.1 346.1",
  "M 60.6 296.7 L 61.8 297.5 L 83.6 294.6 L 99.3 295 L 116 297.1 L 142 303.5 L 161.6 310.8 L 179.9 319.3 L 199.5 330.8 L 216.6 344.4 L 220 346.6 L 221.7 346.6",
  "M 58 299.2 L 59.7 300.9 L 69.9 302.7 L 81 308.2 L 87.8 314.6 L 96.8 328.7 L 105.3 337.6 L 120.2 347.4 L 136.4 353.8 L 155.2 357.6 L 176.1 358.1 L 188.4 356.4 L 207.2 350.4 L 213.6 350 L 222.1 352.1",
  "M 287.3 301.4 L 286.5 304.8 L 264.7 329.1 L 255.3 342.7 L 251.9 376.8 L 250.2 423.7 L 251.5 445.9 L 254.1 466.3 L 258.3 485.9 L 263 500.4 L 269.8 515.3 L 275.4 524.3 L 275.4 526.4 L 272.4 532 L 269.4 542.2 L 268.1 543.5",
  "M 223.8 350 L 227.2 351.7 L 231 355.5 L 237 363.6 L 243 375.1 L 245.1 376.4",
  "M 222.5 352.5 L 235.3 369.1 L 242.1 385.8 L 243.8 395.1 L 244.3 440.3 L 248.5 476.1 L 256.2 511.9 L 265.1 540.5 L 267.3 543.5",
];

/**
 * Composition, per the brand rule that a plant sits alone in its own space: the drawing's box is 380 tall in the
 * 428.67 strip and centred right of centre at x 930 (the trace carries ~38 units of margin, so the marks themselves
 * span ~330 x 263 with air on every side); nothing else is in the strip. The stroke is 3 in the drawing's units, which
 * at this scale (0.653) is the 2px the hero drawing uses at 1440; the trace itself was made at 2.
 */
const PLANT_H = 380;
const PLANT_SCALE = PLANT_H / DRAWING_H;
const PLANT_X = 930 - (DRAWING_W * PLANT_SCALE) / 2;
const PLANT_Y = (VIEW_H - PLANT_H) / 2;

/**
 * Draw-on timing. Each path wipes in over DRAW_MS on --ease-out-cubic, STAGGER_MS after the previous one, so the whole
 * plant is complete in ~1.6s (700 + 43 x 21). A deliberate exception to the 200–320ms envelope: this is one pen
 * stroke, a single continuous gesture, not an element entering.
 */
const DRAW_MS = 700;
const STAGGER_MS = 21;
/** The hidden offset overshoots by this much: at dash = offset = length exactly, a round cap still prints a dot at every path's start. */
const CAP_PAD = 2;

/** Every path's length, measured once the drawing is in the DOM: the start state needs it for the dash pattern. */
function measurePaths(svg: SVGSVGElement) {
  return Array.from(svg.querySelectorAll("path"), (p) => p.getTotalLength());
}

function Camellia({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [lengths, setLengths] = useState<number[] | null>(null);
  const prepare = useCallback((svg: SVGSVGElement) => setLengths(measurePaths(svg)), []);
  const phase = useEntrance(ref, prepare);

  // Unmeasured (never hidden): the end state exactly as the server rendered it, no dash pattern at all.
  const pathStyle = (i: number): CSSProperties | undefined => {
    const len = lengths?.[i];
    if (len === undefined) return undefined;
    return {
      strokeDasharray: `${len} ${len + CAP_PAD * 2}`,
      strokeDashoffset: phase === "hidden" ? `${len + CAP_PAD}` : "0",
      transition: phase === "entering" ? `stroke-dashoffset ${DRAW_MS}ms var(--ease-out-cubic) ${i * STAGGER_MS}ms` : undefined,
    };
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={cn("block h-auto w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-phase={phase}
    >
      <g transform={`translate(${PLANT_X.toFixed(2)} ${PLANT_Y.toFixed(2)}) scale(${PLANT_SCALE.toFixed(4)})`}>
        {CAMELLIA_PATHS.map((d, i) => (
          <path key={i} d={d} style={pathStyle(i)} />
        ))}
      </g>
    </svg>
  );
}

/**
 * The footer strip's art, replacing robot.com's dot-matrix eyes: one camellia line drawing filling the 1350 x 428.67
 * wrapper on the brand slab, per the brand rule of one plant per composition. Ink comes from the wrapper
 * (`text-on-brand-muted`), never the highlight. Desktop only through className (the footer passes `hidden md:block`).
 */
export function FooterArt({ className }: FooterArtProps) {
  return <Camellia className={className} />;
}

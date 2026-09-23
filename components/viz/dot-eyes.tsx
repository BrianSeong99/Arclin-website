"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** robot.com's footer matrix (spec §3.7): source 2828x898, 47 columns x 15 rows, pitch 60, hole 48. */
export const DOT_COLS = 47;
export const DOT_ROWS = 15;
/** viewBox at half the source scale: pitch 30.085, dot 24 (r 12). At 1350 wide that is pitch 28.72, dot 22.9 (V36). */
const VIEW_W = 1414;
const VIEW_H = 449;
const PITCH_X = VIEW_W / DOT_COLS;
const PITCH_Y = VIEW_H / DOT_ROWS;
const R = 12;

/** A lit run on one row: [row, first column, last column], zero-based. */
type Run = [number, number, number];
/** One held frame: [hold ms, ...runs]. */
type Frame = [number, ...Run[]];

/**
 * The 14 distinct dot states of eyes-normal-to-superhappy.gif, decoded from the captured GIF
 * (112 frames, 110 x 30ms + 1430 + 3900, 8630ms per loop; spec §3.7, M38), with equal
 * consecutive frames merged into holds:
 * 0–510 open eyes; 510–990 bob down a row; 990–1470 back up; 1470–1620 blink (lower squint);
 * 1620–1770 super-happy arcs; 1770–3300 arcs wiggle left-down / centred / right every 180–210ms;
 * 3300–8630 hold on open eyes.
 */
const FRAMES: Frame[] = [
  [510, [1, 17, 19], [1, 28, 30], [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 15, 21], [4, 26, 32], [5, 15, 21], [5, 26, 32], [6, 15, 21], [6, 26, 32], [7, 15, 21], [7, 26, 32], [8, 15, 21], [8, 26, 32], [9, 15, 21], [9, 26, 32], [10, 15, 21], [10, 26, 32], [11, 16, 20], [11, 27, 31], [12, 17, 19], [12, 28, 30]],
  [480, [2, 17, 19], [2, 28, 30], [3, 16, 20], [3, 27, 31], [4, 15, 21], [4, 26, 32], [5, 15, 21], [5, 26, 32], [6, 15, 21], [6, 26, 32], [7, 15, 21], [7, 26, 32], [8, 15, 21], [8, 26, 32], [9, 15, 21], [9, 26, 32], [10, 15, 21], [10, 26, 32], [11, 15, 21], [11, 26, 32], [12, 16, 20], [12, 27, 31], [13, 17, 19], [13, 28, 30]],
  [480, [1, 17, 19], [1, 28, 30], [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 15, 21], [4, 26, 32], [5, 15, 21], [5, 26, 32], [6, 15, 21], [6, 26, 32], [7, 15, 21], [7, 26, 32], [8, 15, 21], [8, 26, 32], [9, 15, 21], [9, 26, 32], [10, 15, 21], [10, 26, 32], [11, 16, 20], [11, 27, 31], [12, 17, 19], [12, 28, 30]],
  [150, [9, 16, 20], [9, 27, 31], [10, 15, 21], [10, 26, 32], [11, 15, 16], [11, 20, 21], [11, 26, 27], [11, 31, 32]],
  [150, [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 14, 16], [4, 20, 22], [4, 25, 27], [4, 31, 33], [5, 14, 15], [5, 21, 22], [5, 25, 26], [5, 32, 33]],
  [180, [2, 26, 30], [3, 15, 19], [3, 25, 31], [4, 14, 20], [4, 24, 26], [4, 30, 31], [5, 13, 15], [5, 19, 20], [5, 24, 25], [6, 13, 14], [6, 24, 25], [7, 13, 14]],
  [210, [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 14, 16], [4, 20, 22], [4, 25, 27], [4, 31, 33], [5, 14, 15], [5, 21, 22], [5, 25, 26], [5, 32, 33]],
  [180, [2, 17, 21], [3, 16, 22], [3, 28, 32], [4, 16, 17], [4, 21, 23], [4, 27, 33], [5, 22, 23], [5, 27, 28], [5, 32, 34], [6, 22, 23], [6, 33, 34], [7, 33, 34]],
  [210, [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 14, 16], [4, 20, 22], [4, 25, 27], [4, 31, 33], [5, 14, 15], [5, 21, 22], [5, 25, 26], [5, 32, 33]],
  [210, [2, 26, 30], [3, 15, 19], [3, 25, 31], [4, 14, 20], [4, 24, 26], [4, 30, 31], [5, 13, 15], [5, 19, 20], [5, 24, 25], [6, 13, 14], [6, 24, 25], [7, 13, 14]],
  [180, [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 14, 16], [4, 20, 22], [4, 25, 27], [4, 31, 33], [5, 14, 15], [5, 21, 22], [5, 25, 26], [5, 32, 33]],
  [180, [2, 17, 21], [3, 16, 22], [3, 28, 32], [4, 16, 17], [4, 21, 23], [4, 27, 33], [5, 22, 23], [5, 27, 28], [5, 32, 34], [6, 22, 23], [6, 33, 34], [7, 33, 34]],
  [180, [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 14, 16], [4, 20, 22], [4, 25, 27], [4, 31, 33], [5, 14, 15], [5, 21, 22], [5, 25, 26], [5, 32, 33]],
  [5330, [1, 17, 19], [1, 28, 30], [2, 16, 20], [2, 27, 31], [3, 15, 21], [3, 26, 32], [4, 15, 21], [4, 26, 32], [5, 15, 21], [5, 26, 32], [6, 15, 21], [6, 26, 32], [7, 15, 21], [7, 26, 32], [8, 15, 21], [8, 26, 32], [9, 15, 21], [9, 26, 32], [10, 15, 21], [10, 26, 32], [11, 16, 20], [11, 27, 31], [12, 17, 19], [12, 28, 30]],
];

/** Total loop length in ms: 8630, as the GIF. */
export const DOT_EYES_LOOP_MS = FRAMES.reduce((sum, f) => sum + f[0], 0);

/** The static GIF robot.com shows before entry is the open-eyes frame. */
const STATIC_FRAME = 0;

const cx = (c: number) => +((c + 0.5) * PITCH_X).toFixed(2);
const cy = (r: number) => +((r + 0.5) * PITCH_Y).toFixed(2);

export interface DotEyesProps {
  className?: string;
  /**
   * auto (default): play once the whole grid is in view, from frame 0 on every entry, and fall back to the
   * static frame when the grid has left below the viewport again (M38's onEnter "bottom bottom" /
   * onLeaveBack "top bottom"). true / false force the state (stories, tests).
   */
  play?: "auto" | boolean;
}

/**
 * The footer dot matrix (spec §3.7, M38, V36): 47 x 15 dots, unlit at on-brand 12%, lit in the highlight,
 * stepping through the robot.com eye timeline (open, bob, blink, arcs, wiggle, hold; 8630ms loop) as a
 * timer-driven frame table. Desktop only: hidden below 768, where the observer never fires.
 * Reduced motion: the open-eyes frame, static, no timers. No pointer reaction.
 */
export function DotEyes({ className, play = "auto" }: DotEyesProps) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  // A 1px bottom margin absorbs sub-pixel band offsets: scrollY is an integer, so at the exact entry scroll the wrapper
  // bottom can sit a fraction of a pixel below the viewport, where a strict threshold of 1 never fires (V36).
  const fullyIn = useInView(ref, { amount: "all", margin: "0px 0px 1px 0px" });
  const anyIn = useInView(ref, { amount: "some" });
  // Entry: the whole wrapper on screen (robot.com's start "bottom bottom"). Leave-back: none of it (start "top bottom").
  // Partially visible keeps the previous state, so the flag is adjusted during render, not derived.
  const [playing, setPlaying] = useState(false);
  const next = play !== "auto" ? play : fullyIn ? true : anyIn ? playing : false;
  if (next !== playing) setPlaying(next);
  const active = playing && !reduce;

  // Every start and stop returns to frame 0: the GIF restarts on each entry and the static GIF is the open-eyes frame.
  const [frame, setFrame] = useState(STATIC_FRAME);
  const [prevActive, setPrevActive] = useState(active);
  if (prevActive !== active) {
    setPrevActive(active);
    setFrame(STATIC_FRAME);
  }

  // Stepped playback: hold each frame for its delay, then advance; loop like the GIF (NETSCAPE loop 0).
  useEffect(() => {
    if (!active) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const hold = () => {
      timer = setTimeout(() => {
        i = (i + 1) % FRAMES.length;
        setFrame(i);
        hold();
      }, FRAMES[i][0]);
    };
    hold();
    return () => clearTimeout(timer);
  }, [active]);

  const [, ...lit] = FRAMES[frame];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={cn("block h-auto w-full", className)}
      aria-hidden
      data-frame={frame}
      data-playing={active ? "" : undefined}
    >
      {/* unlit grid, drawn once */}
      <g className="fill-on-brand/12">
        {Array.from({ length: DOT_ROWS * DOT_COLS }, (_, i) => (
          <circle key={i} cx={cx(i % DOT_COLS)} cy={cy(Math.floor(i / DOT_COLS))} r={R} />
        ))}
      </g>
      {/* lit runs of the current frame, over the unlit dots */}
      <g className="fill-highlight">
        {lit.map(([r, c0, c1]) =>
          Array.from({ length: c1 - c0 + 1 }, (_, k) => <circle key={`${r}-${c0 + k}`} cx={cx(c0 + k)} cy={cy(r)} r={R} />),
        )}
      </g>
    </svg>
  );
}

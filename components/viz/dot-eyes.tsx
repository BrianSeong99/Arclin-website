"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const COLS = 40;
const ROWS = 12;

/** Which cells light up: two eye ellipses that blink to two arcs. */
function eyes(open: boolean) {
  const on = new Set<number>();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      for (const cx of [13.5, 26.5]) {
        const dx = (c - cx) / 3.2;
        const dy = (r - 5.5) / (open ? 4.6 : 1.4);
        const lid = open ? dx * dx + dy * dy <= 1 : dx * dx + dy * dy <= 1 && r <= 5;
        if (lid) on.add(r * COLS + c);
      }
    }
  return on;
}

/** LED-grid face for the footer, a nod to robot.com's dot-matrix screens. Blinks every few seconds. */
export function DotEyes({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (reduce) return;
    let t2: ReturnType<typeof setTimeout>;
    const t = setInterval(() => {
      setOpen(false);
      t2 = setTimeout(() => setOpen(true), 180);
    }, 4200);
    return () => {
      clearInterval(t);
      clearTimeout(t2);
    };
  }, [reduce]);
  const lit = eyes(open);
  return (
    <svg viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`} className={cn("h-auto w-full", className)} aria-hidden>
      {Array.from({ length: ROWS * COLS }).map((_, i) => (
        <circle key={i} cx={(i % COLS) * 10 + 5} cy={Math.floor(i / COLS) * 10 + 5} r="3.2" fill="currentColor" opacity={lit.has(i) ? 1 : 0.12} />
      ))}
    </svg>
  );
}

"use client";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_ENTER } from "@/lib/motion";

/** Counts up once in view. Proportional figures per Kurogane `numeral` (no tabular-nums). */
export function CountUp({ value, decimals = 0, duration = 1.2, className, suffix }: { value: number; decimals?: number; duration?: number; className?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, { duration, ease: EASE_ENTER, onUpdate: setN });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);
  return (
    <span ref={ref} className={cn("t-numeral", className)}>
      {n.toFixed(decimals)}
      {suffix && <span className="ml-1 text-[0.45em] font-medium">{suffix}</span>}
    </span>
  );
}

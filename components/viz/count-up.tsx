"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CountUp({
  value,
  decimals = 0,
  duration = 1.6,
  className,
  prefix,
  suffix,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix && <span className="text-[0.5em] font-normal text-ink-3">{prefix}</span>}
      {n.toFixed(decimals)}
      {suffix && <span className="text-[0.5em] font-normal text-ink-3">{suffix}</span>}
    </span>
  );
}

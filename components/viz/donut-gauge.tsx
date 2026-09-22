"use client";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_ENTER } from "@/lib/motion";

/** Ring gauge. `value` is displayed; `fraction` (0..1) is the arc fill. Ink track, brand arc. */
export function DonutGauge({ value, fraction, unit, label, className, size = 140 }: { value: number; fraction: number; unit?: string; label?: string; className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [p, setP] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, 1, { duration: 1.2, ease: EASE_ENTER, onUpdate: setP });
    return () => c.stop();
  }, [inView, reduce]);
  const r = 42;
  const circ = 2 * Math.PI * r;
  const arc = Math.max(0, Math.min(1, fraction)) * p;
  const decimals = Number.isInteger(value) ? 0 : 1;
  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-2", className)} style={{ width: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={`${label ?? ""} ${value}${unit ?? ""}`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--hairline)" strokeWidth="6" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--surface-brand)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${arc * circ} ${circ}`} transform="rotate(-90 50 50)" />
        <text x="50" y="54" textAnchor="middle" fill="var(--ink)" fontSize="22" fontWeight="600" className="font-ui">
          {(value * p).toFixed(decimals)}
        </text>
        {unit && (
          <text x="50" y="68" textAnchor="middle" fill="var(--ink-subtle)" fontSize="10" className="font-ui">
            {unit}
          </text>
        )}
      </svg>
      {label && <div className="t-caption text-center font-medium text-ink-muted">{label}</div>}
    </div>
  );
}

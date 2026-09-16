"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Ring gauge. `value` is displayed; `fraction` (0..1) is the arc fill.
 * Designed for the dark console panel; tone="paper" flips the palette.
 */
export function DonutGauge({
  value,
  fraction,
  unit,
  label,
  ok = true,
  tone = "console",
  className,
  size = 160,
}: {
  value: number;
  fraction: number;
  unit?: string;
  label?: string;
  ok?: boolean;
  tone?: "console" | "paper";
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [p, setP] = useState(reduce ? 1 : 0);
  const [jitter, setJitter] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, 1, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: setP });
    // subtle "live" flicker on the number once the arc has settled
    const t = setInterval(() => setJitter((Math.random() - 0.5) * 0.6), 1800);
    return () => {
      c.stop();
      clearInterval(t);
    };
  }, [inView, reduce]);

  const r = 42;
  const circ = 2 * Math.PI * r;
  const arc = Math.max(0, Math.min(1, fraction)) * p;
  const console_ = tone === "console";
  const track = console_ ? "var(--console-line)" : "var(--paper-3)";
  const stroke = ok ? (console_ ? "var(--signal)" : "var(--pine)") : "var(--ember)";
  const shown = value * p + (p >= 0.999 ? jitter : 0);
  const decimals = Number.isInteger(value) ? 0 : 1;

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-3", className)} style={{ width: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={`${label ?? ""} ${value}${unit ?? ""}`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke={track} strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${arc * circ} ${circ}`}
          transform="rotate(-90 50 50)"
        />
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 50 + Math.cos(a) * 33;
          const y1 = 50 + Math.sin(a) * 33;
          const x2 = 50 + Math.cos(a) * (i % 6 === 0 ? 29 : 31);
          const y2 = 50 + Math.sin(a) * (i % 6 === 0 ? 29 : 31);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={track} strokeWidth="1" />;
        })}
        <text x="50" y="52" textAnchor="middle" className={cn("font-mono text-[18px] tabular", console_ ? "fill-console-text" : "fill-ink")}>
          {shown.toFixed(decimals)}
        </text>
        {unit && (
          <text x="50" y="64" textAnchor="middle" className={cn("font-mono text-[8px] tracking-widest", console_ ? "fill-console-muted" : "fill-ink-3")}>
            {unit}
          </text>
        )}
      </svg>
      {label && <div className={cn("text-center text-sm font-medium", console_ ? "text-console-text" : "text-ink")}>{label}</div>}
    </div>
  );
}

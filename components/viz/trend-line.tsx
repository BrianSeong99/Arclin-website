"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type TrendPoint = { year: number; value: number };

/**
 * Minimal SVG line chart. Points after `projectedFrom` are drawn dashed.
 * Path draws itself on load (CSS, reduced-motion safe).
 */
export function TrendLine({
  points,
  projectedFrom,
  unit = "",
  className,
}: {
  points: readonly TrendPoint[];
  projectedFrom?: number;
  unit?: string;
  className?: string;
}) {
  const id = useId();
  const W = 560;
  const H = 200;
  const pad = { l: 36, r: 24, t: 20, b: 30 };
  const xs = points.map((p) => p.year);
  const ys = points.map((p) => p.value);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.floor(Math.min(...ys) / 5) * 5;
  const yMax = Math.ceil(Math.max(...ys) / 5) * 5;
  const x = (v: number) => pad.l + ((v - xMin) / (xMax - xMin)) * (W - pad.l - pad.r);
  const y = (v: number) => H - pad.b - ((v - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);

  const split = projectedFrom ?? Infinity;
  const solid = points.filter((p) => p.year <= split);
  const dashed = points.filter((p) => p.year >= split);
  const d = (ps: readonly TrendPoint[]) => ps.map((p, i) => `${i ? "L" : "M"}${x(p.year).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const last = points[points.length - 1];
  const areaPath = `${d(points)} L${x(last.year).toFixed(1)},${H - pad.b} L${x(points[0].year).toFixed(1)},${H - pad.b} Z`;
  const ticks = [yMin, (yMin + yMax) / 2, yMax];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} role="img" aria-label="trend">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--pine)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--pine)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((tv) => (
        <g key={tv}>
          <line x1={pad.l} x2={W - pad.r} y1={y(tv)} y2={y(tv)} stroke="var(--line)" strokeDasharray="2 4" />
          <text x={pad.l - 8} y={y(tv) + 4} textAnchor="end" className="fill-ink-3 font-mono text-[10px]">
            {tv}
            {unit}
          </text>
        </g>
      ))}
      {points.map((p) => (
        <text key={p.year} x={x(p.year)} y={H - 8} textAnchor="middle" className="fill-ink-3 font-mono text-[10px]">
          {p.year}
        </text>
      ))}
      <path d={areaPath} fill={`url(#${id}-fill)`} />
      <path d={d(solid)} fill="none" stroke="var(--pine)" strokeWidth="2" strokeLinecap="round" className="anim-draw" style={{ ["--len" as string]: 600 }} />
      {dashed.length > 1 && (
        <path
          d={d(dashed)}
          fill="none"
          stroke="var(--pine)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 6"
          opacity="0.7"
        />
      )}
      {points.map((p) => (
        <circle key={p.year} cx={x(p.year)} cy={y(p.value)} r="3" fill={p.year > split ? "var(--paper)" : "var(--pine)"} stroke="var(--pine)" strokeWidth="1.5" />
      ))}
      {projectedFrom && (
        <text x={x(projectedFrom) + 6} y={pad.t + 4} className="fill-ink-3 font-mono text-[9px] uppercase tracking-widest">
          est.
        </text>
      )}
    </svg>
  );
}

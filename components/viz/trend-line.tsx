"use client";
import { cn } from "@/lib/utils";

export type TrendPoint = { year: number; value: number };

/** Minimal SVG line chart in ink; points after `projectedFrom` are dashed. */
export function TrendLine({ points, projectedFrom, unit = "", label = "trend", className }: { points: readonly TrendPoint[]; projectedFrom?: number; unit?: string; label?: string; className?: string }) {
  const W = 560;
  const H = 200;
  const pad = { l: 40, r: 24, t: 20, b: 30 };
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
  const ticks = [yMin, (yMin + yMax) / 2, yMax];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} role="img" aria-label={label}>
      {ticks.map((tv) => (
        <g key={tv}>
          <line x1={pad.l} x2={W - pad.r} y1={y(tv)} y2={y(tv)} stroke="var(--hairline)" />
          <text x={pad.l - 8} y={y(tv) + 4} textAnchor="end" fill="var(--ink-subtle)" fontSize="11" className="font-ui">
            {tv}
            {unit}
          </text>
        </g>
      ))}
      {points.map((p) => (
        <text key={p.year} x={x(p.year)} y={H - 8} textAnchor="middle" fill="var(--ink-subtle)" fontSize="11" className="font-ui">
          {p.year}
        </text>
      ))}
      <path d={d(solid)} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      {dashed.length > 1 && <path d={d(dashed)} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />}
      {points.map((p) => (
        <circle key={p.year} cx={x(p.year)} cy={y(p.value)} r="4" fill={p.year > split ? "var(--surface-raised)" : "var(--ink)"} stroke="var(--ink)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

"use client";

import { useReducedMotion } from "motion/react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Isometric wireframe floor plan of a care floor with the robot's patrol path tracing live,
 * ping rings on events and mono room labels. Pure SVG; strokes follow the surface tone.
 * `focus` lights one zone ("day" common room, "evening" dining, "night" bedrooms).
 */
export type FloorFocus = "day" | "evening" | "night" | null;

const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const U = 46; // px per floor unit

function iso(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * COS * U, (x + y) * SIN * U - z * U];
}
const P = (pts: [number, number][]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

type Room = { id: string; x: number; y: number; w: number; h: number; label: string; zone: Exclude<FloorFocus, null>; beds?: number };
const ROOMS: Room[] = [
  { id: "r1", x: 0, y: 0, w: 3, h: 3, label: "ROOM 1", zone: "night", beds: 1 },
  { id: "r2", x: 3, y: 0, w: 3, h: 3, label: "ROOM 2", zone: "night", beds: 1 },
  { id: "r3", x: 6, y: 0, w: 3, h: 3, label: "ROOM 3", zone: "night", beds: 1 },
  { id: "st", x: 9, y: 0, w: 3, h: 3, label: "STATION", zone: "day" },
  { id: "cm", x: 0, y: 5, w: 6, h: 3, label: "COMMON", zone: "day" },
  { id: "dn", x: 6, y: 5, w: 6, h: 3, label: "DINING", zone: "evening" },
];
// patrol: corridor y=4, detour into room 3 and the common room
const ROUTE: [number, number][] = [
  [0.4, 4], [7.5, 4], [7.5, 1.4], [7.5, 4], [11.6, 4], [7.5, 4], [3, 4], [3, 6.6], [3, 4], [0.4, 4],
];
const EVENTS: { at: [number, number]; zone: Exclude<FloorFocus, null> }[] = [
  { at: [7.5, 1.4], zone: "night" },
  { at: [2.2, 6.6], zone: "day" },
  { at: [9.5, 6.4], zone: "evening" },
];

export function FloorPlan({ tone = "paper", focus = null, className, compact = false }: { tone?: "paper" | "console"; focus?: FloorFocus; className?: string; compact?: boolean }) {
  const reduce = useReducedMotion();
  const console_ = tone === "console";
  const stroke = console_ ? "var(--console-muted)" : "var(--ink)";
  const accent = console_ ? "var(--signal)" : "var(--pine)";
  const fillOn = console_ ? "var(--signal)" : "var(--pine)";
  const dim = console_ ? 0.55 : 0.32;

  const route = useMemo(() => ROUTE.map(([x, y]) => iso(x, y, 0.02)), []);
  const routeD = route.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  // bounds: floor 12x8 → compute viewBox
  const corners = [iso(0, 0, 0.7), iso(12, 0), iso(12, 8), iso(0, 8)];
  const xs = corners.map((c) => c[0]);
  const ys = corners.map((c) => c[1]);
  const minX = Math.min(...xs) - 24;
  const maxX = Math.max(...xs) + 24;
  const minY = Math.min(...ys) - 30;
  const maxY = Math.max(...ys) + 20;

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      className={cn("h-auto w-full", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="floor plan"
    >
      {/* floor slab */}
      <polygon points={P([iso(0, 0), iso(12, 0), iso(12, 8), iso(0, 8)])} fill={stroke} fillOpacity={console_ ? 0.05 : 0.035} stroke={stroke} strokeOpacity={dim} strokeWidth="1" />
      {/* corridor */}
      <polygon points={P([iso(0, 3), iso(12, 3), iso(12, 5), iso(0, 5)])} fill={stroke} fillOpacity={console_ ? 0.06 : 0.04} stroke="none" />
      {/* rooms */}
      {ROOMS.map((r) => {
        const on = focus === r.zone;
        const base = [iso(r.x, r.y), iso(r.x + r.w, r.y), iso(r.x + r.w, r.y + r.h), iso(r.x, r.y + r.h)] as [number, number][];
        const h = 0.55;
        const top = [iso(r.x, r.y, h), iso(r.x + r.w, r.y, h), iso(r.x + r.w, r.y + r.h, h), iso(r.x, r.y + r.h, h)] as [number, number][];
        const lbl = iso(r.x + 0.25, r.y + r.h - 0.25, h);
        return (
          <g key={r.id} className="transition-opacity duration-500">
            <polygon points={P(base)} fill={on ? fillOn : "none"} fillOpacity={on ? (console_ ? 0.14 : 0.1) : 0} stroke={stroke} strokeOpacity={dim} strokeWidth="1" />
            {/* wall verticals at corners */}
            {base.map(([bx, by], i) => (
              <line key={i} x1={bx} y1={by} x2={top[i][0]} y2={top[i][1]} stroke={stroke} strokeOpacity={dim * 0.8} strokeWidth="1" />
            ))}
            <polygon points={P(top)} stroke={on ? accent : stroke} strokeOpacity={on ? 0.9 : dim} strokeWidth={on ? 1.2 : 1} fill="none" />
            {/* beds */}
            {r.beds &&
              Array.from({ length: r.beds }).map((_, i) => {
                const bx = r.x + 0.6 + i * 1.3;
                const by = r.y + 0.6;
                return <polygon key={i} points={P([iso(bx, by), iso(bx + 0.9, by), iso(bx + 0.9, by + 1.7), iso(bx, by + 1.7)])} stroke={stroke} strokeOpacity={dim} strokeWidth="1" fill={stroke} fillOpacity={0.04} />;
              })}
            {!compact && (
              <text x={lbl[0]} y={lbl[1] - 6} fill={on ? accent : stroke} fillOpacity={on ? 1 : 0.6} fontSize="9" letterSpacing="1.5" className="font-mono">
                {r.label}
              </text>
            )}
          </g>
        );
      })}
      {/* patrol route */}
      <path d={routeD} stroke={accent} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4" />
      <path d={routeD} stroke={accent} strokeWidth="1.5" className="anim-draw" style={{ ["--len" as string]: 2400 }} />
      {/* robot */}
      <g>
        <circle r="4.5" fill={console_ ? "var(--console)" : "var(--paper)"} stroke={accent} strokeWidth="1.5">
          {!reduce && <animateMotion dur="18s" repeatCount="indefinite" path={routeD} />}
        </circle>
        <circle r="1.6" fill={accent}>{!reduce && <animateMotion dur="18s" repeatCount="indefinite" path={routeD} />}</circle>
      </g>
      {/* event pings */}
      {EVENTS.map((e, i) => {
        const [x, y] = iso(e.at[0], e.at[1], 0.05);
        const on = !focus || focus === e.zone;
        return (
          <g key={i} opacity={on ? 1 : 0.25} className="transition-opacity duration-500">
            <circle cx={x} cy={y} r="7" stroke={accent} strokeWidth="1" className="anim-ping" style={{ animationDelay: `${i * 0.8}s` }} />
            <circle cx={x} cy={y} r="2" fill={accent} />
          </g>
        );
      })}
    </svg>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type IsoLayer = { id: string; name: string; owner: "partner" | "arclin" };

const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const U = 34;
const iso = (x: number, y: number): [number, number] => [(x - y) * COS * U, (x + y) * SIN * U];
const P = (pts: [number, number][]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/**
 * Wire-isometric layer stack (top layer first in `layers`), exploding on reveal.
 * Ember dashed planes mark every owner boundary. `activeId` lifts and highlights a layer.
 */
export function IsoStack({ layers, activeId, onActiveChange, tone = "paper", className }: { layers: readonly IsoLayer[]; activeId?: string | null; onActiveChange?: (id: string | null) => void; tone?: "paper" | "console"; className?: string }) {
  const reduce = useReducedMotion();
  const console_ = tone === "console";
  const stroke = console_ ? "var(--console-text)" : "var(--ink)";
  const n = layers.length;
  const W = 6;
  const gap = 58; // px between exploded layers
  const slab = [iso(0, 0), iso(W, 0), iso(W, W), iso(0, W)] as [number, number][];
  const totalH = gap * (n - 1) + 60;
  const cx = 0;
  const minX = iso(0, W)[0] - 30;
  const maxX = iso(W, 0)[0] + 150;
  return (
    <svg viewBox={`${minX} ${-totalH + 20} ${maxX - minX} ${totalH + iso(W, W)[1] + 30}`} className={cn("h-auto w-full", className)} fill="none" role="img" aria-label="layer stack">
      {[...layers].reverse().map((l, iFromBottom) => {
        const i = n - 1 - iFromBottom; // index in original (top-first) order
        const on = activeId === l.id;
        const yOff = -iFromBottom * gap - (on ? 14 : 0);
        const isBoundary = iFromBottom > 0 && [...layers].reverse()[iFromBottom - 1].owner !== l.owner;
        const labelAnchor = iso(W, W / 2);
        const fill = l.owner === "arclin" ? "var(--pine)" : console_ ? "var(--console-muted)" : "var(--sand)";
        return (
          <motion.g
            key={l.id}
            initial={reduce ? false : { y: -iFromBottom * 12, opacity: 0 }}
            whileInView={{ y: yOff, opacity: 1 }}
            animate={{ y: yOff }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: reduce ? 0 : 0.08 * iFromBottom }}
            onMouseEnter={() => onActiveChange?.(l.id)}
            onMouseLeave={() => onActiveChange?.(null)}
            style={{ cursor: onActiveChange ? "pointer" : undefined }}
          >
            {isBoundary && (
              <polygon
                points={P([iso(-0.5, -0.5), iso(W + 0.5, -0.5), iso(W + 0.5, W + 0.5), iso(-0.5, W + 0.5)])}
                transform={`translate(${cx} ${gap / 2})`}
                stroke="var(--ember)"
                strokeDasharray="3 4"
                strokeWidth="1"
                fill="var(--ember)"
                fillOpacity="0.08"
              />
            )}
            {/* slab: thin extrusion */}
            <polygon points={P(slab.map(([x, y]) => [x, y + 6]))} stroke={stroke} strokeOpacity="0.25" strokeWidth="1" />
            <polygon points={P(slab)} fill={fill} fillOpacity={on ? 0.28 : l.owner === "arclin" ? 0.14 : 0.35} stroke={on ? "var(--signal)" : stroke} strokeOpacity={on ? 1 : 0.7} strokeWidth={on ? 1.5 : 1} />
            {/* inner module grid */}
            {[1.2, 3, 4.8].map((x) => (
              <polygon key={x} points={P([iso(x, 1.2), iso(x + 1, 1.2), iso(x + 1, 2.2), iso(x, 2.2)])} stroke={stroke} strokeOpacity="0.45" strokeWidth="0.8" />
            ))}
            <polygon points={P([iso(1.2, 3.4), iso(4.8, 3.4), iso(4.8, 4.8), iso(1.2, 4.8)])} stroke={stroke} strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 2" />
            {/* leader + label */}
            <line x1={labelAnchor[0]} y1={labelAnchor[1]} x2={labelAnchor[0] + 40} y2={labelAnchor[1]} stroke={stroke} strokeOpacity="0.4" strokeWidth="1" />
            <text x={labelAnchor[0] + 46} y={labelAnchor[1] - 4} fill={on ? (console_ ? "var(--signal)" : "var(--pine)") : stroke} fillOpacity={on ? 1 : 0.55} fontSize="9" letterSpacing="1.5" className="font-mono">
              L{n - i} · {l.owner === "arclin" ? "ARCLIN" : "PARTNER"}
            </text>
            <text x={labelAnchor[0] + 46} y={labelAnchor[1] + 9} fill={stroke} fillOpacity={on ? 1 : 0.8} fontSize="11" fontWeight="500" className="font-display">
              {l.name}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

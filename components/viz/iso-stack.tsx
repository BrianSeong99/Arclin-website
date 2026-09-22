"use client";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DUR_SLOW, EASE_ENTER } from "@/lib/motion";

export type IsoLayer = { id: string; name: string; owner: "partner" | "arclin" };

const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const U = 34;
const iso = (x: number, y: number): [number, number] => [(x - y) * COS * U, (x + y) * SIN * U];
const P = (pts: [number, number][]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/**
 * Isometric layer stack (top layer first in `layers`) in `currentColor`. Arclin's layers are
 * filled with the brand slab colour, the partner's stay outline; the owner boundary is a dashed plane.
 */
export function IsoStack({ layers, className, labels }: { layers: readonly IsoLayer[]; className?: string; labels: { partner: string; arclin: string } }) {
  const reduce = useReducedMotion();
  const n = layers.length;
  const W = 6;
  const gap = 56;
  const slab = [iso(0, 0), iso(W, 0), iso(W, W), iso(0, W)] as [number, number][];
  const totalH = gap * (n - 1) + 60;
  const minX = iso(0, W)[0] - 30;
  const maxX = iso(W, 0)[0] + 170;
  const bottomFirst = [...layers].reverse();
  return (
    <svg viewBox={`${minX} ${-totalH + 20} ${maxX - minX} ${totalH + iso(W, W)[1] + 30}`} className={cn("h-auto w-full", className)} fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="layer stack">
      {bottomFirst.map((l, i) => {
        const yOff = -i * gap;
        const isBoundary = i > 0 && bottomFirst[i - 1].owner !== l.owner;
        const anchor = iso(W, W / 2);
        const arclin = l.owner === "arclin";
        return (
          <motion.g key={l.id} initial={reduce ? false : { y: yOff + 16, opacity: 0 }} whileInView={{ y: yOff, opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: DUR_SLOW, ease: EASE_ENTER, delay: reduce ? 0 : 0.06 * i }}>
            {isBoundary && <polygon points={P([iso(-0.5, -0.5), iso(W + 0.5, -0.5), iso(W + 0.5, W + 0.5), iso(-0.5, W + 0.5)])} transform={`translate(0 ${gap / 2})`} stroke="var(--highlight-edge)" strokeDasharray="3 4" />}
            <polygon points={P(slab.map(([x, y]) => [x, y + 6]))} opacity="0.4" />
            <polygon points={P(slab)} fill={arclin ? "var(--surface-brand)" : "var(--surface-raised)"} stroke={arclin ? "var(--surface-brand)" : "currentColor"} />
            {[1.2, 3, 4.8].map((x) => (
              <polygon key={x} points={P([iso(x, 1.2), iso(x + 1, 1.2), iso(x + 1, 2.2), iso(x, 2.2)])} stroke={arclin ? "var(--on-brand-muted)" : "currentColor"} strokeWidth="1" opacity="0.7" />
            ))}
            <line x1={anchor[0]} y1={anchor[1]} x2={anchor[0] + 40} y2={anchor[1]} opacity="0.5" />
            <text x={anchor[0] + 46} y={anchor[1] - 5} fill="var(--ink-subtle)" stroke="none" fontSize="10" letterSpacing="2" className="font-ui">
              {arclin ? labels.arclin : labels.partner}
            </text>
            <text x={anchor[0] + 46} y={anchor[1] + 10} fill="currentColor" stroke="none" fontSize="12" fontWeight="600" className="font-ui">
              {l.name}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

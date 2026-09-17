"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type Layer = { id: string; name: string; owner: "partner" | "arclin"; body: string };

/** Small isometric slab glyph, coloured by owner. */
function SlabGlyph({ owner, active }: { owner: Layer["owner"]; active: boolean }) {
  const fill = owner === "arclin" ? "var(--pine)" : "var(--sand)";
  return (
    <svg viewBox="0 0 40 28" className={cn("size-8 transition-transform duration-500 ease-out-expo", active && "-translate-y-0.5")} aria-hidden>
      <path d="M20 2 L38 11 L20 20 L2 11 Z" fill={fill} fillOpacity={owner === "arclin" ? 0.9 : 1} />
      <path d="M2 11 V16 L20 25 V20 Z" fill={fill} fillOpacity={owner === "arclin" ? 0.6 : 0.8} />
      <path d="M38 11 V16 L20 25 V20 Z" fill={fill} fillOpacity={owner === "arclin" ? 0.75 : 0.9} />
      <path d="M20 2 L38 11 L20 20 L2 11 Z M2 11 V16 L20 25 V20 M38 11 V16 L20 25" fill="none" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * Layer ledger: hairline rows (top layer first), large layer index, iso-slab glyph, owner chip.
 * An ember band marks every IP/responsibility boundary between owners.
 * `activeId` / `onActiveChange` let a companion 3D stack and the list highlight each other.
 */
export function LayerStack({
  layers,
  labels,
  activeId,
  onActiveChange,
  className,
}: {
  layers: readonly Layer[];
  labels: { ip: string; partner: string; arclin: string };
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <ol className={cn("border-t border-line-strong", className)}>
      {layers.map((l, i) => {
        const boundary = i > 0 && layers[i - 1].owner !== l.owner;
        const active = activeId === l.id;
        return (
          <li key={l.id} className="contents">
            {boundary && (
              <motion.div
                aria-hidden
                className="relative my-1 flex items-center gap-3 py-2"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i + 0.2 }}
              >
                <span className="h-px flex-1 border-t border-dashed border-ember/70" />
                <span className="rounded-full border border-ember/50 bg-ember/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-ember">{labels.ip}</span>
                <span className="h-px flex-1 border-t border-dashed border-ember/70" />
              </motion.div>
            )}
            <motion.div
              onMouseEnter={() => onActiveChange?.(l.id)}
              onMouseLeave={() => onActiveChange?.(null)}
              onFocus={() => onActiveChange?.(l.id)}
              onBlur={() => onActiveChange?.(null)}
              tabIndex={0}
              className={cn(
                "group grid grid-cols-[3.25rem_2.5rem_1fr] items-start gap-x-4 border-b border-line py-5 transition-colors duration-300 sm:grid-cols-[4rem_2.75rem_1fr_auto] sm:py-6",
                active && (l.owner === "arclin" ? "bg-sage/35" : "bg-sand/50"),
              )}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={cn("pl-1 font-mono text-[22px] leading-none tracking-[-0.02em] transition-colors sm:text-[26px]", active ? "text-pine" : "text-ink-3")}>
                L{layers.length - i}
              </span>
              <SlabGlyph owner={l.owner} active={active} />
              <div className="min-w-0">
                <h3 className="text-[19px] font-medium leading-[1.3] text-ink sm:text-[21px]">{l.name}</h3>
                <p className="mt-1.5 max-w-[34em] text-pretty text-sm leading-relaxed text-ink-2">{l.body}</p>
                <span
                  className={cn(
                    "mt-3 inline-block rounded-sm px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] sm:hidden",
                    l.owner === "arclin" ? "bg-pine text-paper" : "bg-sand text-ink-2",
                  )}
                >
                  {l.owner === "arclin" ? labels.arclin : labels.partner}
                </span>
              </div>
              <span
                className={cn(
                  "hidden self-start rounded-sm px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] sm:inline-block",
                  l.owner === "arclin" ? "bg-pine text-paper" : "bg-sand text-ink-2",
                )}
              >
                {l.owner === "arclin" ? labels.arclin : labels.partner}
              </span>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

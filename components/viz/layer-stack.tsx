"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type Layer = { id: string; name: string; owner: "partner" | "arclin"; body: string };

/** Four-layer architecture with the IP boundary drawn between owner groups. */
export function LayerStack({
  layers,
  labels,
  className,
}: {
  layers: readonly Layer[];
  labels: { ip: string; partner: string; arclin: string };
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("grid gap-3 md:grid-cols-[1fr_auto]", className)}>
      <ol className="space-y-3">
        {layers.map((l, i) => {
          const boundary = i > 0 && layers[i - 1].owner !== l.owner;
          return (
            <li key={l.id} className="contents">
              {boundary && (
                <motion.div
                  aria-hidden
                  className="my-1 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ember"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i + 0.3 }}
                >
                  <span className="h-px flex-1 border-t border-dashed border-ember/60" />
                  {labels.ip}
                  <span className="h-px flex-1 border-t border-dashed border-ember/60" />
                </motion.div>
              )}
              <motion.div
                className={cn(
                  "relative flex flex-col gap-1 rounded-md border px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6",
                  l.owner === "arclin" ? "border-pine/40 bg-paper" : "border-line-strong bg-paper-2",
                )}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-[11px] tracking-widest text-ink-3">L{layers.length - i}</span>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-ink">{l.name}</h3>
                  <p className="mt-1 text-sm text-ink-2">{l.body}</p>
                </div>
                <span
                  className={cn(
                    "self-start rounded-sm px-2 py-0.5 font-mono text-[10px] tracking-widest",
                    l.owner === "arclin" ? "bg-pine/10 text-pine" : "bg-ink/5 text-ink-3",
                  )}
                >
                  {l.owner === "arclin" ? labels.arclin : labels.partner}
                </span>
              </motion.div>
            </li>
          );
        })}
      </ol>
      <div aria-hidden className="hidden w-6 md:block" />
    </div>
  );
}

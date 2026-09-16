"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type FlowStep = { id: string; title: string; body: string };

/** Horizontal step flow; nodes light up in sequence as it scrolls into view. */
export function FlowSteps({ steps, className }: { steps: readonly FlowStep[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <ol className={cn("relative grid gap-8 md:grid-cols-4 md:gap-4", className)}>
      {/* connector rail (desktop) */}
      <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-line md:block">
        <motion.div
          className="h-full origin-left bg-pine"
          initial={{ scaleX: reduce ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </div>
      {steps.map((s, i) => (
        <motion.li
          key={s.id}
          className="relative flex gap-4 md:block"
          initial={reduce ? false : { opacity: 0.35 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: reduce ? 0 : 0.35 * i + 0.2, duration: 0.5 }}
        >
          <motion.div
            className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-pine bg-paper font-mono text-sm text-pine"
            initial={reduce ? false : { backgroundColor: "var(--paper)", color: "var(--pine)" }}
            whileInView={{ backgroundColor: "var(--pine)", color: "var(--paper)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: reduce ? 0 : 0.35 * i + 0.3, duration: 0.4 }}
          >
            {String(i + 1).padStart(2, "0")}
          </motion.div>
          <div className="md:mt-5">
            <h3 className="text-base font-medium text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

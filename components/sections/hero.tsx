"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { FloorPlan } from "@/components/viz/floor-plan";
import { Crosshairs } from "@/components/site/crosshairs";
import { cn } from "@/lib/utils";

const cta = "inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14.5px] font-medium transition-colors";

/** Vercel-style centered hero on a fine grid; the live floor-plan console sits in a framed stage below. */
export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const fade = (i: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] as const } };
  const telemetry = [
    { k: "02:14", v: "RISE DETECTED · ROOM 3", tone: "ember" },
    { k: "18:40", v: "INTAKE 320 mL · DINING", tone: "pine" },
    { k: "PATROL", v: "0.4 m/s · 41 dB", tone: "ink" },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] [mask-image:linear-gradient(to_bottom,#000_30%,transparent)]">
        <div className="fine-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[38%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--pine)_22%,transparent),transparent_70%)] blur-2xl" />
      </div>
      <div className="container-x relative pt-[clamp(56px,9vw,120px)]">
        <div className="mx-auto max-w-[760px] text-center">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper/70 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-ink-2 backdrop-blur">
            <span aria-hidden className="size-1.5 rounded-full bg-pine" />
            株式会社智渡仁 · ARCLIN K.K.
          </motion.div>
          <motion.h1 {...fade(1)} className="mt-6 text-balance text-[clamp(38px,5.6vw,72px)] font-semibold leading-[1.1] tracking-[-0.03em]">
            {t.heroH1a}
            <br />
            {t.heroH1b}
          </motion.h1>
          <motion.p {...fade(2)} className="mx-auto mt-6 max-w-[38em] text-pretty text-[clamp(15px,1.25vw,18px)] leading-relaxed text-ink-2">
            {t.heroSub}
          </motion.p>
          <motion.div {...fade(3)} className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#partner" className={cn(cta, "bg-ink text-paper hover:bg-pine")}>
              {t.heroCta1}
              <span aria-hidden>→</span>
            </a>
            <a href="#partner" className={cn(cta, "border border-line-strong bg-paper/70 text-ink backdrop-blur hover:border-ink")}>
              {t.heroCta2}
            </a>
          </motion.div>
          <motion.p {...fade(4)} className="mt-5 text-[13px] text-ink-3">
            {t.heroSub2}
          </motion.p>
        </div>

        {/* stage */}
        <motion.div
          className="relative mx-auto mt-14 max-w-[1100px]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-2xl border border-line-strong bg-[color-mix(in_oklab,var(--paper)_80%,white)] shadow-[0_40px_80px_-60px_rgba(15,20,18,.45)]">
            <Crosshairs />
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] text-ink-3">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-pine anim-blink" />
                MIMAMORI · FLOOR 2 · LIVE
              </span>
              <span>{t.demo}</span>
            </div>
            <div className="relative px-4 pb-4 pt-2 sm:px-8 sm:pb-6">
              <FloorPlan tone="paper" />
              <ul className="pointer-events-none absolute left-6 top-6 hidden flex-col gap-2 sm:flex">
                {telemetry.map((c, i) => (
                  <motion.li
                    key={c.k}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.25, duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-paper/90 px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.12em] text-ink-2 backdrop-blur"
                  >
                    <span aria-hidden className={cn("size-1.5 rounded-full", c.tone === "ember" ? "bg-ember" : c.tone === "pine" ? "bg-pine" : "bg-ink-3")} />
                    <span className="text-ink-3">{c.k}</span>
                    <span>{c.v}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10.5px] tracking-[0.14em] text-ink-3">
            <span>{t.heroCaption}</span>
            <a href="#about" className="hover:text-ink">{t.heroMore} ↓</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { HeroVisual } from "@/components/viz/hero-visual";
import { cn } from "@/lib/utils";

const cta = "inline-flex items-center gap-2 rounded-md px-5 py-[13px] text-[15px] font-medium transition-colors";

/** Full-bleed stage: the 3D scene is the environment on the right, headline sits in front of it. */
export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const fade = (i: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* stage grid, fades toward the text column */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] opacity-40 lg:block [background-image:linear-gradient(var(--paper-3)_1px,transparent_1px),linear-gradient(90deg,var(--paper-3)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_60%_55%,#000_20%,transparent_72%)]"
      />
      <div className="container-x relative grid items-center gap-10 pb-[clamp(40px,6vw,72px)] pt-[clamp(40px,6vw,88px)] lg:min-h-[calc(100svh-64px)] lg:grid-cols-[minmax(0,11fr)_minmax(0,10fr)] lg:gap-4">
        <div className="relative z-10 max-w-[640px]">
          <motion.p {...fade(0)} className="mb-5 font-display text-[clamp(20px,2vw,26px)] italic text-pine">
            {t.heroTagline}
          </motion.p>
          <motion.h1 {...fade(1)} className="text-balance text-[clamp(36px,4.4vw,54px)] font-medium leading-[1.18] tracking-[-0.015em]">
            {t.heroH1a}
            <br />
            {t.heroH1b}
          </motion.h1>
          <motion.p {...fade(2)} className="mt-6 max-w-[34em] text-pretty text-[clamp(15px,1.3vw,18px)] text-ink-2">
            {t.heroSub}
          </motion.p>
          <motion.p {...fade(3)} className="mt-3 max-w-[34em] text-pretty text-sm text-ink-3">
            {t.heroSub2}
          </motion.p>
          <motion.div {...fade(4)} className="mt-9 flex flex-wrap gap-3">
            <a href="#partner" className={cn(cta, "group bg-pine text-paper hover:bg-pine-2")}>
              {t.heroCta1}
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#partner" className={cn(cta, "border border-line-strong bg-paper/60 text-ink backdrop-blur-sm hover:border-pine hover:text-pine")}>
              {t.heroCta2}
              <span aria-hidden>→</span>
            </a>
          </motion.div>
          <motion.a {...fade(5)} href="#about" className="mt-7 inline-block border-b border-line-strong text-[13px] text-ink-3 hover:border-pine hover:text-pine">
            {t.heroMore} ↓
          </motion.a>
        </div>
        <motion.div
          className="relative lg:-mr-[6vw]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVisual title={t.heroAlt} />
          <div className="mt-1 flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-3 lg:absolute lg:bottom-2 lg:left-0 lg:right-[6vw]">
            <span>{t.heroCaption}</span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-pine anim-blink" />
              {t.heroTag}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

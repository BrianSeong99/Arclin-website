"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { HeroIllustration } from "@/components/viz/hero-illustration";
import { cn } from "@/lib/utils";

const cta = "inline-flex items-center gap-2 rounded-md px-5 py-[13px] text-[15px] font-medium transition-colors";

export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const fade = (i: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <>
      <section id="top" className="container-x pb-[clamp(40px,6vw,72px)] pt-[clamp(48px,7vw,96px)]">
        <div className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          <div className="max-w-[560px]">
            <motion.p {...fade(0)} className="mb-5 font-display text-[clamp(20px,2vw,26px)] italic text-pine">
              {t.heroTagline}
            </motion.p>
            <motion.h1 {...fade(1)} className="text-balance text-[clamp(34px,5vw,60px)] font-medium leading-[1.22] tracking-[-0.01em]">
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
              <a href="#partner" className={cn(cta, "border border-line-strong text-ink hover:border-pine hover:text-pine")}>
                {t.heroCta2}
                <span aria-hidden>→</span>
              </a>
            </motion.div>
            <motion.a {...fade(5)} href="#about" className="mt-7 inline-block border-b border-line-strong text-[13px] text-ink-3 hover:border-pine hover:text-pine">
              {t.heroMore} ↓
            </motion.a>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-[14px] border border-line bg-paper-2 p-[clamp(16px,3vw,36px)]"
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-35 [background-image:linear-gradient(var(--paper-3)_1px,transparent_1px),linear-gradient(90deg,var(--paper-3)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_50%_60%,#000_30%,transparent_80%)]"
            />
            <div className="relative">
              <HeroIllustration title={t.heroAlt} />
            </div>
            <div className="relative mt-2 flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-3">
              <span>{t.heroCaption}</span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-1.5 rounded-full bg-pine" />
                {t.heroTag}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      <div aria-hidden className="container-x h-16 overflow-hidden">
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="block h-16 w-full">
          <path d="M0 8 C 300 8, 380 56, 600 56 S 900 8, 1200 8" fill="none" stroke="var(--pine)" strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="6 8" />
        </svg>
      </div>
    </>
  );
}

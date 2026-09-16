"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { ButtonLink } from "@/components/ui/button";
import { HeroIllustration } from "@/components/viz/hero-illustration";

export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const fade = (i: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* faint horizon grid */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,var(--paper-2),transparent)]" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div>
          <motion.p {...fade(0)} className="font-mono text-[11px] tracking-[0.22em] text-pine uppercase">
            {t.common.company} · {t.common.companyEn}
          </motion.p>
          <motion.p {...fade(1)} className="mt-3 text-sm text-ink-2">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 {...fade(2)} className="mt-6 text-balance text-4xl font-medium leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {t.hero.headline[0]}
            <br />
            {t.hero.headline[1]}
          </motion.h1>
          <motion.p {...fade(3)} className="mt-4 font-display text-xl italic text-ink-3 sm:text-2xl">
            {t.hero.latin}
          </motion.p>
          <motion.p {...fade(4)} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-2 sm:text-lg">
            {t.hero.body}
          </motion.p>
          <motion.div {...fade(5)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#partner" variant="primary" size="lg">
              {t.hero.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="#partner" variant="outline" size="lg">
              {t.hero.ctaSecondary}
            </ButtonLink>
          </motion.div>
          <motion.dl {...fade(6)} className="mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-2 border-t border-line pt-5 sm:grid-cols-3">
            {t.hero.meta.map((m) => (
              <div key={m.k}>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-ink-3 uppercase">{m.k}</dt>
                <dd className="mt-0.5 text-sm text-ink">{m.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
        <motion.figure
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-lg border border-line bg-paper-2/60 p-4 sm:p-8">
            <HeroIllustration title={t.hero.illustrationAlt} />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-wider text-ink-3">
            <span aria-hidden className="size-1.5 rounded-full bg-pine" />
            {t.hero.illustrationCaption}
          </figcaption>
        </motion.figure>
      </div>
      <a
        href="#why-japan"
        aria-label={t.nav[0].label}
        className="container-x mt-14 hidden items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase hover:text-ink sm:flex"
      >
        <ArrowDown className="size-3.5 anim-float" aria-hidden />
        scroll
      </a>
    </section>
  );
}

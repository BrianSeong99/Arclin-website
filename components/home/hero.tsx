"use client";
import { useLocale } from "@/lib/i18n/context";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { Mark } from "@/components/site/mark";
import { VideoFrame } from "@/components/site/video-frame";
import { DEV_MEDIA } from "@/lib/dev-media";

/**
 * Band 1, the hero (spec §2 row 3 geometry; night-shift styling, Figma "Home / Night shift" 2026-09-28).
 *
 * Slab: full width inside the 5px gutter, `calc(100vh - 10px)` tall (robot.com's `calc(100vh - 1rem)` at its 10px rem),
 * radius --radius-xl, overflow hidden, padding 24. The night video fills it; over it robot.com's top gradient and edge
 * vignette (literal, no token). The night-shift additions: a leaf-gold glow and the mark, large, top-right; the copy column
 * bottom-left with the Japanese line first, the headline in Coustard at up to 96px in --on-brand (white, never gold), the
 * sub-sentence, then the gold primary pill and an outline pill. Below 768 the mark shrinks to 160 and the column stacks.
 *
 * Motion: none on the text (V11). The video loops (M40); under prefers-reduced-motion VideoFrame shows only the poster.
 */
export function Hero() {
  const { locale, t } = useLocale();
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1";
  const cjkLang = locale === "zh" ? "zh" : "ja";

  return (
    <Band tone="night" id="hero" slabClassName="flex flex-col justify-end p-6" slabStyle={{ height: "calc(100vh - 10px)" }}>
      <VideoFrame src={DEV_MEDIA.hero.src} poster={dev ? DEV_MEDIA.hero.poster : undefined} ratio="auto" label={t.home.hero.videoLabel} className="absolute inset-0 rounded-none" />

      {/* Pending media only: the frame is --surface-sunken, so the night ground stands in for the footage. Removed once a clip plays. */}
      {!dev && <div aria-hidden="true" className="absolute inset-0 bg-night" />}

      {/* §2 row 3 figure::before / ::after — robot.com's top gradient and edge vignette, literal values. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0, rgba(0, 0, 0, 0.28) 15%, rgba(0, 0, 0, 0.1) 32%, rgba(0, 0, 0, 0) 48%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0, 0, 0, 0.38) 0, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.38) 100%)" }} />

      {/* Night shift: the gold glow and the mark, top-right. The glow is a radial of --leaf-gold at 32% fading to nothing. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-40 size-[520px] rounded-full md:-top-24 md:-right-32 md:size-[760px]"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--leaf-gold) 32%, transparent), transparent)" }}
      />
      <Mark size={160} className="absolute top-24 right-6 md:top-[22%] md:right-[8%] md:size-[400px]" />

      {/* Copy column, bottom-left (mobile: pinned by the slab's justify-end). */}
      <div className="relative flex max-w-[860px] flex-col items-start gap-4 md:gap-5">
        <p lang={cjkLang} className="t-jp-display text-on-brand-muted" style={{ fontSize: "clamp(15px, 1.5vw, 22px)", lineHeight: 1.5 }}>
          <Copy text={t.home.hero.cjkLine} />
        </p>
        <h1 lang="en" className="t-display-xl text-on-brand" style={{ fontSize: "clamp(44px, 6.7vw, 96px)", lineHeight: 0.98 }}>
          <Copy text={t.home.hero.line} />
        </h1>
        <p className="t-body-l hidden max-w-[560px] text-on-brand-muted md:block">
          <Copy text={t.heroSub} />
        </p>
        <div className="flex flex-wrap gap-3">
          <PillLink href={`/${locale}/robot/`} label={t.home.hero.cta} variant="gold" />
          <PillLink href={`/${locale}/care-homes/`} label={t.heroCta1} variant="outline-on-brand" className="hidden md:inline-flex" />
        </div>
      </div>
    </Band>
  );
}

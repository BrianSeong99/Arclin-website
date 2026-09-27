"use client";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { MEDIA } from "@/lib/media";

/**
 * Band 1, the hero (spec §2 row 3 geometry; night-shift styling, Figma "Home / Night shift" 2026-09-28).
 *
 * Slab: full width inside the 5px gutter, `calc(100vh - 10px)` tall (robot.com's `calc(100vh - 1rem)` at its 10px rem),
 * radius --radius-xl, overflow hidden, padding 24. The clip fills it; over it robot.com's top gradient and edge vignette
 * (literal, no token) and a night scrim behind the copy. The copy column sits bottom-left: the headline in the reader's
 * own language (Coustard for en, the rounded CJK display face for ja and zh; 2026-09-28, it used to be English in every
 * locale), the other-language line small above it, the sub-sentence, then the gold primary pill and an outline pill.
 * Below 768 the column stacks. Motion: none on the text (V11). The clip loops (M40); under prefers-reduced-motion
 * VideoFrame shows only the poster.
 */
export function Hero() {
  const { locale, t } = useLocale();
  const h = t.home.hero;
  const en = locale === "en";
  // The small line is a second language: Japanese above the English and Chinese headlines (the home market), English above the Japanese one.
  const altLang = locale === "ja" ? "en" : "ja";

  return (
    <Band tone="night" id="hero" slabClassName="flex flex-col justify-end p-6 pb-20 md:pb-6" slabStyle={{ height: "calc(100vh - 10px)" }}>
      <VideoFrame src={MEDIA.hero.src} poster={MEDIA.hero.poster} ratio="auto" label={h.videoLabel} className="absolute inset-0 rounded-none" />

      {/* Night scrim behind the copy column (Figma: Home / Night shift): night at 92% on the left fading out by 60% of the width,
          and from the bottom below 768, so the white headline and pills hold 4.5:1 over any frame of the clip. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--surface-night) 92%, transparent) 0, color-mix(in srgb, var(--surface-night) 70%, transparent) 30%, transparent 62%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(0deg, color-mix(in srgb, var(--surface-night) 92%, transparent) 0, color-mix(in srgb, var(--surface-night) 70%, transparent) 40%, transparent 70%)" }}
      />

      {/* §2 row 3 figure::before / ::after — robot.com's top gradient and edge vignette, literal values. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0, rgba(0, 0, 0, 0.28) 15%, rgba(0, 0, 0, 0.1) 32%, rgba(0, 0, 0, 0) 48%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0, 0, 0, 0.38) 0, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.38) 100%)" }} />

      {/* Copy column, bottom-left (mobile: pinned by the slab's justify-end). */}
      <div className="relative flex max-w-[900px] flex-col items-start gap-4 md:gap-5">
        <p lang={altLang} className={cn(altLang === "ja" ? "t-jp-display" : "font-display", "text-on-brand-muted")} style={{ fontSize: "clamp(15px, 1.5vw, 22px)", lineHeight: 1.5 }}>
          <Copy text={h.altLine} />
        </p>
        <h1 lang={locale} className={cn(en ? "t-display-xl" : "t-jp-display-xl", "text-on-brand")} style={{ fontSize: en ? "clamp(44px, 6.7vw, 96px)" : "clamp(34px, 4.6vw, 66px)", lineHeight: en ? 0.98 : 1.22 }}>
          <Copy text={h.line} />
        </h1>
        <p className="t-body-l hidden max-w-[600px] text-on-brand-muted md:block">
          <Copy text={h.sub} />
        </p>
        <div className="flex flex-wrap gap-3">
          <PillLink href={`/${locale}/approach/`} label={h.cta} variant="gold" />
          <PillLink href={`/${locale}/partners/`} label={h.ctaSecondary} variant="outline-on-brand" className="hidden md:inline-flex" />
        </div>
      </div>
    </Band>
  );
}

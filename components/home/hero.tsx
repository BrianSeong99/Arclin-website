"use client";
import { useLocale } from "@/lib/i18n/context";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { DEV_MEDIA } from "@/lib/dev-media";

/**
 * Band 3, hero video (spec §2 row 3, §3.5, M40, V09–V11).
 *
 * Slab: full width inside the 5px gutter, `calc(100vh - 10px)` tall (robot.com's `calc(100vh - 1rem)` at its 10px rem:
 * 890 / 1014 / 834 at the three viewports), radius --radius-xl, overflow hidden, padding 24; flex row, align centre,
 * justify space-between, gap 32. Content column: flex column gap 15, h1 max-width 383. Below 768: flex column, gap 48,
 * the content pinned to the bottom so the pill lands at the slab's bottom padding edge (390: y 819.69).
 *
 * Video: one <VideoFrame> absolutely filling the slab, object-fit cover, radius 0 (the 24px clip comes from the slab).
 * Over it the two robot.com figure overlays, literal per §2 ("keep as-is, no token"): a top gradient and an edge
 * vignette. Text is --on-brand; the pill is the highlight variant (#fff65d/#262626 → --highlight/--on-highlight).
 *
 * Motion: none on the text (V11: h1 and pill opacity 1, transform none from first paint). The video loops (M40);
 * under prefers-reduced-motion VideoFrame shows only the poster.
 */
export function Hero() {
  const { locale, t } = useLocale();
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1";
  const cjkLang = locale === "zh" ? "zh" : "ja";

  return (
    <Band
      tone="brand"
      id="hero"
      slabClassName="flex flex-col justify-end gap-12 p-6 md:flex-row md:items-center md:justify-between md:gap-8"
      /* §2 row 3: height calc(100vh - 1rem) with robot.com's 10px rem (V09: innerHeight - 10 at every viewport). */
      slabStyle={{ height: "calc(100vh - 10px)" }}
    >
      {/* §3.5: the video fills the slab; radius 0, clip from the slab. ratio "auto" so the frame's aspect-ratio does not fight inset-0. */}
      <VideoFrame
        src={DEV_MEDIA.hero.src}
        poster={dev ? DEV_MEDIA.hero.poster : undefined}
        ratio="auto"
        label={t.home.hero.videoLabel}
        className="absolute inset-0 rounded-none"
      />

      {/* §2 row 3 figure::before — top gradient, literal robot.com values (spec: keep as-is, no token). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0, rgba(0, 0, 0, 0.28) 15%, rgba(0, 0, 0, 0.1) 32%, rgba(0, 0, 0, 0) 48%)" }}
      />
      {/* §2 row 3 figure::after — edge vignette rgba(0,0,0,.38) at both edges → 0 at 42–58%, literal. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(0, 0, 0, 0.38) 0, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.38) 100%)" }}
      />

      {/* Pending media only: the frame is --surface-sunken, so --on-brand text needs a brand scrim behind the content column
          to reach 4.5:1 (see deviations). At ≥768 it runs from the left, opaque past the column's 412px extent (24 + 383)
          and gone by 640px, so the frame's centred pending label is clear of it at 1440; below 768 it rises from the
          bottom under the pinned column. Removed once a real clip plays. */}
      {!dev && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--surface-brand) 88%, transparent) 0, color-mix(in srgb, var(--surface-brand) 88%, transparent) 412px, transparent 640px)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 md:hidden"
            style={{ background: "linear-gradient(0deg, color-mix(in srgb, var(--surface-brand) 88%, transparent) 0, color-mix(in srgb, var(--surface-brand) 88%, transparent) 42%, transparent 62%)" }}
          />
        </>
      )}

      {/* §2 row 3 content column: flex column gap 15, vertically centred at ≥768. No entrance animation (V11). */}
      <div className="relative flex flex-col items-start" style={{ gap: 15 }}>
        {/* §2 row 3: h1 max-width 383. */}
        <h1 className="flex flex-col items-start gap-1" style={{ maxWidth: 383 }}>
          {/* §4 hero h1 row: 42/600 Yellix → .t-display-m (40/1.15 Italiana) by design decision; same size at 390 (Italiana floor 40). */}
          <span lang="en" className="t-display-m block">
            <Copy text={t.home.hero.line} />
          </span>
          {/* Equal-status CJK line: .t-jp-display (Zen Maru for ja, Noto Sans SC for zh via --font-body; the ui face for en). */}
          <span lang={cjkLang} className="t-jp-display block">
            <Copy text={t.home.hero.cjkLine} />
          </span>
        </h1>
        <PillLink href={`/${locale}/robot/`} label={t.home.hero.cta} variant="highlight" icon="arrow" />
      </div>
    </Band>
  );
}

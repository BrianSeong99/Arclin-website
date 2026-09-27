"use client";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { RevealHeading } from "@/components/home/reveal-heading";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { DEV_MEDIA, type DevMediaEntry } from "@/lib/dev-media";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * Card copy type (spec §4 "Body-s (card copy, partner text)": 14/500/1.16; the row offers a new `t-body-xs` for it).
 * The weight is inline because `.t-body-s` is unlayered and outranks the `font-medium` utility.
 */
const cardCopyType = { fontSize: "14px", lineHeight: 1.16, fontWeight: 500 } as const;

interface Row {
  /** Route segment under /{locale}/. */
  slug: string;
  /** h2: the page label. */
  title: string;
  /** h3, the muted descriptor: the page's hero line, so it never repeats the h2 (S08-2). */
  descriptor: string;
  /** p: the page's first body block. */
  line: string;
  media: DevMediaEntry;
}

/**
 * Band 8 (spec §2 row 8, §3.3, M4, M9, V13): robot.com's second product pair, here the two audience pages.
 * Bare 24-column grid, gap 4, one row of two `article` cards span 12 = 713x713 at 1440, `--surface-raised`,
 * radius 24, padding 18px 24px, overflow hidden; 768: two 377x377 columns; 390: stacked, 380 wide, padding 20px 17px,
 * content-driven (robot.com's 663.66 held a 26px title above a 380 square; at Italiana 40 the copy no longer fits, and
 * the ja copy already overran it).
 * Each card: h2 (card title) and h3 at `--ink-subtle`, both in the display face (easehealth brief §3 move 1: .t-display-m
 * for en, Italiana 40 held at 390 since Italiana never goes below 40; .t-jp-display for ja and zh), replacing §4's
 * Chillax 41/600 card title; p 300 wide (290 below 768) at `--ink-muted`; outline pill with the trailing arrow (move 7);
 * the media figure stands on the card's right half at full height from 768 (robot.com: a 713² transparent cut-out
 * translateX(-356.5), so the copy keeps the raised surface behind it; S08-1) and is a full-width square in flow under
 * the pill, flush with the card's edges, below 768 (380x380 at 390); the titles take the full width there.
 * Motion: h2 and h3 line reveals (M4/M9) at 150/250ms; pill label roll-over (M22). Reduced motion, and below 768: headings static.
 */
export function AudienceRows() {
  const { locale, t } = useLocale();
  const titleClass = locale === "en" ? "t-display-m" : "t-jp-display";
  const rows: Row[] = [
    {
      slug: "care-homes",
      title: t.common.pageLabels.careHomes,
      descriptor: t.careHomes.hero.line,
      line: t.careHomes.blocks[0].body,
      media: DEV_MEDIA["robot-moving-safely"],
    },
    {
      slug: "families",
      title: t.common.pageLabels.families,
      descriptor: t.families.hero.line,
      line: t.families.day.body,
      media: DEV_MEDIA["robot-staying-in-touch"],
    },
  ];

  return (
    <Band slab={false}>
      <Grid24>
        {rows.map((row) => (
          <Col
            as="article"
            key={row.slug}
            span={12}
            spanSm={6}
            // §2 row 8: aspect 740/740 + max-height 100vh, padding 18px 24px from 768; content-driven, padding 20px 17px at 390.
            className="relative overflow-hidden rounded-xl bg-raised px-[17px] py-5 text-ink md:aspect-square md:max-h-screen md:px-6 md:py-[18px]"
          >
            <div className="relative z-10">
              {/* §3: card title max-width 65%; from 768 the figure holds the right half, so the headings wrap inside the left
                  half (card half minus the 24px padding = 332.5 at 1440) instead of running over the figure (S08-1). Below
                  768 the figure is under the copy, so the display face gets the full width. Line 1 of the reveal (delay 150ms). */}
              <RevealHeading as="h2" lang={locale} text={row.title} className={cn(titleClass, "md:max-w-1/2")} />
              {/* Subtitle at opacity .5 on robot.com → --ink-subtle; line 2 of the reveal (delay 250ms). */}
              <RevealHeading as="h3" lang={locale} text={row.descriptor} className={cn(titleClass, "text-ink-subtle md:max-w-1/2")} baseDelay={0.25} />
              {/* §2 row 8: p 14/500/16.24, margin-top 20, max-width 300 (290 below 768). */}
              <p className="t-body-s mt-5 max-w-[290px] text-ink-muted md:max-w-[300px]" style={cardCopyType}>
                <Copy text={row.line} />
              </p>
              <PillLink href={`/${locale}/${row.slug}/`} label={row.title} variant="outline" icon="arrow" className="mt-5" />
            </div>
            {/* §2 row 8: the figure's visible part is the card's right half at full height (713² translateX(-356.5) at 1440); a
                cover-cropped frame stands in for the transparent cut-out. Below 768: a full-width square in flow under the pill,
                bleeding into the padding so it is flush with the card's edges. */}
            <figure className="relative mt-5 -mx-[17px] -mb-5 aspect-square md:absolute md:inset-y-0 md:right-0 md:left-auto md:m-0 md:aspect-auto md:w-1/2">
              <VideoFrame src={row.media.src} poster={row.media.poster} label={row.media.label} ratio="auto" className="absolute inset-0 rounded-none" />
            </figure>
          </Col>
        ))}
      </Grid24>
    </Band>
  );
}

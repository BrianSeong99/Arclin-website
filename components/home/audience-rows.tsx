"use client";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { RevealHeading } from "@/components/home/reveal-heading";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { MEDIA, type MediaEntry } from "@/lib/media";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * Card copy type (spec §4 "Body-s (card copy, partner text)": 14/500/1.16; the row offers a new `t-body-xs` for it).
 * The weight is inline because `.t-body-s` is unlayered and outranks the `font-medium` utility.
 */
const cardCopyType = { fontSize: "14px", lineHeight: 1.16, fontWeight: 500 } as const;

interface Row {
  /** Anchor on the partners page. */
  hash: string;
  /** h2: the audience. */
  title: string;
  /** h3, the muted descriptor. */
  descriptor: string;
  /** p: one sentence on where we start with them. */
  line: string;
  media: MediaEntry;
}

/**
 * Band 8 (spec §2 row 8, §3.3, M4, M9, V13): robot.com's second product pair, here the two sides of the market: care
 * operators (the delivery-cart clip: a robot working beside staff) and robot makers (the tabletop companion clip: a
 * product that has reached a resident). Both cards link into the partners page.
 * Bare 24-column grid, gap 4, one row of two `article` cards span 12 = 713x713 at 1440, `--surface-raised`,
 * radius 24, padding 18px 24px, overflow hidden; 768: two 377x377 columns; 390: stacked, 380 wide, padding 20px 17px.
 * Each card: h2 and h3 at `--ink-subtle` in the display face; p 300 wide (290 below 768) at `--ink-muted`; outline pill
 * with the trailing arrow; the media figure stands on the card's right half at full height from 768 and is a
 * full-width square in flow under the pill below 768. Motion: h2 and h3 line reveals (M4/M9) at 150/250ms.
 */
export function AudienceRows() {
  const { locale, t } = useLocale();
  const titleClass = locale === "en" ? "t-display-m" : "t-jp-display";
  const a = t.home.audiences;
  const rows: Row[] = [
    { hash: "care-operators", ...a.careOperators, media: MEDIA.delivery },
    { hash: "robot-makers", ...a.robotMakers, media: MEDIA["day-companion"] },
  ];

  return (
    <Band slab={false}>
      <Grid24>
        {rows.map((row) => (
          <Col as="article" key={row.hash} span={12} spanSm={6} className="relative overflow-hidden rounded-xl bg-raised px-[17px] py-5 text-ink md:aspect-square md:max-h-screen md:px-6 md:py-[18px]">
            <div className="relative z-10">
              <RevealHeading as="h2" lang={locale} text={row.title} className={cn(titleClass, "md:max-w-1/2")} />
              <RevealHeading as="h3" lang={locale} text={row.descriptor} className={cn(titleClass, "text-ink-subtle md:max-w-1/2")} baseDelay={0.25} />
              <p className="t-body-s mt-5 max-w-[290px] text-ink-muted md:max-w-[300px]" style={cardCopyType}>
                <Copy text={row.line} />
              </p>
              <PillLink href={`/${locale}/partners/#${row.hash}`} label={row.title} variant="outline" icon="arrow" className="mt-5" />
            </div>
            <figure className="relative mt-5 -mx-[17px] -mb-5 aspect-square md:absolute md:inset-y-0 md:right-0 md:left-auto md:m-0 md:aspect-auto md:w-1/2">
              <VideoFrame src={row.media.src} poster={row.media.poster} label={row.media.label} ratio="auto" className="absolute inset-0 rounded-none" />
            </figure>
          </Col>
        ))}
      </Grid24>
    </Band>
  );
}

"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Band, Grid24 } from "@/components/home/band";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { DEV_MEDIA } from "@/lib/dev-media";
import { useLocale } from "@/lib/i18n/context";

/**
 * Card shell (spec §3.6): radius --radius-xl, padding 24, overflow hidden; 20px 17px at 390 (16 used, no 17px token).
 * The squares carry `aspect-square` so the two fr rows resolve to (354.5 - 4) / 2 = 175.25 at 1440 (spec 175.31, V28 ±1).
 */
function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <article className={cn("relative flex min-w-0 flex-col overflow-hidden rounded-xl px-4 py-5 md:p-6", className)}>{children}</article>;
}

/**
 * Title top-left (§4 title h5 → .t-title-s), numeral bottom-right (robot.com: 131.8-wide SVG; ours is text in .t-numeral).
 * `children` paints under both (card D's clip, §3.6 "product image bleeding out of the card"); the texts sit at z 2 like robot.com's titles.
 */
function Figure({ figure, className, children }: { figure: { value: string; label: string }; className?: string; children?: ReactNode }) {
  return (
    <Card className={cn("justify-between gap-4", className)}>
      {children}
      <h3 className="t-title-s relative z-2">
        <Copy text={figure.label} />
      </h3>
      <p className="t-numeral relative z-2 self-end text-right">
        <Copy text={figure.value} />
      </p>
    </Card>
  );
}

export interface StatsBentoProps {
  id?: string;
  className?: string;
}

/**
 * Band 7, the scale / stats bento (spec §2 row 7, §3.6, V28). A bare 24-col grid of five cards, gap 4, in the
 * 5px page gutter with the 4px seam above, placed as §2 row 7 maps them (S07-2):
 *   A cols 1–6 rows 1–2 (brand): title + sub, robot.com's "Already working at scale" card. No home.* key carries that
 *   pair, so it reads the v2 stats heading (statsH2 as the 24/600 strong, statsKicker as the muted em) until one exists.
 *   B cols 7–12 row 1 (highlight): figure 1.   C cols 7–12 row 2 (raised): figure 2.
 *   D cols 13–18 rows 1–2 (raised): figure 3 over the robot clip (title top-left, numeral bottom-right, S07-1).
 *   E cols 19–24 rows 1–2 (raised): founder quote + byline.
 * 768: two columns of 377 (A | B over C, then D | E). 390: 6-col; A, D, E full width, B and C side by side (188²).
 * No entrance motion on cards, titles or numerals (§2 row 7), so nothing to reduce.
 */
export function StatsBento({ id, className }: StatsBentoProps) {
  const { t } = useLocale();
  const { figures } = t.home.scale;
  const { founder } = t.home;
  const media = DEV_MEDIA["robot-daily-help"];

  return (
    <Band tone="page" slab={false} id={id} className={className}>
      <Grid24 className="md:grid-rows-4 lg:grid-rows-2">
        <Card className="on-brand col-span-6 aspect-square gap-1 bg-brand text-on-brand md:col-span-12 md:row-span-2 md:row-start-1 lg:col-span-6">
          {/* §4 "Stats strong" 24/600 → .t-title-m; "A em" 18/600 at .5 → .t-title-s in --on-brand-muted. */}
          <h3 className="t-title-m">
            <Copy text={t.statsH2} />
          </h3>
          <p className="t-title-s text-on-brand-muted">
            <Copy text={t.statsKicker} />
          </p>
        </Card>

        <Figure
          figure={figures[0]}
          className="on-highlight col-span-3 aspect-square bg-highlight text-on-highlight md:col-span-12 md:col-start-13 md:row-start-1 md:aspect-auto lg:col-span-6 lg:col-start-7"
        />
        <Figure figure={figures[1]} className="col-span-3 aspect-square bg-raised text-ink md:col-span-12 md:col-start-13 md:row-start-2 md:aspect-auto lg:col-span-6 lg:col-start-7" />

        <Figure figure={figures[2]} className="col-span-6 aspect-square bg-raised text-ink md:col-span-12 md:col-start-1 md:row-span-2 md:row-start-3 lg:col-span-6 lg:col-start-13 lg:row-start-1">
          <VideoFrame src={media.src} poster={media.poster} label={media.label} ratio="auto" className="absolute inset-0 rounded-none" />
        </Figure>

        <Card className="col-span-6 aspect-square gap-4 bg-raised text-ink md:col-span-12 md:col-start-13 md:row-span-2 md:row-start-3 lg:col-span-6 lg:col-start-19 lg:row-start-1">
          {/* §3.6 card E: quote 18/600 → .t-title-s, byline 18/600 #8f8e8d → .t-title-s in --ink-subtle. */}
          <figure className="flex flex-col gap-4">
            <blockquote className="t-title-s">
              <p>
                <Copy text={founder.quote} />
              </p>
            </blockquote>
            <figcaption className="t-title-s flex flex-col text-ink-subtle">
              <span>
                <Copy text={founder.name} />
              </span>
              <span>
                <Copy text={founder.title} />
              </span>
            </figcaption>
          </figure>
        </Card>
      </Grid24>
    </Band>
  );
}

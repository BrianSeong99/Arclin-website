"use client";
import { DEV_MEDIA } from "@/lib/dev-media";
import { useLocale } from "@/lib/i18n/context";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { Wordmark } from "@/components/site/wordmark";

/**
 * Band 12, the careers slab, in robot.com's Formic partner slab (spec §2 row 12): a brand slab 1432x800 at
 * x=4 (a 4px gutter, not the page's 5), radius --radius-xl, padding 24, overflow hidden, flex column gap 32.
 * The text block runs careers.hero.line at .t-statement (§4 "Formic statement" row: robot.com 72/500/72;
 * .t-statement is the nearest Chillax style, so 52 at 1440) beside a floated 186x180 frame (radius 10, mr 24)
 * that holds the robot clip in dev media mode and the pending frame otherwise; the Arclin wordmark sits where
 * robot.com puts the partner logo. Below, a page-coloured pill to /{locale}/careers/. At 768 and 390
 * (robot.com's `max-width: 768px` block, so lg: here): padding 28, height auto, frame 120x120 mr 16,
 * pill full width. No motion on this band; the pill keeps the site's label roll-over.
 */
export function CareersSlab({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const media = DEV_MEDIA["robot-daily-help"];
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1";

  return (
    // §2 row 12: the slab sits 4px from each viewport edge (1432 / 760 / 382 wide), one token narrower than --gutter-page.
    <Band tone="raised" id="careers" className={className} style={{ paddingInline: "var(--space-1)" }} slabClassName="flex flex-col gap-8 p-7 lg:h-200 lg:p-6">
      {/* flow-root so a short line never lets the float run into the pill below. */}
      <div className="flow-root">
        {/* robot.com's floated image box: line 1 and 2 start beside it, later lines run under it. */}
        <div className="float-left mb-2.5 me-4 size-30 overflow-hidden rounded-md bg-sunken lg:me-6 lg:h-45 lg:w-46.5">
          <VideoFrame src={dev ? media.src : undefined} poster={dev ? media.poster : undefined} label={media.label} ratio="186 / 180" className="h-full rounded-md" />
        </div>
        {/* The partner-logo slot (45 tall, 12 below): Arclin's own mark, since the slab is about Arclin hiring. */}
        <div className="mb-3">
          <Wordmark tone="page" />
        </div>
        <p lang={locale} className="t-statement text-ink">
          <Copy text={t.careers.hero.line} />
        </p>
      </div>
      <PillLink href={`/${locale}/careers/`} label={t.common.pageLabels.careers} variant="outline" className="w-full lg:w-fit" />
    </Band>
  );
}

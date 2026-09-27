"use client";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { MEDIA } from "@/lib/media";

/**
 * Band 9, the closing CTA (night shift, 2026-09-28; Mobbin: Square's "Make your next move"). A night slab with the leaf
 * shade holding a small rounded video card centred (420 square from 768, 300 below; radius 28) under a night dim, and over
 * its lower half the closing line in Coustard --on-brand with two pills: the gold primary for care facilities and an
 * outline pill for robotics companies. Replaces robot.com's yellow band with the inline pill; Soga survives only as the
 * announce-style accent elsewhere. The whole card is decorative; the pills are the links.
 */
export function ClosingCta({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const media = MEDIA.interlude;
  const dev = true;
  const titleClass = locale === "en" ? "t-display-l" : "t-jp-display-l";

  return (
    <Band tone="night" id="closing" className={className} slabClassName="bg-night-shade flex min-h-[560px] flex-col items-center justify-end px-5 pt-16 pb-12 md:min-h-[640px] md:pb-16">
      <div className="pointer-events-none absolute top-14 left-1/2 size-[300px] -translate-x-1/2 overflow-hidden rounded-[28px] md:top-[110px] md:size-[420px]" aria-hidden="true">
        <VideoFrame src={dev ? media.src : undefined} poster={dev ? media.poster : undefined} ratio="auto" label={media.label} className="absolute inset-0 rounded-none" />
        <div className={cn("absolute inset-0", dev ? "bg-night/45" : "bg-night-raised")} />
      </div>
      <div className="relative flex max-w-[700px] flex-col items-center gap-6 text-center">
        <h3 lang={locale} className={cn(titleClass, "text-on-brand")}>
          <Copy text={t.home.closing.line} />
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <PillLink href={`/${locale}/contact/`} label={t.contactCare} variant="gold" />
          <PillLink href={`/${locale}/contact/`} label={t.contactRobot} variant="outline-on-brand" />
        </div>
      </div>
    </Band>
  );
}

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
 * shade holding a small rounded video card centred (360 square from 768, 260 below; radius 28) under a night dim, and
 * under it the closing line in Coustard --on-brand with two pills: the gold primary for care operators and an outline
 * pill for robot makers, both into the contact page. The card is decorative; the pills are the links. Heights are
 * content-driven (the 640px floor left a slab of empty night, 2026-09-28).
 */
export function ClosingCta({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const media = MEDIA.delivery;
  const titleClass = locale === "en" ? "t-display-l" : "t-jp-display-l";

  return (
    <Band tone="night" id="closing" className={className} slabClassName="bg-night-shade flex flex-col items-center gap-8 px-5 py-12 md:gap-10 md:py-16">
      <div className="pointer-events-none relative size-[260px] overflow-hidden rounded-[28px] md:size-[360px]" aria-hidden="true">
        <VideoFrame src={media.src} poster={media.poster} ratio="auto" label={media.label} className="absolute inset-0 rounded-none" />
        <div className="absolute inset-0 bg-night/35" />
      </div>
      <div className="relative flex max-w-[720px] flex-col items-center gap-6 text-center">
        <h3 lang={locale} className={cn(titleClass, "text-on-brand")}>
          <Copy text={t.home.closing.line} />
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <PillLink href={`/${locale}/contact/`} label={t.common.contactCare} variant="gold" />
          <PillLink href={`/${locale}/contact/`} label={t.common.contactRobot} variant="outline-on-brand" />
        </div>
      </div>
    </Band>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";
import { MEDIA, type MediaEntry } from "@/lib/media";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { RevealHeading } from "@/components/home/reveal-heading";

interface ProductCardProps {
  name: string;
  /** Second line under the name, in --highlight-edge (the readable gold). */
  tagline: string;
  /** The display class for the locale: .t-display-m (en) or .t-jp-display (ja, zh). */
  titleClass: string;
  body: string[];
  note?: string;
  cta: string;
  href: string;
  media: MediaEntry;
  lang: string;
}

/**
 * One product card (night shift, 2026-09-28; Mobbin: Okta and 1Password product pairs): a raised card, radius --radius-xl,
 * the media across the top (aspect 709/400 from 768, 380/240 below), then name, gold tagline, body, note and an outline
 * pill. This replaces robot.com's right-half cut-out figure and the yellow band with its unveiling mask.
 */
function ProductCard({ name, tagline, titleClass, body, note, cta, href, media, lang }: ProductCardProps) {
  return (
    <Col as="article" span={12} spanSm={6} className="relative flex flex-col overflow-hidden rounded-xl bg-raised text-ink">
      <div className="relative aspect-[380/240] w-full md:aspect-[709/400]">
        <VideoFrame src={media.src} poster={media.poster} ratio="auto" label={media.label} className="absolute inset-0 rounded-none" />
      </div>
      <div className="flex flex-col gap-3 p-[20px_17px] md:p-6">
        <RevealHeading as="h3" lang={lang} text={name} className={cn(titleClass, "text-ink")} />
        <p className="t-title-s text-highlight-edge">
          <Copy text={tagline} />
        </p>
        <div className="max-w-[620px]">
          {body.map((line, i) => (
            <p key={i} className="t-body-s text-ink-muted">
              <Copy text={line} />
            </p>
          ))}
        </div>
        {note && (
          <p className="t-caption max-w-[620px] text-ink-subtle">
            <Copy text={note} />
          </p>
        )}
        <div className="mt-2">
          <PillLink href={href} label={cta} variant="outline" />
        </div>
      </div>
    </Col>
  );
}

export interface ProductBandProps {
  id?: string;
  className?: string;
}

/**
 * Band 4, the two pillars (night shift, 2026-09-28): a paper band with a Coustard kicker and two product cards side by
 * side (span 12 each, 4px gap) with their media on top. Mimamori reads home.robot, CareOS reads products[1].
 * The yellow band, the blossom unveiling mask and the pinned card strip (robot.com band 6, M8) are gone; Soga is an
 * accent only on this page.
 */
export function ProductBand({ id = "products", className }: ProductBandProps) {
  const { locale, t } = useLocale();
  const robot = t.home.robot;
  const careos = t.products[1];
  const titleClass = locale === "en" ? "t-display-m" : "t-jp-display";

  return (
    <Band tone="page" id={id} className={className} slabClassName="px-1 pt-6 pb-1">
      <p className="font-display mb-5 px-4 text-ink-subtle md:px-5" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>
        <Copy text={t.productsKicker} />
      </p>
      <Grid24>
        <ProductCard name={robot.name} tagline={robot.eyebrow} titleClass={titleClass} body={robot.sentences} cta={robot.cta} href={`/${locale}/robot/`} media={MEDIA["robot-moving-safely"]} lang={locale} />
        <ProductCard name={careos.name} tagline={careos.sub} titleClass={titleClass} body={[careos.body]} note={careos.note} cta={careos.cta} href={`/${locale}/deployment/`} media={MEDIA["robot-daily-help"]} lang={locale} />
      </Grid24>
    </Band>
  );
}

"use client";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Band, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { RevealHeading } from "@/components/home/reveal-heading";
import { Copy } from "@/components/site/copy";

/** robot.com's partner list is five cards (spec §2 row 4). Slots the copy does not fill stay empty raised cards. */
const SLOTS = 5;

/** Header and facility cards share one surface: bg-raised, radius 24, padding 24 (§2 row 4). */
const card = "relative overflow-hidden rounded-xl bg-raised p-6 text-ink";

export interface TrustedByProps {
  className?: string;
}

/**
 * Band 4, trusted by (spec §2 row 4, §3.3, M4, M41). A page-coloured band whose container is the 24-column grid
 * with padding-top 5: the header card spans 6 (353.5 x 371.53 at 1440) and the facility list sits at cols 7 / span 19
 * as a flex row of five cards (211.3 x 371.53, aspect 182/320). Below 1024 the header card is full width and the
 * list is a grid of squares, 3 across at 768 and 2 across at 390, as robot.com's own breakpoints do.
 * The h2 reveals per M4; the CTA pill rolls per M22. Reduced motion: heading static, no roll (both handled upstream).
 */
export function TrustedBy({ className }: TrustedByProps) {
  const { locale, t } = useLocale();
  const { eyebrow, sentence, facilities, cta } = t.home.trustedBy;

  return (
    <Band id="trusted-by" tone="page" seam={false} slab={false} className={className}>
      {/* §2 row 4 / V14: the section has no seam; the grid container itself carries padding-top 5. */}
      <Grid24 style={{ paddingTop: 5 }}>
        {/* V26: at ≥1024 the card takes the row height the facility cards set (371.53, the 182/320 aspect) instead of
            growing with the gapped sentence: h-0 keeps it out of the row sizing, min-h-full stretches it back. */}
        <div className={cn(card, "col-span-full flex flex-col lg:col-span-6 lg:h-0 lg:min-h-full")}>
          <p className="t-overline mb-3 text-ink-muted">
            <Copy text={eyebrow} />
          </p>
          {/* The h2 clips inside the capped card so the pill stays in place; the [GAP] marks lead the sentence and remain visible. */}
          <RevealHeading
            as="h2"
            lang={locale}
            text={sentence}
            className="t-title-l lg:min-h-0 lg:flex-1 lg:overflow-hidden"
            // §4 row "Title h3 (cards, accordion, trusted-by)": 41/600/41/-0.82 at 1440, 26/600/27.56 at 390; no Kurogane
            // style yet (t-title-xl proposed). 5.34vw reaches 41px at 768 and clamps to 26px below 487.
            style={{ fontSize: "clamp(26px, 5.34vw, 41px)", lineHeight: 1, letterSpacing: "-0.02em" }}
          />
          <div className="mt-auto pt-4">
            <PillLink href={`/${locale}/contact/`} label={cta} variant="outline" />
          </div>
        </div>

        <ul className="col-span-full grid grid-cols-2 gap-1 md:grid-cols-3 lg:col-span-19 lg:col-start-7 lg:flex">
          {Array.from({ length: SLOTS }, (_, i) => facilities.at(i)).map((name, i) => (
            <li
              key={i}
              aria-hidden={name ? undefined : true}
              className={cn(card, "flex aspect-square items-center justify-center text-center lg:aspect-[182/320] lg:flex-1")}
            >
              {name && (
                <p className="t-title-s">
                  <Copy text={name} />
                </p>
              )}
            </li>
          ))}
        </ul>
      </Grid24>
    </Band>
  );
}

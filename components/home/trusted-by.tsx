"use client";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";

/** Logo slots; the copy's facility names fill them in order, the rest stay quiet placeholders. */
const SLOTS = 5;

export interface TrustedByProps {
  className?: string;
}

/**
 * Band 2, trusted by. Night shift (2026-09-28): one paper strip instead of robot.com's header card and five logo cards
 * (Mobbin: quiet logo rows). Sentence left, logo row centre, outline pill right; below 768 the three stack.
 * The sentence keeps its [GAP] chips until the facts arrive; the logo slots are 110x30 sunken blocks until marks exist.
 */
export function TrustedBy({ className }: TrustedByProps) {
  const { locale, t } = useLocale();
  const { sentence, facilities, cta } = t.home.trustedBy;

  return (
    <Band id="trusted-by" tone="page" className={className} slabClassName="flex flex-col gap-4 p-5 md:min-h-40 md:flex-row md:items-center md:justify-between md:gap-8 md:p-6">
      <p className="t-body max-w-[380px] text-ink">
        <Copy text={sentence} />
      </p>
      <ul className="flex flex-wrap items-center gap-4 md:gap-10" aria-label={t.home.trustedBy.eyebrow}>
        {Array.from({ length: SLOTS }, (_, i) => facilities.at(i)).map((name, i) => (
          <li key={i} aria-hidden={name ? undefined : true} className={cn("flex h-7.5 w-27.5 items-center justify-center rounded-sm bg-sunken", name && "px-2")}>
            {name && (
              <span className="t-caption truncate text-ink-subtle">
                <Copy text={name} />
              </span>
            )}
          </li>
        ))}
      </ul>
      <PillLink href={`/${locale}/contact/`} label={cta} variant="outline" className="self-start md:self-auto" />
    </Band>
  );
}

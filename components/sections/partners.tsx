"use client";
import { Check } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { mailto } from "@/lib/site";
import { Section, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/site/reveal";
import { ButtonLink } from "@/components/ui/button";

/** Brand slab: the two partner cards, then three trust principles as a single row. */
export function Partners() {
  const { t } = useLocale();
  return (
    <Section tone="brand" id="partners">
      <SectionHeading tone="brand" label={t.partnerKicker} lines={t.partnerH2} />
      <Stagger className="mt-10 grid gap-3 lg:grid-cols-2">
        {t.partners.map((p) => (
          <StaggerItem key={p.kicker} className="flex flex-col rounded-lg bg-page p-6 text-ink sm:p-8">
            <p className="t-overline text-ink-subtle">{p.kicker}</p>
            <h3 className="t-title-l mt-3">{p.title}</h3>
            <p className="t-body-l mt-3 text-pretty text-ink-muted">{p.body}</p>
            <p className="t-label mt-6 text-ink-subtle">{t.fitKicker}</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {p.fit.map((f) => (
                <li key={f} className="t-body-s flex items-start gap-2 text-ink-muted">
                  <Check className="mt-1 size-4 flex-none text-highlight-edge" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink href={mailto(p.subject)} className="mt-8 w-fit">
              {p.cta}
            </ButtonLink>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="mt-12 grid gap-8 border-t border-on-brand-muted/25 pt-8 md:grid-cols-3">
        {t.trust.map((tr) => (
          <div key={tr.title}>
            <h3 className="t-title-s text-on-brand">{tr.title}</h3>
            <p className="t-body-s mt-2 text-on-brand-muted">{tr.body}</p>
          </div>
        ))}
      </div>
      <p className="t-caption mt-8 text-on-brand-muted">{t.trustNote}</p>
    </Section>
  );
}

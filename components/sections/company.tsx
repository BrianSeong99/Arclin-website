"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, Kicker } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function Company() {
  const { t } = useLocale();
  return (
    <Section id="company">
      <div className="grid items-start gap-x-20 gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div>
          <Reveal>
            <Kicker>{t.companyLabel}</Kicker>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-[18em] font-display text-[clamp(24px,2.6vw,32px)] italic leading-[1.35] text-ink">{t.companyTagline}</p>
          </Reveal>
          <Reveal>
            <p className="mt-4 max-w-[30em] text-pretty text-ink-2">{t.companyBody}</p>
          </Reveal>
        </div>
        <Reveal>
          <dl className="grid grid-cols-[minmax(96px,auto)_1fr] border-t border-line text-[14.5px]">
            {t.company.map((r) => (
              <div key={r.k} className="contents">
                <dt className="border-b border-line py-3.5 pr-4 font-mono text-[11.5px] tracking-[0.1em] text-ink-3">{r.k}</dt>
                <dd className={cn("border-b border-line py-3.5", "ph" in r && r.ph ? "text-ink-3" : "text-ink")}>{r.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

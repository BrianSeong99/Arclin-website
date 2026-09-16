"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

export function Trust() {
  const { t } = useLocale();
  return (
    <Section id="trust">
      <SectionHeading label={t.trustLabel} lines={[t.trustH2a, t.trustH2b]} />
      <div className="mt-10 grid gap-x-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {t.trust.map((tr, i) => (
          <Reveal key={tr.title} delay={i * 0.06} className="grid grid-cols-[28px_1fr] gap-4 border-t border-line py-[22px]">
            <span aria-hidden className="mt-0.5 size-[22px] rounded border-[1.5px] border-pine" />
            <div>
              <div className="font-medium">{tr.title}</div>
              <p className="mt-1 text-pretty text-sm text-ink-2">{tr.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-8 max-w-[44em] text-[13px] text-ink-3">{t.trustNote}</p>
      </Reveal>
    </Section>
  );
}

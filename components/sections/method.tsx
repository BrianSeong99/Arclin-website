"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { FlowSteps } from "@/components/viz/flow-steps";

export function Method() {
  const { t } = useLocale();
  return (
    <Section id="method" tone="paper-2">
      <SectionHeading label={t.methodLabel} lines={[t.methodH2a, t.methodH2b]} />
      <Reveal className="mt-14">
        <FlowSteps steps={t.steps} />
      </Reveal>
      <Reveal className="mt-20 grid items-start gap-x-16 gap-y-8 border-t border-line pt-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <p className="text-balance text-[clamp(24px,3vw,36px)] font-medium leading-[1.4] tracking-[-0.01em]">
          {t.fieldHa}
          <br />
          {t.fieldHb}
        </p>
        <div>
          <p className="text-pretty text-ink-2">{t.fieldBody}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {t.fieldItems.map((f) => (
              <span key={f} className="rounded-full border border-line-strong px-3 py-[5px] text-[13px] text-ink-2">{f}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { FlowSteps } from "@/components/viz/flow-steps";

export function Method() {
  const { t } = useLocale();
  const s = t.method;
  return (
    <Section id="method">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <FlowSteps steps={s.steps} />
      </div>
    </Section>
  );
}

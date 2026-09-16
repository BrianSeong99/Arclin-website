"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { LayerStack } from "@/components/viz/layer-stack";

export function CareOS() {
  const { t } = useLocale();
  const s = t.careos;
  return (
    <Section id="careos">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <div className="mx-auto max-w-3xl">
          <LayerStack layers={s.layers} labels={{ ip: s.ipLabel, partner: s.ipPartner, arclin: s.ipArclin }} />
        </div>
      </div>
    </Section>
  );
}

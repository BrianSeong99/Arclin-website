"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal";
import { CountUp } from "@/components/viz/count-up";
import { TrendLine } from "@/components/viz/trend-line";
import { Footnote } from "@/components/ui/footnote";

export function WhyJapan() {
  const { t } = useLocale();
  const s = t.whyJapan;
  return (
    <Section id="why-japan" tone="paper-2">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <Stagger className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {s.stats.map((st) => (
            <StaggerItem key={st.label} className="bg-paper p-6 sm:p-8">
              <div className="text-5xl font-medium leading-none tracking-tight text-ink sm:text-6xl">
                <CountUp value={st.value} decimals={st.decimals} prefix={"prefix" in st ? st.prefix : undefined} suffix={st.suffix} />
              </div>
              <div className="mt-4 text-base font-medium text-ink">{st.label}</div>
              <div className="mt-1 font-mono text-[11px] tracking-wider text-ink-3">{st.sub}</div>
              <Footnote text={st.source} className="mt-4" />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 rounded-lg border border-line bg-paper p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-medium text-ink">{s.trend.title}</h3>
            <span className="font-mono text-[11px] tracking-wider text-ink-3">{s.trend.unit}</span>
          </div>
          <TrendLine points={s.trend.points} projectedFrom={2025} unit={s.trend.unit} />
          <Footnote text={s.trend.note} className="mt-4" />
        </Reveal>
      </div>
    </Section>
  );
}

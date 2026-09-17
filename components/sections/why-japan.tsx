"use client";

import { useLocale } from "@/lib/i18n/context";
import { TREND_POINTS, TREND_PROJECTED_FROM } from "@/lib/site";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/viz/count-up";
import { TrendLine } from "@/components/viz/trend-line";

/** Bento: three number cells + a wide chart cell, all hairline-separated. */
export function WhyJapan() {
  const { t } = useLocale();
  return (
    <Section id="about" num="01">
      <SectionHeading label={t.whyLabel} lines={[t.whyH2a, t.whyH2b]} lead={t.whyBody} />
      <Reveal amount="some" className="mt-14 grid overflow-hidden rounded-2xl border border-line-strong bg-paper-2/60 md:grid-cols-3">
        {t.stats.map((s, i) => (
          <div key={s.label} className="border-b border-line p-7 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="flex items-baseline font-display text-[clamp(56px,6vw,84px)] font-semibold leading-none tracking-[-0.04em] text-ink tabular">
              <CountUp value={s.value} decimals={s.decimals} duration={1.8} />
              <span className="ml-2 font-sans text-[0.26em] font-medium tracking-normal text-pine">{s.unit}</span>
            </div>
            <div className="mt-5 text-[15px] font-medium">{s.label}</div>
            <div className="mt-1 text-[13px] text-ink-3">{s.sub}</div>
            <details className="mt-3 font-mono text-[11px] text-ink-3">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 tracking-[0.08em] underline decoration-line-strong underline-offset-4 [&::-webkit-details-marker]:hidden">{t.source}</summary>
              <p className="mt-1.5 max-w-[32em] font-sans leading-relaxed">{s.source}</p>
            </details>
            <span className="sr-only">{i}</span>
          </div>
        ))}
        <div className="border-t border-line bg-paper p-7 md:col-span-3">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-medium">{t.trendTitle}</h3>
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-ink-3">{t.trendNote}</span>
          </div>
          <TrendLine points={TREND_POINTS} projectedFrom={TREND_PROJECTED_FROM} unit="%" className="max-h-[300px]" />
          <p className="mt-3 max-w-[60em] text-pretty text-xs text-ink-3">{t.trendSource}</p>
        </div>
      </Reveal>
    </Section>
  );
}

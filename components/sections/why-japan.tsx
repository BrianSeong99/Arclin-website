"use client";

import { useLocale } from "@/lib/i18n/context";
import { TREND_POINTS, TREND_PROJECTED_FROM } from "@/lib/site";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/viz/count-up";
import { TrendLine } from "@/components/viz/trend-line";

/** Editorial numerals: three oversized display-serif figures, then a full-width hairline chart. */
export function WhyJapan() {
  const { t } = useLocale();
  return (
    <Section id="about" num="01">
      <SectionHeading label={t.whyLabel} lines={[t.whyH2a, t.whyH2b]} lead={t.whyBody} />
      <div className="mt-16 grid gap-x-10 gap-y-12 border-t border-line pt-10 md:grid-cols-3">
        {t.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12}>
            <div className="flex items-baseline font-display text-[clamp(72px,9vw,124px)] leading-[0.9] tracking-[-0.03em] text-ink tabular">
              <CountUp value={s.value} decimals={s.decimals} duration={2} />
              <span className="ml-2 font-sans text-[0.22em] font-medium tracking-normal text-pine">{s.unit}</span>
            </div>
            <div className="mt-5 text-base font-medium">{s.label}</div>
            <div className="mt-1 text-[13px] text-ink-3">{s.sub}</div>
            <details className="mt-3 font-mono text-[11.5px] text-ink-3">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 tracking-[0.08em] underline decoration-line-strong underline-offset-4 [&::-webkit-details-marker]:hidden">{t.source}</summary>
              <p className="mt-1.5 max-w-[32em] font-sans leading-relaxed">{s.source}</p>
            </details>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-16 border-t border-line pt-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-base font-medium">{t.trendTitle}</h3>
          <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3">{t.trendNote}</span>
        </div>
        <TrendLine points={TREND_POINTS} projectedFrom={TREND_PROJECTED_FROM} unit="%" className="max-h-[320px]" />
        <p className="mt-3 max-w-[60em] text-pretty text-xs text-ink-3">{t.trendSource}</p>
      </Reveal>
    </Section>
  );
}

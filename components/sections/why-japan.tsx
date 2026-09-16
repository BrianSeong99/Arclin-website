"use client";

import { useLocale } from "@/lib/i18n/context";
import { TREND_POINTS, TREND_PROJECTED_FROM } from "@/lib/site";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/viz/count-up";
import { TrendLine } from "@/components/viz/trend-line";

export function WhyJapan() {
  const { t } = useLocale();
  return (
    <Section id="about">
      <SectionHeading label={t.whyLabel} lines={[t.whyH2a, t.whyH2b]} lead={t.whyBody} />
      <div className="mt-14 grid items-start gap-[clamp(32px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div className="grid gap-2">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="grid grid-cols-[minmax(0,auto)_1fr] items-baseline gap-5 border-t border-line py-[22px]">
              <div className="flex items-baseline font-mono text-[clamp(40px,4.5vw,56px)] leading-none text-ink tabular">
                <CountUp value={s.value} decimals={s.decimals} />
                <span className="ml-1 text-[0.42em] text-ink-3">{s.unit}</span>
              </div>
              <div>
                <div className="font-medium">{s.label}</div>
                <div className="mt-0.5 text-[13px] text-ink-3">{s.sub}</div>
                <details className="mt-2 font-mono text-[11.5px] text-ink-3">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 tracking-[0.08em] underline decoration-line-strong underline-offset-4 [&::-webkit-details-marker]:hidden">{t.source}</summary>
                  <p className="mt-1.5 font-sans leading-relaxed">{s.source}</p>
                </details>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
        <Reveal delay={0.15} className="rounded-xl border border-line bg-paper-2 p-6">
          <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-3">
            <span>{t.trendTitle}</span>
            <span>{t.trendNote}</span>
          </div>
          <TrendLine points={TREND_POINTS} projectedFrom={TREND_PROJECTED_FROM} unit="%" />
          <p className="mt-3 text-pretty text-xs text-ink-3">{t.trendSource}</p>
        </Reveal>
      </div>
    </Section>
  );
}

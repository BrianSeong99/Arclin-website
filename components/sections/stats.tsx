"use client";
import { useLocale } from "@/lib/i18n/context";
import { TREND_POINTS, TREND_PROJECTED_FROM } from "@/lib/site";
import { Section, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/site/reveal";
import { CountUp } from "@/components/viz/count-up";
import { TrendLine } from "@/components/viz/trend-line";
import { DonutGauge } from "@/components/viz/donut-gauge";
import { DemoTag } from "@/components/ui/demo-tag";
import { Footnote } from "@/components/ui/footnote";
import { cn } from "@/lib/utils";

const card = "flex flex-col rounded-lg p-6 sm:p-8";

/** Bento of statistics (robot.com's "Already working at scale" block): one yellow cell, one brand cell, the rest raised. */
export function Stats() {
  const { t } = useLocale();
  const [s0, s1, s2] = t.stats;
  return (
    <Section id="why">
      <SectionHeading label={t.statsKicker} lines={t.statsH2} />
      <Stagger className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <StaggerItem className={cn(card, "on-highlight bg-highlight text-on-highlight")}>
          <span className="t-label">{s0.label}</span>
          <CountUp value={s0.value} decimals={s0.decimals} suffix={s0.unit} className="mt-6" />
          <span className="t-body-s mt-2 text-on-highlight/75">{s0.sub}</span>
          <Footnote tone="highlight" text={s0.source} className="mt-auto pt-6" />
        </StaggerItem>
        <StaggerItem className={cn(card, "on-brand bg-brand text-on-brand")}>
          <span className="t-label">{s1.label}</span>
          <CountUp value={s1.value} decimals={s1.decimals} suffix={s1.unit} className="mt-6" />
          <span className="t-body-s mt-2 text-on-brand-muted">{s1.sub}</span>
          <Footnote tone="brand" text={s1.source} className="mt-auto pt-6" />
        </StaggerItem>
        <StaggerItem className={cn(card, "bg-raised shadow-soft")}>
          <span className="t-label">{s2.label}</span>
          <CountUp value={s2.value} decimals={s2.decimals} suffix={s2.unit} className="mt-6" />
          <span className="t-body-s mt-2 text-ink-muted">{s2.sub}</span>
          <Footnote text={s2.source} className="mt-auto pt-6" />
        </StaggerItem>
        <StaggerItem className={cn(card, "bg-raised shadow-soft lg:col-span-2")}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="t-label">{t.trendTitle}</span>
            <span className="t-caption text-ink-subtle">{t.trendNote}</span>
          </div>
          <TrendLine points={TREND_POINTS} projectedFrom={TREND_PROJECTED_FROM} unit="%" label={t.trendTitle} className="mt-4" />
          <Footnote text={t.trendSource} className="mt-4" />
        </StaggerItem>
        <StaggerItem className={cn(card, "bg-sunken")}>
          <blockquote className="t-title-m text-balance">
            {t.quoteA}
            <br />
            {t.quoteB}
          </blockquote>
          <cite className="t-caption mt-auto pt-6 not-italic text-ink-subtle">— {t.quoteBy}</cite>
        </StaggerItem>
        <StaggerItem className={cn(card, "bg-raised shadow-soft lg:col-span-3")}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="t-label">{t.kpiTitle}</span>
            <DemoTag />
          </div>
          <div className="mt-6 flex flex-wrap justify-around gap-6">
            {t.kpis.map((k) => (
              <DonutGauge key={k.label} value={k.value} fraction={k.fraction} unit={k.unit} label={k.label} />
            ))}
          </div>
          <p className="t-caption mt-6 max-w-[60em] text-ink-subtle">{t.kpiNote}</p>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}

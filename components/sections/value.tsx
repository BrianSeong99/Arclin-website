"use client";

import { useLocale } from "@/lib/i18n/context";
import { useIsMobile } from "@/hooks/use-media";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { DonutGauge } from "@/components/viz/donut-gauge";
import { DemoTag } from "@/components/ui/demo-tag";

export function Value() {
  const { t } = useLocale();
  const mobile = useIsMobile();
  return (
    <Section id="value" num="06">
      <SectionHeading label={t.valueLabel} lines={t.valueH2} />
      <div className="mt-12 grid gap-x-10 gap-y-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        {t.values.map((v, i) => (
          <Reveal key={v.kicker} delay={i * 0.1} className="border-t-2 border-pine pt-5">
            <div className="font-mono text-[11px] tracking-[0.18em] text-ink-3">{v.kicker}</div>
            <h3 className="mb-4 mt-1.5 text-[22px] font-medium">{v.title}</h3>
            {v.items.map((it) => (
              <div key={it.h} className="grid grid-cols-[auto_1fr] gap-3 border-t border-line py-2.5 text-[14.5px]">
                <span aria-hidden className="mt-[9px] size-2 rounded-full bg-pine-3" />
                <div>
                  <div className="font-medium">{it.h}</div>
                  <div className="mt-0.5 text-[13.5px] text-ink-2">{it.b}</div>
                </div>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
      <Reveal className="console-grid mt-16 overflow-hidden rounded-2xl border border-console-line bg-console text-console-text shadow-[0_30px_60px_-40px_rgba(14,22,20,.6)]">
        <div className="flex items-center gap-2 border-b border-console-line px-5 py-2.5 font-mono text-[10px] tracking-[0.18em] text-console-muted">
          <span aria-hidden className="size-2 rounded-full bg-signal-2/70" /><span aria-hidden className="size-2 rounded-full bg-console-line" /><span aria-hidden className="size-2 rounded-full bg-console-line" />
          <span className="ml-3">ARCLIN · PILOT DASHBOARD</span>
        </div>
        <div className="p-[clamp(20px,3vw,36px)]">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] text-console-muted">{t.kpiKicker}</div>
            <div className="mt-1.5 text-lg font-medium">{t.kpiTitle}</div>
          </div>
          <DemoTag tone="console" />
        </div>
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          {t.kpis.map((k) => (
            <div key={k.label} className="flex justify-center">
              <DonutGauge value={k.value} fraction={k.fraction} unit={k.unit} label={k.label} size={mobile ? 130 : 160} />
            </div>
          ))}
        </div>
        <p className="mt-6 text-pretty text-xs text-console-muted">{t.kpiNote}</p>
        </div>
      </Reveal>
    </Section>
  );
}

"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal, Stagger, StaggerItem } from "@/components/site/reveal";
import { DonutGauge } from "@/components/viz/donut-gauge";
import { DemoTag } from "@/components/ui/demo-tag";

export function Value() {
  const { t } = useLocale();
  const s = t.value;
  return (
    <Section id="value" tone="paper-2">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <Stagger className="grid gap-4 md:grid-cols-3">
          {s.parties.map((p, i) => (
            <StaggerItem key={p.title} className="rounded-lg border border-line bg-paper p-6">
              <div className="font-mono text-[11px] tracking-[0.2em] text-pine">0{i + 1}</div>
              <h3 className="mt-3 text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="console-grid mt-8 overflow-hidden rounded-lg border border-console-line bg-console text-console-text">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-console-line px-6 py-4">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase">{s.kpiTitle}</h3>
            <DemoTag tone="console" />
          </div>
          <div className="grid gap-8 px-6 py-10 sm:grid-cols-3">
            {s.kpis.map((k) => {
              const fraction = k.direction === "below" ? 1 - k.value / (k.target * 1.6) : k.value / 100;
              const ok = k.direction === "below" ? k.value <= k.target : k.value >= k.target;
              return (
                <div key={k.id} className="flex flex-col items-center">
                  <DonutGauge value={k.value} fraction={fraction} unit={k.unit} label={k.label} ok={ok} />
                  <p className="mt-2 text-center font-mono text-[11px] tracking-wider text-console-muted">{k.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="border-t border-console-line px-6 py-3 text-xs text-console-muted">{s.footnote}</p>
        </Reveal>
      </div>
    </Section>
  );
}

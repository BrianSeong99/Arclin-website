"use client";

import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";

export function Partner() {
  const { t } = useLocale();
  const s = t.partner;
  return (
    <Section id="partner">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.12}>
          {s.paths.map((p) => (
            <StaggerItem key={p.id}>
              <details className="group rounded-lg border border-line bg-paper open:border-pine/50 hover:border-pine/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <div>
                    <Badge>{p.tag}</Badge>
                    <h3 className="mt-3 text-xl font-medium text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink-2">{p.summary}</p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-pine transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <div className="border-t border-line px-6 pb-6 pt-4">
                  <ol className="space-y-2">
                    {p.details.map((d, i) => (
                      <li key={d} className="flex gap-3 text-sm text-ink-2">
                        <span className="font-mono text-[11px] text-pine">{String(i + 1).padStart(2, "0")}</span>
                        {d}
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 font-mono text-[11px] tracking-wider text-ink-3">{s.pricing}</p>
      </div>
    </Section>
  );
}

"use client";

import { Languages, ScrollText, Workflow, ShieldCheck, Handshake, Wrench, type LucideIcon } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/site/reveal";

const icons: Record<string, LucideIcon> = {
  language: Languages,
  regulation: ScrollText,
  workflow: Workflow,
  privacy: ShieldCheck,
  channel: Handshake,
  ops: Wrench,
};

export function Walls() {
  const { t } = useLocale();
  const s = t.walls;
  return (
    <Section id="walls">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {s.items.map((it, i) => {
            const Icon = icons[it.icon] ?? ShieldCheck;
            return (
              <StaggerItem key={it.title} className="group relative rounded-lg border border-line bg-paper p-6 transition-colors hover:border-pine/50">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-md bg-pine/10 text-pine">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-medium text-ink">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{it.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

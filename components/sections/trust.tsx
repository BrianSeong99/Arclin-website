"use client";

import { Lock, ShieldCheck, RadioTower, Network, type LucideIcon } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/site/reveal";

const icons: Record<string, LucideIcon> = { privacy: Lock, safety: ShieldCheck, radio: RadioTower, network: Network };

export function Trust() {
  const { t } = useLocale();
  const s = t.trust;
  return (
    <Section id="trust" tone="paper-2">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {s.items.map((it) => {
            const Icon = icons[it.icon] ?? ShieldCheck;
            return (
              <StaggerItem key={it.title}>
                <span className="flex size-12 items-center justify-center rounded-full border border-line-strong text-pine">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-base font-medium text-ink">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{it.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}

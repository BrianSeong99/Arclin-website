"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

export function Company() {
  const { t } = useLocale();
  const s = t.company;
  return (
    <Section id="company">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} />
        <Reveal className="mx-auto max-w-3xl rounded-lg border border-line bg-paper">
          <dl className="divide-y divide-line">
            {s.rows.map((r) => (
              <div key={r.k} className="grid gap-1 px-6 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-mono text-[11px] tracking-[0.2em] text-ink-3">{r.k}</dt>
                <dd className={r.v === t.common.tbd ? "text-sm text-ink-3" : "text-sm text-ink"}>{r.v}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-line px-6 py-3 text-xs text-ink-3">{s.registry}</p>
        </Reveal>
      </div>
    </Section>
  );
}

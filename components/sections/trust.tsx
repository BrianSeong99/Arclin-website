"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { TrustIcon, TRUST_ICON_ORDER } from "@/components/viz/trust-icons";

/** Six principles in a dark hairline grid, one drawn line icon each. */
export function Trust() {
  const { t } = useLocale();
  return (
    <Section id="trust" tone="console" num="08">
      <SectionHeading tone="console" label={t.trustLabel} lines={[t.trustH2a, t.trustH2b]} />
      <Reveal amount="some" className="mt-12 grid overflow-hidden rounded-2xl border border-console-line bg-console-2/50 sm:grid-cols-2 lg:grid-cols-3">
        {t.trust.map((tr, i) => (
          <Reveal
            key={tr.title}
            delay={i * 0.06}
            className="group relative border-b border-console-line p-7 transition-colors hover:bg-console-3/40 sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+3)]:border-l [&:nth-last-child(-n+1)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
          >
            <div className="flex items-start justify-between">
              <TrustIcon id={TRUST_ICON_ORDER[i]} delay={i * 0.1} className="text-signal" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-console-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-8 text-lg font-medium text-console-text">{tr.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-console-muted">{tr.body}</p>
          </Reveal>
        ))}
      </Reveal>
      <Reveal>
        <p className="mt-8 max-w-[44em] text-[13px] text-console-muted">{t.trustNote}</p>
      </Reveal>
    </Section>
  );
}

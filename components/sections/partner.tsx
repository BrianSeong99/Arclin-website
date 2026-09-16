"use client";

import { useLocale } from "@/lib/i18n/context";
import { mailto } from "@/lib/site";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

export function Partner() {
  const { t } = useLocale();
  return (
    <Section id="partner" tone="paper-2">
      <SectionHeading label={t.partnerLabel} lines={t.partnerH2} />
      <div className="mt-12 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        {t.partners.map((p, i) => (
          <Reveal
            key={p.kicker}
            delay={i * 0.12}
            className="grid content-start gap-4 rounded-[14px] border border-line bg-paper p-[clamp(24px,3vw,36px)] transition-[transform,border-color,box-shadow] duration-[450ms] ease-out-expo hover:-translate-y-1 hover:border-pine-3 hover:shadow-[0_12px_30px_-18px_rgba(23,27,26,.35)]"
          >
            <div className="font-mono text-[11px] tracking-[0.18em] text-pine">{p.kicker}</div>
            <h3 className="text-2xl font-medium leading-[1.35]">{p.title}</h3>
            <p className="text-pretty text-ink-2">{p.body}</p>
            <div className="mt-2">
              <div className="mb-2 font-mono text-[10px] tracking-[0.18em] text-ink-3">{t.fitKicker}</div>
              {p.fit.map((f, j) => (
                <Reveal key={f} delay={j * 0.07} className="flex gap-2.5 border-t border-line py-[7px] text-sm text-ink-2">
                  <span className="flex-none font-mono text-pine">✓</span>
                  <span>{f}</span>
                </Reveal>
              ))}
            </div>
            <a href={mailto(p.subject)} className="mt-2 inline-flex items-center gap-2 justify-self-start rounded-md bg-pine px-[18px] py-3 text-[14.5px] font-medium text-paper transition-colors hover:bg-pine-2">
              {p.cta}
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

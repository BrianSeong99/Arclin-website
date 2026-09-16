"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

const card = "grid content-start gap-2.5 rounded-xl border border-line p-7";

export function Bridge() {
  const { t } = useLocale();
  return (
    <Section id="bridge">
      <SectionHeading label={t.bridgeLabel} lines={[t.bridgeH2a, t.bridgeH2b]} />
      <div className="mt-14 grid items-stretch gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        <Reveal className={card}>
          <div className="font-mono text-[11px] tracking-[0.18em] text-ink-3">{t.bridgeAKicker}</div>
          <h3 className="mb-2 text-xl font-medium">{t.bridgeATitle}</h3>
          {t.bridgeAItems.map((x) => (
            <div key={x} className="border-t border-line py-1.5 text-[14.5px] text-ink-2">{x}</div>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="relative grid content-start gap-2.5 overflow-hidden rounded-xl bg-pine p-7 text-paper">
          <div aria-hidden className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative font-display text-3xl italic leading-none">Arclin</div>
          <div className="relative font-mono text-[11px] tracking-[0.18em] text-pine-3">{t.bridgeBKicker}</div>
          {t.bridgeBItems.map((x) => (
            <div key={x} className="relative border-t border-paper/20 py-1.5 text-[14.5px]">{x}</div>
          ))}
        </Reveal>
        <Reveal delay={0.2} className={card}>
          <div className="font-mono text-[11px] tracking-[0.18em] text-ink-3">{t.bridgeCKicker}</div>
          <h3 className="mb-2 text-xl font-medium">{t.bridgeCTitle}</h3>
          {t.bridgeCItems.map((x) => (
            <div key={x} className="border-t border-line py-1.5 text-[14.5px] text-ink-2">{x}</div>
          ))}
        </Reveal>
      </div>
      <Reveal>
        <p className="mx-auto mt-10 max-w-[36em] text-pretty text-center text-base text-ink-2">{t.bridgeNote}</p>
      </Reveal>
    </Section>
  );
}

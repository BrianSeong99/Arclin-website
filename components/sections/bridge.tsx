"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

const cell = "grid content-start gap-2 p-7";

/** Bento row: partner tech · Arclin adaptation layer (dark blueprint cell) · care facility. */
export function Bridge() {
  const { t } = useLocale();
  const list = (items: readonly string[], dark = false) =>
    items.map((x) => (
      <div key={x} className={dark ? "border-t border-console-line py-2 text-[14px] text-console-text" : "border-t border-line py-2 text-[14px] text-ink-2"}>
        {x}
      </div>
    ));
  return (
    <Section id="bridge" num="03">
      <SectionHeading label={t.bridgeLabel} lines={[t.bridgeH2a, t.bridgeH2b]} />
      <Reveal amount="some" className="mt-14 grid overflow-hidden rounded-2xl border border-line-strong md:grid-cols-[1fr_1.2fr_1fr]">
        <div className={`${cell} border-b border-line bg-paper md:border-b-0 md:border-r`}>
          <div className="font-mono text-[10.5px] tracking-[0.18em] text-ink-3">{t.bridgeAKicker}</div>
          <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em]">{t.bridgeATitle}</h3>
          {list(t.bridgeAItems)}
        </div>
        <div className={`${cell} blueprint-grid relative border-b border-console-line bg-console text-console-text md:border-b-0 md:border-r`}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--signal)_14%,transparent),transparent_60%)]" />
          <div className="relative font-mono text-[10.5px] tracking-[0.18em] text-signal">{t.bridgeBKicker}</div>
          <h3 className="relative mb-2 flex items-center gap-2 text-lg font-semibold tracking-[-0.01em]">
            <span aria-hidden className="inline-block size-2 rotate-45 rounded-[2px] bg-signal" />
            Arclin
          </h3>
          <div className="relative">{list(t.bridgeBItems, true)}</div>
        </div>
        <div className={`${cell} bg-paper`}>
          <div className="font-mono text-[10.5px] tracking-[0.18em] text-ink-3">{t.bridgeCKicker}</div>
          <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em]">{t.bridgeCTitle}</h3>
          {list(t.bridgeCItems)}
        </div>
      </Reveal>
      <Reveal>
        <p className="mx-auto mt-10 max-w-[36em] text-pretty text-center text-[15px] text-ink-2">{t.bridgeNote}</p>
      </Reveal>
    </Section>
  );
}

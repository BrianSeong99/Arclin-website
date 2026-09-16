"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, Kicker, Heading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

export function Walls() {
  const { t } = useLocale();
  return (
    <Section id="walls" tone="paper-2">
      <Reveal>
        <Kicker>{t.wallsLabel}</Kicker>
      </Reveal>
      <div className="mt-5 grid items-end gap-x-16 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <Reveal>
          <Heading lines={[t.wallsH2a, t.wallsH2b]} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[32em] text-pretty text-ink-2">{t.wallsBody}</p>
        </Reveal>
      </div>
      <div className="mt-14 flex items-center gap-4 font-mono text-[11px] tracking-[0.16em] text-ink-3">
        <span className="flex-none">{t.wallsFrom}</span>
        <span aria-hidden className="h-0 flex-1 border-t-[1.5px] border-dashed border-pine-3" />
        <span className="flex-none text-pine">{t.wallsTo}</span>
      </div>
      <div className="mt-5 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {t.walls.map((w, i) => (
          <Reveal
            key={w.title}
            delay={i * 0.08}
            className="grid gap-3.5 rounded-[10px] border border-line bg-paper px-6 pb-6 pt-[26px] transition-[transform,border-color] duration-[400ms] ease-out-expo hover:-translate-y-[3px] hover:border-pine-3"
          >
            <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-pine">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-ink-3">{w.tag}</span>
            </div>
            <h3 className="text-[19px] font-medium leading-[1.4]">{w.title}</h3>
            <p className="text-pretty text-sm text-ink-2">{w.body}</p>
            <p className="mt-0.5 flex gap-2 border-t border-line pt-3 text-[13px] text-pine">
              <span className="mt-[5px] flex-none font-mono text-[10px] tracking-[0.14em]">ARCLIN</span>
              <span>{w.fix}</span>
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

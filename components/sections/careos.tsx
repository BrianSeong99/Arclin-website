"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, Kicker, Heading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { LayerStack } from "@/components/viz/layer-stack";

const row = "flex justify-between bg-paper px-4 py-3";
const mono = "font-mono text-[10px] tracking-[0.14em]";

export function CareOS() {
  const { t } = useLocale();
  return (
    <Section id="careos" tone="paper-2">
      <Reveal>
        <Kicker>{t.careLabel}</Kicker>
      </Reveal>
      <div className="mt-5 grid items-end gap-x-16 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <Reveal>
          <Heading lines={t.careH2} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[32em] text-pretty text-ink-2">{t.careBody}</p>
        </Reveal>
      </div>
      <Reveal className="mt-14">
        <LayerStack layers={t.layers} labels={t.layerLabels} />
      </Reveal>
      <Reveal className="mt-14 grid items-center gap-8 border-t border-line pt-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        <blockquote className="text-balance text-[clamp(20px,2.2vw,26px)] font-medium leading-[1.5]">
          {t.careQuoteA}
          <br />
          {t.careQuoteB}
        </blockquote>
        <div className="grid max-w-[360px] text-sm">
          <div className={`${row} rounded-t-lg border border-line-strong`}>
            <span>{t.careIp1}</span>
            <span className={`${mono} text-ink-3`}>PARTNER IP</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] text-ember">
            <span className="flex-1 border-t border-dashed border-ember" />
            {t.careIpBoundary}
            <span className="flex-1 border-t border-dashed border-ember" />
          </div>
          <div className={`${row} border border-pine text-pine`}>
            <span>{t.careIp2}</span>
            <span className={mono}>ARCLIN</span>
          </div>
          <div className={`${row} rounded-b-lg border border-t-0 border-line-strong`}>
            <span>{t.careIp3}</span>
            <span className={`${mono} text-ink-3`}>FACILITY</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

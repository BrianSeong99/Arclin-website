"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { Section, Kicker, Heading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/**
 * The six walls as comparison rows: left = the wall a facility hits alone, right = Arclin's way.
 * Same six items and text as the brief; only the presentation is a before/after table.
 */
export function Walls() {
  const { t } = useLocale();
  const [active, setActive] = useState<number | null>(null);
  return (
    <Section id="walls" tone="paper-2" num="02">
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

      <Reveal className="mt-14 overflow-hidden rounded-xl border border-line bg-paper">
        {/* column heads */}
        <div className="grid grid-cols-[2.5rem_1fr] border-b border-line font-mono text-[11px] tracking-[0.18em] md:grid-cols-[3.5rem_1fr_1fr]">
          <div className="border-r border-line bg-sand/40" />
          <div className="flex items-center gap-2 px-5 py-3 text-ink-3 md:border-r md:border-line">
            <span aria-hidden className="size-1.5 rounded-full bg-ink-3" />
            {t.wallsFrom}
          </div>
          <div className="hidden items-center gap-2 px-5 py-3 text-pine md:flex">
            <span aria-hidden className="size-1.5 rounded-full bg-pine" />
            ARCLIN → {t.wallsTo}
          </div>
        </div>
        {t.walls.map((w, i) => {
          const on = active === i;
          return (
            <Reveal
              key={w.title}
              delay={i * 0.07}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              className={cn(
                "grid grid-cols-[2.5rem_1fr] border-b border-line transition-colors last:border-b-0 md:grid-cols-[3.5rem_1fr_1fr]",
                on && "bg-sage/30",
              )}
            >
              <div className="flex items-start justify-center border-r border-line bg-sand/40 pt-6 font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</div>
              <div className="px-5 py-6 md:border-r md:border-line">
                <div className="font-mono text-[10px] tracking-[0.16em] text-ink-3">{w.tag}</div>
                <h3 className="mt-1.5 text-[18px] font-medium leading-[1.4]">{w.title}</h3>
                <p className="mt-2 max-w-[36em] text-pretty text-sm text-ink-2">{w.body}</p>
              </div>
              <div className={cn("flex gap-3 px-5 pb-6 pt-2 md:py-6", on ? "text-pine" : "text-ink-2")}>
                <span aria-hidden className={cn("mt-[3px] flex-none font-mono text-sm transition-colors", on ? "text-pine" : "text-pine-3")}>✓</span>
                <p className="text-pretty text-[15px] leading-relaxed">{w.fix}</p>
              </div>
            </Reveal>
          );
        })}
      </Reveal>
    </Section>
  );
}

"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Numbered accordion 1–4 (robot.com's "Warehouse automation / Delivery / OOH" rows).
 * One row open at a time; height animates in 240ms via grid-template-rows.
 */
export function Process() {
  const { t } = useLocale();
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <Section id="process">
      <SectionHeading label={t.processKicker} lines={t.processH2} />
      <ol className="mt-10 border-t border-hairline">
        {t.steps.map((s, i) => {
          const on = open === i;
          const panel = `${base}-${i}`;
          return (
            <li key={s.id} className="border-b border-hairline">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={panel}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="flex min-h-16 w-full items-center gap-6 py-4 text-left"
                >
                  <span className="t-numeral w-[1.2em] text-ink-subtle">{i + 1}</span>
                  <span className={cn("t-title-l flex-1", on ? "text-ink" : "text-ink-muted")}>{s.title}</span>
                  <Plus className={cn("size-6 flex-none text-ink-subtle transition-transform", on && "rotate-45")} aria-hidden />
                </button>
              </h3>
              <div id={panel} className={cn("grid transition-[grid-template-rows]", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-8 pl-0 md:grid-cols-[1.4fr_1fr] md:pl-[calc(1.2em*3.2+1.5rem)]">
                    <div>
                      <p className="t-body-l max-w-[36em] text-pretty text-ink-muted">{s.body}</p>
                      <ButtonLink href="#contact" className="mt-6">
                        {t.processCta}
                      </ButtonLink>
                    </div>
                    <ul className="flex flex-wrap content-start gap-2">
                      {s.walls.map((w) => (
                        <li key={w} className="t-body-s rounded-pill border border-border-strong px-4 py-2 text-ink-muted">
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

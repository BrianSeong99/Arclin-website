"use client";

import { useLocale } from "@/lib/i18n/context";
import { Section, Kicker, Heading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

/** Editorial numbered rows with the section title sticky on the left. */
export function Method() {
  const { t } = useLocale();
  return (
    <Section id="method" tone="paper-2" num="07">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Kicker>{t.methodLabel}</Kicker>
          </Reveal>
          <Reveal>
            <Heading lines={[t.methodH2a, t.methodH2b]} className="mt-5" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[28em] text-pretty text-ink-2">{t.fieldBody}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {t.fieldItems.map((f) => (
                <span key={f} className="rounded-full border border-line-strong px-3 py-[5px] text-[13px] text-ink-2">{f}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <ol className="grid overflow-hidden rounded-2xl border border-line-strong bg-paper sm:grid-cols-2">
          {t.steps.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="group relative border-b border-line p-7 transition-colors hover:bg-paper-2/60 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 [&:last-child]:border-b-0">
              <li className="grid content-between gap-6 sm:min-h-[200px] sm:gap-8">
                <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] text-ink-3">
                  <span>{i + 1}.0 · STEP</span>
                  <span aria-hidden className="size-1.5 rotate-45 rounded-[1px] bg-pine opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div>
                  <div className="font-display text-[clamp(40px,4vw,56px)] font-semibold leading-none tracking-[-0.04em] text-ink">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-4 text-[clamp(20px,1.8vw,24px)] font-semibold leading-[1.3] tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-2 max-w-[30em] text-pretty text-[14.5px] text-ink-2">{s.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
      <Reveal className="mt-20 border-t border-line pt-12">
        <p className="max-w-[24em] text-balance text-[clamp(24px,3vw,36px)] font-medium leading-[1.4] tracking-[-0.01em]">
          {t.fieldHa}
          <br />
          {t.fieldHb}
        </p>
      </Reveal>
    </Section>
  );
}

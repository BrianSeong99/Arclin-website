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
        <ol className="border-t border-line">
          {t.steps.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <li className="group grid grid-cols-[3.5rem_1fr] items-start gap-6 border-b border-line py-9 transition-colors sm:grid-cols-[6rem_1fr] sm:py-11">
                <span className="font-display text-[clamp(40px,4.5vw,64px)] leading-[0.85] tracking-[-0.03em] text-pine transition-transform duration-500 ease-out-expo group-hover:translate-x-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.3]">{s.title}</h3>
                  <p className="mt-3 max-w-[36em] text-pretty text-ink-2">{s.body}</p>
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

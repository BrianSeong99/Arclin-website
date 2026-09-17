"use client";

import { useLocale } from "@/lib/i18n/context";
import { EMAIL, mailto } from "@/lib/site";
import { Reveal } from "@/components/site/reveal";
import { h2Class } from "@/components/site/section";

export function Contact() {
  const { t } = useLocale();
  return (
    <section id="contact" className="blueprint-grid relative scroll-mt-20 overflow-hidden bg-console text-console-text">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--pine)_55%,transparent),transparent_70%)] blur-3xl" />
      <div className="container-x relative py-[clamp(64px,9vw,128px)] text-center">
        <Reveal>
          <h2 className={`${h2Class} mx-auto max-w-[22em] text-[clamp(26px,3.8vw,48px)]`}>
            {t.contactH2a}
            <br />
            {t.contactH2b}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-[34em] text-pretty text-console-muted">{t.contactBody}</p>
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={mailto(t.partners[0].subject)} className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[14.5px] font-medium text-ink hover:bg-signal">
            {t.contactCare}
            <span aria-hidden>→</span>
          </a>
          <a href={mailto(t.partners[1].subject)} className="inline-flex h-11 items-center gap-2 rounded-full border border-console-line px-5 text-[14.5px] font-medium text-console-text transition-colors hover:border-signal">
            {t.contactRobot}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
        <Reveal>
          <p className="mt-7 font-mono text-xs tracking-[0.1em] text-console-muted">{EMAIL}</p>
        </Reveal>
      </div>
    </section>
  );
}

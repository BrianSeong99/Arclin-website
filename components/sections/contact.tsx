"use client";

import { useLocale } from "@/lib/i18n/context";
import { EMAIL, mailto } from "@/lib/site";
import { Reveal } from "@/components/site/reveal";
import { h2Class } from "@/components/site/section";

export function Contact() {
  const { t } = useLocale();
  return (
    <section id="contact" className="scroll-mt-20 bg-pine text-paper">
      <div className="container-x py-[clamp(64px,9vw,128px)] text-center">
        <Reveal>
          <h2 className={`${h2Class} mx-auto max-w-[22em] text-[clamp(26px,3.8vw,48px)]`}>
            {t.contactH2a}
            <br />
            {t.contactH2b}
          </h2>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-[34em] text-pretty text-pine-3">{t.contactBody}</p>
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={mailto(t.partners[0].subject)} className="inline-flex items-center gap-2 rounded-md bg-paper px-5 py-[13px] text-[15px] font-medium text-pine">
            {t.contactCare}
            <span aria-hidden>→</span>
          </a>
          <a href={mailto(t.partners[1].subject)} className="inline-flex items-center gap-2 rounded-md border border-pine-3 px-5 py-[13px] text-[15px] font-medium text-paper transition-colors hover:bg-pine-2">
            {t.contactRobot}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
        <Reveal>
          <p className="mt-7 font-mono text-xs tracking-[0.1em] text-pine-3">{EMAIL}</p>
        </Reveal>
      </div>
    </section>
  );
}

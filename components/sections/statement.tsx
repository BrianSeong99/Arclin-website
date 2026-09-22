"use client";
import { useLocale } from "@/lib/i18n/context";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";

/** Brand slab with one large two-tone sentence (robot.com's "We built something rare" beat). */
export function Statement() {
  const { t } = useLocale();
  return (
    <Section tone="brand" id="about">
      <Reveal>
        <p className="t-statement max-w-[22em] text-balance">
          <span className="text-on-brand">{t.statementA}</span>
          <span className="text-on-brand-muted">{t.statementB}</span>
        </p>
      </Reveal>
    </Section>
  );
}

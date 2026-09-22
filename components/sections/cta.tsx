"use client";
import { useLocale } from "@/lib/i18n/context";
import { mailto } from "@/lib/site";
import { Section, Heading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";

/** Full-bleed yellow CTA band with the two mailto pills. */
export function Cta() {
  const { t } = useLocale();
  const [care, robot] = t.partners;
  return (
    <Section tone="highlight" id="contact">
      <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Heading lines={[t.contactH2a, t.contactH2b]} />
          <p className="t-body-l mt-5 max-w-[34em] text-pretty text-on-highlight/80">{t.contactBody}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <ButtonLink href={mailto(care.subject)} variant="on-highlight" size="lg">
            {t.contactCare}
          </ButtonLink>
          <ButtonLink href={mailto(robot.subject)} variant="on-highlight" size="lg">
            {t.contactRobot}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

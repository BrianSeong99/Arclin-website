"use client";

import { Mail, MapPin } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink } from "@/components/ui/button";

export function Contact() {
  const { t } = useLocale();
  const s = t.contact;
  const subject = encodeURIComponent(`[Arclin] ${t.common.company}`);
  return (
    <Section id="contact" tone="paper-2">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <Reveal className="mx-auto grid max-w-3xl gap-6 rounded-lg border border-line bg-paper p-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-pine" aria-hidden />
              <a href={`mailto:${s.email}?subject=${subject}`} className="font-mono text-base text-ink underline-offset-4 hover:underline">
                {s.email}
              </a>
              <span className="text-xs text-ink-3">{s.emailNote}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-pine" aria-hidden />
              <span className="text-sm text-ink-2">{s.address}</span>
            </div>
          </div>
          <ButtonLink href={`mailto:${s.email}?subject=${subject}`} size="lg">
            {s.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}

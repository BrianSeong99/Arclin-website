"use client";
import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Copy } from "./copy";
import { Kicker, Section } from "./section";

/**
 * Page opener: overline, one display line, optional lead.
 * The display face follows the locale: Italiana for English; the CJK display class for ja and zh
 * (`--font-body` on `html[lang]` resolves it to Zen Maru Gothic or Noto Sans SC at the same size).
 */
export function PageHeader({ overline, heading, lead, children, className }: { overline: string; heading: string; lead?: string; children?: ReactNode; className?: string }) {
  const { locale } = useLocale();
  return (
    <Section className={className}>
      <Kicker>{overline}</Kicker>
      <h1 className={cn(locale === "en" ? "t-display-l" : "t-jp-display-l", "mt-4 max-w-[18em] text-balance")}>
        <Copy text={heading} />
      </h1>
      {lead && (
        <p className="t-body-l mt-5 max-w-[36em] text-pretty text-ink-muted">
          <Copy text={lead} />
        </p>
      )}
      {children}
    </Section>
  );
}

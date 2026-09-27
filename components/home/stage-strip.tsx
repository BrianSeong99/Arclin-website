"use client";
import { useLocale } from "@/lib/i18n/context";
import { Band } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";

export interface StageStripProps {
  className?: string;
}

/**
 * Band 2, where the company stands (2026-09-28). robot.com puts a "trusted by" logo row here; Arclin was founded this
 * month and has no deployments to name, so the strip says so instead: founded line, one honest sentence on what is done
 * and what comes next, and an outline pill. One paper strip; below 768 the pieces stack.
 */
export function StageStrip({ className }: StageStripProps) {
  const { locale, t } = useLocale();
  const { sentence, cta } = t.home.stage;

  return (
    <Band id="stage" tone="page" className={className} slabClassName="flex flex-col gap-4 p-5 md:min-h-40 md:flex-row md:items-center md:justify-between md:gap-10 md:p-6">
      <div className="flex max-w-[760px] flex-col gap-2">
        <p className="t-caption text-ink-subtle">
          <Copy text={t.common.founded} />
        </p>
        <p className="t-body text-ink">
          <Copy text={sentence} />
        </p>
      </div>
      <PillLink href={`/${locale}/contact/`} label={cta} variant="outline" className="self-start md:self-auto" />
    </Band>
  );
}

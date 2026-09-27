"use client";
import { cn } from "@/lib/utils";
import { Band } from "@/components/home/band";
import { Copy } from "@/components/site/copy";
import { DemoTag } from "@/components/ui/demo-tag";
import { useLocale } from "@/lib/i18n/context";

/** Frosted card over the night slab (night shift; Mobbin: Twingate and Resend number rows). */
function Glass({ className, children }: { className?: string; children: React.ReactNode }) {
  return <article className={cn("glass-night relative flex min-w-0 flex-col gap-2 overflow-hidden rounded-xl p-5 md:p-6", className)}>{children}</article>;
}

/** A figure in Coustard at 56px, leaf gold, its unit beside it at title size; the label and source under it. */
function Figure({ value, unit, label, source }: { value: string; unit: string; label: string; source: string }) {
  return (
    <Glass>
      <p className="flex flex-wrap items-baseline gap-x-2 text-leaf-gold">
        <span className="font-display" style={{ fontSize: "clamp(40px, 3.9vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
          <Copy text={value} />
        </span>
        {unit && (
          <span className="t-title-s">
            <Copy text={unit} />
          </span>
        )}
      </p>
      <p className="t-body text-on-brand">
        <Copy text={label} />
      </p>
      <p className="t-caption text-on-brand-muted">
        <Copy text={source} />
      </p>
    </Glass>
  );
}

export interface StatsBentoProps {
  id?: string;
  className?: string;
}

/**
 * Band 5, why Japan (night shift, 2026-09-28): a night slab with the headline (statsH2), three frosted figure cards in a row
 * (the v2 stats: share aged 65+, projected worker shortfall, annual care cost) and one wide frosted card with the
 * 65+ trend line and its sources under a demo tag. Replaces robot.com's 3x2 bento. Below 768 the figures stack.
 * Numerals stay gold; headlines are --on-brand (white) by decision.
 */
export function StatsBento({ id, className }: StatsBentoProps) {
  const { t } = useLocale();
  const figures = t.stats.map((s) => {
    const n = s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals, maximumFractionDigits: s.decimals });
    return { value: s.unit === "%" ? `${n}%` : n, unit: s.unit === "%" ? "" : s.unit, label: s.label, source: s.source.split(".")[0] };
  });

  return (
    <Band tone="night" id={id} className={className} slabClassName="bg-night-shade flex flex-col gap-6 px-1 pt-6 pb-1 md:gap-8">
      <h2 className="t-display-m max-w-[640px] px-4 text-on-brand md:px-5">
        <Copy text={t.statsH2} />
      </h2>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
        {figures.map((f) => (
          <Figure key={f.label} {...f} />
        ))}
      </div>
      <Glass className="md:flex-row md:items-start md:gap-12">
        <div className="flex flex-col gap-3 md:w-[360px] md:shrink-0">
          <h3 className="t-title-s text-on-brand">
            <Copy text={t.trendTitle} />
            <span className="text-on-brand-muted">
              {" "}
              <Copy text={t.trendNote} />
            </span>
          </h3>
          <p className="t-caption text-on-brand-muted">
            <Copy text={t.trendSource} />
          </p>
          <DemoTag tone="brand" className="self-start" />
        </div>
        {/* Concept trend: a single gold line rising left to right. Demo data, not a measured series. */}
        <svg viewBox="0 0 900 220" aria-hidden="true" className="h-40 w-full md:h-55">
          <path d="M 0 200 C 200 190 400 150 600 90 C 700 60 800 40 900 20" fill="none" stroke="var(--leaf-gold)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </Glass>
    </Band>
  );
}

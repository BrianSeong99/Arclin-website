"use client";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export type Tone = "page" | "brand" | "highlight";

/** Pill marking a panel as simulated demo data (required on every dashboard-style panel). */
export function DemoTag({ className, tone = "page" }: { className?: string; tone?: Tone }) {
  const { t } = useLocale();
  return (
    <span
      className={cn(
        "t-caption inline-flex items-center gap-2 rounded-pill border px-3 py-1",
        tone === "brand" && "border-on-brand-muted/60 text-on-brand-muted",
        tone === "page" && "border-border-strong text-ink-subtle",
        tone === "highlight" && "border-on-highlight/40 text-on-highlight",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-pill", tone === "brand" ? "bg-highlight" : "bg-highlight-edge")} />
      {t.demo}
    </span>
  );
}

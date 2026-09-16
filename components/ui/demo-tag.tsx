"use client";

import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/** Pill marking a panel as simulated demo data (required on every dashboard-style panel). */
export function DemoTag({ className, tone = "paper" }: { className?: string; tone?: "paper" | "console" }) {
  const { t } = useLocale();
  const console_ = tone === "console";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-[0.1em]",
        console_ ? "border-console-line text-console-muted" : "border-line-strong text-ink-3",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", console_ ? "bg-signal-2" : "bg-ember")} />
      {t.demo}
    </span>
  );
}

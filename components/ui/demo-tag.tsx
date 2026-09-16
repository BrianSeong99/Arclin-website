"use client";

import { useLocale } from "@/lib/i18n/context";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

/**
 * Marks any dashboard / timeline / KPI panel as simulated demo data.
 * Required by the brief: every simulated number must be visibly labelled.
 */
export function DemoTag({ className, tone = "paper" }: { className?: string; tone?: "paper" | "console" }) {
  const { t } = useLocale();
  return (
    <Badge
      variant={tone === "console" ? "console" : "ember"}
      className={cn("normal-case tracking-[0.08em]", className)}
      title={t.common.demoLong}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", tone === "console" ? "bg-signal-2" : "bg-ember")} />
      {t.common.demo}
    </Badge>
  );
}

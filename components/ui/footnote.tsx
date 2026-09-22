"use client";
import { useId, useState } from "react";
import { Info } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { Tone } from "./demo-tag";

/** Expandable source / nature footnote attached to a statistic or demo panel. */
export function Footnote({ text, className, tone = "page" }: { text: string; className?: string; tone?: Tone }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const id = useId();
  const muted = tone === "brand" ? "text-on-brand-muted hover:text-on-brand" : tone === "highlight" ? "text-on-highlight/80 hover:text-on-highlight" : "text-ink-subtle hover:text-ink";
  return (
    <div className={cn("t-caption", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn("inline-flex min-h-8 items-center gap-1.5 underline-offset-4 hover:underline", muted)}
      >
        <Info className="size-3.5" aria-hidden />
        {t.source}
      </button>
      <p id={id} hidden={!open} className={cn("mt-1.5 max-w-prose", tone === "brand" ? "text-on-brand-muted" : tone === "highlight" ? "text-on-highlight/80" : "text-ink-muted")}>
        {text}
      </p>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { Info } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * Expandable source / nature footnote attached to a statistic or demo panel.
 */
export function Footnote({ text, className, tone = "paper" }: { text: string; className?: string; tone?: "paper" | "console" }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const id = useId();
  const console_ = tone === "console";
  return (
    <div className={cn("text-xs", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 font-mono text-[11px] tracking-wider underline-offset-4 hover:underline",
          console_ ? "text-console-muted hover:text-console-text" : "text-ink-3 hover:text-ink",
        )}
      >
        <Info className="size-3" aria-hidden />
        {t.source}
      </button>
      <p
        id={id}
        hidden={!open}
        className={cn("mt-1.5 max-w-prose leading-relaxed", console_ ? "text-console-muted" : "text-ink-3")}
      >
        {text}
      </p>
    </div>
  );
}

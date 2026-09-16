import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export function Section({ className, tone = "paper", ...props }: ComponentProps<"section"> & { tone?: "paper" | "paper-2" | "console" }) {
  return (
    <section
      className={cn(
        "relative scroll-mt-20 py-20 sm:py-28",
        tone === "paper-2" && "bg-paper-2",
        tone === "console" && "bg-console text-console-text",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  num,
  title,
  lead,
  tone = "paper",
  align = "left",
  className,
  aside,
}: {
  num: string;
  title: string;
  lead?: string;
  tone?: "paper" | "console";
  align?: "left" | "center";
  className?: string;
  aside?: ReactNode;
}) {
  const console_ = tone === "console";
  return (
    <div className={cn("mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        <div className={cn("mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em]", console_ ? "text-signal" : "text-pine")}>
          <span>{num}</span>
          <span aria-hidden className={cn("h-px w-10", console_ ? "bg-signal/50" : "bg-pine/40")} />
        </div>
        <h2 className={cn("text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl", console_ ? "text-console-text" : "text-ink")}>
          {title}
        </h2>
        {lead && (
          <p className={cn("mt-4 text-pretty text-base leading-relaxed sm:text-lg", console_ ? "text-console-muted" : "text-ink-2")}>{lead}</p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

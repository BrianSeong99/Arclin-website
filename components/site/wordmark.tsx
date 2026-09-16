import { cn } from "@/lib/utils";

export function Wordmark({ className, tone = "paper" }: { className?: string; tone?: "paper" | "console" }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-display text-[1.6rem] italic leading-none tracking-tight", tone === "console" ? "text-console-text" : "text-ink")}>
        Arclin
      </span>
      <span className={cn("text-sm font-medium tracking-[0.18em]", tone === "console" ? "text-console-muted" : "text-ink-3")}>智渡仁</span>
    </span>
  );
}

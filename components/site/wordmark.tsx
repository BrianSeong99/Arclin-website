import { cn } from "@/lib/utils";

export function Wordmark({ className, tone = "paper" }: { className?: string; tone?: "paper" | "console" }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("inline-flex items-center gap-2 font-display text-[1.25rem] font-semibold leading-none tracking-[-0.03em]", tone === "console" ? "text-console-text" : "text-ink")}>
        <span aria-hidden className={cn("inline-block size-[10px] rotate-45 rounded-[2px]", tone === "console" ? "bg-signal" : "bg-pine")} />
        Arclin
      </span>
      <span className={cn("text-[13px] font-medium tracking-[0.16em]", tone === "console" ? "text-console-muted" : "text-ink-3")}>智渡仁</span>
    </span>
  );
}

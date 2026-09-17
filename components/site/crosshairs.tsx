import { cn } from "@/lib/utils";

/** Vercel-style crosshair marks at the four corners of a bordered frame. */
export function Crosshairs({ className, tone = "paper" }: { className?: string; tone?: "paper" | "console" }) {
  const c = tone === "console" ? "text-console-muted" : "text-ink-3";
  const mark = (pos: string) => (
    <svg key={pos} aria-hidden viewBox="0 0 12 12" className={cn("pointer-events-none absolute size-3", pos, c)}>
      <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
  return <div className={cn("pointer-events-none absolute inset-0", className)}>{["-left-[6px] -top-[6px]", "-right-[6px] -top-[6px]", "-left-[6px] -bottom-[6px]", "-right-[6px] -bottom-[6px]"].map(mark)}</div>;
}

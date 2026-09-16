import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type Tone = "paper" | "paper-2" | "console" | "pine";

const toneClass: Record<Tone, string> = {
  paper: "",
  "paper-2": "bg-paper-2 border-y border-line",
  console: "bg-console text-console-text border-t border-console-line",
  pine: "bg-pine text-paper",
};

/** Full-bleed section band; children go inside the 1280px container. */
export function Section({ tone = "paper", className, children, ...props }: ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section className={cn("scroll-mt-20", toneClass[tone], className)} {...props}>
      <div className="container-x py-[clamp(56px,8vw,112px)]">{children}</div>
    </section>
  );
}

/** Mono kicker with a leading rule: "── なぜ日本か". */
export function Kicker({ children, tone = "paper", className }: { children: ReactNode; tone?: "paper" | "console"; className?: string }) {
  const c = tone === "console" ? "text-signal" : "text-pine";
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs tracking-[0.2em]", c, className)}>
      <span aria-hidden className={cn("h-px w-8", tone === "console" ? "bg-signal" : "bg-pine")} />
      {children}
    </div>
  );
}

export const h2Class = "text-[clamp(28px,3.6vw,44px)] leading-[1.3] font-medium tracking-[-0.01em] text-balance";

/** Section title; pass two lines to force the designed line break. */
export function Heading({ lines, className, as: Tag = "h2" }: { lines: [string, string?] | string; className?: string; as?: "h1" | "h2" | "p" }) {
  const [a, b] = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag className={cn(h2Class, className)}>
      {a}
      {b && (
        <>
          <br />
          {b}
        </>
      )}
    </Tag>
  );
}

/** Kicker + heading + optional lead, the standard section opener. */
export function SectionHeading({ label, lines, lead, tone = "paper", className }: { label: string; lines: [string, string?] | string; lead?: string; tone?: "paper" | "console"; className?: string }) {
  return (
    <div className={className}>
      <Kicker tone={tone}>{label}</Kicker>
      <Heading lines={lines} className={cn("mt-5", tone === "console" ? "text-console-text" : "text-ink")} />
      {lead && <p className={cn("mt-5 max-w-[38em] text-pretty", tone === "console" ? "text-console-muted" : "text-ink-2")}>{lead}</p>}
    </div>
  );
}

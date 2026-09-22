import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export type SectionTone = "page" | "brand" | "highlight" | "sunken";

const toneClass: Record<SectionTone, string> = {
  page: "bg-page text-ink",
  sunken: "bg-sunken text-ink",
  brand: "on-brand bg-brand text-on-brand",
  highlight: "on-highlight bg-highlight text-on-highlight",
};

/**
 * Full-bleed band. `brand` and `highlight` bands are inset from the viewport edge and rounded
 * (`radius-lg`) so the page reads as stacked slabs, the way robot.com stacks its colour blocks.
 */
export function Section({ tone = "page", inset, className, children, ...props }: ComponentProps<"section"> & { tone?: SectionTone; inset?: boolean }) {
  const slab = inset ?? tone !== "page";
  return (
    <section className={cn("relative scroll-mt-24", slab && "mx-2 rounded-lg sm:mx-3", toneClass[tone], className)} {...props}>
      <div className="container-x band-y">{children}</div>
    </section>
  );
}

/** Uppercase eyebrow above a heading (Kurogane `overline`). */
export function Kicker({ children, tone = "page", className }: { children: ReactNode; tone?: SectionTone; className?: string }) {
  const c = tone === "brand" ? "text-on-brand-muted" : tone === "highlight" ? "text-on-highlight/70" : "text-ink-subtle";
  return <p className={cn("t-overline", c, className)}>{children}</p>;
}

/** CJK section heading; pass two lines to force the designed line break. */
export function Heading({ lines, className, as: Tag = "h2", size = "l" }: { lines: [string, string?] | string; className?: string; as?: "h1" | "h2" | "p"; size?: "l" | "xl" }) {
  const [a, b] = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag className={cn(size === "xl" ? "t-jp-display-xl" : "t-jp-display-l", "text-balance", className)}>
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
export function SectionHeading({ label, lines, lead, tone = "page", className }: { label: string; lines: [string, string?] | string; lead?: string; tone?: SectionTone; className?: string }) {
  return (
    <div className={className}>
      <Kicker tone={tone}>{label}</Kicker>
      <Heading lines={lines} className="mt-4" />
      {lead && <p className={cn("t-body-l mt-5 max-w-[36em] text-pretty", tone === "brand" ? "text-on-brand-muted" : tone === "highlight" ? "text-on-highlight/80" : "text-ink-muted")}>{lead}</p>}
    </div>
  );
}

import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BandTone = "page" | "brand" | "highlight" | "raised" | "night";

/** Surface + text roles per tone. `.on-brand` / `.on-highlight` also switch the focus ring (globals.css). */
const toneClass: Record<BandTone, string> = {
  page: "bg-page text-ink",
  raised: "bg-raised text-ink",
  brand: "on-brand bg-brand text-on-brand",
  highlight: "on-highlight bg-highlight text-on-highlight",
  /* Night shift: the dark slab of the v3 homepage. Text roles are the on-brand pair (the same paper and muted paper). */
  night: "on-brand bg-night text-on-brand",
};

export interface BandProps {
  /** Colour role of the slab; also written to `data-band-tone` for the header theme swap (M12). */
  tone?: BandTone;
  /** 4px seam above the slab (spec §2: padding-top 4px on in-flow sections). Off for the first band. */
  seam?: boolean;
  /** Slab corner radius: `xl` = --radius-xl (24px; robot.com's 26 on two slabs collapses to it). */
  radius?: "xl" | "none";
  /** Draw the slab wrapper. Off for bands that are a bare grid of cards (trusted by, stats, rows). */
  slab?: boolean;
  as?: ElementType;
  id?: string;
  /** Class on the outer section (page-coloured, carries the gutter). */
  className?: string;
  /** Class on the slab. */
  slabClassName?: string;
  style?: CSSProperties;
  slabStyle?: CSSProperties;
  children: ReactNode;
}

/**
 * One homepage band per spec §2: a page-coloured section with the 5px gutter on both sides at every viewport
 * (--gutter-page) and the 4px seam (--seam) on top; inside it the slab, radius --radius-xl, overflow hidden.
 * Children are laid out by the caller, usually with <Grid24>.
 */
export function Band({ tone = "page", seam = true, radius = "xl", slab = true, as: Tag = "section", id, className, slabClassName, style, slabStyle, children }: BandProps) {
  const section = (
    <Tag
      id={id}
      data-band-tone={tone}
      className={cn("bg-body", className)}
      style={{ paddingInline: "var(--gutter-page)", paddingTop: seam ? "var(--seam)" : 0, ...style }}
    >
      {slab ? (
        <div className={cn("relative overflow-hidden", radius === "xl" && "rounded-xl", toneClass[tone], slabClassName)} style={slabStyle}>
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
  return section;
}

export interface Grid24Props {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** The 24-column grid every band shares (spec §2, V12): 24 tracks, 4px gap; 6 tracks below 768 like robot.com at 390. */
export function Grid24({ as: Tag = "div", className, style, children }: Grid24Props) {
  return (
    <Tag className={cn("grid-24", className)} style={style}>
      {children}
    </Tag>
  );
}

export interface ColProps {
  /** Column span at ≥768 (of 24). */
  span?: number;
  /** Column start at ≥768 (1-based). */
  start?: number;
  /** Row placement at ≥768, e.g. "1 / span 2". */
  row?: string;
  /** Column span below 768 (of 6). Defaults to the full 6. */
  spanSm?: number;
  startSm?: number;
  rowSm?: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** A grid cell. Placement goes through custom properties the `.cell-24` utility reads, so no arbitrary classes are needed. */
export function Col({ span = 24, start, row, spanSm = 6, startSm, rowSm, as: Tag = "div", className, style, children }: ColProps) {
  const vars = {
    "--col": span,
    "--col-start": start,
    "--row": row,
    "--col-sm": spanSm,
    "--col-start-sm": startSm,
    "--row-sm": rowSm,
  } as CSSProperties;
  return (
    <Tag className={cn("cell-24 min-w-0", className)} style={{ ...vars, ...style }}>
      {children}
    </Tag>
  );
}

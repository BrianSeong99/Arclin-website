"use client";

import { cn } from "@/lib/utils";

const paths: Record<string, string[]> = {
  safety: ["M24 6 L40 12 V24 C40 33 33 39 24 42 C15 39 8 33 8 24 V12 Z", "M17 24 L22 29 L31 19"],
  privacy: ["M6 24 C11 15 17 11 24 11 C31 11 37 15 42 24 C37 33 31 37 24 37 C17 37 11 33 6 24 Z", "M24 19 A5 5 0 1 0 24 29 A5 5 0 1 0 24 19", "M10 38 L38 10"],
  consent: ["M10 22 L22 22 L26 14 L30 30 L34 22 L38 22", "M8 36 H40"],
  judgment: ["M24 8 A6 6 0 1 0 24 20 A6 6 0 1 0 24 8", "M12 40 C12 30 17 26 24 26 C31 26 36 30 36 40", "M36 14 L42 20 L36 26"],
  standards: ["M24 6 L29 16 L40 17 L32 25 L34 36 L24 31 L14 36 L16 25 L8 17 L19 16 Z"],
  data: ["M24 8 A14 5 0 1 0 24 18 A14 5 0 1 0 24 8", "M10 13 V35 A14 5 0 0 0 38 35 V13", "M10 24 A14 5 0 0 0 38 24"],
};

export const TRUST_ICON_ORDER = ["safety", "privacy", "consent", "judgment", "standards", "data"] as const;

/** Hand-drawn line icons for the six trust principles; strokes draw in on reveal. */
export function TrustIcon({ id, className, delay = 0 }: { id: (typeof TRUST_ICON_ORDER)[number]; className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("size-12", className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[id].map((d, i) => (
        <path key={i} d={d} className="anim-draw" style={{ ["--len" as string]: 160, ["--delay" as string]: `${delay + i * 0.15}s` }} />
      ))}
    </svg>
  );
}

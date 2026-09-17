"use client";

import { useRef, type ReactNode } from "react";
import { ScrollPath } from "./scroll-path";

/** <main> wrapper that hosts the scroll-drawn gutter path. */
export function PageMain({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <main id="main" ref={ref} className="relative flex-1">
      <ScrollPath target={ref} />
      {children}
    </main>
  );
}

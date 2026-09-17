"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Page-long dashed path in the left gutter, drawn by scroll progress — the robot's floor path
 * continuing down the page past each section numeral. Only on wide viewports (>= 1400px).
 */
export function ScrollPath({ target }: { target: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const [h, setH] = useState(0);
  const ref = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ["start 0.6", "end 0.9"] });
  const length = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [target]);

  if (!h) return null;
  // gentle wander between x=32 and x=48 every ~900px
  const segs = Math.max(2, Math.round(h / 900));
  let d = "M40 0";
  for (let i = 0; i < segs; i++) {
    const y0 = (h / segs) * i;
    const y1 = (h / segs) * (i + 1);
    const x = i % 2 ? 48 : 32;
    d += ` C40 ${y0 + (y1 - y0) * 0.35}, ${x} ${y0 + (y1 - y0) * 0.65}, 40 ${y1}`;
  }
  return (
    <svg ref={ref} aria-hidden width="80" height={h} viewBox={`0 0 80 ${h}`} className="pointer-events-none absolute left-0 top-0 hidden min-[1400px]:block">
      <path d={d} fill="none" stroke="var(--pine)" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="6 8" />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--pine)"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeDasharray="6 8"
        style={{ pathLength: reduce ? 1 : length }}
      />
    </svg>
  );
}

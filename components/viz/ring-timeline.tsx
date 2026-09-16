"use client";

import { cn } from "@/lib/utils";

export type RingSegment = { id: string; label: string; start: number; end: number };

const R_OUTER = 40;
const R_INNER = 33;

function polar(r: number, hour: number) {
  const a = ((hour / 24) * 360 - 90) * (Math.PI / 180);
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const;
}

function arcPath(start: number, end: number, r: number) {
  const span = ((end - start + 24) % 24) || 24;
  const [x1, y1] = polar(r, start);
  const [x2, y2] = polar(r, start + span);
  const large = span > 12 ? 1 : 0;
  return `M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)}`;
}

/**
 * 24-hour ring. Highlights the active segment; `hour` places the cursor.
 * Pure SVG so it stays crisp and cheap; the parent drives `hour` over time.
 */
export function RingTimeline({
  segments,
  activeId,
  hour,
  className,
  center,
}: {
  segments: readonly RingSegment[];
  activeId: string;
  hour: number;
  className?: string;
  center?: React.ReactNode;
}) {
  const [cx, cy] = polar((R_OUTER + R_INNER) / 2, hour);
  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <svg viewBox="-8 -8 116 116" className="size-full" role="img" aria-label="24h timeline">
        <circle cx="50" cy="50" r={(R_OUTER + R_INNER) / 2} fill="none" stroke="var(--console-line)" strokeWidth={R_OUTER - R_INNER} />
        {segments.map((s) => (
          <path
            key={s.id}
            d={arcPath(s.start, s.end, (R_OUTER + R_INNER) / 2)}
            fill="none"
            stroke={s.id === activeId ? "var(--signal)" : "var(--console-line)"}
            strokeWidth={R_OUTER - R_INNER - 2}
            className="transition-[stroke] duration-500"
          />
        ))}
        {/* hour ticks */}
        {Array.from({ length: 24 }).map((_, h) => {
          const [x1, y1] = polar(R_OUTER + 1.5, h);
          const [x2, y2] = polar(R_OUTER + (h % 6 === 0 ? 5 : 3), h);
          return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--console-muted)" strokeWidth={h % 6 === 0 ? 0.8 : 0.4} />;
        })}
        {[0, 6, 12, 18].map((h) => {
          const [x, y] = polar(R_OUTER + 10, h);
          return (
            <text key={h} x={x} y={y + 1.2} textAnchor="middle" fontSize="3.4" letterSpacing="0.3" className="fill-console-muted font-mono">
              {String(h).padStart(2, "0")}
            </text>
          );
        })}
        {/* cursor */}
        <circle cx={cx} cy={cy} r="2.6" fill="var(--console)" stroke="var(--signal-2)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="1" fill="var(--signal-2)" className="anim-blink" />
        <circle cx="50" cy="50" r={R_INNER - 3} fill="var(--console-2)" stroke="var(--console-line)" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{center}</div>
    </div>
  );
}

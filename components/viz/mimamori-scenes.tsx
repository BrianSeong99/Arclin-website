"use client";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SceneId = "patrol" | "standup" | "intake" | "voice";

/**
 * Storyboard line drawings for Mimamori, drawn in `currentColor` at one stroke weight so they
 * sit on any band. The robot's eyes are the single Soga mark.
 */
export function SceneIllustration({ id, className }: { id: SceneId; className?: string }) {
  const reduce = useReducedMotion();
  const common = { viewBox: "0 0 240 160", className: cn("h-auto w-full", className), fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const eye = "var(--highlight)";

  if (id === "patrol") {
    const route = "M 40 120 L 40 44 L 120 44 L 120 92 L 200 92 L 200 124";
    return (
      <svg {...common}>
        <rect x="16" y="20" width="208" height="120" rx="6" />
        <path d="M 80 20 L 80 70 M 80 70 L 16 70 M 150 20 L 150 70 M 150 70 L 224 70 M 120 110 L 120 140" />
        <path d={route} strokeDasharray="4 6" />
        <g>
          <circle r="6" fill="var(--surface-brand)" stroke="none">
            {!reduce && <animateMotion dur="9s" repeatCount="indefinite" path={route} />}
          </circle>
          <circle r="2" fill={eye} stroke="none">
            {!reduce && <animateMotion dur="9s" repeatCount="indefinite" path={route} />}
          </circle>
        </g>
      </svg>
    );
  }
  if (id === "standup") {
    return (
      <svg {...common}>
        <line x1="16" y1="140" x2="224" y2="140" />
        <path d="M 20 100 L 20 140 M 20 100 L 84 100 L 84 140" />
        <circle cx="104" cy="52" r="10" />
        <path d="M 103 62 C 98 78, 96 96, 98 112" />
        <path d="M 98 112 C 94 124, 92 132, 92 140 M 100 112 C 108 124, 112 132, 114 140" />
        <path d="M 104 72 C 116 82, 126 92, 136 100" />
        <rect x="160" y="78" width="36" height="52" rx="18" />
        <rect x="164" y="48" width="28" height="24" rx="8" />
        <rect x="154" y="130" width="48" height="8" rx="4" />
        <path d="M 160 100 C 150 100, 143 100, 140 100" />
        <circle cx="137" cy="100" r="3.5" />
        <circle cx="172" cy="60" r="2.5" fill={eye} stroke="none" />
        <circle cx="184" cy="60" r="2.5" fill={eye} stroke="none" />
      </svg>
    );
  }
  if (id === "intake") {
    return (
      <svg {...common}>
        <rect x="30" y="112" width="100" height="10" rx="4" />
        <line x1="80" y1="122" x2="80" y2="134" />
        <line x1="60" y1="134" x2="100" y2="134" />
        <path d="M 60 66 L 64 110 L 96 110 L 100 66 Z" />
        <path d="M 100 76 C 114 76, 114 96, 100 96" />
        <path d="M 66 88 L 94 88" strokeDasharray="3 3" />
        <path d="M 134 118 L 170 118" strokeDasharray="3 4" />
        <rect x="172" y="96" width="52" height="44" rx="6" />
        <path d="M 182 118 L 214 118 M 182 128 L 204 128" />
        <rect x="182" y="30" width="32" height="40" rx="4" />
        <path d="M 188 42 L 208 42 M 188 50 L 208 50 M 188 58 L 200 58" />
        <path d="M 198 96 L 198 74" strokeDasharray="3 3" />
        <path d="M 194 78 L 198 72 L 202 78" />
      </svg>
    );
  }
  const bars = [6, 14, 22, 10, 18, 8, 16, 24, 12, 6];
  return (
    <svg {...common}>
      <path d="M 24 44 H 138 A 8 8 0 0 1 146 52 V 96 A 8 8 0 0 1 138 104 H 62 L 44 120 V 104 H 24 A 8 8 0 0 1 16 96 V 52 A 8 8 0 0 1 24 44 Z" />
      <g strokeWidth="2.4">
        {bars.map((h, i) => (
          <line key={i} x1={36 + i * 10} x2={36 + i * 10} y1={74 - h / 2} y2={74 + h / 2}>
            {!reduce && <animate attributeName="y1" values={`${74 - h / 2};${74 - h / 4};${74 - h / 2}`} dur={`${1 + (i % 3) * 0.3}s`} repeatCount="indefinite" />}
            {!reduce && <animate attributeName="y2" values={`${74 + h / 2};${74 + h / 4};${74 + h / 2}`} dur={`${1 + (i % 3) * 0.3}s`} repeatCount="indefinite" />}
          </line>
        ))}
      </g>
      <path d="M 150 74 L 176 74" strokeDasharray="3 4" />
      <path d="M 190 62 C 190 54, 196 50, 202 50 C 208 50, 214 54, 214 62 V 74 L 218 80 H 186 L 190 74 Z" />
      <path d="M 198 84 C 198 87, 206 87, 206 84" />
      <circle cx="214" cy="52" r="3" fill={eye} stroke="none" />
    </svg>
  );
}

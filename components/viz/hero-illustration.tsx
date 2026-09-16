"use client";

import { cn } from "@/lib/utils";

/**
 * Line-art hero: robot steadying an elderly person at the moment of standing up.
 * The floor path draws itself on load (CSS animation, reduced-motion safe).
 * Support ≠ transfer: the robot's hand is at the forearm, both feet stay on the floor.
 */
export function HeroIllustration({ className, title }: { className?: string; title: string }) {
  const ink = "var(--ink)";
  const pine = "var(--pine)";
  return (
    <svg viewBox="0 0 480 420" className={cn("h-auto w-full", className)} role="img" aria-label={title} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      {/* floor */}
      <line x1="20" y1="360" x2="460" y2="360" stroke={ink} strokeOpacity="0.25" strokeWidth="1.5" />
      {/* path the robot travelled — draws itself */}
      <path
        d="M 20 402 C 90 402, 120 388, 170 392 S 260 402, 300 384 S 330 372, 332 362"
        stroke={pine}
        strokeWidth="2"
        strokeDasharray="6 8"
        className="anim-draw"
        style={{ ["--len" as string]: 360, ["--delay" as string]: "0.2s" }}
      />
      <circle cx="20" cy="402" r="3" fill={pine} fillOpacity="0.4" />
      <circle cx="332" cy="362" r="4" fill={pine} className="anim-blink" />

      {/* chair (just stood up from it) */}
      <g stroke={ink} strokeWidth="2" strokeOpacity="0.55">
        <path d="M 62 180 L 62 262 L 138 262" />
        <path d="M 62 262 L 62 360 M 138 262 L 138 360" />
        <path d="M 62 180 C 62 172, 70 172, 78 172" />
      </g>

      {/* elderly person */}
      <g stroke={ink} strokeWidth="2.2">
        <circle cx="186" cy="118" r="21" />
        {/* torso, slight forward lean */}
        <path d="M 184 140 C 176 170, 172 210, 176 252" />
        {/* legs */}
        <path d="M 176 252 C 170 290, 168 325, 170 360" />
        <path d="M 178 252 C 190 292, 198 326, 202 360" />
        {/* cane arm + cane */}
        <path d="M 182 160 C 170 185, 158 215, 150 236" />
        <path d="M 150 236 L 142 360" strokeWidth="2" />
        <path d="M 142 236 L 158 236" />
        {/* arm toward robot */}
        <path d="M 187 160 C 205 180, 222 200, 240 214" />
      </g>

      {/* robot */}
      <g stroke={ink} strokeWidth="2.2">
        {/* base + wheels */}
        <rect x="282" y="328" width="98" height="20" rx="8" />
        <circle cx="303" cy="352" r="8" />
        <circle cx="361" cy="352" r="8" />
        {/* body */}
        <rect x="292" y="170" width="78" height="158" rx="34" />
        <line x1="312" y1="300" x2="350" y2="300" strokeOpacity="0.4" />
        {/* neck + head */}
        <line x1="331" y1="170" x2="331" y2="160" />
        <rect x="301" y="108" width="60" height="52" rx="14" />
        <line x1="331" y1="108" x2="331" y2="94" />
        <circle cx="331" cy="90" r="3.5" fill={ink} />
        {/* supporting arm: shoulder -> elbow -> hand at the person's forearm */}
        <path d="M 293 214 C 276 214, 262 216, 250 216" />
        <circle cx="244" cy="216" r="6.5" fill="var(--paper)" />
      </g>
      {/* eyes */}
      <circle cx="319" cy="134" r="4" fill={pine} />
      <circle cx="343" cy="134" r="4" fill={pine} />
      {/* detection arcs from the head towards the person */}
      <g stroke={pine} strokeWidth="1.5" strokeOpacity="0.7" className="anim-blink">
        <path d="M 296 122 A 34 34 0 0 0 296 146" />
        <path d="M 284 112 A 48 48 0 0 0 284 156" strokeOpacity="0.4" />
      </g>
      {/* ground contact hint: both feet down */}
      <g stroke={pine} strokeWidth="1.5" strokeOpacity="0.6">
        <path d="M 160 366 L 214 366" strokeDasharray="2 4" />
      </g>
    </svg>
  );
}

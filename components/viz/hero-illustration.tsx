"use client";
import { cn } from "@/lib/utils";

/**
 * Line drawing: robot steadying an elderly person at the moment of standing up.
 * One stroke weight, ink only, a single Soga mark for the robot's eyes (Kurogane imagery rule).
 * Support ≠ transfer: the hand is at the forearm, both feet stay on the floor.
 */
export function HeroIllustration({ className, title }: { className?: string; title: string }) {
  return (
    <svg viewBox="0 0 480 420" className={cn("h-auto w-full", className)} role="img" aria-label={title} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      {/* floor */}
      <line x1="20" y1="360" x2="460" y2="360" />
      {/* chair */}
      <path d="M 62 180 L 62 262 L 138 262" />
      <path d="M 62 262 L 62 360 M 138 262 L 138 360" />
      <path d="M 62 180 C 62 172, 70 172, 78 172" />
      {/* elderly person */}
      <circle cx="186" cy="118" r="21" />
      <path d="M 184 140 C 176 170, 172 210, 176 252" />
      <path d="M 176 252 C 170 290, 168 325, 170 360" />
      <path d="M 178 252 C 190 292, 198 326, 202 360" />
      <path d="M 182 160 C 170 185, 158 215, 150 236" />
      <path d="M 150 236 L 142 360" />
      <path d="M 142 236 L 158 236" />
      <path d="M 187 160 C 205 180, 222 200, 240 214" />
      {/* robot */}
      <rect x="282" y="328" width="98" height="20" rx="10" />
      <circle cx="303" cy="352" r="8" />
      <circle cx="361" cy="352" r="8" />
      <rect x="292" y="170" width="78" height="158" rx="36" />
      <line x1="331" y1="170" x2="331" y2="160" />
      <rect x="301" y="108" width="60" height="52" rx="16" />
      <line x1="331" y1="108" x2="331" y2="94" />
      <circle cx="331" cy="90" r="3.5" fill="var(--ink)" />
      {/* supporting arm: shoulder -> hand at the person's forearm */}
      <path d="M 293 214 C 276 214, 262 216, 250 216" />
      <circle cx="244" cy="216" r="6.5" fill="var(--surface-page)" />
      {/* eyes: the one highlight mark */}
      <circle cx="319" cy="134" r="5" fill="var(--highlight)" stroke="none" />
      <circle cx="343" cy="134" r="5" fill="var(--highlight)" stroke="none" />
    </svg>
  );
}

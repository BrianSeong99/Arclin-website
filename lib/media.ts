/**
 * Production media for the homepage video slots: the clips generated with Higgsfield on 2026-09-27 from the brand guide's
 * prompts (Figma, Brand guide 06), one reference still per slot animated with Kling v3.0, delivered as muted H.264 loops
 * with the still as the poster. Files live in public/video/ and ship with the site; regenerate through the same prompts.
 */
import type { DevMediaSlot } from "./dev-media";

/** Prefix a public path with the static-export base path (the GitHub Pages preview is served under /Arclin-website). */
export const withBase = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export type MediaEntry = { src: string; poster: string; ratio: string; label: string };

const slot = (name: DevMediaSlot, ratio: string, label: string): MediaEntry => ({ src: withBase(`/video/${name}.mp4`), poster: withBase(`/video/${name}.jpg`), ratio, label });

export const MEDIA: Record<DevMediaSlot, MediaEntry> = {
  hero: slot("hero", "16 / 9", "A companion robot waits in a care-home corridor in morning light as a care worker passes"),
  interlude: slot("interlude", "16 / 9", "A companion robot moves through an empty dining room in afternoon light"),
  "robot-company": slot("robot-company", "1 / 1", "A companion robot rests beside an armchair while a resident reads"),
  "robot-daily-help": slot("robot-daily-help", "1 / 1", "A companion robot holds a tray as a resident takes a teacup"),
  "robot-moving-safely": slot("robot-moving-safely", "1 / 1", "A companion robot moves along a corridor handrail beside a resident"),
  "robot-staying-in-touch": slot("robot-staying-in-touch", "1 / 1", "A companion robot turns toward a window in afternoon light, a hand resting on it"),
};

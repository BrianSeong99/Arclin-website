/**
 * Production media for the homepage video slots. Six clips, six different machines: Arclin is the layer between many
 * Chinese robot makers and Japanese care homes, so the footage shows a companion robot, a wheeled humanoid, a tabletop
 * companion, a delivery cart, a night patrol column and a telepresence robot. Generated with Higgsfield (one still per
 * slot animated with Kling v3.0), delivered as muted H.264 loops with the still as the poster. Files live in
 * public/video/ and ship with the site; retired clips move to media-archive/ and are never deleted.
 */

/** Prefix a public path with the static-export base path (the GitHub Pages preview is served under /Arclin-website). */
export const withBase = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export type MediaSlot = "hero" | "interlude" | "day-companion" | "delivery" | "night-patrol" | "telepresence";

export type MediaEntry = { src: string; poster: string; ratio: string; label: string };

const slot = (name: MediaSlot, ratio: string, label: string): MediaEntry => ({ src: withBase(`/video/${name}.mp4`), poster: withBase(`/video/${name}.jpg`), ratio, label });

export const MEDIA: Record<MediaSlot, MediaEntry> = {
  hero: slot("hero", "16 / 9", "A companion robot waits in a care-home corridor in morning light as a care worker passes"),
  interlude: slot("interlude", "16 / 9", "A wheeled humanoid service robot carries a tray through a care-home dining room at dusk"),
  "day-companion": slot("day-companion", "1 / 1", "A small tabletop companion robot sits beside a resident's teacup in a bright activity room"),
  delivery: slot("delivery", "1 / 1", "A delivery cart robot rolls along a corridor with cups and towels while a care worker walks beside it"),
  "night-patrol": slot("night-patrol", "1 / 1", "A tall patrol robot moves down a dim night corridor past a resident at her door"),
  telepresence: slot("telepresence", "1 / 1", "A telepresence robot shows a nurse on its screen at a nurse station while a caregiver looks on"),
};

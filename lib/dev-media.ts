/**
 * Dev-only placeholder media for the VideoFrame slots.
 *
 * These files live under public/dev/ (gitignored) and render only when
 * NEXT_PUBLIC_DEV_MEDIA=1; VideoFrame ignores `src` otherwise, so production
 * never ships them. They are generated stand-ins so the pages can be judged
 * moving, not approved brand assets. Nothing imports this map yet.
 */

export type DevMediaSlot =
  | "hero"
  | "interlude"
  | "robot-company"
  | "robot-daily-help"
  | "robot-moving-safely"
  | "robot-staying-in-touch";

export type DevMediaEntry = {
  src: string;
  poster: string;
  /** CSS aspect-ratio, matching VideoFrame's `ratio` prop. */
  ratio: string;
  label: string;
};

export const DEV_MEDIA: Record<DevMediaSlot, DevMediaEntry> = {
  hero: {
    src: "/dev/video/hero.mp4",
    poster: "/dev/video/hero.jpg",
    ratio: "16 / 9",
    label: "A companion robot waits in a care-home corridor in morning light",
  },
  interlude: {
    src: "/dev/video/interlude.mp4",
    poster: "/dev/video/interlude.jpg",
    ratio: "16 / 9",
    label: "A companion robot moves through an empty dining room",
  },
  "robot-company": {
    src: "/dev/video/robot-company.mp4",
    poster: "/dev/video/robot-company.jpg",
    ratio: "1 / 1",
    label: "A companion robot rests beside an armchair in a resident room",
  },
  "robot-daily-help": {
    src: "/dev/video/robot-daily-help.mp4",
    poster: "/dev/video/robot-daily-help.jpg",
    ratio: "1 / 1",
    label: "A companion robot carries a teacup beside a dining table",
  },
  "robot-moving-safely": {
    src: "/dev/video/robot-moving-safely.mp4",
    poster: "/dev/video/robot-moving-safely.jpg",
    ratio: "1 / 1",
    label: "A companion robot moves along a corridor handrail",
  },
  "robot-staying-in-touch": {
    src: "/dev/video/robot-staying-in-touch.mp4",
    poster: "/dev/video/robot-staying-in-touch.jpg",
    ratio: "1 / 1",
    label: "A companion robot turns toward a window in afternoon light",
  },
};

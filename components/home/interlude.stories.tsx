import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Interlude } from "./interlude";

const meta: Meta<typeof Interlude> = { title: "Home/Interlude", component: Interlude, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof Interlude>;

/** Band 10 on its own: 1430x900 at 1440x900 (3:2 capped at 100vh), 758x505.67 at 768, a viewport-tall column at 390. */
export const Default: S = {};

/** One viewport of page above and below so the M10 parallax (−30 → +30px across one viewport height) and the h2 line reveal can be scrolled. */
export const InFlow: S = {
  name: "In flow (parallax and reveal)",
  render: () => (
    <div className="bg-page">
      <div className="t-caption flex h-screen items-end justify-center pb-6 text-ink-subtle">scroll: the band below is one viewport away, so its background sits at −30px</div>
      <Interlude />
      <div className="t-caption flex h-screen items-start justify-center pt-6 text-ink-subtle">the background reaches +30px once the band top is one viewport above</div>
    </div>
  ),
};

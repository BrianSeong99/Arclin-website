import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AudienceRows } from "./audience-rows";

const meta: Meta<typeof AudienceRows> = { title: "Home/AudienceRows", component: AudienceRows, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof AudienceRows>;

/** Band 8 at the top of the frame: the line reveals fire on mount. */
export const Default: S = {};

const spacer = <div className="h-[80vh]" aria-hidden />;

/** Scroll down to see the h2/h3 line reveals trigger at half in view (M4/M9). */
export const BelowTheFold: S = {
  name: "Below the fold",
  render: () => (
    <>
      {spacer}
      <AudienceRows />
      {spacer}
    </>
  ),
};

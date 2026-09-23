import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClosingCta } from "./closing-cta";

const meta: Meta<typeof ClosingCta> = {
  title: "Home/ClosingCta",
  component: ClosingCta,
  parameters: { layout: "fullscreen", nextjs: { appDirectory: true, navigation: { pathname: "/ja/" } } },
};
export default meta;
type S = StoryObj<typeof ClosingCta>;

/** Scroll: the line's words rest at opacity .3 and light up one by one as the slab rises to 25% of the viewport (M6); hover anywhere rolls the pill. */
export const Default: S = {
  render: () => (
    <div className="bg-page">
      <div className="h-screen" aria-hidden />
      <ClosingCta />
      <div className="h-screen" aria-hidden />
    </div>
  ),
};

/** The band as it sits in the page: no spacer above, so the slab is already in view and lit on load. */
export const InView: S = {
  render: () => (
    <div className="bg-page">
      <ClosingCta />
      <div className="h-screen" aria-hidden />
    </div>
  ),
};

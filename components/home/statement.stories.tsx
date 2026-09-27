import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Statement } from "./statement";

const meta: Meta<typeof Statement> = {
  title: "Home/Statement",
  component: Statement,
  parameters: { layout: "fullscreen", nextjs: { appDirectory: true, navigation: { pathname: "/ja/" } } },
};
export default meta;
type S = StoryObj<typeof Statement>;

/** Scroll: the words rest at opacity .3 and light up one by one as the slab rises to 25% of the viewport (M5). */
export const Default: S = {
  render: () => (
    <div className="bg-page">
      <div className="h-screen" aria-hidden />
      <Statement />
      <div className="h-screen" aria-hidden />
    </div>
  ),
};

/** The band as it sits in the page: no spacer above, so the slab is already in view and part-lit on load. */
export const InView: S = {
  render: () => (
    <div className="bg-page">
      <Statement />
      <div className="h-screen" aria-hidden />
    </div>
  ),
};

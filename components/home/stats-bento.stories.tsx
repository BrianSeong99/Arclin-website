import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatsBento } from "./stats-bento";

const meta: Meta<typeof StatsBento> = { title: "Home/StatsBento", component: StatsBento, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof StatsBento>;

/** Band 7 at the page gutter. Switch the toolbar viewport to 768 / 390 for the tablet and phone layouts. */
export const Default: S = {};

/** With the 4px seam context: a page-coloured strip above so the seam and gutter read. */
export const InPage: S = {
  render: () => (
    <div className="bg-page">
      <div className="h-16 bg-page" />
      <StatsBento />
      <div className="h-16 bg-page" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./hero";

const meta: Meta<typeof Hero> = { title: "Home/Hero", component: Hero, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof Hero>;

/** Band 3 on its own: the slab is calc(100vh - 10px) tall, so the story is the viewport minus the gutter. */
export const Default: S = {};

/** Under band 1 (announcement 38.83 tall with its 5px margin) plus the 4px seam the slab top lands at 47.83 (robot.com 48.83, V09 tolerance 1px). */
export const UnderAnnouncement: S = {
  name: "Under the announcement bar",
  render: () => (
    <div className="bg-page">
      <div className="on-highlight t-label mx-auto flex items-center justify-center rounded-xl bg-highlight" style={{ marginTop: 5, height: 38.83, width: "calc(100% - 10px)" }}>
        announcement bar stand-in, 1430x38.83 at (5,5)
      </div>
      <Hero />
    </div>
  ),
};

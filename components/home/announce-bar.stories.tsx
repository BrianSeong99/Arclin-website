import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AnnounceBar } from "./announce-bar";
import { Band } from "./band";

const meta: Meta<typeof AnnounceBar> = {
  title: "Home/AnnounceBar",
  component: AnnounceBar,
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/ja/" } } },
};
export default meta;
type S = StoryObj<typeof AnnounceBar>;

/** The bar alone: 1430x38.83 at (5,5) at 1440, radius 24, one link, dismiss at the right. */
export const Default: S = { render: () => <div className="h-40 bg-page"><AnnounceBar /></div> };

/** In flow above a tall brand band: scroll to watch it leave and `--announcement-offset` on <html> go 44 → 0. */
export const InFlow: S = {
  render: () => (
    <div className="bg-page">
      <AnnounceBar />
      <Band tone="brand" seam={false} slabClassName="flex min-h-[200vh] items-start p-6" style={{ marginTop: "var(--gutter-page)" }}>
        <p className="t-title-m">Scroll: the bar scrolls away; the header (in the Nav story) follows the offset.</p>
      </Band>
    </div>
  ),
};

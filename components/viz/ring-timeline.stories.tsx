import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RING_SEGMENTS } from "@/lib/site";
import { RingTimeline } from "./ring-timeline";

const meta: Meta<typeof RingTimeline> = { title: "Viz/RingTimeline", component: RingTimeline, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof RingTimeline>;

const center = (t: string) => <div className="font-mono text-3xl text-console-text">{t}</div>;

export const Evening: S = {
  render: () => (
    <div className="max-w-sm rounded-lg bg-console p-8">
      <RingTimeline segments={RING_SEGMENTS} activeId="evening" hour={18.5} center={center("18:30")} />
    </div>
  ),
};
export const Night: S = {
  render: () => (
    <div className="max-w-sm rounded-lg bg-console p-8">
      <RingTimeline segments={RING_SEGMENTS} activeId="night" hour={23.5} center={center("23:30")} />
    </div>
  ),
};

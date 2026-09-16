import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DonutGauge } from "./donut-gauge";

const meta: Meta<typeof DonutGauge> = { title: "Viz/DonutGauge", component: DonutGauge, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof DonutGauge>;

export const Console: S = {
  render: () => (
    <div className="flex gap-8 rounded-lg bg-console p-8">
      <DonutGauge value={42} fraction={0.42} unit="dB" label="夜間動作音" />
      <DonutGauge value={96} fraction={0.96} unit="%" label="起立検知精度" />
      <DonutGauge value={71} fraction={0.71} unit="%" label="目標未達" ok={false} />
    </div>
  ),
};
export const Paper: S = {
  render: () => (
    <div className="inline-block rounded-lg border border-line bg-paper p-8">
      <DonutGauge tone="paper" value={92} fraction={0.92} unit="%" label="稼働可用率" />
    </div>
  ),
};

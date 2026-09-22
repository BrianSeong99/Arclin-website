import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DonutGauge } from "./donut-gauge";

const meta: Meta<typeof DonutGauge> = { title: "Viz/DonutGauge", component: DonutGauge, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof DonutGauge>;

export const Default: S = { args: { value: 42, fraction: 0.42, unit: "dB", label: "夜間動作音" } };
export const Pair: S = {
  render: () => (
    <div className="flex gap-8 rounded-lg bg-raised p-8 shadow-soft">
      <DonutGauge value={42} fraction={0.42} unit="dB" label="夜間動作音" />
      <DonutGauge value={96} fraction={0.96} unit="%" label="起立検知精度" />
    </div>
  ),
};

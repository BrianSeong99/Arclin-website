import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TREND_POINTS } from "@/lib/site";
import { TrendLine } from "./trend-line";

const meta: Meta<typeof TrendLine> = { title: "Viz/TrendLine", component: TrendLine, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof TrendLine>;

export const Projected: S = {
  render: () => (
    <div className="max-w-2xl rounded-lg border border-line bg-paper p-6">
      <TrendLine points={TREND_POINTS} projectedFrom={2025} unit="%" />
    </div>
  ),
};
export const Plain: S = {
  render: () => (
    <div className="max-w-2xl rounded-lg border border-line bg-paper p-6">
      <TrendLine points={TREND_POINTS} unit="%" />
    </div>
  ),
};

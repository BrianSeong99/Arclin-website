import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section";

const meta: Meta<typeof SectionHeading> = { title: "Site/SectionHeading", component: SectionHeading, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof SectionHeading>;

export const Paper: S = {
  args: { num: "02", title: "私たちが解決する「六つの壁」", lead: "良いロボットが、そのままでは日本の介護現場に入れない理由。" },
};
export const Console: S = {
  render: () => (
    <div className="bg-console p-8">
      <SectionHeading tone="console" num="03" title="製品シナリオ — Mimamori" lead="日中・夕方・夜間。" />
    </div>
  ),
};

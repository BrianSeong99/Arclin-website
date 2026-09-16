import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section";

const meta: Meta<typeof SectionHeading> = { title: "Site/SectionHeading", component: SectionHeading, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof SectionHeading>;

export const Paper: S = {
  args: { label: "課題", lines: ["技術があるだけでは、", "介護現場には届かない。"], lead: "海外のロボティクス企業が日本の介護市場へ参入するとき、製品性能以外にも多くの壁があります。" },
};
export const Console: S = {
  render: () => (
    <div className="bg-console p-8">
      <SectionHeading tone="console" label="Mimamori — 見守り" lines={["24時間の介護の流れに、", "そっと寄り添う。"]} lead="日中・夕方・夜間。" />
    </div>
  ),
};

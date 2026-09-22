import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section";

const meta: Meta<typeof SectionHeading> = { title: "Site/SectionHeading", component: SectionHeading, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof SectionHeading>;

export const Page: S = {
  args: { label: "導入プロセス", lines: ["導入は、", "一緒に現場を理解するところから。"], lead: "施設を訪ね、動線・業務・夜勤体制・既存設備を把握します。" },
};
export const OnBrand: S = {
  render: () => (
    <div className="on-brand rounded-lg bg-brand p-8 text-on-brand">
      <SectionHeading tone="brand" label="パートナーシップ" lines="一緒に、日本の介護を前へ。" lead="ロボットを検討したいが、何が現場で本当に機能するのか分からない。" />
    </div>
  ),
};
export const OnHighlight: S = {
  render: () => (
    <div className="on-highlight rounded-lg bg-highlight p-8 text-on-highlight">
      <SectionHeading tone="highlight" label="二つの柱" lines="Mimamori と CareOS" />
    </div>
  ),
};

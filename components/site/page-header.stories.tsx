import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "./page-header";

const meta: Meta<typeof PageHeader> = { title: "Site/PageHeader", component: PageHeader };
export default meta;
type S = StoryObj<typeof PageHeader>;

export const Default: S = {
  args: { overline: "介護向けコンパニオンロボット", heading: "フロアに置く、コンパニオンロボット。" },
};
export const WithLead: S = {
  args: { overline: "お知らせ", heading: "会社と製品についての発表。", lead: "発表があるときに、ここに載せます。" },
};
export const WithGap: S = {
  args: { overline: "導入の流れ", heading: "発注から稼働まで、[GAP: time from order to running]。" },
};

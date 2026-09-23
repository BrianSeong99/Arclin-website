import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Nav } from "./nav";

const meta: Meta<typeof Nav> = {
  title: "Site/Nav",
  component: Nav,
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/ja/robot/" } } },
};
export default meta;
export const Default: StoryObj<typeof Nav> = { render: () => <div className="h-40 bg-page pt-2"><Nav /></div> };

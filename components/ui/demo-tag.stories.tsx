import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DemoTag } from "./demo-tag";

const meta: Meta<typeof DemoTag> = { title: "UI/DemoTag", component: DemoTag, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof DemoTag>;

export const Paper: S = {};
export const Console: S = {
  render: () => (
    <div className="rounded-md bg-console p-4">
      <DemoTag tone="console" />
    </div>
  ),
};

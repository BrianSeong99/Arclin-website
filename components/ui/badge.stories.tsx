import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = { title: "UI/Badge", component: Badge, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Badge>;

export const Neutral: S = { args: { children: "介護施設" } };
export const Highlight: S = { args: { children: "受付中", variant: "highlight" } };
export const OnBrand: S = {
  render: () => (
    <div className="flex gap-3 rounded-md bg-brand p-4">
      <Badge variant="on-brand">Partner</Badge>
    </div>
  ),
};

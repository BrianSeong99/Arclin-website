import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = { title: "UI/Badge", component: Badge, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Badge>;

export const Default: S = { args: { children: "中国・海外メーカー" } };
export const Pine: S = { args: { children: "智渡仁の知財", variant: "pine" } };
export const Ember: S = { args: { children: "演示データ", variant: "ember" } };
export const OnConsole: S = {
  render: () => (
    <div className="flex gap-3 rounded-md bg-console p-4">
      <Badge variant="console">Console</Badge>
      <Badge variant="signal">Signal</Badge>
    </div>
  ),
};

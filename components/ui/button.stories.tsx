import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ButtonLink } from "./button";

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Button>;

export const Primary: S = { args: { children: "介護施設の方へ" } };
export const Outline: S = { args: { children: "ロボット企業の方へ", variant: "outline" } };
export const Ghost: S = { args: { children: "詳細を見る", variant: "ghost" } };
export const Sizes: S = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <ButtonLink href="#contact" size="lg" variant="outline">Link</ButtonLink>
    </div>
  ),
};
export const Console: S = {
  render: () => (
    <div className="rounded-md bg-console p-4">
      <Button variant="console">Console</Button>
    </div>
  ),
};

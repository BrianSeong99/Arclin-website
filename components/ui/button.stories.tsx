import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ButtonLink } from "./button";

const meta: Meta<typeof Button> = { title: "UI/Button", component: Button, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Button>;

export const Brand: S = { args: { children: "介護施設の方へ" } };
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
export const OnBrand: S = {
  render: () => (
    <div className="on-brand flex gap-3 rounded-md bg-brand p-4">
      <Button variant="on-brand">On brand</Button>
      <Button variant="on-brand-outline">Outline</Button>
    </div>
  ),
};
export const OnHighlight: S = {
  render: () => (
    <div className="on-highlight rounded-md bg-highlight p-4">
      <Button variant="on-highlight">On highlight</Button>
    </div>
  ),
};

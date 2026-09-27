import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PillButton, PillLink } from "./pill";

const meta: Meta<typeof PillLink> = { title: "Home/Pill", component: PillLink, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof PillLink>;

export const OnPage: S = { args: { label: "資料を請求する", href: "#contact" } };
export const Outline: S = { args: { label: "詳しく見る", href: "#robot", variant: "outline" } };
export const Highlight: S = { args: { label: "ロボットを見る", href: "#robot", variant: "highlight" } };
export const WithGap: S = { args: { label: "[GAP: cta label]", href: "#" } };

export const OnBrand: S = {
  render: () => (
    <div className="on-brand flex flex-wrap gap-3 rounded-xl bg-brand p-6">
      <PillLink href="#" label="施設の方へ" variant="on-brand" />
      <PillLink href="#" label="詳しく見る" variant="outline-on-brand" />
      <PillLink href="#" label="ロボットを見る" variant="highlight" />
    </div>
  ),
};

export const Sizes: S = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <PillLink href="#" label="md, 11px 21px" />
      <PillLink href="#" label="lg, 19px 20px" size="lg" />
      <PillButton label="inline, 11px 13px" size="inline" />
      <PillButton label="button, disabled" disabled />
    </div>
  ),
};

export const HoverParent: S = {
  name: "Hover parent (band 11)",
  render: () => (
    <a href="#contact" className="pill-hover-parent on-brand block rounded-xl bg-brand p-6 text-on-brand">
      <p className="t-title-l">
        Hover anywhere on this slab and the inline pill rolls. <PillButton label="お問い合わせ" variant="highlight" size="inline" tabIndex={-1} />
      </p>
    </a>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Copy } from "./copy";

const meta: Meta<typeof Copy> = { title: "Site/Copy", component: Copy, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Copy>;

export const WithGaps: S = {
  render: () => (
    <p className="t-body max-w-[40em]">
      <Copy text="高さ [GAP: robot height] cm、重さ [GAP: robot weight] kg。1回の充電で [GAP: battery life] 時間動きます。" />
    </p>
  ),
};
export const Placeholder: S = { render: () => <p className="t-caption text-ink-subtle"><Copy text="最終更新：[PLACEHOLDER]" /></p> };
export const Plain: S = { render: () => <p className="t-body"><Copy text="フロアの決まった場所で待ち、入居者のそばにいます。" /></p> };

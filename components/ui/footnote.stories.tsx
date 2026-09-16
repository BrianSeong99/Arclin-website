import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footnote } from "./footnote";

const meta: Meta<typeof Footnote> = { title: "UI/Footnote", component: Footnote, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Footnote>;

export const Paper: S = { args: { text: "総務省統計局「統計からみた我が国の高齢者」（2024年）。※出典の最終確認中。" } };
export const Console: S = {
  render: () => (
    <div className="rounded-md bg-console p-4">
      <Footnote tone="console" text="本パネルの数値はデモンストレーション用の模擬値です。" />
    </div>
  ),
};

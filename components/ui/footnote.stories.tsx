import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footnote } from "./footnote";

const meta: Meta<typeof Footnote> = { title: "UI/Footnote", component: Footnote, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Footnote>;

export const Page: S = { args: { text: "総務省統計局「人口推計」（2024年）。掲載前に最新値を確認。" } };
export const OnBrand: S = { render: () => <div className="rounded-md bg-brand p-4"><Footnote tone="brand" text="本パネルの数値はデモンストレーション用の模擬値です。" /></div> };

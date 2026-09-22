import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CountUp } from "./count-up";

const meta: Meta<typeof CountUp> = { title: "Viz/CountUp", component: CountUp, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof CountUp>;

export const Percent: S = { args: { value: 29.3, decimals: 1, suffix: "%" } };
export const Whole: S = { args: { value: 57, suffix: "万人" } };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CountUp } from "./count-up";

const meta: Meta<typeof CountUp> = { title: "Viz/CountUp", component: CountUp, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof CountUp>;

export const Percent: S = { render: () => <div className="text-6xl font-medium text-ink"><CountUp value={29.3} decimals={1} suffix="%" /></div> };
export const Prefixed: S = { render: () => <div className="text-6xl font-medium text-ink"><CountUp value={13.8} decimals={1} prefix="約" suffix="兆円" /></div> };

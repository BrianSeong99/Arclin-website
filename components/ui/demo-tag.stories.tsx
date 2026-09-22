import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DemoTag } from "./demo-tag";

const meta: Meta<typeof DemoTag> = { title: "UI/DemoTag", component: DemoTag, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof DemoTag>;

export const Page: S = {};
export const OnBrand: S = { render: () => <div className="rounded-md bg-brand p-4"><DemoTag tone="brand" /></div> };
export const OnHighlight: S = { render: () => <div className="rounded-md bg-highlight p-4"><DemoTag tone="highlight" /></div> };

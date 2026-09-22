import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DotEyes } from "./dot-eyes";

const meta: Meta<typeof DotEyes> = { title: "Viz/DotEyes", component: DotEyes, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof DotEyes> = { render: () => <div className="max-w-2xl rounded-lg bg-brand p-6 text-highlight"><DotEyes /></div> };

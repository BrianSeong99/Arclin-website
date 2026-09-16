import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/lib/i18n/messages/ja";
import { FlowSteps } from "./flow-steps";

const meta: Meta<typeof FlowSteps> = { title: "Viz/FlowSteps", component: FlowSteps, parameters: { layout: "padded" } };
export default meta;
export const FourSteps: StoryObj<typeof FlowSteps> = { args: { steps: ja.method.steps } };

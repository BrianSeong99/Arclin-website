import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Value } from "./value";

const meta: Meta<typeof Value> = { title: "Sections/Value", component: Value };
export default meta;
export const Default: StoryObj<typeof Value> = {};

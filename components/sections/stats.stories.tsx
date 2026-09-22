import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stats } from "./stats";

const meta: Meta<typeof Stats> = { title: "Sections/Stats", component: Stats };
export default meta;
export const Default: StoryObj<typeof Stats> = {};

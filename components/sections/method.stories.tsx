import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Method } from "./method";

const meta: Meta<typeof Method> = { title: "Sections/Method", component: Method };
export default meta;
export const Default: StoryObj<typeof Method> = {};

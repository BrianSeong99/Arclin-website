import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Walls } from "./walls";

const meta: Meta<typeof Walls> = { title: "Sections/Walls", component: Walls };
export default meta;
export const Default: StoryObj<typeof Walls> = {};

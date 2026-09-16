import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./hero";

const meta: Meta<typeof Hero> = { title: "Sections/Hero", component: Hero };
export default meta;
export const Default: StoryObj<typeof Hero> = {};

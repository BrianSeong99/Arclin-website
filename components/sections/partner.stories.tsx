import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Partner } from "./partner";

const meta: Meta<typeof Partner> = { title: "Sections/Partner", component: Partner };
export default meta;
export const Default: StoryObj<typeof Partner> = {};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Partners } from "./partners";

const meta: Meta<typeof Partners> = { title: "Sections/Partners", component: Partners };
export default meta;
export const Default: StoryObj<typeof Partners> = {};

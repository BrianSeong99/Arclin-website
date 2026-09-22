import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Statement } from "./statement";

const meta: Meta<typeof Statement> = { title: "Sections/Statement", component: Statement };
export default meta;
export const Default: StoryObj<typeof Statement> = {};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Products } from "./products";

const meta: Meta<typeof Products> = { title: "Sections/Products", component: Products };
export default meta;
export const Default: StoryObj<typeof Products> = {};

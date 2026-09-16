import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Company } from "./company";

const meta: Meta<typeof Company> = { title: "Sections/Company", component: Company };
export default meta;
export const Default: StoryObj<typeof Company> = {};

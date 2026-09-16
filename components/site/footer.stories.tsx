import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./footer";

const meta: Meta<typeof Footer> = { title: "Site/Footer", component: Footer };
export default meta;
export const Default: StoryObj<typeof Footer> = {};

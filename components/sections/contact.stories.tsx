import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Contact } from "./contact";

const meta: Meta<typeof Contact> = { title: "Sections/Contact", component: Contact };
export default meta;
export const Default: StoryObj<typeof Contact> = {};

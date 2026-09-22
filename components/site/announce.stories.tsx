import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Announce } from "./announce";

const meta: Meta<typeof Announce> = { title: "Site/Announce", component: Announce };
export default meta;
export const Default: StoryObj<typeof Announce> = {};

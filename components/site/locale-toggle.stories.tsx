import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LocaleToggle } from "./locale-toggle";

const meta: Meta<typeof LocaleToggle> = { title: "Site/LocaleToggle", component: LocaleToggle, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof LocaleToggle> = {};

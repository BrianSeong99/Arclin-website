import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Nav } from "./nav";

const meta: Meta<typeof Nav> = { title: "Site/Nav", component: Nav };
export default meta;
export const Default: StoryObj<typeof Nav> = { render: () => <div className="h-24"><Nav /></div> };

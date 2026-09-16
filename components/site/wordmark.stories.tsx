import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wordmark } from "./wordmark";

const meta: Meta<typeof Wordmark> = { title: "Site/Wordmark", component: Wordmark, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Wordmark>;

export const Paper: S = {};
export const Console: S = {
  render: () => (
    <div className="rounded-md bg-console p-4">
      <Wordmark tone="console" />
    </div>
  ),
};

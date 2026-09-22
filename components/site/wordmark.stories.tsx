import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wordmark } from "./wordmark";

const meta: Meta<typeof Wordmark> = { title: "Site/Wordmark", component: Wordmark, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Wordmark>;

export const Page: S = {};
export const Large: S = { args: { size: "lg" } };
export const OnBrand: S = {
  render: () => (
    <div className="rounded-md bg-brand p-4">
      <Wordmark tone="brand" />
    </div>
  ),
};

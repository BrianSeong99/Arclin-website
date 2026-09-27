import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductBand } from "./product-band";

const meta: Meta<typeof ProductBand> = { title: "Home/ProductBand", component: ProductBand, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof ProductBand>;

/** The band pins and unveils on scroll, so the story gives it a page's worth of room above and below. */
export const Default: S = {
  render: () => (
    <div className="bg-page">
      <div className="h-screen" />
      <ProductBand />
      <div className="h-screen" />
    </div>
  ),
};

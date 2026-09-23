import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductBand } from "./product-band";

const meta: Meta<typeof ProductBand> = { title: "Home/ProductBand", component: ProductBand, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof ProductBand>;

/** Filler slabs above and below so the scroll-linked pin (M8) can be driven: the cards arrive through the holes as the band scrolls in. */
export const Default: S = {
  render: () => (
    <div className="bg-page">
      <section className="bg-page" style={{ paddingInline: "var(--gutter-page)", paddingTop: "var(--gutter-page)" }}>
        <div className="on-brand flex min-h-[140vh] items-end rounded-xl bg-brand p-6 text-on-brand">
          <p className="t-title-m">Statement slab above (band 5). Scroll down.</p>
        </div>
      </section>
      <ProductBand />
      <section className="bg-page" style={{ paddingInline: "var(--gutter-page)", paddingTop: "var(--seam)" }}>
        <div className="flex min-h-screen items-start rounded-xl bg-raised p-6">
          <p className="t-title-m">Stats bento below (band 7).</p>
        </div>
      </section>
    </div>
  ),
};

/** The band on its own, cards landed (scroll to the end of the pin). */
export const Alone: S = { render: () => <ProductBand /> };

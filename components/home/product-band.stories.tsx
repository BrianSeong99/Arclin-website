import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PRODUCT_MASKS, ProductBand, type ProductBandProps } from "./product-band";

const meta: Meta<typeof ProductBand> = {
  title: "Home/ProductBand",
  component: ProductBand,
  parameters: { layout: "fullscreen" },
  argTypes: { mask: { control: "radio", options: PRODUCT_MASKS } },
};
export default meta;
type S = StoryObj<typeof ProductBand>;

/** Filler slabs above and below so the scroll-linked pin (M8) can be driven: the cards arrive through the mask's cut-outs as the band scrolls in. */
function Scrolled(args: ProductBandProps) {
  return (
    <div className="bg-page">
      <section className="bg-page" style={{ paddingInline: "var(--gutter-page)", paddingTop: "var(--gutter-page)" }}>
        <div className="on-brand flex min-h-[140vh] items-end rounded-xl bg-brand p-6 text-on-brand">
          <p className="t-title-m">Statement slab above (band 5). Scroll down.</p>
        </div>
      </section>
      <ProductBand {...args} />
      <section className="bg-page" style={{ paddingInline: "var(--gutter-page)", paddingTop: "var(--seam)" }}>
        <div className="flex min-h-screen items-start rounded-xl bg-raised p-6">
          <p className="t-title-m">Stats bento below (band 7).</p>
        </div>
      </section>
    </div>
  );
}

export const Default: S = { render: (args) => <Scrolled {...args} /> };

/** Kurogane candidate 1: 2 x 6 five-petal blossoms (pill petals on a circular core) cut out of the plate. */
export const Blossom: S = { args: { mask: "blossom" }, render: (args) => <Scrolled {...args} /> };

/** Kurogane candidate 2: one rounded aperture inset 24 (--radius-xl); the cards rise into a single calm window. */
export const Window: S = { args: { mask: "window" }, render: (args) => <Scrolled {...args} /> };

/** robot.com's LED-hole lattice, kept only for the comparison; deleted after the decision. */
export const Dots: S = { args: { mask: "dots" }, render: (args) => <Scrolled {...args} /> };

/** The band on its own, cards landed (scroll to the end of the pin). */
export const Alone: S = { render: (args) => <ProductBand {...args} /> };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CareersSlab } from "./careers-slab";
import { ClosingCta } from "./closing-cta";

const meta: Meta<typeof CareersSlab> = {
  title: "Home/CareersSlab",
  component: CareersSlab,
  parameters: { layout: "fullscreen", nextjs: { appDirectory: true, navigation: { pathname: "/ja/" } } },
};
export default meta;
type S = StoryObj<typeof CareersSlab>;

export const Default: S = {
  render: () => (
    <div className="bg-page">
      <CareersSlab />
    </div>
  ),
};

/** Bands 11 and 12 together: the closing CTA on the 5px gutter, then the careers slab on its 4px one. */
export const AfterClosingCta: S = {
  render: () => (
    <div className="bg-page">
      <ClosingCta />
      <CareersSlab />
      <div className="h-screen" aria-hidden />
    </div>
  ),
};

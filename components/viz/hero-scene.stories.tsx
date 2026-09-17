import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroScene } from "./hero-scene";

const meta: Meta<typeof HeroScene> = { title: "Viz/HeroScene", component: HeroScene, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof HeroScene>;

export const Animated: S = {
  render: () => (
    <div className="aspect-[8/7] max-w-xl rounded-lg border border-line bg-paper-2 p-4">
      <HeroScene className="!h-full !w-full" />
    </div>
  ),
};
export const Static: S = {
  render: () => (
    <div className="aspect-[8/7] max-w-xl rounded-lg border border-line bg-paper-2 p-4">
      <HeroScene animate={false} className="!h-full !w-full" />
    </div>
  ),
};

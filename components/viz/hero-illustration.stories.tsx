import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/lib/i18n/messages/ja";
import { HeroIllustration } from "./hero-illustration";

const meta: Meta<typeof HeroIllustration> = { title: "Viz/HeroIllustration", component: HeroIllustration, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof HeroIllustration> = {
  render: () => (
    <div className="max-w-lg rounded-lg bg-raised p-8 shadow-soft">
      <HeroIllustration title={ja.heroAlt} />
    </div>
  ),
};

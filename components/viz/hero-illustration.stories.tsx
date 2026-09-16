import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/lib/i18n/messages/ja";
import { HeroIllustration } from "./hero-illustration";

const meta: Meta<typeof HeroIllustration> = { title: "Viz/HeroIllustration", component: HeroIllustration, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof HeroIllustration> = {
  render: () => (
    <div className="max-w-lg rounded-lg border border-line bg-paper-2 p-8">
      <HeroIllustration title={ja.hero.illustrationAlt} />
    </div>
  ),
};

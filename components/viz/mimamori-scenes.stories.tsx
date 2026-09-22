import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SceneIllustration, type SceneId } from "./mimamori-scenes";

const meta: Meta<typeof SceneIllustration> = { title: "Viz/SceneIllustration", component: SceneIllustration, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof SceneIllustration>;

const frame = (id: SceneId) => (
  <div className="max-w-md rounded-lg bg-page p-4 text-ink">
    <SceneIllustration id={id} />
  </div>
);
export const Patrol: S = { render: () => frame("patrol") };
export const Standup: S = { render: () => frame("standup") };
export const Intake: S = { render: () => frame("intake") };
export const Voice: S = { render: () => frame("voice") };

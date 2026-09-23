import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RobotModel } from "./robot-model";

const meta: Meta<typeof RobotModel> = { title: "Viz/RobotModel", component: RobotModel, parameters: { layout: "padded" } };
export default meta;

/** Renders the mesh only when NEXT_PUBLIC_DEV_MEDIA=1 and public/dev/model/robot.glb exists; otherwise the pending frame. */
export const Default: StoryObj<typeof RobotModel> = {
  args: { src: "/dev/model/robot.glb", poster: "/dev/model/robot-poster.png", label: "ロボットの3Dモデル", className: "max-w-md" },
};

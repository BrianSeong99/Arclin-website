import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VideoFrame } from "./video-frame";

const meta: Meta<typeof VideoFrame> = { title: "Site/VideoFrame", component: VideoFrame, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof VideoFrame>;

export const Pending: S = { args: { label: "フロアで動くロボットの映像" } };
export const Portrait: S = { args: { label: "入居者のそばにいるロボット", ratio: "4 / 5", className: "max-w-sm" } };

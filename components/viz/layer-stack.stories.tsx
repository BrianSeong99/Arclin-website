import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/lib/i18n/messages/ja";
import { LayerStack } from "./layer-stack";

const meta: Meta<typeof LayerStack> = { title: "Viz/LayerStack", component: LayerStack, parameters: { layout: "padded" } };
export default meta;
export const CareOSLayers: StoryObj<typeof LayerStack> = {
  args: { layers: ja.careos.layers, labels: { ip: ja.careos.ipLabel, partner: ja.careos.ipPartner, arclin: ja.careos.ipArclin } },
};

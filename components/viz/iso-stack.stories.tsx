import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IsoStack } from "./iso-stack";

const meta: Meta<typeof IsoStack> = { title: "Viz/IsoStack", component: IsoStack, parameters: { layout: "padded" } };
export default meta;
export const Default: StoryObj<typeof IsoStack> = {
  render: () => (
    <div className="max-w-md rounded-lg bg-page p-6 text-ink">
      <IsoStack
        labels={{ partner: "PARTNER", arclin: "ARCLIN" }}
        layers={[
          { id: "exp", name: "Care Experience", owner: "arclin" },
          { id: "adapt", name: "Adaptation", owner: "arclin" },
          { id: "robot", name: "Robot Intelligence", owner: "partner" },
          { id: "infra", name: "Deployment Infra", owner: "arclin" },
        ]}
      />
    </div>
  ),
};

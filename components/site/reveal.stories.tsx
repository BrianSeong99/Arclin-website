import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Reveal, Stagger, StaggerItem } from "./reveal";

const meta: Meta<typeof Reveal> = { title: "Site/Reveal", component: Reveal, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof Reveal>;

export const Single: S = { render: () => <Reveal className="rounded-md bg-raised p-6 shadow-soft">スクロールでフェードアップ</Reveal> };
export const Staggered: S = {
  render: () => (
    <Stagger className="grid grid-cols-3 gap-3">
      {[1, 2, 3].map((n) => (
        <StaggerItem key={n} className="rounded-md bg-raised p-6 shadow-soft">
          Item {n}
        </StaggerItem>
      ))}
    </Stagger>
  ),
};

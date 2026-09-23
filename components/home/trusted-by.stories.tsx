import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TrustedBy } from "./trusted-by";

const meta: Meta<typeof TrustedBy> = { title: "Home/TrustedBy", component: TrustedBy, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof TrustedBy>;

/** The band as it sits in the page: page background, 5px gutter, grid padding-top 5. */
export const Default: S = { render: () => <TrustedBy /> };

const spacer = <div className="h-[80vh]" aria-hidden />;

/** Scroll down to see the M4 line reveal fire once the h2 is half in view. */
export const InFlow: S = {
  name: "In flow (scroll for the reveal)",
  render: () => (
    <div className="bg-page">
      {spacer}
      <TrustedBy />
      {spacer}
    </div>
  ),
};

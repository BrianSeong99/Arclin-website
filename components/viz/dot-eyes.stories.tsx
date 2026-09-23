import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DotEyes } from "./dot-eyes";

const meta: Meta<typeof DotEyes> = { title: "Viz/DotEyes", component: DotEyes, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof DotEyes>;

/** The footer wrapper: 1350 wide at 1440, aspect 1414/449, on the brand slab. */
const frame = (children: React.ReactNode) => (
  <div className="on-brand rounded-xl bg-brand p-10">
    <div className="mx-auto" style={{ maxWidth: 1350, aspectRatio: "1414 / 449" }}>
      {children}
    </div>
  </div>
);

/** Playing regardless of viewport position: open, bob, blink, arcs, wiggle, hold; 8630ms loop. */
export const Playing: S = { render: () => frame(<DotEyes play />) };

/** The static frame robot.com shows before entry (and under reduced motion). */
export const Static: S = { render: () => frame(<DotEyes play={false} />) };

/** Default trigger: starts when the whole grid is on screen, static again once it has left below. */
export const OnEntry: S = {
  name: "On entry (scroll)",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="bg-page">
      <div className="flex min-h-screen items-center justify-center text-ink-subtle">
        <p className="t-body">Scroll down.</p>
      </div>
      {frame(<DotEyes />)}
      <div className="min-h-screen" />
    </div>
  ),
};

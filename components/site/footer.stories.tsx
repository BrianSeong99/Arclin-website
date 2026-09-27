import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./footer";

const meta: Meta<typeof Footer> = { title: "Site/Footer", component: Footer, parameters: { layout: "fullscreen", nextjs: { appDirectory: true } } };
export default meta;
type S = StoryObj<typeof Footer>;

/** Band 13 at the story width: brand slab, 24-column grid, legals row, dot matrix (hidden below 768). */
export const Default: S = {};

/** Scroll down: the eyes start from frame 0 once the whole matrix is on screen (M38) and go static again once it has left below. */
export const AfterScroll: S = {
  name: "After a page (scroll to see the eyes start)",
  render: () => (
    <div className="bg-page">
      <div className="flex min-h-screen items-center justify-center text-ink-subtle">
        <p className="t-body">Scroll down.</p>
      </div>
      <Footer />
    </div>
  ),
};

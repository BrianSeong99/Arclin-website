import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SmoothScroll, useLenis } from "./smooth-scroll";

const meta: Meta<typeof SmoothScroll> = { title: "Home/SmoothScroll", component: SmoothScroll, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof SmoothScroll>;

function Controls() {
  const lenis = useLenis();
  return (
    <div className="sticky top-4 z-10 flex gap-3 px-4">
      <button type="button" className="rounded-pill bg-brand px-4 py-2 t-label text-on-brand" onClick={() => lenis?.stop()}>
        Stop
      </button>
      <button type="button" className="rounded-pill bg-brand px-4 py-2 t-label text-on-brand" onClick={() => lenis?.start()}>
        Start
      </button>
      <span className="t-caption self-center text-ink-muted">{lenis ? "Lenis running (1.2s expo-out per wheel tick)" : "Lenis off (reduced motion or not mounted)"}</span>
    </div>
  );
}

export const Page: S = {
  render: () => (
    <SmoothScroll>
      <Controls />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="m-4 flex h-[60vh] items-center justify-center rounded-xl bg-raised">
          <p className="t-display-m">Band {i + 1}</p>
        </div>
      ))}
    </SmoothScroll>
  ),
};

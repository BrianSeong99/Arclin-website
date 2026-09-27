import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useSyncExternalStore } from "react";
import { Band, type BandTone } from "./band";
import { getHeaderTheme, startBandTheme, subscribeHeaderTheme, PROBE_Y } from "./band-theme";

/** Readout of the theme band-theme.ts resolves, pinned at the probe line. */
function Readout() {
  const theme = useSyncExternalStore(subscribeHeaderTheme, () => getHeaderTheme(), () => "page" as const);
  useEffect(() => startBandTheme(), []);
  return (
    <div className="pointer-events-none fixed inset-x-0 z-10 flex justify-center" style={{ top: PROBE_Y }}>
      <p className="t-label rounded-pill bg-raised px-4 py-1 text-ink shadow-soft">data-header-theme = {theme}</p>
      <span aria-hidden className="absolute inset-x-0 top-0 border-t border-dashed border-border-strong" />
    </div>
  );
}

const meta: Meta<typeof Readout> = { title: "Home/BandTheme", component: Readout };
export default meta;
type S = StoryObj<typeof Readout>;

const tones: BandTone[] = ["brand", "page", "highlight", "brand", "raised"];

/** Scroll: the readout follows the band under the dashed line (brand → "brand", the rest → "page"). */
export const Scroll: S = {
  render: () => (
    <div className="bg-page">
      <Readout />
      {tones.map((tone, i) => (
        <Band key={i} tone={tone} seam={i > 0} slabClassName="flex min-h-[80vh] items-center justify-center p-6">
          <p className="t-title-l">{tone}</p>
        </Band>
      ))}
    </div>
  ),
};

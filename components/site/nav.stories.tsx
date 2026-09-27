import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Band, type BandTone } from "@/components/home/band";
import { Nav } from "./nav";

const meta: Meta<typeof Nav> = {
  title: "Site/Nav",
  component: Nav,
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/ja/robot/" } } },
};
export default meta;
type S = StoryObj<typeof Nav>;

const tones: { tone: BandTone; label: string }[] = [
  { tone: "brand", label: "brand (hero): glass-on-brand, on-brand text" },
  { tone: "page", label: "page: glass-on-page, ink text" },
  { tone: "highlight", label: "highlight: glass-on-page, ink text" },
  { tone: "raised", label: "raised: glass-on-page, ink text" },
  { tone: "brand", label: "brand (footer)" },
];

/** The announcement bar, the fixed header and five bands: scroll to see the offset (60 → 16) and the theme swaps. */
export const Page: S = {
  render: () => (
    <div className="bg-page">
      <Nav initialTheme="brand" />
      <main id="main" tabIndex={-1}>
        {tones.map((b, i) => (
          <Band key={i} tone={b.tone} seam={i > 0} slabClassName="flex min-h-[90vh] items-end p-6" style={i === 0 ? { marginTop: "var(--gutter-page)" } : undefined}>
            <p className="t-title-m">{b.label}</p>
          </Band>
        ))}
      </main>
    </div>
  ),
};

/** No announcement bar: the header sits at y = 16 from the start. */
export const NoAnnouncement: S = {
  render: () => (
    <div className="bg-page">
      <Nav />
      <main id="main" tabIndex={-1}>
        <Band tone="page" seam={false} slabClassName="flex min-h-[120vh] items-end border border-hairline p-6" style={{ marginTop: "var(--gutter-page)" }}>
          <p className="t-title-m">page band, header on --glass-on-page</p>
        </Band>
      </main>
    </div>
  ),
};

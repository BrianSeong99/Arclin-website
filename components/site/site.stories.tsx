import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Wordmark } from "./wordmark";
import { SectionHeading } from "./section";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { LocaleToggle } from "./locale-toggle";

const meta: Meta = { title: "Site" };
export default meta;

export const WordmarkStory: StoryObj = {
  name: "Wordmark",
  render: () => (
    <div className="flex gap-8 p-6">
      <Wordmark />
      <span className="rounded-md bg-console p-3">
        <Wordmark tone="console" />
      </span>
    </div>
  ),
};

export const Heading: StoryObj = {
  name: "SectionHeading",
  render: () => (
    <div>
      <div className="p-8">
        <SectionHeading num="02" title="私たちが解決する「六つの壁」" lead="良いロボットが、そのままでは日本の介護現場に入れない理由。" />
      </div>
      <div className="bg-console p-8">
        <SectionHeading tone="console" num="03" title="製品シナリオ — Mimamori" lead="日中・夕方・夜間。" />
      </div>
    </div>
  ),
};

export const Navigation: StoryObj = { name: "Nav", render: () => <div className="h-40"><Nav /></div> };
export const FooterStory: StoryObj = { name: "Footer", render: () => <Footer /> };
export const Toggle: StoryObj = { name: "LocaleToggle", render: () => <div className="p-6"><LocaleToggle /></div> };

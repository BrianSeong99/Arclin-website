import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RevealHeading } from "./reveal-heading";

const meta: Meta<typeof RevealHeading> = { title: "Home/RevealHeading", component: RevealHeading, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof RevealHeading>;

const spacer = <div className="h-[80vh]" aria-hidden />;

export const Latin: S = {
  render: () => (
    <>
      {spacer}
      <RevealHeading as="h2" lang="en" className="t-display-l max-w-[14em]" text="A robot on every floor, and a quieter night shift for every carer." />
      {spacer}
    </>
  ),
};

export const Japanese: S = {
  render: () => (
    <>
      {spacer}
      <RevealHeading as="h2" lang="ja" className="t-jp-display-l max-w-[16em]" text="ロボットを、日本の介護の力へ。夜勤の負担を、静かに減らす。" />
      {spacer}
    </>
  ),
};

export const ExplicitLinesAndGap: S = {
  render: () => (
    <>
      {spacer}
      <RevealHeading as="h2" lang="en" className="t-title-l" text={"Deployed in [GAP: facility count] facilities\nacross [GAP: prefecture count] prefectures"} />
      {spacer}
    </>
  ),
};

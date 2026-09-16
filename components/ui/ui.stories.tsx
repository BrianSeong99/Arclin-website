import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, ButtonLink } from "./button";
import { Badge } from "./badge";
import { DemoTag } from "./demo-tag";
import { Footnote } from "./footnote";

const meta: Meta = { title: "UI/Primitives", parameters: { layout: "padded" } };
export default meta;

export const Buttons: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <ButtonLink href="#" size="lg">
        Link · lg
      </ButtonLink>
      <Button size="sm" variant="outline">
        Small
      </Button>
      <span className="rounded-md bg-console p-3">
        <Button variant="console">Console</Button>
      </span>
    </div>
  ),
};

export const Badges: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Badge>Default</Badge>
      <Badge variant="pine">Pine</Badge>
      <Badge variant="ember">Ember</Badge>
      <DemoTag />
      <span className="flex gap-3 rounded-md bg-console p-3">
        <Badge variant="console">Console</Badge>
        <Badge variant="signal">Signal</Badge>
        <DemoTag tone="console" />
      </span>
    </div>
  ),
};

export const Footnotes: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6">
      <Footnote text="総務省統計局「統計からみた我が国の高齢者」（2024年）。" />
      <div className="rounded-md bg-console p-4">
        <Footnote tone="console" text="本パネルの数値はデモンストレーション用の模擬値です。" />
      </div>
    </div>
  ),
};

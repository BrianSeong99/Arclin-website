import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/lib/i18n/messages/ja";
import { CountUp } from "./count-up";
import { TrendLine } from "./trend-line";
import { DonutGauge } from "./donut-gauge";
import { RingTimeline } from "./ring-timeline";
import { FlowSteps } from "./flow-steps";
import { LayerStack } from "./layer-stack";
import { HeroIllustration } from "./hero-illustration";
import { SceneIllustration } from "./mimamori-scenes";

const meta: Meta = { title: "Viz", parameters: { layout: "padded" } };
export default meta;

export const CountUpStat: StoryObj = {
  name: "CountUp",
  render: () => (
    <div className="p-8 text-6xl font-medium text-ink">
      <CountUp value={29.3} decimals={1} suffix="%" />
    </div>
  ),
};

export const Trend: StoryObj = {
  name: "TrendLine",
  render: () => (
    <div className="max-w-2xl rounded-lg border border-line bg-paper p-6">
      <TrendLine points={ja.whyJapan.trend.points} projectedFrom={2025} unit="%" />
    </div>
  ),
};

export const Gauges: StoryObj = {
  name: "DonutGauge",
  render: () => (
    <div className="flex flex-wrap gap-8">
      <div className="flex gap-8 rounded-lg bg-console p-8">
        <DonutGauge value={42} fraction={0.42} unit="dB" label="夜間動作音" />
        <DonutGauge value={96} fraction={0.96} unit="%" label="起立検知精度" />
        <DonutGauge value={71} fraction={0.71} unit="%" label="下回り" ok={false} />
      </div>
      <div className="rounded-lg border border-line bg-paper p-8">
        <DonutGauge tone="paper" value={92} fraction={0.92} unit="%" label="稼働可用率" />
      </div>
    </div>
  ),
};

export const Ring: StoryObj = {
  name: "RingTimeline",
  render: () => (
    <div className="max-w-sm rounded-lg bg-console p-8">
      <RingTimeline
        segments={ja.mimamori.segments}
        activeId="evening"
        hour={18.5}
        center={<div className="font-mono text-3xl text-console-text">18:30</div>}
      />
    </div>
  ),
};

export const Flow: StoryObj = {
  name: "FlowSteps",
  render: () => (
    <div className="p-8">
      <FlowSteps steps={ja.method.steps} />
    </div>
  ),
};

export const Layers: StoryObj = {
  name: "LayerStack",
  render: () => (
    <div className="max-w-3xl p-8">
      <LayerStack layers={ja.careos.layers} labels={{ ip: ja.careos.ipLabel, partner: ja.careos.ipPartner, arclin: ja.careos.ipArclin }} />
    </div>
  ),
};

export const Hero: StoryObj = {
  name: "HeroIllustration",
  render: () => (
    <div className="max-w-lg rounded-lg border border-line bg-paper-2 p-8">
      <HeroIllustration title={ja.hero.illustrationAlt} />
    </div>
  ),
};

export const Scenes: StoryObj = {
  name: "SceneIllustration",
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 rounded-lg bg-console p-6">
      {(["patrol", "standup", "intake", "voice"] as const).map((id) => (
        <div key={id} className="rounded-md border border-console-line bg-console-2 p-3">
          <SceneIllustration id={id} />
        </div>
      ))}
    </div>
  ),
};

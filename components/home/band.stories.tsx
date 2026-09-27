import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Band, Col, Grid24 } from "./band";

const meta: Meta<typeof Band> = { title: "Home/Band", component: Band, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof Band>;

const slab = "flex min-h-64 items-end p-6";

export const Tones: S = {
  render: () => (
    <div className="bg-page">
      <Band tone="highlight" seam={false} slabClassName={slab}>
        <p className="t-title-m">highlight: bg-highlight, text-on-highlight, no seam</p>
      </Band>
      <Band tone="brand" slabClassName={slab}>
        <p className="t-title-m">brand: bg-brand, text-on-brand, 4px seam above</p>
      </Band>
      <Band tone="raised" slabClassName={slab}>
        <p className="t-title-m">raised: bg-raised, text-ink</p>
      </Band>
      <Band tone="page" slabClassName={`${slab} border border-hairline`}>
        <p className="t-title-m">page: bg-page, text-ink</p>
      </Band>
    </div>
  ),
};

export const Grid: S = {
  name: "Grid24 bento (band 7 layout)",
  render: () => (
    <Band tone="page" slab={false}>
      <Grid24>
        <Col span={6} row="1 / span 2" spanSm={6} className="on-brand min-h-44 rounded-xl bg-brand p-6 text-on-brand">
          <p className="t-title-s">A, span 6, rows 1–2</p>
        </Col>
        <Col span={6} start={7} row="1" spanSm={3} className="on-highlight min-h-44 rounded-xl bg-highlight p-6 text-on-highlight">
          <p className="t-title-s">B, span 6, row 1</p>
        </Col>
        <Col span={6} start={7} row="2" spanSm={3} className="min-h-44 rounded-xl bg-raised p-6">
          <p className="t-title-s">C, span 6, row 2</p>
        </Col>
        <Col span={6} start={13} row="1 / span 2" className="min-h-44 rounded-xl bg-raised p-6">
          <p className="t-title-s">D, span 6, rows 1–2</p>
        </Col>
        <Col span={6} start={19} row="1 / span 2" className="min-h-44 rounded-xl bg-raised p-6">
          <p className="t-title-s">E, span 6, rows 1–2</p>
        </Col>
      </Grid24>
    </Band>
  ),
};

export const Cards: S = {
  name: "Grid24 two cards (band 8 layout)",
  render: () => (
    <Band tone="page" slab={false}>
      <Grid24>
        {[1, 2].map((n) => (
          <Col key={n} span={12} className="aspect-square rounded-xl bg-raised p-6">
            <p className="t-title-l">Card {n}, span 12</p>
          </Col>
        ))}
      </Grid24>
    </Band>
  ),
};

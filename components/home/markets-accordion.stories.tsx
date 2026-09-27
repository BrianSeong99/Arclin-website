import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MarketsAccordion } from "./markets-accordion";

const meta: Meta<typeof MarketsAccordion> = { title: "Home/Markets accordion", component: MarketsAccordion, parameters: { layout: "fullscreen" } };
export default meta;
type S = StoryObj<typeof MarketsAccordion>;

/** Band 9 as it first renders: row 1 open (V29). Click a collapsed row to unfold it; the open row does not close (V31). */
export const Default: S = {};

export const RowTwoOpen: S = { name: "Row 2 open", args: { initial: 1 } };

export const RowThreeOpen: S = { name: "Row 3 open", args: { initial: 2 } };

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./hero";
import { WhyJapan } from "./why-japan";
import { Walls } from "./walls";
import { Mimamori } from "./mimamori";
import { CareOS } from "./careos";
import { Value } from "./value";
import { Method } from "./method";
import { Trust } from "./trust";
import { Partner } from "./partner";
import { Fit } from "./fit";
import { Company } from "./company";
import { Contact } from "./contact";

const meta: Meta = { title: "Sections" };
export default meta;

export const S00Hero: StoryObj = { name: "00 Hero", render: () => <Hero /> };
export const S01WhyJapan: StoryObj = { name: "01 Why Japan", render: () => <WhyJapan /> };
export const S02Walls: StoryObj = { name: "02 Six Walls", render: () => <Walls /> };
export const S03Mimamori: StoryObj = { name: "03 Mimamori", render: () => <Mimamori /> };
export const S04CareOS: StoryObj = { name: "04 CareOS", render: () => <CareOS /> };
export const S05Value: StoryObj = { name: "05 Value & KPIs", render: () => <Value /> };
export const S06Method: StoryObj = { name: "06 Method", render: () => <Method /> };
export const S07Trust: StoryObj = { name: "07 Compliance", render: () => <Trust /> };
export const S08Partner: StoryObj = { name: "08 Partnership", render: () => <Partner /> };
export const S09Fit: StoryObj = { name: "09 Ideal partners", render: () => <Fit /> };
export const S10Company: StoryObj = { name: "10 Company", render: () => <Company /> };
export const S11Contact: StoryObj = { name: "11 Contact", render: () => <Contact /> };

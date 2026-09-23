import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import { FooterArt } from "./footer-art";

const meta: Meta<typeof FooterArt> = { title: "Viz/FooterArt", component: FooterArt, parameters: { layout: "padded" } };
export default meta;
type S = StoryObj<typeof FooterArt>;

/** The footer strip: 1350 wide at 1440, aspect 1414/449, on the brand slab, ink --on-brand-muted (as footer.tsx sets it). */
const frame = (children: ReactNode) => (
  <div className="on-brand rounded-xl bg-brand p-10 text-on-brand-muted">
    <div className="mx-auto" style={{ maxWidth: 1350, aspectRatio: "1414 / 449" }}>
      {children}
    </div>
  </div>
);

/** Candidate 1: the camellia line drawing, drawn on entering view (already on screen here, so it renders complete). */
export const Camellia: S = { render: () => frame(<FooterArt variant="camellia" />) };

/** Candidate 2: the cover motif as a scattered field of seven blossoms; petals bloom on entering view. */
export const Blossoms: S = { render: () => frame(<FooterArt variant="blossoms" />) };

import { Nav, SkipLink } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/home/hero";
import { StageStrip } from "@/components/home/stage-strip";
import { Statement } from "@/components/home/statement";
import { ProductBand } from "@/components/home/product-band";
import { StatsBento } from "@/components/home/stats-bento";
import { AudienceRows } from "@/components/home/audience-rows";
import { MarketsAccordion } from "@/components/home/markets-accordion";
import { Interlude } from "@/components/home/interlude";
import { ClosingCta } from "@/components/home/closing-cta";

/**
 * The homepage in robot.com band order (reference spec §2): fixed header, then the in-flow bands. `.home` on <main>
 * switches the seams and gutter to the night ground. Every band brings its own 5px page gutter and 4px seam through
 * <Band>, so <main> carries no gap of its own. The first band under the header is the night hero, so the nav starts on
 * its brand theme to avoid a flash before the band observer resolves. The announcement bar (2026-09-28) and the careers
 * slab (2026-09-28: the company has no careers page yet) are gone.
 * The skip link comes first in the DOM so it is the first Tab stop (§3.9, A-3); <main> takes tabIndex -1 so the hash
 * jump can focus it (V38).
 */
export default function Page() {
  return (
    <>
      <SkipLink />
      <Nav initialTheme="brand" skipLink={false} />
      <main id="main" tabIndex={-1} className="home flex flex-1 flex-col outline-none">
        <Hero />
        <StageStrip />
        <Statement />
        <ProductBand />
        <StatsBento />
        <AudienceRows />
        <MarketsAccordion />
        <Interlude />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}

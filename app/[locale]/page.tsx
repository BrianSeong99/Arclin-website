import { Nav, SkipLink } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { Statement } from "@/components/home/statement";
import { ProductBand } from "@/components/home/product-band";
import { StatsBento } from "@/components/home/stats-bento";
import { AudienceRows } from "@/components/home/audience-rows";
import { MarketsAccordion } from "@/components/home/markets-accordion";
import { Interlude } from "@/components/home/interlude";
import { ClosingCta } from "@/components/home/closing-cta";
import { CareersSlab } from "@/components/home/careers-slab";

/**
 * The homepage in robot.com band order (reference spec §2) minus the announcement bar (cut 2026-09-28 with the night-shift
 * design): fixed header, then the in-flow bands. `.home` on <main> switches the seams and gutter to the night ground.
 * Every band brings its own 5px page gutter and 4px seam through <Band>, so <main> carries no gap of its own;
 * the trusted-by grid has the 5px container padding instead of a seam (§2 row 4). The first band under the header is
 * the brand hero, so the nav starts on its brand theme to avoid a flash before the band observer resolves.
 * The skip link comes first in the DOM, ahead of the announcement bar, so it is the first Tab stop (§3.9, A-3);
 * <main> takes tabIndex -1 so the hash jump can focus it (V38).
 */
export default function Page() {
  return (
    <>
      <SkipLink />
      <Nav initialTheme="brand" skipLink={false} />
      <main id="main" tabIndex={-1} className="home flex flex-1 flex-col outline-none">
        <Hero />
        <TrustedBy />
        <Statement />
        <ProductBand />
        <StatsBento />
        <AudienceRows />
        <MarketsAccordion />
        <Interlude />
        <ClosingCta />
        <CareersSlab />
      </main>
      <Footer />
    </>
  );
}

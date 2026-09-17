import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageMain } from "@/components/site/page-main";
import { Hero } from "@/components/sections/hero";
import { WhyJapan } from "@/components/sections/why-japan";
import { Walls } from "@/components/sections/walls";
import { Bridge } from "@/components/sections/bridge";
import { Mimamori } from "@/components/sections/mimamori";
import { CareOS } from "@/components/sections/careos";
import { Value } from "@/components/sections/value";
import { Method } from "@/components/sections/method";
import { Trust } from "@/components/sections/trust";
import { Partner } from "@/components/sections/partner";
import { Company } from "@/components/sections/company";
import { Contact } from "@/components/sections/contact";

export default function Page() {
  return (
    <>
      <Nav />
      <PageMain>
        <Hero />
        <WhyJapan />
        <Walls />
        <Bridge />
        <Mimamori />
        <CareOS />
        <Value />
        <Method />
        <Trust />
        <Partner />
        <Company />
        <Contact />
      </PageMain>
      <Footer />
    </>
  );
}

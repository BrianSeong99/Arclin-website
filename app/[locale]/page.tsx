import { Announce } from "@/components/site/announce";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Products } from "@/components/sections/products";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Cta } from "@/components/sections/cta";
import { Partners } from "@/components/sections/partners";

export default function Page() {
  return (
    <>
      <Announce />
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <Hero />
        <Statement />
        <Products />
        <Stats />
        <Process />
        <Cta />
        <Partners />
      </main>
      <Footer />
    </>
  );
}

"use client";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { Section, Kicker } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { DemoTag } from "@/components/ui/demo-tag";
import { SceneIllustration } from "@/components/viz/mimamori-scenes";
import { IsoStack, type IsoLayer } from "@/components/viz/iso-stack";

const LAYERS: readonly IsoLayer[] = [
  { id: "exp", name: "Care Experience", owner: "arclin" },
  { id: "adapt", name: "Adaptation", owner: "arclin" },
  { id: "robot", name: "Robot Intelligence", owner: "partner" },
  { id: "infra", name: "Deployment Infra", owner: "arclin" },
];

/** Yellow product band: Mimamori and CareOS side by side, each with its drawing and one pill link. */
export function Products() {
  const { t } = useLocale();
  return (
    <Section tone="highlight" id="products" className="overflow-hidden">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-40 text-on-highlight/15 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Kicker tone="highlight">{t.productsKicker}</Kicker>
      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-8">
        {t.products.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} className="flex flex-col">
            <article id={p.id} className="flex flex-1 scroll-mt-28 flex-col">
              <h2 className="flex flex-wrap items-baseline gap-x-4">
                <span className="t-display-l">{p.name}</span>
                <span className="t-title-s text-on-highlight/70">{p.sub}</span>
              </h2>
              <p className="t-body-l mt-5 max-w-[32em] text-pretty">{p.body}</p>
              <p className="t-body-s mt-3 max-w-[32em] text-on-highlight/75">{p.note}</p>
              <a href="#contact" className="t-label mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-pill bg-brand px-6 text-on-brand transition-colors hover:bg-ink">
                {p.cta}
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <div className="relative mt-10 rounded-lg bg-page p-6 text-ink sm:p-8">
                <DemoTag className="absolute right-4 top-4" />
                {p.id === "mimamori" ? (
                  <div className="grid grid-cols-2 gap-6 pt-8">
                    <SceneIllustration id="standup" />
                    <SceneIllustration id="patrol" />
                  </div>
                ) : (
                  <div className="pt-6">
                    <IsoStack layers={LAYERS} labels={{ partner: "PARTNER", arclin: "ARCLIN" }} className="mx-auto max-w-md" />
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

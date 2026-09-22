"use client";
import { useLocale } from "@/lib/i18n/context";
import { ButtonLink } from "@/components/ui/button";
import { HeroIllustration } from "@/components/viz/hero-illustration";
import { Heading } from "@/components/site/section";

/** Hero: Italiana tagline, CJK headline, two pill CTAs; the line drawing sits right. */
export function Hero() {
  const { t } = useLocale();
  return (
    <section id="top" className="relative">
      <div className="container-x grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-20">
        <div className="anim-fade-up">
          <p className="t-display-l text-ink">{t.heroTagline}</p>
          <Heading as="h1" size="xl" lines={[t.heroH1a, t.heroH1b]} className="mt-6" />
          <p className="t-body-l mt-6 max-w-[34em] text-pretty text-ink-muted">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#contact" size="lg">
              {t.heroCta1}
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              {t.heroCta2}
            </ButtonLink>
          </div>
        </div>
        <figure className="anim-fade-up mx-auto w-full max-w-[520px] lg:max-w-none" style={{ animationDelay: "80ms" }}>
          <div className="rounded-lg bg-raised p-6 shadow-soft sm:p-10">
            <HeroIllustration title={t.heroAlt} />
          </div>
          <figcaption className="t-caption mt-3 text-center text-ink-subtle">{t.heroCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

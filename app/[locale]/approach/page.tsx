import type { Metadata } from "next";
import Link from "next/link";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Kicker, Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PATH = "/approach/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).approach.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/**
 * How we work, in the order the BP argues it: the six walls between arrival and sign-off, the CareOS layers with the IP
 * line, the gated proof of concept, the first product (Mimamori: boundary, day, acceptance line), then compliance.
 * Anchors: #walls, #layers, #gates, #mimamori, #compliance.
 */
export default async function ApproachPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).approach;
  const cjk = locale !== "en";
  const h2 = cjk ? "t-jp-display" : "t-title-l";
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} />

        <Section id="walls">
          <h2 className={h2}>{p.walls.title}</h2>
          <p className="t-body-l mt-5 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={p.walls.lead} />
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {p.walls.items.map((w) => (
              <div key={w.title} className="border-t border-hairline pt-5">
                <h3 className="t-title-m">{w.title}</h3>
                <p className="t-body mt-2.5 text-pretty text-ink-muted">
                  <Copy text={w.body} />
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="layers" tone="sunken">
          <h2 className={h2}>{p.layers.title}</h2>
          <p className="t-body-l mt-5 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={p.layers.lead} />
          </p>
          <ol className="mt-10 flex max-w-[56em] flex-col gap-1">
            {p.layers.items.map((l) => (
              <li key={l.name} className={cn("grid gap-2 rounded-lg px-5 py-5 sm:grid-cols-[14em_1fr_auto] sm:items-baseline sm:gap-6", l.owner === "arclin" ? "bg-brand text-on-brand on-brand" : "bg-page text-ink")}>
                <span className="t-title-s">{l.name}</span>
                <span className={cn("t-body", l.owner === "arclin" ? "text-on-brand-muted" : "text-ink-muted")}>{l.items}</span>
                <span className={cn("t-caption rounded-pill px-3 py-1", l.owner === "arclin" ? "bg-on-brand/10 text-on-brand" : "bg-sunken text-ink-muted")}>{p.layers.owners[l.owner as "arclin" | "oem"]}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="gates">
          <h2 className={h2}>{p.gates.title}</h2>
          <p className="t-body-l mt-5 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={p.gates.lead} />
          </p>
          <ol className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-5">
            {p.gates.items.map((g) => (
              <li key={g.gate} className="border-t border-hairline pt-5">
                <p className="t-caption text-ink-subtle">
                  {g.gate} · {g.weeks}
                </p>
                <h3 className="t-title-m mt-2">{g.title}</h3>
                <p className="t-body-s mt-2.5 text-pretty text-ink-muted">
                  <Copy text={g.body} />
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="mimamori" tone="brand">
          <Kicker tone="brand">{p.mimamori.eyebrow}</Kicker>
          <h2 className={cn(cjk ? "t-jp-display-l" : "t-display-l", "mt-6 max-w-[18em] text-balance")}>{p.mimamori.title}</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-lg bg-on-brand/10 p-6">
              <h3 className="t-title-m">{p.mimamori.boundary.title}</h3>
              <p className="t-body mt-2.5 text-pretty text-on-brand-muted">
                <Copy text={p.mimamori.boundary.body} />
              </p>
            </div>
            <ol className="flex flex-col divide-y divide-on-brand/20 border-y border-on-brand/20">
              {p.mimamori.day.map((d) => (
                <li key={d.time} className="grid gap-2 py-5 sm:grid-cols-[9em_1fr] sm:gap-6">
                  <div>
                    <p className="t-title-s tabular-nums">{d.time}</p>
                    <p className="t-caption mt-1 text-on-brand-muted">{d.place}</p>
                  </div>
                  <div>
                    <h3 className="t-title-m">{d.title}</h3>
                    <ul className="t-body mt-2 flex flex-col gap-1 text-on-brand-muted">
                      {d.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <h3 className="t-title-l mt-16">{p.mimamori.acceptance.title}</h3>
          <p className="t-body mt-4 max-w-[44em] text-pretty text-on-brand-muted">
            <Copy text={p.mimamori.acceptance.lead} />
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-5">
            {p.mimamori.acceptance.items.map((a) => (
              <div key={a.label} className="flex flex-col-reverse rounded-lg bg-on-brand/10 p-5">
                <dt className="t-caption mt-3 text-on-brand-muted">{a.label}</dt>
                <dd className="font-display text-leaf-gold" style={{ fontSize: "clamp(28px, 2.6vw, 40px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {a.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-caption mt-4 text-on-brand-muted">{p.mimamori.scopeNote}</p>
        </Section>

        <Section id="compliance">
          <h2 className={h2}>{p.compliance.title}</h2>
          <p className="t-body-l mt-5 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={p.compliance.lead} />
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {p.compliance.items.map((c) => (
              <div key={c.title} className="border-t border-hairline pt-5">
                <h3 className="t-title-m">{c.title}</h3>
                <p className="t-body mt-2.5 text-pretty text-ink-muted">
                  <Copy text={c.body} />
                </p>
              </div>
            ))}
          </div>
          <p className="t-caption mt-10 max-w-[44em] text-ink-subtle">{p.compliance.note}</p>
        </Section>

        <Section tone="brand">
          <p className={cn(cjk ? "t-jp-display" : "t-statement", "max-w-[24em] text-balance")}>{p.closing.line}</p>
          <Link href={`/${locale}/contact/`} className={cn(buttonVariants({ variant: "on-brand", size: "lg" }), "mt-8")}>
            {p.closing.cta}
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PATH = "/care-homes/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).careHomes.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** For operators and procurement: what it does on a floor, what changes for staff, what it costs to run, how a pilot starts. */
export default async function CareHomesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).careHomes;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} />
        <Section>
          <div className="flex max-w-[44em] flex-col">
            {p.blocks.map((b, i) => (
              <div key={b.title} className="grid gap-2 border-t border-hairline py-8 sm:grid-cols-[3em_1fr] sm:gap-6">
                <span className="t-numeral text-ink-subtle">{i + 1}</span>
                <div>
                  <h2 className="t-title-m">{b.title}</h2>
                  <p className="t-body mt-2.5 text-pretty text-ink-muted">
                    <Copy text={b.body} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section tone="brand">
          <p className={cn(locale === "en" ? "t-statement" : "t-jp-display", "max-w-[20em] text-balance")}>{p.closing.line}</p>
          <Link href={`/${locale}/contact/`} className={cn(buttonVariants({ variant: "on-brand", size: "lg" }), "mt-8")}>
            {p.closing.cta}
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}

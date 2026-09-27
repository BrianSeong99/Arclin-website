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

const PATH = "/deployment/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).deployment.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** Order to running, site survey, staff training, support model, network requirements, updates. */
export default async function DeploymentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).deployment;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} />
        <Section>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {p.blocks.map((b, i) => (
              <div key={b.title} className="border-t border-hairline pt-5">
                <span className="t-overline text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="t-title-m mt-2">{b.title}</h2>
                <p className="t-body mt-2.5 text-pretty text-ink-muted">
                  <Copy text={b.body} />
                </p>
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

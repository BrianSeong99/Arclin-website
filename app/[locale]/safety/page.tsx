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

const PATH = "/safety/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).safety.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** Plain-language summary table first, then one detail block per row. */
export default async function SafetyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).safety;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} />
        <Section>
          <h2 className="t-title-l">{p.summaryTitle}</h2>
          <table className="mt-6 w-full border-y border-hairline">
            <tbody className="divide-y divide-hairline">
              {p.summary.map((row) => (
                <tr key={row.label} className="grid gap-1 py-4 sm:grid-cols-[16em_1fr] sm:gap-4">
                  <th scope="row" className="t-label text-left align-top text-ink-muted">
                    {row.label}
                  </th>
                  <td className="t-body">
                    <Copy text={row.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="t-title-l mt-16">{p.detailTitle}</h2>
          <div className="mt-6 flex max-w-[44em] flex-col">
            {p.details.map((d) => (
              <div key={d.title} className="border-t border-hairline py-6">
                <h3 className="t-title-m">{d.title}</h3>
                <p className="t-body mt-2.5 text-pretty text-ink-muted">
                  <Copy text={d.body} />
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

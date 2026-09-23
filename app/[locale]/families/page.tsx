import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PATH = "/families/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).families.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** Written to a worried reader: a day with it, what they will and will not be told, how to reach a person. */
export default async function FamiliesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).families;
  const lists: [typeof Check, string[]][] = [
    [Check, p.told.will],
    [X, p.told.willNot],
  ];
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} />
        <Section>
          <div className="flex max-w-[44em] flex-col gap-12">
            <div className="border-t border-hairline pt-6">
              <h2 className="t-title-m">{p.day.title}</h2>
              <p className="t-body mt-2.5 text-pretty text-ink-muted">
                <Copy text={p.day.body} />
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h2 className="t-title-m">{p.told.title}</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {lists.map(([Icon, items], i) => (
                  <ul key={i} className="t-body flex flex-col gap-2 text-ink-muted">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Icon className="mt-1.5 size-4 flex-none text-ink" aria-hidden />
                        <span>
                          <Copy text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div className="border-t border-hairline pt-6">
              <h2 className="t-title-m">{p.reach.title}</h2>
              <p className="t-body mt-2.5 text-pretty text-ink-muted">
                <Copy text={p.reach.body} />
              </p>
            </div>
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

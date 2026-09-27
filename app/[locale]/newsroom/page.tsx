import type { Metadata } from "next";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";

const PATH = "/newsroom/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).newsroom.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** Intro line plus a list of entries; an honest empty state until there is news. */
export default async function NewsroomPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).newsroom;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} lead={p.intro} />
        <Section>
          {p.entries.length === 0 ? (
            <p className="t-body border-y border-hairline py-8 text-ink-muted">{p.empty}</p>
          ) : (
            <ul className="divide-y divide-hairline border-y border-hairline">
              {p.entries.map((e) => (
                <li key={e.title} className="grid gap-2 py-6 sm:grid-cols-[10em_1fr] sm:gap-6">
                  <time className="t-caption text-ink-subtle">{e.date}</time>
                  <div>
                    <h2 className="t-title-s">{e.href ? <a href={e.href} className="hover:underline">{e.title}</a> : e.title}</h2>
                    <p className="t-body mt-2 text-pretty text-ink-muted">
                      <Copy text={e.body} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}

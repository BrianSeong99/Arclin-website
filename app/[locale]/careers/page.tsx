import type { Metadata } from "next";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { mailto } from "@/lib/site";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";
import { ButtonLink } from "@/components/ui/button";

const PATH = "/careers/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).careers.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** One paragraph on the work, the open roles (or an honest empty state), how to apply. */
export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).careers;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} lead={p.about} />
        <Section>
          <div className="flex max-w-[44em] flex-col gap-12">
            <div className="border-t border-hairline pt-6">
              <h2 className="t-title-m">{p.rolesTitle}</h2>
              {p.roles.length === 0 ? (
                <p className="t-body mt-2.5 text-ink-muted">{p.rolesEmpty}</p>
              ) : (
                <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                  {p.roles.map((r) => (
                    <li key={r.title} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                      <span className="t-title-s">{r.href ? <a href={r.href} className="hover:underline">{r.title}</a> : r.title}</span>
                      <span className="t-caption text-ink-subtle">{r.location}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-hairline pt-6">
              <h2 className="t-title-m">{p.apply.title}</h2>
              <p className="t-body mt-2.5 text-pretty text-ink-muted">
                <Copy text={p.apply.body} />
              </p>
              <ButtonLink href={mailto(p.apply.subject)} variant="outline" className="mt-6">
                {p.apply.cta}
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

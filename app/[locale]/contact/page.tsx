import type { Metadata } from "next";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { EMAIL, mailto } from "@/lib/site";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";
import { ButtonLink } from "@/components/ui/button";

const PATH = "/contact/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).contact.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** One line, one email, what each side should include, an honest reply-time line. */
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).contact;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} />
        <Section>
          <div className="flex max-w-[44em] flex-col gap-12">
            <dl className="border-t border-hairline pt-6">
              <dt className="t-label text-ink-muted">{p.emailLabel}</dt>
              <dd className="t-title-m mt-2">
                <a href={mailto(p.subject)} className="underline-offset-4 hover:underline">
                  <Copy text={EMAIL} />
                </a>
              </dd>
            </dl>
            <div className="border-t border-hairline pt-6">
              <h2 className="t-title-m">{p.include.title}</h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                {p.include.groups.map((g) => (
                  <div key={g.who}>
                    <h3 className="t-label text-ink-muted">{g.who}</h3>
                    <ol className="t-body mt-2 flex list-decimal flex-col gap-2 pl-6 text-ink-muted">
                      {g.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-hairline pt-6">
              <p className="t-body text-ink-muted">
                <Copy text={p.responseTime} />
              </p>
              <ButtonLink href={mailto(p.subject)} size="lg" className="mt-6">
                {p.cta}
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

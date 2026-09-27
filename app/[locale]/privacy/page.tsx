import type { Metadata } from "next";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";

const PATH = "/privacy/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${getMessages(locale).privacyPage.title} — Arclin K.K.`, robots: { index: false }, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

/** Placeholder privacy policy — every clause awaits legal review. */
export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).privacyPage;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.kicker} heading={p.title} lead={p.intro}>
          <p className="t-caption mt-4 text-ink-subtle">
            <Copy text={p.updated} />
          </p>
        </PageHeader>
        <Section>
          <div className="max-w-[44em]">
            {p.sections.map((s) => (
              <section key={s.h} className="border-t border-hairline py-6">
                <h2 className="t-title-m">{s.h}</h2>
                <p className="t-body mt-2.5 text-pretty text-ink-muted">
                  <Copy text={s.b} />
                </p>
              </section>
            ))}
            <p className="t-body-s mt-12 rounded-md border border-border-strong px-5 py-4 text-attention">{p.note}</p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getMessages, isLocale, locales, otherLocale } from "@/lib/i18n";
import { Wordmark } from "@/components/site/wordmark";
import { Kicker } from "@/components/site/section";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: `${getMessages(locale).privacyPage.title} — Arclin K.K.`, robots: { index: false } };
}

/** Placeholder privacy policy — every clause awaits legal review. */
export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const t = getMessages(locale);
  const p = t.privacyPage;
  const other = otherLocale(locale);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="on-brand mx-auto flex h-14 max-w-[84rem] items-center justify-between gap-5 rounded-pill bg-brand pl-5 pr-2 text-on-brand">
          <Link href={`/${locale}/`} className="flex items-center">
            <Wordmark tone="brand" />
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/${other}/privacy/`} hrefLang={other} className="t-caption rounded-pill border border-on-brand-muted/50 px-3 py-1.5 font-medium text-on-brand-muted hover:text-on-brand">
              {p.other}
            </Link>
            <Link href={`/${locale}/`} className="t-label inline-flex h-10 items-center rounded-pill bg-page px-5 text-ink hover:bg-highlight">
              {p.back}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[720px] flex-1 px-4 pb-24 pt-16 sm:px-8">
        <Kicker>{p.kicker}</Kicker>
        <h1 className="t-jp-display-l mt-4">{p.title}</h1>
        <p className="t-caption mt-4 text-ink-subtle">{p.updated}</p>
        <p className="t-body-l mt-8 text-ink-muted">{p.intro}</p>
        {p.sections.map((s) => (
          <section key={s.h} className="mt-10 border-t border-hairline pt-6">
            <h2 className="t-title-m">{s.h}</h2>
            <p className="t-body mt-2.5 text-pretty text-ink-muted">{s.b}</p>
          </section>
        ))}
        <p className="t-body-s mt-12 rounded-md border border-border-strong px-5 py-4 text-attention">{p.note}</p>
      </main>
      <footer className="border-t border-hairline">
        <div className="container-x t-caption py-6 text-ink-subtle">© 2026 Arclin K.K. / 株式会社智渡仁</div>
      </footer>
    </div>
  );
}

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
    <div className="flex min-h-screen flex-col leading-[1.8]">
      <header className="border-b border-line">
        <div className="container-x flex items-center justify-between gap-5 py-4">
          <Link href={`/${locale}/`} className="flex items-center">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`/${other}/privacy/`} hrefLang={other} className="rounded-full border border-line-strong px-3 py-[5px] font-mono text-[11px] tracking-[0.08em] text-ink-2">
              {p.other}
            </Link>
            <Link href={`/${locale}/`} className="text-[13.5px] text-ink-2 hover:text-pine">
              {p.back}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[720px] flex-1 px-6 py-[clamp(48px,7vw,96px)]">
        <Kicker>{p.kicker}</Kicker>
        <h1 className="mt-5 text-[clamp(28px,3.6vw,40px)] font-medium leading-[1.3] tracking-[-0.01em]">{p.title}</h1>
        <p className="mt-4 font-mono text-[13px] tracking-[0.06em] text-ink-3">{p.updated}</p>
        <p className="mt-8 text-ink-2">{p.intro}</p>
        {p.sections.map((s) => (
          <section key={s.h} className="mt-10 border-t border-line pt-6">
            <h2 className="text-xl font-medium">{s.h}</h2>
            <p className="mt-2.5 text-pretty text-ink-2">{s.b}</p>
          </section>
        ))}
        <p className="mt-12 rounded-lg border border-dashed border-ember px-5 py-4 text-[13px] text-ember">{p.note}</p>
      </main>
      <footer className="border-t border-line">
        <div className="container-x py-6 font-mono text-[11px] tracking-[0.1em] text-ink-3">© 2026 Arclin K.K. / 株式会社智渡仁</div>
      </footer>
    </div>
  );
}

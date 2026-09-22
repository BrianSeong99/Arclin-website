"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { otherLocale, STORAGE_KEY } from "@/lib/i18n";
import { NAV_HREFS } from "@/lib/site";
import { DotEyes } from "@/components/viz/dot-eyes";
import { Wordmark } from "./wordmark";

/** Brand-slab footer: wordmark, nav column, company rows, disclaimer, then the LED eyes. */
export function Footer() {
  const { t, locale } = useLocale();
  const other = otherLocale(locale);
  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, other);
    } catch {}
  };
  return (
    <footer className="on-brand mx-2 mb-2 overflow-hidden rounded-lg bg-brand text-on-brand-muted sm:mx-3 sm:mb-3">
      <div className="container-x grid gap-10 pb-10 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark tone="brand" size="lg" />
          <p className="t-body mt-4 max-w-[30em]">{t.companyTagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2">
          {t.nav.map((label, i) => (
            <a key={label} href={NAV_HREFS[i]} className="t-body hover:text-on-brand">
              {label}
            </a>
          ))}
          <a href="#contact" className="t-body hover:text-on-brand">
            {t.navContact}
          </a>
        </nav>
        <dl className="t-body-s flex flex-col gap-2">
          {t.company.map((row) => (
            <div key={row.k} className="grid grid-cols-[6em_1fr] gap-2">
              <dt className="text-on-brand-muted/70">{row.k}</dt>
              <dd className={row.ph ? "text-highlight" : "text-on-brand"}>{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="container-x">
        <p className="t-caption max-w-[60em] text-pretty">{t.disclaimer}</p>
        <div className="t-caption mt-6 flex flex-wrap justify-between gap-3 border-t border-on-brand-muted/25 pt-5">
          <span>© 2026 Arclin K.K. / 株式会社智渡仁</span>
          <div className="flex gap-5">
            <Link href={`/${locale}/privacy/`} className="hover:text-on-brand">
              {t.privacy}
            </Link>
            <Link href={`/${other}/`} hrefLang={other} lang={other} onClick={remember} className="hover:text-on-brand">
              {t.otherLang}
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-on-brand-muted/25 bg-ink/40 px-6 py-6 text-highlight">
        <DotEyes className="mx-auto max-w-3xl" />
      </div>
    </footer>
  );
}

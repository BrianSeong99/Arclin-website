"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { otherLocale, STORAGE_KEY } from "@/lib/i18n";
import { NAV_HREFS } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function Footer() {
  const { t, locale } = useLocale();
  const other = otherLocale(locale);
  return (
    <footer className="border-t border-console-line bg-console text-console-muted">
      <div aria-hidden className="container-x h-12 overflow-hidden">
        <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="block h-12 w-full">
          <path d="M0 48 Q 600 -40 1200 48" fill="none" stroke="var(--signal)" strokeOpacity=".5" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="container-x grid gap-8 pb-12 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Wordmark tone="console" />
            <div className="mt-2 text-[13px]">{t.footerName}</div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            {t.nav.map((label, i) => (
              <a key={label} href={NAV_HREFS[i]} className="hover:text-console-text">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="max-w-[60em] text-pretty text-xs leading-[1.7]">{t.disclaimer}</p>
        <div className="flex flex-wrap justify-between gap-3 border-t border-console-line pt-5 font-mono text-[11px] tracking-[0.1em]">
          <span>© 2026 Arclin K.K. / 株式会社智渡仁</span>
          <div className="flex gap-5">
            <Link href={`/${locale}/privacy/`} className="hover:text-console-text">
              {t.privacy}
            </Link>
            <Link
              href={`/${other}/`}
              hrefLang={other}
              lang={other}
              onClick={() => {
                try {
                  localStorage.setItem(STORAGE_KEY, other);
                } catch {}
              }}
              className="hover:text-console-text"
            >
              {t.otherLang}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

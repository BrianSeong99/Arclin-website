"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { FOOTER_COLUMNS } from "@/lib/site";
import { DotEyes } from "@/components/viz/dot-eyes";
import { Wordmark } from "./wordmark";

/** Brand-slab footer: wordmark, two page columns, socials, legal row, entity line, then the LED eyes. */
export function Footer() {
  const { t, locale } = useLocale();
  const c = t.common;
  const headings = [c.footerColumns.product, c.footerColumns.company];
  const socials = [c.socials.x, c.socials.linkedin, c.socials.youtube];
  return (
    <footer className="on-brand mx-2 mb-2 overflow-hidden rounded-lg bg-brand text-on-brand-muted sm:mx-3 sm:mb-3">
      <div className="container-x grid gap-10 pb-10 pt-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark tone="brand" size="lg" />
          {/* botanical drawing: pending asset */}
          <div aria-hidden className="mt-6 h-24 max-w-[16rem]" />
        </div>
        {FOOTER_COLUMNS.map((col, i) => (
          <nav key={headings[i]} aria-label={headings[i]} className="flex flex-col gap-2">
            <p className="t-overline mb-1 text-on-brand-muted/70">{headings[i]}</p>
            {col.map((p) => (
              <Link key={p.key} href={`/${locale}${p.path}`} className="t-body hover:text-on-brand">
                {c.pageLabels[p.key]}
              </Link>
            ))}
          </nav>
        ))}
        <nav aria-label={c.socials.heading} className="flex flex-col gap-2">
          <p className="t-overline mb-1 text-on-brand-muted/70">{c.socials.heading}</p>
          {socials.map((label) => (
            <a key={label} href="#" className="t-body hover:text-on-brand">
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container-x">
        <div className="t-caption flex flex-wrap justify-between gap-3 border-t border-on-brand-muted/25 pt-5">
          <span>© 2026 {c.entity}</span>
          <div className="flex gap-5">
            <Link href={`/${locale}/privacy/`} className="hover:text-on-brand">
              {c.legal.privacy}
            </Link>
            <Link href={`/${locale}/terms/`} className="hover:text-on-brand">
              {c.legal.terms}
            </Link>
          </div>
        </div>
        <p className="t-caption mt-3 text-on-brand-muted/70">{c.entity}</p>
      </div>
      <div className="mt-8 border-t border-on-brand-muted/25 bg-ink/40 px-6 py-6 text-highlight">
        <DotEyes className="mx-auto max-w-3xl" />
      </div>
    </footer>
  );
}

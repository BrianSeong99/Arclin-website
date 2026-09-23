"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { locales, STORAGE_KEY, type Locale } from "@/lib/i18n";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

const LOCALE_SHORT: Record<Locale, string> = { ja: "JA", en: "EN", zh: "ZH" };

/**
 * Floating nav pill (robot.com): a rounded `surface-brand` bar that sits inside the page margin.
 * Desktop: wordmark · five page links · locale · "Talk to us". Mobile: wordmark · locale · menu; links drop below.
 */
export function Nav() {
  const { t, locale } = useLocale();
  const pathname = usePathname() ?? `/${locale}/`;
  const [open, setOpen] = useState(false);
  const c = t.common;
  const home = `/${locale}/`;
  const contact = `/${locale}/contact/`;
  // The same page in another locale: swap the first segment.
  const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const items = NAV.map((p, i) => {
    const href = `/${locale}${p.path}`;
    return { label: c.navLabels[i], href, on: `${pathname}/`.startsWith(href) };
  });
  const remember = (l: Locale) => () => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const localePill = (
    <div role="group" aria-label={c.localeSwitch} className="inline-flex rounded-pill border border-on-brand-muted/50 p-0.5">
      {locales.map((l) => {
        const cls = "t-caption rounded-pill px-2.5 py-1 font-medium";
        return l === locale ? (
          <span key={l} aria-current="true" lang={l} aria-label={c.localeNames[l]} className={cn(cls, "bg-page text-ink")}>
            {LOCALE_SHORT[l]}
          </span>
        ) : (
          <Link key={l} href={`/${l}${rest || "/"}`} hrefLang={l} lang={l} aria-label={c.localeNames[l]} onClick={remember(l)} className={cn(cls, "text-on-brand-muted hover:text-on-brand")}>
            {LOCALE_SHORT[l]}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-2 z-50 px-2 sm:top-3 sm:px-3">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded-pill focus:bg-highlight focus:px-4 focus:py-2 focus:text-on-highlight">
        {c.skip}
      </a>
      <div className="on-brand mx-auto max-w-[84rem] rounded-pill bg-brand text-on-brand shadow-soft">
        <div className="flex h-14 items-center gap-4 pl-5 pr-2">
          <Link href={home} className="flex flex-none items-center" aria-label={c.siteName} onClick={() => setOpen(false)}>
            <Wordmark tone="brand" />
          </Link>
          <nav aria-label={c.siteName} className="hidden min-w-0 flex-1 justify-center gap-7 lg:flex">
            {items.map((it) => (
              <Link key={it.href} href={it.href} aria-current={it.on ? "page" : undefined} className={cn("t-label py-2 transition-colors", it.on ? "text-highlight" : "text-on-brand-muted hover:text-on-brand")}>
                {it.label}
              </Link>
            ))}
          </nav>
          <span className="flex-1 lg:hidden" />
          <div className="flex flex-none items-center gap-2">
            {localePill}
            <Link href={contact} className="t-label hidden h-10 items-center rounded-pill bg-page px-5 text-ink transition-colors hover:bg-highlight lg:inline-flex">
              {c.talkToUs}
            </Link>
            <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? c.menuClose : c.menuOpen} onClick={() => setOpen((v) => !v)} className="inline-flex size-10 items-center justify-center rounded-pill text-on-brand lg:hidden">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" hidden={!open} className="on-brand mx-auto mt-2 max-w-[84rem] rounded-lg bg-brand p-3 text-on-brand shadow-lift lg:hidden">
        <nav aria-label={c.siteName} className="flex flex-col">
          {items.map((it) => (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)} aria-current={it.on ? "page" : undefined} className={cn("t-body-l flex min-h-12 items-center border-b border-on-brand-muted/20 px-2", it.on ? "text-highlight" : "text-on-brand")}>
              {it.label}
            </Link>
          ))}
          <Link href={contact} onClick={() => setOpen(false)} className="t-label mt-3 flex h-12 items-center justify-center rounded-pill bg-page text-ink">
            {c.talkToUs}
          </Link>
        </nav>
      </div>
    </header>
  );
}

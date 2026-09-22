"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { otherLocale, STORAGE_KEY } from "@/lib/i18n";
import { NAV_HREFS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

/**
 * Floating nav pill (robot.com): a rounded `surface-brand` bar that sits inside the page margin.
 * Desktop: wordmark · links · locale · CTA. Mobile: wordmark · locale · menu; links drop below.
 */
export function Nav() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const other = otherLocale(locale);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-35% 0px -55% 0px" });
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  const items = t.nav.map((label, i) => ({ label, href: NAV_HREFS[i], on: NAV_HREFS[i] === `#${active}` }));
  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, other);
    } catch {}
  };

  const localePill = (
    <div role="group" aria-label="Language" className="inline-flex rounded-pill border border-on-brand-muted/50 p-0.5">
      {(["ja", "zh"] as const).map((l) => {
        const cls = "t-caption rounded-pill px-2.5 py-1 font-medium";
        return l === locale ? (
          <span key={l} aria-current="true" className={cn(cls, "bg-page text-ink")}>
            {l === "ja" ? "JP" : "中文"}
          </span>
        ) : (
          <Link key={l} href={`/${l}/`} hrefLang={l} lang={l} onClick={remember} className={cn(cls, "text-on-brand-muted hover:text-on-brand")}>
            {l === "ja" ? "JP" : "中文"}
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-2 z-50 px-2 sm:top-3 sm:px-3">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded-pill focus:bg-highlight focus:px-4 focus:py-2 focus:text-on-highlight">
        {t.skip}
      </a>
      <div className="on-brand mx-auto max-w-[84rem] rounded-pill bg-brand text-on-brand shadow-soft">
        <div className="flex h-14 items-center gap-4 pl-5 pr-2">
          <a href="#top" className="flex flex-none items-center" onClick={() => setOpen(false)}>
            <Wordmark tone="brand" />
          </a>
          <nav aria-label="Sections" className="hidden min-w-0 flex-1 justify-center gap-7 lg:flex">
            {items.map((it) => (
              <a key={it.href} href={it.href} aria-current={it.on || undefined} className={cn("t-label py-2 transition-colors", it.on ? "text-highlight" : "text-on-brand-muted hover:text-on-brand")}>
                {it.label}
              </a>
            ))}
          </nav>
          <span className="flex-1 lg:hidden" />
          <div className="flex flex-none items-center gap-2">
            {localePill}
            <a href="#contact" className="t-label hidden h-10 items-center rounded-pill bg-page px-5 text-ink transition-colors hover:bg-highlight lg:inline-flex">
              {t.navContact}
            </a>
            <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu" onClick={() => setOpen((v) => !v)} className="inline-flex size-10 items-center justify-center rounded-pill text-on-brand lg:hidden">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" hidden={!open} className="on-brand mx-auto mt-2 max-w-[84rem] rounded-lg bg-brand p-3 text-on-brand shadow-lift lg:hidden">
        <nav aria-label="Sections" className="flex flex-col">
          {items.map((it) => (
            <a key={it.href} href={it.href} onClick={() => setOpen(false)} aria-current={it.on || undefined} className={cn("t-body-l flex min-h-12 items-center border-b border-on-brand-muted/20 px-2", it.on ? "text-highlight" : "text-on-brand")}>
              {it.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="t-label mt-3 flex h-12 items-center justify-center rounded-pill bg-page text-ink">
            {t.navContact}
          </a>
        </nav>
      </div>
    </header>
  );
}

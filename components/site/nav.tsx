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
 * Sticky header. Desktop: wordmark, section links (active tracks scroll), JP/中文 pill, contact CTA.
 * Mobile: one 56px row — wordmark, locale pill, menu button; links + CTA live in a drop-down sheet.
 */
export function Nav() {
  const { t, locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const other = otherLocale(locale);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = t.nav.map((label, i) => ({ label, href: NAV_HREFS[i], on: NAV_HREFS[i] === `#${active}` }));
  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, other);
    } catch {}
  };
  const pill = "rounded-full border-0 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em]";
  const localePill = (
    <div role="group" aria-label="Language" className="inline-flex rounded-full border border-line-strong p-0.5">
      {(["ja", "zh"] as const).map((l) =>
        l === locale ? (
          <span key={l} aria-current="true" className={cn(pill, "bg-ink text-paper")}>
            {l === "ja" ? "JP" : "中文"}
          </span>
        ) : (
          <Link key={l} href={`/${l}/`} hrefLang={l} lang={l} onClick={remember} className={cn(pill, "text-ink-2 hover:text-ink")}>
            {l === "ja" ? "JP" : "中文"}
          </Link>
        ),
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <a href="#top" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-pine focus:px-3.5 focus:py-2 focus:text-sm focus:text-paper">
        {t.skip}
      </a>
      <div className={cn("container-x flex items-center gap-4 transition-[padding] duration-300 ease-out-expo", scrolled ? "py-2.5" : "py-3 lg:py-4")}>
        <a href="#top" className="flex flex-none items-center" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>
        <nav aria-label="Sections" className="nav-fade hidden min-w-0 flex-1 gap-[22px] overflow-x-auto whitespace-nowrap py-1 text-[13.5px] lg:flex">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              aria-current={it.on || undefined}
              className={cn("pb-0.5 transition-colors", it.on ? "text-pine shadow-[inset_0_-1px_0_var(--pine)]" : "text-ink-2 hover:text-pine")}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <span className="flex-1 lg:hidden" />
        <div className="flex flex-none items-center gap-2 lg:gap-3">
          {localePill}
          <a href="#contact" className="hidden whitespace-nowrap rounded-md bg-pine px-3.5 py-[9px] text-[13.5px] font-medium text-paper transition-colors hover:bg-pine-2 lg:inline-block">
            {t.navContact}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-line-strong text-ink lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-56px)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Sections" className="container-x py-3">
          {items.map((it, i) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              aria-current={it.on || undefined}
              className={cn("flex items-baseline gap-4 border-b border-line py-3.5 text-[17px]", it.on ? "text-pine" : "text-ink")}
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              {it.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-4 mb-2 flex items-center justify-center rounded-md bg-pine py-3 text-[15px] font-medium text-paper">
            {t.navContact}
          </a>
        </nav>
      </div>
    </header>
  );
}

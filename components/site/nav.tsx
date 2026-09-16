"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/context";
import { otherLocale, STORAGE_KEY } from "@/lib/i18n";
import { NAV_HREFS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

/** Sticky header: wordmark, section links (active tracks scroll), JP/中文 pill, contact CTA. */
export function Nav() {
  const { t, locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
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

  const items = t.nav.map((label, i) => ({ label, href: NAV_HREFS[i], on: NAV_HREFS[i] === `#${active}` }));
  const remember = () => {
    try {
      localStorage.setItem(STORAGE_KEY, other);
    } catch {}
  };
  const pill = "rounded-full border-0 px-2.5 py-1 font-mono text-[11px] tracking-[0.08em]";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <a href="#top" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-pine focus:px-3.5 focus:py-2 focus:text-sm focus:text-paper">
        {t.skip}
      </a>
      <div className={cn("container-x flex items-center gap-5 transition-[padding] duration-300 ease-out-expo", scrolled ? "py-2.5" : "py-4")}>
        <a href="#top" className="flex flex-none items-center">
          <Wordmark />
        </a>
        <nav aria-label="Sections" className="nav-fade hidden min-w-0 flex-1 gap-[22px] overflow-x-auto whitespace-nowrap py-1 text-[13.5px] min-[720px]:flex">
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
        <span className="flex-1 min-[720px]:hidden" />
        <div className="flex flex-none items-center gap-3">
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
          <a href="#contact" className="whitespace-nowrap rounded-md bg-pine px-3.5 py-[9px] text-[13.5px] font-medium text-paper transition-colors hover:bg-pine-2">
            {t.navContact}
          </a>
        </div>
      </div>
      <nav aria-label="Sections" className="nav-fade flex gap-[18px] overflow-x-auto whitespace-nowrap border-t border-line px-6 pb-2.5 pt-2 text-[13px] min-[720px]:hidden">
        {items.map((it) => (
          <a key={it.href} href={it.href} aria-current={it.on || undefined} className={cn("pb-0.5", it.on ? "text-pine shadow-[inset_0_-1px_0_var(--pine)]" : "text-ink-2")}>
            {it.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

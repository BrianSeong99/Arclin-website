"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";
import { LocaleToggle } from "./locale-toggle";

export function Nav() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-pine focus:px-3 focus:py-2 focus:text-paper"
      >
        {t.common.skip}
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label={`${t.common.company} ${t.common.companyEn}`}>
          <Wordmark />
        </a>
        <nav aria-label="Sections" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {t.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="rounded-md px-2.5 py-1.5 text-[13px] text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-line-strong text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Sections"
        hidden={!open}
        className="border-t border-line bg-paper xl:hidden"
      >
        <ul className="container-x grid grid-cols-2 gap-x-6 py-4 sm:grid-cols-3">
          {t.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-sm text-ink-2 hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

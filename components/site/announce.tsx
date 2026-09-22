"use client";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

/** One-line announcement bar above the nav, the page's first Soga mark. */
export function Announce() {
  const { t } = useLocale();
  return (
    <div className="on-highlight bg-highlight text-on-highlight">
      <div className="container-x t-body-s flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
        <span>{t.announce}</span>
        <a href="#process" className="t-label inline-flex items-center gap-1 underline-offset-4 hover:underline">
          {t.announceCta}
          <ArrowRight className="size-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

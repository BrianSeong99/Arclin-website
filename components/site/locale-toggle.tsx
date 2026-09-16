"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";
import { otherLocale, STORAGE_KEY } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const next = otherLocale(locale);
  return (
    <a
      href={`/${next}/`}
      hrefLang={next}
      lang={next}
      title={t.common.langSwitchTitle}
      onClick={() => {
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {}
      }}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-md border border-line-strong px-3 font-mono text-xs tracking-wider text-ink-2 transition-colors hover:border-ink hover:text-ink",
        className,
      )}
    >
      <Languages className="size-3.5" aria-hidden />
      {t.common.langSwitch}
    </a>
  );
}

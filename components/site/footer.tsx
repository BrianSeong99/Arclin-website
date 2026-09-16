"use client";

import { useLocale } from "@/lib/i18n/context";
import { Wordmark } from "./wordmark";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper-2 py-12">
      <div className="container-x grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <Wordmark />
          <p className="mt-3 text-sm text-ink-3">{t.common.company} / {t.common.companyEn}</p>
        </div>
        <div className="space-y-4 text-xs leading-relaxed text-ink-3">
          <p>{t.footer.disclaimer}</p>
          <p>{t.footer.demoNote}</p>
          <p className="font-mono tracking-wider">{t.footer.rights.replace("{year}", String(year))}</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { getMessages, STORAGE_KEY, type Locale, type Messages } from "./index";

type Ctx = { locale: Locale; t: Messages };
const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  // Remember the locale the visitor is actually viewing so the root redirect honours it next time.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale]);
  return <LocaleContext.Provider value={{ locale, t: getMessages(locale) }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

import { ja, type Messages } from "./messages/ja";
import { en } from "./messages/en";
import { zh } from "./messages/zh";

export const locales = ["ja", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";
export const STORAGE_KEY = "arclin-locale";

const messages: Record<Locale, Messages> = { ja, en, zh };

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

/** The two locales that are not `locale`, in ja → en → zh order. */
export function otherLocales(locale: Locale): Locale[] {
  return locales.filter((l) => l !== locale);
}

/** @deprecated Use `otherLocales`; returns the first of them. */
export function otherLocale(locale: Locale): Locale {
  return otherLocales(locale)[0];
}

export type { Messages };

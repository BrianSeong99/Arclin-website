import { ja, type Messages } from "./messages/ja";
import { zh } from "./messages/zh";

export const locales = ["ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";
export const STORAGE_KEY = "arclin-locale";

const messages: Record<Locale, Messages> = { ja, zh };

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ja" ? "zh" : "ja";
}

export type { Messages };

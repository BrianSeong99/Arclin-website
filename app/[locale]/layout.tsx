import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Instrument_Serif, Noto_Sans_SC, Zen_Kaku_Gothic_New } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n/context";
import "../globals.css";

const fontJa = Zen_Kaku_Gothic_New({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-ja", display: "swap", preload: false });
const fontZh = Noto_Sans_SC({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-zh", display: "swap", preload: false });
const fontMono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono", display: "swap" });
const fontDisplay = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-display", display: "swap" });

const SITE = "https://arclin.jp";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale);
  return {
    metadataBase: new URL(SITE),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: { ja: "/ja/", zh: "/zh/", "x-default": "/ja/" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "zh_CN",
      url: `/${locale}/`,
      siteName: "Arclin K.K.",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: `/og-${locale}.png`, width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale as Locale}
      className={`${fontJa.variable} ${fontZh.variable} ${fontMono.variable} ${fontDisplay.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

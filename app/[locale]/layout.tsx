import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Noto_Sans_SC, Zen_Maru_Gothic } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n/context";
import "../globals.css";

// Kurogane faces: Italiana (display), Chillax (UI), Zen Maru Gothic (JA), Noto Sans SC (ZH).
const fontDisplay = localFont({ src: "../../public/fonts/Italiana-Regular.woff2", weight: "400", variable: "--font-display", display: "swap" });
const fontUi = localFont({
  src: [
    { path: "../../public/fonts/Chillax-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Chillax-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/Chillax-Semibold.woff2", weight: "600" },
    { path: "../../public/fonts/Chillax-Bold.woff2", weight: "700" },
  ],
  variable: "--font-ui",
  display: "swap",
});
const fontJp = Zen_Maru_Gothic({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-jp", display: "swap", preload: false });
const fontZh = Noto_Sans_SC({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-zh", display: "swap", preload: false });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arclin.jp";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale);
  return {
    metadataBase: new URL(SITE),
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `/${locale}/`,
      languages: { ja: "/ja/", zh: "/zh/", "x-default": "/ja/" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "zh_CN",
      url: `/${locale}/`,
      siteName: "Arclin K.K.",
      title: t.ogTitle,
      description: t.ogDesc,
      images: [{ url: `/og-${locale}.png`, width: 1200, height: 630, alt: t.ogTitle }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale as Locale} className={`${fontDisplay.variable} ${fontUi.variable} ${fontJp.variable} ${fontZh.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

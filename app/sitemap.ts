import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";
import { FOOTER_COLUMNS } from "@/lib/site";

export const dynamic = "force-static";

/** Every page × every locale, each entry carrying hreflang alternates for the same page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arclin.jp";
  const paths = ["/", ...FOOTER_COLUMNS.flat().map((p) => p.path)];
  const lastModified = new Date();
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`]));
    languages["x-default"] = `${base}/${defaultLocale}${path}`;
    return locales.map((l) => ({ url: `${base}/${l}${path}`, lastModified, alternates: { languages } }));
  });
}

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arclin.jp";
  const languages = { ja: `${base}/ja/`, zh: `${base}/zh/` };
  return [
    { url: `${base}/ja/`, lastModified: new Date(), alternates: { languages } },
    { url: `${base}/zh/`, lastModified: new Date(), alternates: { languages } },
  ];
}

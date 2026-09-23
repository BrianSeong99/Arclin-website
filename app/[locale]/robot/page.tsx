import type { Metadata } from "next";
import Link from "next/link";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Copy } from "@/components/site/copy";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PATH = "/robot/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).robot.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

export default async function RobotPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).robot;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line}>
          <p className="t-title-l mt-8">
            <Copy text={p.hero.highlight} />
          </p>
        </PageHeader>
        <Section>
          <h2 className="t-title-l">{p.specsTitle}</h2>
          <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
            {p.specs.map((s) => (
              <div key={s.label} className="grid gap-1 py-4 sm:grid-cols-[14em_1fr] sm:gap-4">
                <dt className="t-label text-ink-muted">{s.label}</dt>
                <dd className="t-body">
                  <Copy text={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <h2 className="t-title-l mt-16">{p.whatItDoesTitle}</h2>
          <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {p.blocks.map((b) => (
              <div key={b.title} className="border-t border-hairline pt-5">
                <h3 className="t-title-m">{b.title}</h3>
                <p className="t-body mt-2.5 text-pretty text-ink-muted">
                  <Copy text={b.body} />
                </p>
              </div>
            ))}
          </div>
        </Section>
        <Section tone="sunken">
          <h2 className="t-title-l">{p.safetySummary.title}</h2>
          <p className="t-body mt-4 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={p.safetySummary.body} />
          </p>
          <Link href={`/${locale}/safety/`} className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
            {p.safetySummary.cta}
          </Link>
        </Section>
        <Section>
          <div className="grid gap-10 md:grid-cols-2">
            {[p.inBox, p.facilityProvides].map((list) => (
              <div key={list.title} className="border-t border-hairline pt-5">
                <h2 className="t-title-m">{list.title}</h2>
                <ul className="t-body mt-3 flex flex-col gap-2 text-ink-muted">
                  {list.items.map((item) => (
                    <li key={item}>
                      <Copy text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
        <Section tone="brand">
          <p className={cn(locale === "en" ? "t-statement" : "t-jp-display", "max-w-[20em] text-balance")}>{p.closing.line}</p>
          <Link href={`/${locale}/contact/`} className={cn(buttonVariants({ variant: "on-brand", size: "lg" }), "mt-8")}>
            {p.closing.cta}
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}

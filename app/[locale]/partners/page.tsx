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

const PATH = "/partners/";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).partners.meta;
  return { title: m.title, description: m.description, alternates: { canonical: `/${locale}${PATH}`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}${PATH}`])) } };
}

function Blocks({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
      {items.map((b) => (
        <div key={b.title} className="border-t border-hairline pt-4">
          <h4 className="t-title-s">{b.title}</h4>
          <p className="t-body mt-2 text-pretty text-ink-muted">
            <Copy text={b.body} />
          </p>
        </div>
      ))}
    </div>
  );
}

function List({ items }: { items: readonly string[] }) {
  return (
    <ul className="t-body mt-6 flex max-w-[40em] flex-col divide-y divide-hairline border-y border-hairline text-ink-muted">
      {items.map((it) => (
        <li key={it} className="py-3">
          <Copy text={it} />
        </li>
      ))}
    </ul>
  );
}

/** The two sides of the market on one page: #care-operators and #robot-makers, each ending in its own contact pill. */
export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const p = getMessages(locale).partners;
  const cjk = locale !== "en";
  const h2 = cjk ? "t-jp-display-l" : "t-display-l";
  const h3 = cjk ? "t-jp-display" : "t-title-l";
  const care = p.careOperators;
  const oem = p.robotMakers;
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col gap-2 sm:gap-3">
        <PageHeader overline={p.hero.eyebrow} heading={p.hero.line} lead={p.lead} />

        <Section id="care-operators">
          <p className="t-label text-ink-muted">{care.title}</p>
          <h2 className={cn(h2, "mt-4 max-w-[20em] text-balance")}>{care.line}</h2>
          <p className="t-body-l mt-5 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={care.lead} />
          </p>
          <h3 className={cn(h3, "mt-14")}>{care.fitTitle}</h3>
          <List items={care.fit} />
          <h3 className={cn(h3, "mt-14")}>{care.pocTitle}</h3>
          <Blocks items={care.poc} />
          <h3 className={cn(h3, "mt-14")}>{care.termsTitle}</h3>
          <List items={care.terms} />
          <Link href={`/${locale}/contact/`} className={cn(buttonVariants({ size: "lg" }), "mt-10")}>
            {care.cta}
          </Link>
        </Section>

        <Section id="robot-makers" tone="sunken">
          <p className="t-label text-ink-muted">{oem.title}</p>
          <h2 className={cn(h2, "mt-4 max-w-[20em] text-balance")}>{oem.line}</h2>
          <p className="t-body-l mt-5 max-w-[40em] text-pretty text-ink-muted">
            <Copy text={oem.lead} />
          </p>
          <h3 className={cn(h3, "mt-14")}>{oem.weDoTitle}</h3>
          <Blocks items={oem.weDo} />
          <h3 className={cn(h3, "mt-14")}>{oem.weNeedTitle}</h3>
          <List items={oem.weNeed} />
          <h3 className={cn(h3, "mt-14")}>{oem.ipTitle}</h3>
          <dl className="mt-6 grid gap-1 md:grid-cols-2">
            {oem.ip.map((row) => (
              <div key={row.who} className="rounded-lg bg-page p-5">
                <dt className="t-title-s">{row.who}</dt>
                <dd className="t-body mt-2 text-ink-muted">{row.items}</dd>
              </div>
            ))}
          </dl>
          <Link href={`/${locale}/contact/`} className={cn(buttonVariants({ size: "lg" }), "mt-10")}>
            {oem.cta}
          </Link>
        </Section>

        <Section tone="brand">
          <p className={cn(cjk ? "t-jp-display" : "t-statement", "max-w-[24em] text-balance")}>{p.closing.line}</p>
          <Link href={`/${locale}/contact/`} className={cn(buttonVariants({ variant: "on-brand", size: "lg" }), "mt-8")}>
            {getMessages(locale).common.talkToUs}
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}

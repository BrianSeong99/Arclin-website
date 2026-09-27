"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { FOOTER_COLUMNS } from "@/lib/site";
import { Band, Col, Grid24 } from "@/components/home/band";
import { Copy } from "@/components/site/copy";
import { Wordmark } from "./wordmark";

const FOOTER_CSS = `
.footer-link, .footer-small { font-weight: 500; }
`;

/** Main footer link (M25): the two-copy roll-over on bare text, .t-body at 500. */
function RollLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="pill-hover-parent footer-link t-body inline-block text-on-brand">
      <span className="pill__track">
        <span className="pill__label">
          <Copy text={label} />
        </span>
        <span className="pill__label" aria-hidden="true">
          <Copy text={label} />
        </span>
      </span>
    </Link>
  );
}

/** Secondary link (M26): --on-brand at .55, to 1 over --dur-roll --ease-roll. */
const secondaryClass = "footer-small t-caption inline-block text-on-brand opacity-55 transition-opacity duration-roll ease-roll hover:opacity-100";
const legalsType = { fontSize: 12, lineHeight: 1 } as const;

/**
 * The footer (night shift, tightened 2026-09-28): a night slab with the leaf shade, content-driven height, in two rows:
 * the wordmark with the tagline and the founding line under it, and the two link columns on the right (site pages as
 * roll-over links, legal pages as small links); then a hairline legals row (entity left, © right). The camellia line
 * drawing, the 600px floor and the placeholder social links are gone: the company has none of those yet.
 * Below 768: padding 24, columns side by side under the wordmark, legals stacked.
 */
export function Footer() {
  const { t, locale } = useLocale();
  const c = t.common;
  const year = new Date().getFullYear();
  const [site, legal] = FOOTER_COLUMNS;

  return (
    <>
      <style href="footer-band" precedence="default">
        {FOOTER_CSS}
      </style>
      <Band as="footer" tone="night" style={{ paddingBottom: "var(--seam)" }} slabClassName="bg-night-shade p-6 md:px-10 md:pt-10 md:pb-8">
        <Grid24 className="gap-y-10">
          <Col span={14} spanSm={6} className="flex flex-col gap-3">
            <Wordmark tone="brand" size="lg" />
            <p className="font-display text-on-brand-muted" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>
              <Copy text={c.tagline} />
            </p>
            <p className="t-caption text-on-brand-muted">
              <Copy text={c.founded} />
            </p>
          </Col>

          <Col span={5} start={17} spanSm={3}>
            <nav aria-label={c.footerColumns.site} className="flex flex-col items-start gap-1.5">
              {site.map((p) => (
                <RollLink key={p.key} href={`/${locale}${p.path}`} label={c.pageLabels[p.key]} />
              ))}
            </nav>
          </Col>
          <Col span={3} start={22} spanSm={3}>
            <nav aria-label={c.footerColumns.legal} className="flex flex-col items-start gap-1">
              {legal.map((p) => (
                <Link key={p.key} href={`/${locale}${p.path}`} className={secondaryClass}>
                  <Copy text={c.pageLabels[p.key]} />
                </Link>
              ))}
            </nav>
          </Col>

          <Col span={24} spanSm={6} className="mt-4 border-t border-night-hairline pt-4 md:mt-8">
            <Grid24>
              <Col span={12} spanSm={6} as="p" className="footer-small t-caption text-on-brand-muted" style={legalsType}>
                <Copy text={c.entity} />
              </Col>
              <Col span={6} start={19} spanSm={6} as="p" className="footer-small t-caption text-on-brand-muted md:text-right" style={legalsType}>
                <Copy text={`© ${year} ${c.siteName}`} />
              </Col>
            </Grid24>
          </Col>
        </Grid24>
      </Band>
    </>
  );
}

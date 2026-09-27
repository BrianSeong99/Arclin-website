"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { FOOTER_COLUMNS, type PageLink } from "@/lib/site";
import { Band, Col, Grid24 } from "@/components/home/band";
import { Copy } from "@/components/site/copy";
import { FooterArt } from "@/components/viz/footer-art";
import { Wordmark } from "./wordmark";

/** Privacy and terms leave the main list: they are the small links under column 1. */
const LEGAL_KEYS: ReadonlySet<PageLink["key"]> = new Set(["privacy", "terms"]);

const FOOTER_CSS = `
.footer-link, .footer-small { font-weight: 500; }
.footer-art { aspect-ratio: 1350 / 220; }
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
 * Band 11, the footer (night shift, 2026-09-28): a night slab with the leaf shade, 600 tall at 1440, in three rows:
 * the wordmark with the tagline under it and the two nav columns on top (cols 17–20 and 21–24), a hairline legals row
 * (entity left, © right), then the camellia line drawing across the bottom. Below 768: padding 24, nav columns side by
 * side, legals stacked, art hidden. robot.com's 903px dot-matrix footer is gone.
 */
export function Footer() {
  const { t, locale } = useLocale();
  const c = t.common;
  const year = new Date().getFullYear();
  const headings = [c.footerColumns.product, c.footerColumns.company];
  const legal = [
    { key: "privacy", label: c.legal.privacy, href: `/${locale}/privacy/` },
    { key: "terms", label: c.legal.terms, href: `/${locale}/terms/` },
  ];
  const socials = [c.socials.x, c.socials.linkedin, c.socials.youtube];

  return (
    <>
      <style href="footer-band" precedence="default">
        {FOOTER_CSS}
      </style>
      <Band as="footer" tone="night" style={{ paddingBottom: "var(--seam)" }} slabClassName="bg-night-shade p-6 md:px-10 md:pt-10 md:pb-8">
        <Grid24 className="gap-y-10">
          <Col span={16} spanSm={6} className="flex flex-col gap-3">
            <Wordmark tone="brand" size="lg" />
            <p className="font-display text-on-brand-muted" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>
              <Copy text={c.tagline} />
            </p>
          </Col>

          {FOOTER_COLUMNS.map((col, i) => (
            <Col key={headings[i]} span={4} spanSm={3}>
              <nav aria-label={headings[i]} className="flex flex-col items-start gap-1.5">
                {col
                  .filter((p) => !LEGAL_KEYS.has(p.key))
                  .map((p) => (
                    <RollLink key={p.key} href={`/${locale}${p.path}`} label={c.pageLabels[p.key]} />
                  ))}
                {i === 0 ? (
                  <div className="mt-4 flex flex-col items-start gap-1">
                    {legal.map((l) => (
                      <Link key={l.key} href={l.href} className={secondaryClass}>
                        <Copy text={l.label} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div role="group" aria-label={c.socials.heading} className="mt-4 flex flex-col items-start gap-1">
                    {socials.map((label) => (
                      <a key={label} href="#" className={secondaryClass}>
                        <Copy text={label} />
                      </a>
                    ))}
                  </div>
                )}
              </nav>
            </Col>
          ))}

          <Col span={24} spanSm={6} className="mt-10 border-t border-night-hairline pt-4 md:mt-16">
            <Grid24>
              <Col span={12} spanSm={6} as="p" className="footer-small t-caption text-on-brand-muted" style={legalsType}>
                <Copy text={c.entity} />
              </Col>
              <Col span={6} start={19} spanSm={6} as="p" className="footer-small t-caption text-on-brand-muted md:text-right" style={legalsType}>
                <Copy text={`© ${year} ${c.siteName}`} />
              </Col>
            </Grid24>
          </Col>

          <Col span={24} spanSm={6} className="footer-art text-on-brand-muted">
            <FooterArt className="hidden md:block" />
          </Col>
        </Grid24>
      </Band>
    </>
  );
}

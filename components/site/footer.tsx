"use client";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { FOOTER_COLUMNS, type PageLink } from "@/lib/site";
import { usePreviewVariant } from "@/lib/preview-variant";
import { Band, Col, Grid24 } from "@/components/home/band";
import { Copy } from "@/components/site/copy";
import { FooterArt } from "@/components/viz/footer-art";
import { Wordmark } from "./wordmark";

/** Privacy and terms leave the main list: robot.com sets them as the small links under column 1 (§2 row 13). */
const LEGAL_KEYS: ReadonlySet<PageLink["key"]> = new Set(["privacy", "terms"]);

/**
 * Footer-only layout (spec §2 row 13, V35). Grid rows 218.48 / 162 / 448.67 at ≥768 (the third is
 * 20px + the dots wrapper), auto / auto / 162 / auto below it; the dots wrapper keeps robot.com's
 * 1414/449 aspect from 768 and its empty 332x165 box at 390. Hoisted once by React (href + precedence).
 */
const FOOTER_CSS = `
.footer-grid { grid-template-rows: auto auto 162px auto; }
.footer-link, .footer-small { font-weight: 500; } /* §4: .t-body / .t-caption "at 500"; unlayered so it wins over the .t-* weight */
.footer-dots { margin-top: 20px; aspect-ratio: 2 / 1; }
@media (width >= 48rem) {
  .footer-grid { grid-template-rows: 218.48px 162px auto; }
  .footer-dots { aspect-ratio: 1414 / 449; }
}
`;

/**
 * Main footer link (M25): the same two-copy roll-over as the pills, on bare text. `.pill-hover-parent`,
 * `.pill__track` and `.pill__label` (globals.css) carry the 300ms var(--ease-roll) travel, the snap-back
 * and the reduced-motion no-roll. Type: .t-body at 500 per §4 ("footer nav link"); the track's 1.225
 * line box makes the travel 17 x 1.225 = 20.8px against robot.com's 18.55.
 */
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

/**
 * Secondary link (M26): --on-brand at opacity .55 (robot.com: #fff at .55, the same ink as the main links, muted by the
 * opacity alone), fading to 1 over var(--dur-roll) var(--ease-roll) in and out. On --on-brand the .55 rest reads 5.2:1
 * against --surface-brand; on --on-brand-muted it fell to 3.8:1 (A-5), and no rest opacity satisfies V17's
 * --on-brand-muted role, M26's measured .55 (V22) and A-5's 4.5:1 at once. Kept on --on-brand: the role table's
 * --on-brand-muted line for the footer secondaries is the entry to amend.
 */
const secondaryClass = "footer-small t-caption inline-block text-on-brand opacity-55 transition-opacity duration-roll ease-roll hover:opacity-100";

/** §4 "Footer legals" 12/500/12: .t-caption (13/1.5) is the nearest style, so the size and leading are pinned here (V35). */
const legalsType = { fontSize: 12, lineHeight: 1 } as const;

/**
 * Band 13, the footer (spec §2 row 13, §3.7, V35, V36): footer padding 4/4 on the page, the brand slab
 * (radius --radius-xl, padding 26px 40px 40px, overflow hidden) holding the 24-column grid: wordmark
 * span 16, two nav columns span 4, the legals row span 24 (entity left, © right-aligned from column 19),
 * then the dot-matrix wrapper span 24 with <DotEyes>. Below 768: 6 columns, padding 24, nav columns
 * side by side, legals stacked, dots hidden.
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
  const art = usePreviewVariant("art", "camellia", ["camellia", "blossoms"] as const);

  return (
    <>
      <style href="footer-band" precedence="default">
        {FOOTER_CSS}
      </style>
      <Band as="footer" tone="brand" style={{ paddingBottom: "var(--seam)" }} slabClassName="p-6 md:px-10 md:pb-10 md:pt-6.5">
        <Grid24 className="footer-grid">
          <Col span={16} spanSm={6} className="pb-12 md:pb-0">
            <Wordmark tone="brand" size="lg" />
          </Col>

          {FOOTER_COLUMNS.map((col, i) => (
            <Col key={headings[i]} span={4} spanSm={3}>
              <nav aria-label={headings[i]} className="flex flex-col items-start gap-1">
                {col
                  .filter((p) => !LEGAL_KEYS.has(p.key))
                  .map((p) => (
                    <RollLink key={p.key} href={`/${locale}${p.path}`} label={c.pageLabels[p.key]} />
                  ))}
                {i === 0 ? (
                  <div className="mt-6 flex flex-col items-start gap-1">
                    {legal.map((l) => (
                      <Link key={l.key} href={l.href} className={secondaryClass}>
                        <Copy text={l.label} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div role="group" aria-label={c.socials.heading} className="mt-6 flex flex-col items-start gap-1">
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

          <Col span={24} spanSm={6} className="self-end">
            <Grid24>
              <Col span={12} spanSm={6} as="p" className="footer-small t-caption text-on-brand-muted" style={legalsType}>
                <Copy text={c.entity} />
              </Col>
              <Col span={6} start={19} spanSm={6} as="p" className="footer-small t-caption text-on-brand-muted md:text-right" style={legalsType}>
                <Copy text={`© ${year} ${c.siteName}`} />
              </Col>
            </Grid24>
          </Col>

          <Col span={24} spanSm={6} className="footer-dots text-on-brand-muted">
            <FooterArt variant={art} className="hidden md:block" />
          </Col>
        </Grid24>
      </Band>
    </>
  );
}

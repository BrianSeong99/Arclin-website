import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, locales } from "@/lib/i18n";
import { radiusTokens, shadowNote, shadowTokens, spacingTokens, systemName, systemVersion, themes, typeFamilies, typeGroups } from "@/lib/ds/tokens";
import { Wordmark } from "@/components/site/wordmark";
import { StyleguideSection } from "@/components/styleguide/styleguide-section";
import { ThemeColumn } from "@/components/styleguide/theme-column";
import { ThemePanel } from "@/components/styleguide/theme-panel";
import { TypeSpecimen } from "@/components/styleguide/type-specimen";
import { SpacingRuler } from "@/components/styleguide/spacing-ruler";
import { RadiusTile } from "@/components/styleguide/radius-tile";
import { ShadowCard } from "@/components/styleguide/shadow-card";
import { MotionTable } from "@/components/styleguide/motion-table";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { title: "Styleguide — Arclin", robots: { index: false, follow: false } };

/** Internal reference for the Kurogane tokens. English-only and unlisted; not linked from the site. */
export default async function StyleguidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-hairline">
        <div className="container-x flex h-14 items-center justify-between gap-5">
          <Link href={`/${locale}/`} className="flex items-center">
            <Wordmark />
          </Link>
          <span className="t-overline text-ink-subtle">Styleguide</span>
        </div>
      </header>
      <main lang="en" className="flex-1 pb-24">
        <div className="container-x pb-12 pt-16">
          <p className="t-overline text-ink-subtle">
            {systemName}, version {systemVersion}
          </p>
          <h1 className="t-display-l mt-4">Styleguide</h1>
          <p className="t-body-l mt-5 max-w-[36em] text-pretty text-ink-muted">
            Every token in the system, rendered from lib/ds/tokens.ts through the CSS in app/globals.css. Ids are stable; point at them in review.
          </p>
        </div>

        <StyleguideSection number="01" title="Colour" description="Every colour token, Paper beside Night. The Night column re-scopes the same variables under data-theme.">
          <div className="grid gap-6 lg:grid-cols-2">
            {themes.map((theme) => (
              <ThemeColumn key={theme.id} theme={theme} />
            ))}
          </div>
        </StyleguideSection>

        <StyleguideSection number="02" title="Type" description="Every style in every group, set through its .t- class in the family the token names.">
          {typeGroups.map((group) => (
            <div key={group.name} className="mt-12 first:mt-0">
              <h3 className="t-title-m">{group.name}</h3>
              <p className="t-caption mt-1 text-ink-subtle">{typeFamilies[group.family]}</p>
              <div className="mt-4">
                {group.styles.map((style) => (
                  <TypeSpecimen key={style.id} style={style} family={group.family} />
                ))}
              </div>
            </div>
          ))}
        </StyleguideSection>

        <StyleguideSection number="03" title="Spacing" description="Eight steps. Build layouts from these and nothing else.">
          <div>
            {spacingTokens.map((token) => (
              <SpacingRuler key={token.id} token={token} />
            ))}
          </div>
        </StyleguideSection>

        <StyleguideSection number="04" title="Radius" description="Four corners on surface-raised. Anything tappable takes the pill.">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {radiusTokens.map((token) => (
              <RadiusTile key={token.id} token={token} />
            ))}
          </div>
        </StyleguideSection>

        <StyleguideSection number="05" title="Shadow" description={shadowNote}>
          <div className="grid gap-6 lg:grid-cols-2">
            {themes.map((theme) => (
              <ThemePanel key={theme.id} theme={theme}>
                <div className="grid gap-6 sm:grid-cols-2">
                  {shadowTokens.map((token) => (
                    <ShadowCard key={token.id} token={token} theme={theme.id} />
                  ))}
                </div>
              </ThemePanel>
            ))}
          </div>
        </StyleguideSection>

        <StyleguideSection number="06" title="Motion" description="Kurogane's two durations and one ease, plus the five durations and five easings the v3 homepage takes from robot.com.">
          <MotionTable />
        </StyleguideSection>
      </main>
    </div>
  );
}

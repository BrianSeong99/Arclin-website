/**
 * Library entry for the Arclin site components (Kurogane design system).
 * Built to dist/ by `pnpm build:ds`; consumed by claude.ai/design via /design-sync.
 * The Next.js app itself imports components directly, not through this barrel.
 */
export { LocaleProvider, useLocale } from "../i18n/context";
export { ja } from "../i18n/messages/ja";
export { en } from "../i18n/messages/en";
export { zh } from "../i18n/messages/zh";
export type { Messages } from "../i18n/messages/ja";
export type { Locale } from "../i18n";

export { Button, ButtonLink, buttonVariants } from "../../components/ui/button";
export type { ButtonProps, ButtonLinkProps } from "../../components/ui/button";
export { Badge } from "../../components/ui/badge";
export type { BadgeProps } from "../../components/ui/badge";
export { DemoTag } from "../../components/ui/demo-tag";
export { Footnote } from "../../components/ui/footnote";

export { Wordmark } from "../../components/site/wordmark";
export { Announce } from "../../components/site/announce";
export { Nav } from "../../components/site/nav";
export { Footer } from "../../components/site/footer";
export { Section, SectionHeading, Kicker, Heading } from "../../components/site/section";
export { Copy } from "../../components/site/copy";
export { VideoFrame } from "../../components/site/video-frame";
export type { VideoFrameProps } from "../../components/site/video-frame";
export { PageHeader } from "../../components/site/page-header";
export { Reveal, Stagger, StaggerItem } from "../../components/site/reveal";

export { CountUp } from "../../components/viz/count-up";
export { TrendLine } from "../../components/viz/trend-line";
export type { TrendPoint } from "../../components/viz/trend-line";
export { DonutGauge } from "../../components/viz/donut-gauge";
export { HeroIllustration } from "../../components/viz/hero-illustration";
export { SceneIllustration } from "../../components/viz/mimamori-scenes";
export type { SceneId } from "../../components/viz/mimamori-scenes";
export { IsoStack } from "../../components/viz/iso-stack";
export type { IsoLayer } from "../../components/viz/iso-stack";
export { DotEyes } from "../../components/viz/dot-eyes";

// Homepage bands (components/home, robot.com order; reference spec docs/superpowers/specs/2026-09-23-robot-com-reference.md).
export { Band, Grid24, Col } from "../../components/home/band";
export type { BandProps, BandTone, Grid24Props, ColProps } from "../../components/home/band";
export { startBandTheme, subscribeHeaderTheme, getHeaderTheme, toneToTheme } from "../../components/home/band-theme";
export type { HeaderTheme } from "../../components/home/band-theme";
export { SmoothScroll, useLenis } from "../../components/home/smooth-scroll";
export { PillLink, PillButton } from "../../components/home/pill";
export type { PillLinkProps, PillButtonProps, PillVariant, PillSize } from "../../components/home/pill";
export { RevealHeading } from "../../components/home/reveal-heading";
export type { RevealHeadingProps } from "../../components/home/reveal-heading";
export { AnnounceBar } from "../../components/home/announce-bar";
export { Hero } from "../../components/home/hero";
export { TrustedBy } from "../../components/home/trusted-by";
export { Statement } from "../../components/home/statement";
export { ProductBand } from "../../components/home/product-band";
export { StatsBento } from "../../components/home/stats-bento";
export { AudienceRows } from "../../components/home/audience-rows";
export { MarketsAccordion } from "../../components/home/markets-accordion";
export { Interlude } from "../../components/home/interlude";
export { ClosingCta } from "../../components/home/closing-cta";
export { CareersSlab } from "../../components/home/careers-slab";

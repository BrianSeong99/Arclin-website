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

export { Hero } from "../../components/sections/hero";
export { Statement } from "../../components/sections/statement";
export { Products } from "../../components/sections/products";
export { Stats } from "../../components/sections/stats";
export { Process } from "../../components/sections/process";
export { Cta } from "../../components/sections/cta";
export { Partners } from "../../components/sections/partners";

/**
 * Library entry for the Arclin design system.
 * Built to dist/ by `pnpm build:ds`; consumed by claude.ai/design via /design-sync.
 * The Next.js app itself imports components directly, not through this barrel.
 */
export { LocaleProvider, useLocale } from "../i18n/context";
export { ja } from "../i18n/messages/ja";
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
export { LocaleToggle } from "../../components/site/locale-toggle";
export { Nav } from "../../components/site/nav";
export { Footer } from "../../components/site/footer";
export { Section, SectionHeading } from "../../components/site/section";
export { Reveal, Stagger, StaggerItem } from "../../components/site/reveal";

export { CountUp } from "../../components/viz/count-up";
export { TrendLine } from "../../components/viz/trend-line";
export type { TrendPoint } from "../../components/viz/trend-line";
export { DonutGauge } from "../../components/viz/donut-gauge";
export { RingTimeline } from "../../components/viz/ring-timeline";
export type { RingSegment } from "../../components/viz/ring-timeline";
export { FlowSteps } from "../../components/viz/flow-steps";
export type { FlowStep } from "../../components/viz/flow-steps";
export { LayerStack } from "../../components/viz/layer-stack";
export type { Layer } from "../../components/viz/layer-stack";
export { HeroIllustration } from "../../components/viz/hero-illustration";
export { SceneIllustration } from "../../components/viz/mimamori-scenes";
export type { SceneId } from "../../components/viz/mimamori-scenes";

export { Hero } from "../../components/sections/hero";
export { WhyJapan } from "../../components/sections/why-japan";
export { Walls } from "../../components/sections/walls";
export { Mimamori } from "../../components/sections/mimamori";
export { CareOS } from "../../components/sections/careos";
export { Value } from "../../components/sections/value";
export { Method } from "../../components/sections/method";
export { Trust } from "../../components/sections/trust";
export { Partner } from "../../components/sections/partner";
export { Fit } from "../../components/sections/fit";
export { Company } from "../../components/sections/company";
export { Contact } from "../../components/sections/contact";

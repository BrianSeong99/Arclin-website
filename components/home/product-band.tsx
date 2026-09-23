"use client";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";
import { DEV_MEDIA } from "@/lib/dev-media";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { RevealHeading } from "@/components/home/reveal-heading";

/* ---------------------------------------------------------------------------------------------
 * Band 6 (spec §2 row 6, §3.3, M8, M9, V13, V26, V27): the yellow dot-grid product band.
 *
 * Geometry at 1440 (all from the spec row): section 1319 = 4 seam + 1315 body. Body = yellow
 * content 1430x242 (radius 26 26 0 0 → --radius-xl, padding 30px 25px) + dot mask svg 1430x358
 * (viewBox 0 0 1458 365, margin-top -2) + 4 gap + two 713x713 cards. The cards ride in a strip
 * anchored 4px above the mask at rest (hidden under the yellow content and clipped at the body's
 * top edge), then translateY 0 → 1079 (= mask 358 + cards 713 + 8) scroll-linked and linear from
 * the moment the mask's top reaches the viewport bottom (scrollY 1161) until the cards land 4px
 * under the mask (2240). While pinned the cards hold 4px above the viewport bottom and the yellow
 * header scrolls over them, so they show through the 64 holes. No mask-image, no clip-path.
 * robot.com does this with a GSAP pin-spacer (padding-bottom 1079); here the body is the spacer
 * (an invisible ghost grid reserves the landing row) and motion's useScroll drives the strip.
 * ------------------------------------------------------------------------------------------- */

/** §2 row 6: the 4px seam between the cards and the mask, and between the mask and the landing row. */
const GAP = 4;

/* ---- dot mask (V27) ------------------------------------------------------------------------- */

/** viewBox and hole lattice read off robot.com's path: 16 x 4 holes, dia 72.83, first centre (43.29, 46.65). */
const MASK = { w: 1458, h: 365, cols: 16, rows: 4, r: 36.413, cx0: 43.29, cy0: 46.651, px: (1414.71 - 43.29) / 15, py: (320.771 - 46.651) / 3 };
const KAPPA = 0.5522847498;

/** One path: the full rect minus 64 circle holes, each circle four cubic curves (256 `C` commands). */
function maskPath(): string {
  const { w, h, cols, rows, r, cx0, cy0, px, py } = MASK;
  const k = KAPPA * r;
  const f = (n: number) => Number(n.toFixed(3)).toString();
  let d = `M0 0H${w}V${h}H0Z`;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = cx0 + col * px;
      const cy = cy0 + row * py;
      d +=
        `M${f(cx - r)} ${f(cy)}` +
        `C${f(cx - r)} ${f(cy - k)} ${f(cx - k)} ${f(cy - r)} ${f(cx)} ${f(cy - r)}` +
        `C${f(cx + k)} ${f(cy - r)} ${f(cx + r)} ${f(cy - k)} ${f(cx + r)} ${f(cy)}` +
        `C${f(cx + r)} ${f(cy + k)} ${f(cx + k)} ${f(cy + r)} ${f(cx)} ${f(cy + r)}` +
        `C${f(cx - k)} ${f(cy + r)} ${f(cx - r)} ${f(cy + k)} ${f(cx - r)} ${f(cy)}Z`;
    }
  }
  return d;
}
const MASK_PATH = maskPath();

/**
 * The dotted unveiling mask: fill currentColor = --highlight, so the holes are transparent and whatever
 * sits under the svg (the page, then the cards as they arrive) shows through. 100% wide from 768 with the
 * spec's bottom radius (12 → --radius-md); 200% wide below, clipped by the wrapper at --radius-lg (robot.com 20).
 */
function DotMask({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${MASK.w} ${MASK.h}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-dot-mask className={cn("block w-[200%] text-highlight md:w-full md:rounded-b-md", className)}>
      <path d={MASK_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/* ---- card title word reveal (M9) ------------------------------------------------------------ */

const MARKER = /(\[(?:GAP:|PLACEHOLDER)[^\]]*\])/;

/** Words the browser may wrap between; a [GAP] marker stays whole. CJK is segmented into dictionary words. */
function tokenise(text: string, lang?: string): string[] {
  const out: string[] = [];
  for (const part of text.split(MARKER)) {
    if (!part) continue;
    if (MARKER.test(part)) {
      out.push(part);
      continue;
    }
    const cjk = lang === "ja" || lang === "zh";
    if (cjk && typeof Intl !== "undefined" && "Segmenter" in Intl) {
      for (const s of new Intl.Segmenter(lang, { granularity: "word" }).segment(part)) out.push(s.segment);
    } else if (cjk) {
      out.push(...Array.from(part));
    } else {
      for (const w of part.split(/(\s+)/)) if (w) out.push(w);
    }
  }
  return out;
}

interface RevealWordsProps {
  text: string;
  as?: ElementType;
  lang?: string;
  className?: string;
  style?: CSSProperties;
  /** Seconds before the words move (M4/M9: .15s for line 1, +.1s per line). */
  delay?: number;
}

/**
 * M9: each word rises inside its own overflow-hidden box from translateY(52px) to 0 over var(--dur-reveal)
 * var(--ease-reveal), once the title is half in view (threshold .5, once). Opacity is never touched.
 * Reduced motion: rendered static at the end state, from the first client render after mount (the server tree
 * is the tokenised one either way, so hydration matches; A-2).
 */
function RevealWords({ text, as: Tag = "h3", lang, className, style, delay = 0.15 }: RevealWordsProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, inView]);

  if (reduce) {
    return (
      <Tag ref={ref} lang={lang} className={className} style={style}>
        <Copy text={text} />
      </Tag>
    );
  }

  return (
    <Tag ref={ref} lang={lang} className={cn(className, inView && "is-in")} style={style}>
      {tokenise(text, lang).map((tok, i) =>
        /^\s+$/.test(tok) ? (
          tok
        ) : (
          <span key={i} className="inline-block overflow-hidden align-top" style={{ paddingBottom: "0.15ch" }}>
            <span
              className="inline-block"
              style={{
                transform: inView ? "none" : "translateY(52px)",
                transition: "transform var(--dur-reveal) var(--ease-reveal)",
                transitionDelay: `${delay}s`,
              }}
            >
              <Copy text={tok} />
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}

/* ---- product card (V13) --------------------------------------------------------------------- */

interface ProductCardProps {
  name: string;
  /** Second 41px line at the muted role (robot.com's h3 tagline at opacity .5). */
  tagline: string;
  /** Body copy lines; each renders through <Copy> so [GAP] markers show. */
  body: string[];
  cta: string;
  href: string;
  media: (typeof DEV_MEDIA)[keyof typeof DEV_MEDIA];
  lang: string;
}

/**
 * One 713x713 card (span 12, bg-raised, radius 24, padding 18px 24px; 380x663.66 padding 20px 17px at 390).
 * Title and tagline at §4 "Title h3 (cards)" (41 → 26 below 768, new style), body at .t-body-s 500,
 * outline pill (§3.3 black-outline). The media stands where robot.com's cut-out figure does (S06-2): the card's
 * full height on its right half from 768 (robot.com: a 713² transparent figure translateX(-356.5)); below 768 a
 * full-width square at the bottom of the stacked card, under the copy, as the 390 reference shows.
 */
function ProductCard({ name, tagline, body, cta, href, media, lang }: ProductCardProps) {
  // §4 "Title h3 (cards, accordion, trusted-by)": 41/600/41/-0.82 at 1440, 26 at 390 → t-title-xl (new style; not in globals yet)
  const titleStyle: CSSProperties = { fontSize: "clamp(26px, 5.34vw, 41px)", lineHeight: 1, letterSpacing: "-0.02em" };
  return (
    <Col as="article" span={12} spanSm={6} className="relative aspect-[355/620] max-h-screen overflow-hidden rounded-xl bg-raised p-[20px_17px] text-ink md:aspect-square md:p-[18px_24px]">
      <div className="relative z-10">
        <RevealWords as="h3" text={name} lang={lang} className="t-title-l max-w-[65%] text-ink" style={titleStyle} delay={0.15} />
        <RevealWords as="p" text={tagline} lang={lang} className="t-title-l max-w-[65%] text-ink-muted" style={titleStyle} delay={0.25} />
        {/* §4 "Body-s (card copy)": .t-body-s at 500; the class rule sits outside Tailwind's layers, so the weight goes inline. */}
        <div className="mt-[20px] max-w-[290px] md:max-w-[300px]">
          {body.map((line, i) => (
            <p key={i} className="t-body-s text-ink-muted" style={{ fontWeight: 500 }}>
              <Copy text={line} />
            </p>
          ))}
        </div>
        <div className="mt-[20px] md:mt-[27px]">
          <PillLink href={href} label={cta} variant="outline" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 aspect-square md:inset-y-0 md:left-auto md:aspect-auto md:w-1/2">
        <VideoFrame src={media.src} poster={media.poster} ratio="auto" label={media.label} className="absolute inset-0 rounded-none" />
      </div>
    </Col>
  );
}

/* ---- band ------------------------------------------------------------------------------------ */

export interface ProductBandProps {
  id?: string;
  className?: string;
}

/** The yellow dot-grid product band: robot.com band 6 with Arclin's robot and CareOS in the two cards. */
export function ProductBand({ id = "products", className }: ProductBandProps) {
  const { locale, t } = useLocale();
  const reduce = usePrefersReducedMotion();
  const dotsRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  /** Pin distance: mask height + cards height + 2 x 4px (1079 at 1440). Measured, since both depend on width. */
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const dots = dotsRef.current;
    const strip = stripRef.current;
    if (!dots || !strip) return;
    const update = () => setDistance(dots.getBoundingClientRect().height + strip.getBoundingClientRect().height + 2 * GAP);
    const ro = new ResizeObserver(update);
    ro.observe(dots);
    ro.observe(strip);
    update();
    return () => ro.disconnect();
  }, []);

  // M8: progress 0 when the mask's top meets the viewport bottom, 1 exactly `distance` px of scroll later.
  const { scrollYProgress } = useScroll({ target: dotsRef, offset: ["start end", `${Math.max(distance, 1)}px end`] });
  const dist = useMotionValue(0);
  useEffect(() => {
    dist.set(distance);
  }, [dist, distance]);
  // Reduced motion: the scrub sits at its end state, cards landed.
  const y = useTransform(() => (reduce ? 1 : scrollYProgress.get()) * dist.get());

  const robot = t.home.robot;
  const careos = t.products[1];

  return (
    <Band tone="highlight" slab={false} id={id} className={cn("relative", className)}>
      {/* Body = robot.com's pin-spacer: content + mask + 4 + cards = 1315 at 1440. overflow-clip hides the strip above the band. */}
      <div className="relative overflow-clip" data-pin-spacer>
        {/* Yellow content, radius 26 26 0 0 → --radius-xl, padding 30px 25px; min-height keeps the spec's 242 (194 at 390) with Arclin's shorter copy. */}
        <div className="on-highlight relative z-10 rounded-t-xl bg-highlight p-[30px_25px] text-on-highlight" style={{ minHeight: "clamp(194px, 31.5vw, 242px)" }} data-band-content>
          {/* §2 row 6 / S06-1: h2 top-left, then the 14/500 subtitle p beneath it (robot.com has no overline). */}
          {/* §4 "Product band h2": 52/600/52/-1.56 at 1440, 32 at 390 → t-title-xxl (new style; not in globals yet) */}
          <RevealHeading as="h2" text={robot.name} lang={locale} className="t-title-l max-w-[420px]" style={{ fontSize: "clamp(32px, 6.77vw, 52px)", lineHeight: 1, letterSpacing: "-0.03em" }} />
          {/* §4 "Text-s (stats sub, product band sub)": 14/500/14.84 → .t-body-s at 500; the size and leading go inline because
              the unlayered .t-body-s rule outranks the utilities. Colour: robot.com's rgba(38,38,38,.65) → --ink-muted (§2 row 6). */}
          <p className="t-body-s mt-3 max-w-75 text-ink-muted" style={{ fontSize: 14, lineHeight: 1.06, fontWeight: 500 }}>
            <Copy text={robot.sentences[0]} />
          </p>
        </div>

        {/* Mask row. `isolate` makes a stacking context so the strip (-z-10) paints under the svg but over the page. */}
        <div ref={dotsRef} className="relative isolate" style={{ marginTop: -2 }} data-dots>
          {/* The pinned strip: cards anchored 4px above the mask, translateY 0 → distance (M8, V26). */}
          <motion.div ref={stripRef} className="absolute inset-x-0 -z-10" style={{ bottom: `calc(100% + ${GAP}px)`, y }} data-pinned-strip>
            <Grid24>
              <ProductCard name={robot.name} tagline={robot.eyebrow} body={robot.sentences} cta={robot.cta} href={`/${locale}/robot/`} media={DEV_MEDIA["robot-company"]} lang={locale} />
              <ProductCard name={careos.name} tagline={careos.sub} body={[careos.body]} cta={careos.cta} href={`/${locale}/deployment/`} media={DEV_MEDIA["robot-staying-in-touch"]} lang={locale} />
            </Grid24>
          </motion.div>
          <div className="overflow-hidden rounded-b-lg leading-none md:overflow-visible md:rounded-b-none">
            <DotMask />
          </div>
        </div>

        {/* Ghost of the landing row: same grid, same card geometry, no content. Reserves the 4 + 713 the cards land in. */}
        <div aria-hidden="true" className="invisible" style={{ marginTop: GAP }} data-landing>
          <Grid24>
            <Col span={12} spanSm={6} className="aspect-[355/620] max-h-screen md:aspect-square" />
            <Col span={12} spanSm={6} className="aspect-[355/620] max-h-screen md:aspect-square" />
          </Grid24>
        </div>
      </div>
    </Band>
  );
}

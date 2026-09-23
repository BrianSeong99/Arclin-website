"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { DUR, usePrefersReducedMotion } from "@/lib/motion";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { DEV_MEDIA, type DevMediaSlot } from "@/lib/dev-media";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/** A sentence that still carries an unconfirmed fact (`[GAP: …]` / `[PLACEHOLDER…]`). */
const GAP_MARK = /\[(?:GAP:|PLACEHOLDER)[^\]]*\]/;

/** One media slot per market row, in row order (care homes / day services / at home). */
const MEDIA: DevMediaSlot[] = ["robot-company", "robot-daily-help", "robot-staying-in-touch"];

/** Layout breakpoint of robot.com's UnfoldingContent: rows sit side by side above 900, stack at or below it (§3.4). */
const STACK = "(max-width: 900px)";
const SIDE = "(min-width: 900.02px)";

/*
 * Band 9 rules (spec §2 row 9, §3.4, M27–M35). Component-scoped because this band owns no globals.css rules;
 * every colour, radius, duration and easing is a token, the px values are the robot.com measurements.
 * Every selector is scoped under .mkt so the type overrides outrank the single-class .t-* styles whatever the sheet order.
 * Reduced motion: the global rule in globals.css clamps every transition below to 1ms with no delay.
 */
const CSS = `
.mkt .mkt__media { position: relative; width: 100%; min-height: 100%; max-height: 100vh; overflow: hidden; border-radius: var(--radius-xl); aspect-ratio: 740 / 663; }
.mkt .mkt__content { display: flex; gap: var(--space-1); container-type: inline-size; }
.mkt .mkt__row { position: relative; overflow: hidden; border-radius: var(--radius-xl); }
.mkt .mkt__toggle { position: absolute; inset: 0; z-index: 3; margin: 0; padding: 0; border: 0; border-radius: inherit; background: transparent; color: inherit; cursor: pointer; }
.mkt .mkt__toggle:focus-visible { outline-offset: -4px; }
.mkt .mkt__row.is-active .mkt__toggle { pointer-events: none; }
.mkt .mkt__inner { display: flex; flex-direction: column; gap: var(--space-6); width: 100%; padding: var(--space-6); opacity: 0; pointer-events: none; transition: opacity var(--dur-roll) var(--ease-out-cubic); }
.mkt .mkt__row.is-active .mkt__inner { opacity: 1; pointer-events: auto; transition: opacity var(--dur-unfold) var(--ease-out-cubic) 500ms; }
.mkt .mkt__head { display: flex; justify-content: space-between; gap: var(--space-1); }
/* §4 "Title h3 (cards, accordion, trusted-by)": t-title-xl 41 / 1.0 / -0.02em / 600, 26 / 1.06 below 768, pending as a Kurogane style. */
.mkt .mkt__title { font-size: 26px; line-height: 1.06; letter-spacing: -0.02em; }
@media (min-width: 768px) { .mkt .mkt__title { font-size: 41px; line-height: 1; } }
.mkt .mkt__title-clip { display: block; overflow: hidden; padding-bottom: 0.15ch; }
.mkt .mkt__title-move { display: block; transform: translateY(41px); transition: transform var(--dur-reveal) var(--ease-reveal); }
.mkt .mkt__row.is-active .mkt__title-move { transform: none; transition-delay: 450ms; }
/* §2 row 9 / §4 "Body-s (card copy)": p 16/500/18.56 side by side, 14/500/16.24 stacked (.t-body-s at 500, leading pinned to
   robot.com's 1.16 so the stacked open row lands on its 199.56, V32). */
.mkt .mkt__text { max-width: 300px; margin-top: auto; font-size: 14px; line-height: 1.16; font-weight: 500; }
.mkt .mkt__gapped-sentence { display: none; }
.mkt .mkt__cta { position: relative; z-index: 4; width: fit-content; }
.mkt .mkt__preview { position: absolute; top: 0; left: 0; display: flex; flex-direction: row-reverse; width: 100%; border-radius: inherit; }
.mkt .mkt__preview-index, .mkt .mkt__preview-label { pointer-events: none; transition: all var(--dur-roll) var(--ease-out-cubic) 500ms; }
.mkt .mkt__preview-index { z-index: 3; min-width: 20px; margin-top: var(--space-1); margin-left: auto; margin-right: 3px; text-align: center; }
.mkt .mkt__preview-label { z-index: 3; font-weight: 500; opacity: 1; }
.mkt .mkt__row.is-active .mkt__preview-label { opacity: 0; transition-delay: 0s; }
@media ${SIDE} {
  .mkt .mkt__gapped-sentence { display: inline; }
  .mkt .mkt__row { flex: 0 0 57px; transition: flex-grow var(--dur-unfold) var(--ease-unfold); }
  .mkt .mkt__inner { gap: 35px; height: 100%; min-width: calc(100cqw - 2 * 57px - 2 * var(--space-1)); }
  .mkt .mkt__head { padding-right: 40px; }
  .mkt .mkt__head-index { display: none; }
  .mkt .mkt__text { width: 300px; max-width: 100%; font-size: 16px; }
  .mkt .mkt__preview { flex-direction: column; align-items: center; height: 100%; padding: var(--space-6) 14px; }
  /* Latin labels lie sideways and are flipped to read upward like robot.com; JA and ZH stand upright top-down, their native vertical reading. */
  .mkt .mkt__preview-label { display: inline-block; margin-top: auto; writing-mode: vertical-rl; transform: rotate(180deg); }
  .mkt .mkt__preview-label:is(:lang(ja), :lang(zh)) { transform: none; }
  .mkt .mkt__toggle::before { content: ""; position: absolute; inset: 0; z-index: 1; background-color: transparent; transition: background-color var(--dur-roll) var(--ease-out-cubic); }
  /* M34 wash. robot.com: rgba(0,0,0,.5). Ink at 50% is invisible here because --ink and --surface-brand share a value
     in Kurogane light, so the wash is --glass-on-brand, the token for a layer over brand bands. */
  .mkt .mkt__toggle:hover::before { background-color: var(--glass-on-brand); }
}
@media ${STACK} {
  .mkt .mkt__media, .mkt .mkt__content { grid-column: 1 / -1; }
  .mkt .mkt__media { aspect-ratio: 357 / 281; }
  .mkt .mkt__content { flex-direction: column; }
  /* Closed rows are 57 tall, so 2 x --radius-xl (48) renders as a full pill; it tweens to --radius-xl on open (M35). */
  .mkt .mkt__row { height: 57px; border-radius: calc(2 * var(--radius-xl)); transition: height var(--dur-unfold) var(--ease-unfold), border-radius var(--dur-roll) var(--ease-out-cubic); }
  .mkt .mkt__row.is-active { height: var(--open-height, auto); border-radius: var(--radius-xl); }
  .mkt .mkt__preview { align-items: center; height: 54.5px; padding: 0 20px; }
  .mkt .mkt__preview-index { margin-right: var(--space-1); font-size: 26px; }
  .mkt .mkt__row.is-active .mkt__preview-index { opacity: 0; transition-delay: 0s; }
}
`;

export interface MarketsAccordionProps {
  id?: string;
  /** Row open on first render (V29: row 1). */
  initial?: number;
  className?: string;
}

/**
 * Band 9, the markets accordion (spec §2 row 9, §3.4). Grid24: a sunken media figure (span 12, 740/663) and a
 * content column (span 12) holding three brand-coloured rows side by side, the open one growing from 57 to 591
 * over var(--dur-unfold) var(--ease-unfold) (M27) while the old one shrinks; the new inner fades in over 600ms
 * after 500ms (M28), the old out over 300ms (M29); preview label and index per M30/M31; the media crossfades
 * through AnimatePresence over 600ms easeInOut (M32); the title rises 41px on open (M33); a collapsed row darkens
 * on hover (M34). At or below 900 the media stacks above and the rows stack, tapping tweens height 57 to the
 * measured content height and radius 48 to 24 (M35). Single-open: the open row's toggle is inert (V31).
 * Stacked, the open row holds one short p at robot.com's 14/1.16 so the row lands on its 199.56 (V32): a sentence carrying
 * a [GAP] is hidden at ≤900 per the §2 row 9 rule ("drop the gapped sentence, keep the row") and shown side by side.
 * A collapsed row's inner is `inert` once its 300ms fade-out (M29) has ended, and live again before the fade-in (A-9).
 */
export function MarketsAccordion({ id, initial = 0, className }: MarketsAccordionProps) {
  const { t, locale } = useLocale();
  const reduce = usePrefersReducedMotion();
  const uid = useId();
  const rows = t.home.markets.rows;
  const [active, setActive] = useState(() => Math.min(Math.max(initial, 0), rows.length - 1));
  const media = DEV_MEDIA[MEDIA[active] ?? MEDIA[0]];
  // Latin copy needs a space between the two sentences; CJK copy does not.
  const separator = locale === "en" ? " " : "";

  return (
    <Band tone="brand" slab={false} id={id} className={cn("mkt", className)}>
      <style href="markets-accordion" precedence="components">
        {CSS}
      </style>
      <h2 className="sr-only">
        <Copy text={t.home.markets.eyebrow} />
      </h2>
      <Grid24>
        <Col as="figure" span={12} className="mkt__media bg-sunken">
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              /* The old image stays fully opaque under the new one and leaves once the crossfade is over (M32). */
              exit={{ opacity: 0, transition: { duration: 0, delay: reduce ? 0 : 0.6 } }}
              transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}
            >
              <VideoFrame src={media.src} poster={media.poster} label={media.label} ratio="auto" className="h-full rounded-none" />
            </motion.div>
          </AnimatePresence>
        </Col>
        <Col span={12} className="mkt__content">
          {rows.map((row, i) => (
            <Row key={i} index={i} title={row.title} sentences={row.sentences} separator={separator} href={row.href} cta={row.cta} active={i === active} uid={uid} onOpen={() => setActive(i)} />
          ))}
        </Col>
      </Grid24>
    </Band>
  );
}

interface RowProps {
  index: number;
  title: string;
  sentences: readonly string[];
  separator: string;
  href: string;
  cta: string;
  active: boolean;
  uid: string;
  onOpen: () => void;
}

function Row({ index, title, sentences, separator, href, cta, active, uid, onOpen }: RowProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [openHeight, setOpenHeight] = useState<number | null>(null);
  const panelId = `${uid}-panel-${index}`;
  const titleId = `${uid}-title-${index}`;

  // Stacked layout (≤900): the open height is the inner's natural height, measured so the CSS height tween has a target (M35).
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setOpenHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // A-9: the collapsed inner leaves the accessibility tree and the tab order once the M29 fade-out has ended, and
  // is live again in the same render that opens the row (state adjusted during render, before the fade-in).
  const [inert, setInert] = useState(!active);
  const [seenActive, setSeenActive] = useState(active);
  if (seenActive !== active) {
    setSeenActive(active);
    if (active) setInert(false);
  }
  useEffect(() => {
    if (active) return;
    const id = window.setTimeout(() => setInert(true), DUR.roll * 1000);
    return () => window.clearTimeout(id);
  }, [active]);

  const style = { flexGrow: active ? 1 : 0, "--open-height": openHeight ? `${openHeight}px` : undefined } as CSSProperties;

  return (
    <article className={cn("mkt__row on-brand bg-brand text-on-brand", active && "is-active")} style={style}>
      <button
        type="button"
        className="mkt__toggle"
        aria-expanded={active}
        aria-controls={panelId}
        onClick={() => {
          if (!active) onOpen(); // V31: no toggle-close
        }}
      >
        <span className="sr-only">
          <Copy text={title} />
        </span>
      </button>
      <div ref={innerRef} id={panelId} role="region" aria-labelledby={titleId} inert={inert} className="mkt__inner">
        <div className="mkt__head">
          <h3 id={titleId} className="t-title-l mkt__title">
            <span className="mkt__title-clip">
              <span className="mkt__title-move">
                <Copy text={title} />
              </span>
            </span>
          </h3>
          <span className="t-title-l mkt__title mkt__head-index" aria-hidden="true">
            {index + 1}
          </span>
        </div>
        <p className="t-body-s mkt__text text-on-brand-muted">
          {sentences.map((s, i) => (
            <span key={i} className={cn(GAP_MARK.test(s) && "mkt__gapped-sentence")}>
              <Copy text={i === 0 ? s : `${separator}${s}`} />
            </span>
          ))}
        </p>
        <PillLink href={href} label={cta} variant="on-brand" className="mkt__cta" tabIndex={active ? 0 : -1} />
      </div>
      <div className="mkt__preview" aria-hidden="true">
        <span className="t-numeral mkt__preview-index">{index + 1}</span>
        <span className="t-title-s mkt__preview-label">
          <Copy text={title} />
        </span>
      </div>
    </article>
  );
}

"use client";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { MEDIA, type MediaSlot } from "@/lib/media";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/** One clip per time band, in row order: day (tabletop companion), evening (humanoid in the dining room), night (patrol). */
const CLIPS: MediaSlot[] = ["day-companion", "interlude", "night-patrol"];

export interface MarketsAccordionProps {
  id?: string;
  /** Row open on first render. */
  initial?: number;
  className?: string;
}

/**
 * Band 7, a day with Mimamori (2026-09-28; the row list was "where it is used" before the company reframed around its
 * first product). A night slab: the preview clip on the left (span 12, aspect 690/652, radius 16) crossfading over
 * 600ms as the open row changes (M32 kept), and on the right the kicker plus a hairline list: each row a time band and
 * a Coustard title with a gold minus / muted plus, the open row showing its two sentences. One outline pill under the
 * list leads to the Mimamori section of the approach page. Single-open: clicking the open row does nothing (V31).
 * Below 900 the preview sits above the list.
 */
export function MarketsAccordion({ id = "day", initial = 0, className }: MarketsAccordionProps) {
  const { t, locale } = useLocale();
  const reduce = usePrefersReducedMotion();
  const uid = useId();
  const { eyebrow, rows, cta } = t.home.day;
  const [active, setActive] = useState(() => Math.min(Math.max(initial, 0), rows.length - 1));
  const media = MEDIA[CLIPS[active] ?? CLIPS[0]];
  const separator = locale === "en" ? " " : "";
  const titleClass = locale === "en" ? "t-display-m" : "t-jp-display";

  return (
    <Band tone="night" id={id} className={className} slabClassName="bg-night-shade p-5 md:p-6">
      <Grid24 className="gap-y-6">
        <Col as="figure" span={12} className="relative overflow-hidden rounded-lg bg-night-raised" style={{ aspectRatio: "690 / 652" }}>
          <AnimatePresence initial={false}>
            <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0, delay: reduce ? 0 : 0.6 } }} transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}>
              <VideoFrame src={media.src} poster={media.poster} label={media.label} ratio="auto" className="h-full rounded-none" />
            </motion.div>
          </AnimatePresence>
        </Col>
        <Col span={11} start={14} className="flex flex-col">
          <h2 className="font-display mb-4 text-on-brand-muted" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>
            <Copy text={eyebrow} />
          </h2>
          <ul className="border-t border-night-hairline">
            {rows.map((row, i) => {
              const open = i === active;
              const panelId = `${uid}-panel-${i}`;
              return (
                <li key={i} className="border-b border-night-hairline">
                  <h3>
                    <button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setActive(i)} className={cn("flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left", open && "cursor-default")}>
                      <span className="flex flex-col gap-1">
                        <span className="t-caption text-on-brand-muted tabular-nums">{row.time}</span>
                        <span lang={locale} className={cn(titleClass, "text-on-brand")}>
                          <Copy text={row.title} />
                        </span>
                      </span>
                      <span aria-hidden="true" className={cn("font-display shrink-0 pt-1", open ? "text-leaf-gold" : "text-on-brand-muted")} style={{ fontSize: 28, lineHeight: 1 }}>
                        {open ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div id={panelId} role="region" hidden={!open} className="pb-6">
                    <p className="t-body max-w-[560px] text-on-brand-muted">
                      {row.sentences.map((s, j) => (
                        <Copy key={j} text={j === 0 ? s : `${separator}${s}`} />
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <PillLink href={`/${locale}/approach/#mimamori`} label={cta} variant="outline-on-brand" className="mt-6 self-start" />
        </Col>
      </Grid24>
    </Band>
  );
}

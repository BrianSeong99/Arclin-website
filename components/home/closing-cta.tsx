"use client";
import Link from "next/link";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";
import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Band } from "@/components/home/band";
import { Copy } from "@/components/site/copy";

/* Word scrub timing, spec §5 M6 (same rule as M5): each word tweens opacity .3 → 1 over 150ms, words start
   100ms apart (power2.out), so the six-word line is a 650ms tween scrubbed by scroll from "slab top at viewport
   bottom" (robot.com scrollY 4858) to "slab top at 25% of the viewport" (5533). M7: the scrub catches up over
   1s on an expo-out curve. The pill's words are the static ones and stay at 1. */
const WORD_MS = 0.15;
const STAGGER_MS = 0.1;
/* M6's measured rest opacity. At .3 the words sit at 1.8:1 on --highlight (axe colour-contrast, A-6): an accepted deviation,
   because the acceptance bar is robot.com's scrub. The slab is below the fold at load, every word reaches 1 as the slab
   enters (the rest state is never the reading state), and reduced motion renders the line static at 1. */
const RESTING = 0.3;
const SCRUB_S = 1;
const SCROLL_OFFSET: ["start end", "start 25%"] = ["start end", "start 25%"];

/* §4 row "CTA h3 (text-small)": robot.com 38/600/41.8/-0.76 from 768 up and 26/1.06 below (`.text-small .title-h3`).
   Kurogane's nearest style is .t-title-l 30/1.25/600 and §4 calls for a new t-title-xl at 38/1.1, which globals.css
   does not have yet, so the size is set here: 26px at 390, 38px at 768 and above (4.95vw reaches 38 at 768). */
const CTA_TYPE: CSSProperties = { fontSize: "clamp(26px, 4.95vw, 38px)", lineHeight: 1.1 };

/** Matches `[GAP: …]` / `[PLACEHOLDER…]` so a marker stays one word. */
const MARKER = /(\[(?:GAP:|PLACEHOLDER)[^\]]*\])/;

/**
 * Split a copy string into scrub words (the `.word` spans GSAP SplitText makes on robot.com).
 * Latin: whitespace-separated. CJK: dictionary words from Intl.Segmenter, with punctuation glued to the
 * word before it so "ます。" is one word. Same rule as the statement band so both scrubs read alike.
 */
function splitWords(text: string, lang: string, cjk: boolean): string[] {
  const words: string[] = [];
  for (const part of text.split(MARKER)) {
    if (!part) continue;
    if (MARKER.test(part)) {
      words.push(part);
      continue;
    }
    if (cjk && typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const seg = new Intl.Segmenter(lang, { granularity: "word" });
      for (const s of seg.segment(part)) {
        if (!s.isWordLike && words.length) words[words.length - 1] += s.segment;
        else if (s.segment.trim()) words.push(s.segment);
      }
    } else if (cjk) {
      words.push(...Array.from(part).filter((c) => c.trim()));
    } else {
      for (const w of part.split(/\s+/)) if (w) words.push(w);
    }
  }
  return words;
}

/** power2.out, the per-word ease in M6. */
const power2Out = (x: number) => 1 - (1 - x) * (1 - x);

/** Opacity of word `index` of `count` at scrub progress `p` (0 = slab top at viewport bottom, 1 = at 25%). */
function wordOpacity(p: number, index: number, count: number): number {
  const total = WORD_MS + STAGGER_MS * (count - 1);
  const local = (p * total - index * STAGGER_MS) / WORD_MS;
  const x = Math.min(1, Math.max(0, local));
  return RESTING + (1 - RESTING) * power2Out(x);
}

function Word({ text, index, count, progress }: { text: string; index: number; count: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (p) => wordOpacity(p, index, count));
  return (
    <motion.span className="word inline-block" style={{ opacity }}>
      <Copy text={text} />
    </motion.span>
  );
}

/**
 * The scrubbed line. Scroll progress is measured on the slab (`target`), then smoothed the way GSAP's
 * `scrub: 1` does it (M7): every change re-targets a 1s expo-out tween on `smooth`, and the per-word
 * opacities derive from `smooth`. Words are inline-block so a word never breaks internally.
 */
function ScrubWords({ target, words, cjk }: { target: RefObject<HTMLElement | null>; words: string[]; cjk: boolean }) {
  const { scrollYProgress } = useScroll({ target, offset: SCROLL_OFFSET });
  const smooth = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    animate(smooth, v, { duration: SCRUB_S, ease: EASE.expoOut });
  });

  // A page opened mid-scroll starts at its end state instead of fading in (GSAP snaps the scrub on refresh).
  useEffect(() => {
    const id = requestAnimationFrame(() => smooth.jump(scrollYProgress.get()));
    return () => cancelAnimationFrame(id);
  }, [smooth, scrollYProgress]);

  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          {i > 0 && !cjk && " "}
          <Word text={w} index={i} count={words.length} progress={smooth} />
        </span>
      ))}
    </>
  );
}

/**
 * The inline CTA pill (§3.3 ButtonPill at 11px 13px, 128x41 on robot.com). The slab around it is the link,
 * so this is a presentational span with the pill's two stacked label copies; `.pill-hover-parent` on the slab
 * rolls them on hover anywhere in the slab (M22). The label is read once as part of the link's name.
 */
function InlinePill({ label }: { label: string }) {
  return (
    <span className="pill t-label pill--on-page pill--inline align-middle">
      <span className="pill__track">
        <span className="pill__label">
          <Copy text={label} />
        </span>
        <span className="pill__label" aria-hidden="true">
          <Copy text={label} />
        </span>
      </span>
    </span>
  );
}

/**
 * Band 11, the closing CTA (spec §2 row 11, §3.3, M6, M7, V25): the whole highlight slab is one link to
 * /{locale}/contact/, radius --radius-xl, padding 26px 24px 125px (20px sides and 200 below at <768, as
 * robot.com's `.contact-cta` sets), holding one h3 that runs home.closing.line and ends in an inline ink
 * pill labelled home.closing.cta. The line's words rest at opacity .3 of --on-highlight and light up one by
 * one as the slab scrolls up (M6); the pill's words stay at 1. Hovering anywhere on the slab rolls the pill
 * label (§3 interaction note). Reduced motion: every word static at opacity 1, no scrub, no roll.
 */
export function ClosingCta({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const reduce = usePrefersReducedMotion();
  const slab = useRef<HTMLAnchorElement>(null);
  const cjk = locale === "ja" || locale === "zh";
  const line = t.home.closing.line;
  const words = splitWords(line, locale, cjk);

  return (
    // `.on-highlight` on the section so the link's focus ring is --on-highlight on the yellow (globals.css).
    <Band tone="highlight" id="closing" slab={false} className={cn("on-highlight", className)}>
      <Link
        ref={slab}
        href={`/${locale}/contact/`}
        className="pill-hover-parent block overflow-hidden rounded-xl bg-highlight px-5 pt-5 pb-50 text-on-highlight md:px-6 md:pt-6.5 md:pb-31.25"
      >
        <h3 lang={locale} className="t-title-l" style={CTA_TYPE}>
          {reduce ? <Copy text={line} /> : <ScrubWords target={slab} words={words} cjk={cjk} />} <InlinePill label={t.home.closing.cta} />
        </h3>
      </Link>
    </Band>
  );
}

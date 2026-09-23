"use client";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type RefObject } from "react";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";
import { DEV_MEDIA } from "@/lib/dev-media";
import { useLocale } from "@/lib/i18n/context";
import { Band } from "@/components/home/band";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";

/* Word scrub timing, spec §5 M5: each word tweens opacity .3 → 1 over 150ms, words start 100ms apart
   (power2.out), and the whole tween is scrubbed by scroll from "slab top at viewport bottom" to
   "slab top at 25% of the viewport". M7: the scrub catches up over 1s on an expo-out curve. */
const WORD_MS = 0.15;
const STAGGER_MS = 0.1;
const RESTING = 0.3;
const SCRUB_S = 1;
const SCROLL_OFFSET: ["start end", "start 25%"] = ["start end", "start 25%"];

/** Matches `[GAP: …]` / `[PLACEHOLDER…]` so a marker stays one word. */
const MARKER = /(\[(?:GAP:|PLACEHOLDER)[^\]]*\])/;

/**
 * Split a copy string into scrub words (the `.word` spans GSAP SplitText makes on robot.com).
 * Latin: whitespace-separated. CJK: dictionary words from Intl.Segmenter, with punctuation and
 * other non-word segments glued to the word before them so "です。" is one word.
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

/** power2.out, the per-word ease in M5. */
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
 * The scrubbed sentence. Scroll progress is measured on the slab (`target`), then smoothed the way
 * GSAP's `scrub: 1` does it (M7): every change re-targets a 1s expo-out tween on `smooth`, and the
 * per-word opacities derive from `smooth`. Words are inline-block so a word never breaks internally.
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
 * Band 5, the statement slab (spec §2 row 5, §3, M5, M7, V24): a brand slab, radius --radius-xl,
 * padding 26px 24px 300px (20px sides, 200 below at <768), holding one h3 that runs the two safety
 * sentences (home.safety.sentences). No CTA: robot.com's band 5 has none (§2 row 5, interaction "None") and the
 * spec's Arclin mapping for the slab is the scrubbed sentence only (S05-1).
 * A 200x151.58 (118 wide at <768) rounded frame floats at the start of line 1 like robot.com's
 * inline image; it shows the robot-company clip in dev media mode and the pending frame otherwise.
 * Words rest at opacity .3 of --on-brand and light up per word as the slab scrolls up (M5).
 * Reduced motion: every word static at opacity 1, no scrub (usePrefersReducedMotion, so the server tree and the
 * first client render agree; A-2).
 */
export function Statement({ className }: { className?: string }) {
  const { locale, t } = useLocale();
  const reduce = usePrefersReducedMotion();
  const slab = useRef<HTMLDivElement>(null);
  const cjk = locale === "ja" || locale === "zh";
  const [first, second] = t.home.safety.sentences;
  const words = [...splitWords(first, locale, cjk), ...splitWords(second, locale, cjk)];
  const media = DEV_MEDIA["robot-company"];
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1";

  return (
    <Band
      tone="brand"
      id="statement"
      className={className}
      /* §2 row 5 slab heights: 1430x497.56 at 1440, 380x402 at 390 (34.55vw = 497.5 at 1440). robot.com's three 57.2px lines set
         them; this floor keeps the band's height, and band 6's pin start at 1161 (V26), while the copy is shorter than three lines. */
      slabStyle={{ minHeight: "clamp(402px, 34.55vw, 497.56px)" }}
    >
      <div ref={slab} className="px-5 pt-5 pb-50 md:px-6 md:pt-6.5 md:pb-75">
        {/* robot.com's inline image: floats so line 1 starts beside it and later lines run under it. */}
        <div className="float-left mr-5 mb-2 w-29.5 md:mr-8 md:w-50">
          <VideoFrame src={dev ? media.src : undefined} poster={dev ? media.poster : undefined} label={media.label} ratio="200 / 151.58" className="rounded-md" />
        </div>
        {/* §4 row "Statement slab h3": .t-statement clamp(28px,3.6vw,52px)/1.15/500/-0.02em; robot.com 52/600/57.2/-1.04.
            The leading is pinned to robot.com's 1.1 (57.2 at 52px) so the slab is 497.56 tall and band 6 starts at 1161 (V26). */}
        <h3 lang={locale} className="t-statement text-on-brand" style={{ lineHeight: 1.1 }}>
          {reduce ? (
            <>
              <Copy text={first} />
              {!cjk && " "}
              <Copy text={second} />
            </>
          ) : (
            <ScrubWords target={slab} words={words} cjk={cjk} />
          )}
        </h3>
      </div>
    </Band>
  );
}

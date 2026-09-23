"use client";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Copy } from "@/components/site/copy";

/** Split a copy string into tokens the browser may wrap between; a [GAP]/[PLACEHOLDER] marker stays one token. */
const MARKER = /(\[(?:GAP:|PLACEHOLDER)[^\]]*\])/;

function tokenise(text: string, lang?: string): string[] {
  const out: string[] = [];
  for (const part of text.split(MARKER)) {
    if (!part) continue;
    if (MARKER.test(part)) {
      out.push(part);
      continue;
    }
    // Latin: words. CJK: dictionary words via Intl.Segmenter when available, characters otherwise.
    const cjk = lang === "ja" || lang === "zh";
    if (cjk && typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const seg = new Intl.Segmenter(lang, { granularity: "word" });
      for (const s of seg.segment(part)) out.push(s.segment);
    } else if (cjk) {
      out.push(...Array.from(part));
    } else {
      for (const w of part.split(/(\s+)/)) if (w) out.push(w);
    }
  }
  return out;
}

export interface RevealHeadingProps {
  /** A copy string from useLocale().t. Explicit "\n" forces a line break; [GAP] markers render through <Copy>. */
  text: string;
  as?: ElementType;
  /** The .t-* type class. */
  className?: string;
  lang?: string;
  id?: string;
  style?: CSSProperties;
  /** Seconds before line 1 moves; each further line adds 0.1s (M4: .15s + .1s x n). */
  baseDelay?: number;
}

/**
 * Heading line reveal (spec §5 M4/M9). The text is measured after layout, grouped into visual lines,
 * and each line rises inside an overflow-hidden wrapper from translateY(100%) over var(--dur-reveal)
 * var(--ease-reveal), staggered .15s + .1s x n, once the heading is half in view (IntersectionObserver .5).
 * Opacity stays 1 throughout. Reduced motion: rendered static, no wrappers, from the first client render after mount
 * (the server markup is the token list either way, so hydration matches; A-2).
 * Lines are re-measured on resize; a revealed heading re-renders straight into its end state.
 */
export function RevealHeading({ text, as: Tag = "h2", className, lang, id, style, baseDelay = 0.15 }: RevealHeadingProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<string[][] | null>(null);
  const [inView, setInView] = useState(false);

  const paragraphs = text.split("\n");
  const tokens = paragraphs.flatMap((p, i) => (i === 0 ? tokenise(p, lang) : ["\n", ...tokenise(p, lang)]));

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-tok]"));
    const grouped: string[][] = [];
    // A token joins the current line when its vertical centre falls inside that line's box. Comparing tops with a
    // 1px tolerance broke on [GAP] marks: their inline-block box is shorter than the text's, so their top differs
    // from the text beside them and each mark became a line of its own (S04-1). The line box is set by its first
    // token and widened by every token that joins it.
    let line: { top: number; bottom: number } | null = null;
    for (const span of spans) {
      const tok = span.dataset.tok ?? "";
      const rect = span.getBoundingClientRect();
      const mid = (rect.top + rect.bottom) / 2;
      if (line && mid >= line.top && mid < line.bottom) {
        grouped[grouped.length - 1].push(tok);
        line.top = Math.min(line.top, rect.top);
        line.bottom = Math.max(line.bottom, rect.bottom);
      } else {
        grouped.push([tok]);
        line = { top: rect.top, bottom: rect.bottom };
      }
    }
    // Drop whitespace that ended up at a line edge; it would be invisible anyway.
    setLines(grouped.map((l) => l.filter((t, i) => !(/^\s+$/.test(t) && (i === 0 || i === l.length - 1)))).filter((l) => l.length));
  }, []);

  // Phase 1 renders every token inline; this runs before paint and swaps in the line wrappers.
  useLayoutEffect(() => {
    if (reduce || lines) return;
    measure();
  }, [reduce, lines, measure]);

  // Re-measure when the heading's width changes (font load, viewport).
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let width = el.getBoundingClientRect().width;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      if (Math.abs(w - width) < 1) return;
      width = w;
      setLines(null);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduce]);

  // Trigger once at threshold .5.
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

  // Reset the measured lines when the copy or language changes.
  const key = `${text}\u0000${lang ?? ""}`;
  const [prevKey, setPrevKey] = useState(key);
  if (prevKey !== key) {
    setPrevKey(key);
    setLines(null);
  }

  if (reduce) {
    return (
      <Tag ref={ref} id={id} lang={lang} className={className} style={style}>
        {paragraphs.map((p, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            <Copy text={p} />
          </Fragment>
        ))}
      </Tag>
    );
  }

  if (!lines) {
    return (
      <Tag ref={ref} id={id} lang={lang} className={className} style={style}>
        {tokens.map((tok, i) =>
          tok === "\n" ? (
            <br key={i} />
          ) : (
            <span key={i} data-tok={tok}>
              <Copy text={tok} />
            </span>
          ),
        )}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} id={id} lang={lang} className={cn(className, inView && "is-in")} style={style}>
      {lines.map((line, n) => (
        <span key={n} className="reveal-line">
          <span className="reveal-line__inner" style={{ transitionDelay: `${baseDelay + 0.1 * n}s` }}>
            {line.map((tok, i) => (
              <Copy key={i} text={tok} />
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}

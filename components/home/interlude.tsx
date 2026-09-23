"use client";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Band, Col, Grid24 } from "@/components/home/band";
import { PillLink } from "@/components/home/pill";
import { RevealHeading } from "@/components/home/reveal-heading";
import { useLenis } from "@/components/home/smooth-scroll";
import { Copy } from "@/components/site/copy";
import { VideoFrame } from "@/components/site/video-frame";
import { DEV_MEDIA } from "@/lib/dev-media";
import { useLocale } from "@/lib/i18n/context";
import { DUR, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** M10: the background travels −3rem → +3rem (robot.com's 10px rem) across one viewport height, clamped beyond. */
const PARALLAX_PX = 30;

const clamp = (min: number, v: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Band 10, interlude video (spec §2 row 10, §3.5, M10, M36, M37, V33, V34).
 *
 * Slab: full width inside the 5px gutter, --surface-brand, radius --radius-xl, overflow hidden. Its height follows
 * robot.com: at ≥768 the 3:2 background image sets it (758x505.67), capped at 100vh (1430x900 at 1440x900); below 768
 * it is a centred column at least one viewport tall (380x839.77 at 390x844). The background media is <VideoFrame>
 * at scale 1.1 (1573x990) with the M10 parallax on top of the scale.
 *
 * Overlay (≥768): the 24-column grid fills the slab; h2 absolute top-left at (24, 24); contentInner bottom-anchored
 * (margin-top auto, margin-bottom 38) as a flex row gap 16 — title column (h3 right-aligned, fit-content) + text
 * column 447 (p, then the outline pill 20 below its 12px padding). At ≥1200 contentInner is grid cols 11 / span 13
 * at width 100% (772.75); at 768–1199 it is fit-content from column 2. Below 768 the slab is a flex column, gap 24:
 * thumb, h2 (padding-bottom 24), h3 (margin-bottom 24), p, pill, all inside 24px padding.
 *
 * Thumb: grid col 9 / span 8 (474x331.41 at 1440, 250x174.78 at 768), aspect 492/344, radius 24, vertically centred
 * at ≥768 (absolute top 50%, translateY(-50%)); 332x232.13 in flow at 390. A 40x40 radius-6 play box sits 17px from
 * the bottom-right. Hover (M36): image scale 1 → 1.05, play box background and icon colour, each 300ms --ease-roll.
 *
 * Lightbox (M37, V34): fixed inset 0, z 1000, brand at 60% (robot.com rgba(0,0,0,.6)), padding 3.8vw (20px on
 * phones); the wrapper stays in the DOM and fades 0 → 1 over 300ms --ease-roll. Inside, a 16/9 container radius 24
 * sized to the viewport minus the padding, holding a native <video controls playsinline autoplay> (dev media only;
 * otherwise the pending frame). A 40x40 close control sits at (20, 20) from the top-right; Escape and the scrim
 * close it; focus is trapped and returned to the thumb; Lenis is stopped while open. The wrapper is `inert` while
 * closed, so the tab order never enters it (A-1). The click handler writes the wrapper's opacity inline before React
 * renders, so the 300ms fade starts on the click's own frame; the layout-heavy work (Lenis stop, overflow, focus, the
 * video mount) waits one frame so it never delays the fade's first frame (V34).
 *
 * Reduced motion (§5): the heading renders static (RevealHeading), the parallax is 0, and the global ≤1ms transition
 * rule covers the hover and the lightbox fade.
 */
export function Interlude() {
  const { locale, t } = useLocale();
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1";
  const reduce = usePrefersReducedMotion();
  const lenis = useLenis();
  const media = DEV_MEDIA.interlude;
  const dialogId = useId();

  /* ---- M10 parallax: y = 30px x (scrollY − slabTop) / viewportHeight, clamped to ±30. ---- */
  const anchorRef = useRef<HTMLDivElement>(null);
  const box = useRef({ top: 0, vh: 1 });
  const tick = useMotionValue(0);
  const { scrollY } = useScroll();
  const y = useTransform([scrollY, tick], ([v]: number[]) => {
    const { top, vh } = box.current;
    return clamp(-PARALLAX_PX, (PARALLAX_PX * (v - top)) / vh, PARALLAX_PX);
  });

  useEffect(() => {
    if (reduce) return;
    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      box.current = { top: el.getBoundingClientRect().top + window.scrollY, vh: window.innerHeight || 1 };
      tick.set(tick.get() + 1);
    };
    measure();
    window.addEventListener("resize", measure);
    // Content above the band (accordion, fonts) changes its page offset without a resize.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [reduce, tick]);

  /* ---- M37 lightbox ---- */
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thumbRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // V34: the wrapper is always in the DOM at opacity 0 with the transition declared, and the handler writes the target
  // opacity inline in the click's own task, before React renders, so the fade is queued for the very next frame. The
  // render writes the same value, so the two never disagree.
  const openLightbox = useCallback(() => {
    if (dialogRef.current) dialogRef.current.style.opacity = "1";
    setOpen(true);
  }, []);
  const closeLightbox = useCallback(() => {
    if (dialogRef.current) dialogRef.current.style.opacity = "0";
    setOpen(false);
  }, []);

  // While open: Lenis stopped (html.lenis-stopped clips overflow); native overflow hidden covers reduced motion, where
  // Lenis never runs. Escape closes from anywhere. Focus moves to the close control and returns to the thumb after.
  // Everything that forces layout (the Lenis class, the overflow swap, the focus move, the video mount) waits one
  // frame, so the fade's first frame carries only the opacity change (V34).
  useEffect(() => {
    if (!open) return;
    const thumb = thumbRef.current;
    const html = document.documentElement;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    let prevOverflow: string | null = null;
    const id = requestAnimationFrame(() => {
      setMounted(true);
      lenis?.stop();
      prevOverflow = html.style.overflow;
      html.style.overflow = "hidden";
      closeRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
      if (prevOverflow !== null) {
        html.style.overflow = prevOverflow;
        lenis?.start();
      }
      thumb?.focus();
    };
  }, [open, lenis, closeLightbox]);

  // The wrapper stays in the DOM (robot.com); only the video mounts and unmounts, once the fade-out has finished.
  useEffect(() => {
    if (open || !mounted) return;
    const id = window.setTimeout(() => setMounted(false), DUR.roll * 1000 + 50);
    return () => window.clearTimeout(id);
  }, [open, mounted]);

  // Tab cycles inside the open dialog. The scrim (tabindex -1) is not a stop, so it never joins the cycle (A-1).
  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !open || !dialogRef.current) return;
    const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([tabindex='-1']), video, [href], [tabindex]:not([tabindex='-1'])")).filter((n) => !n.hasAttribute("disabled"));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const headingClass = locale === "en" ? "t-display-m" : "t-jp-display";

  return (
    <>
      <Band
        tone="brand"
        id="interlude"
        /* §2 row 10: ≥768 the 3:2 image sets the height, capped at 100vh (900 at 1440x900; 505.67 at 768). Below 768 a centred
           column, gap 24, padding 24 0, at least one viewport tall (robot.com 839.77 at 390x844, see deviations). */
        slabClassName="flex min-h-screen flex-col justify-center gap-6 py-6 md:block md:aspect-3/2 md:max-h-screen md:min-h-0 md:w-full md:py-0"
      >
        {/* Untransformed anchor: measures the slab's page offset for the parallax. */}
        <div ref={anchorRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* §2 row 10: background media at scale 1.1 (1573x990), M10 translateY on top; radius 0, the clip comes from the slab. */}
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: reduce ? 0 : y, scale: 1.1 }}>
            <VideoFrame src={media.src} poster={dev ? media.poster : undefined} ratio="auto" label={media.label} className="absolute inset-0 rounded-none" />
          </motion.div>
        </div>

        {/* Scrim. robot.com's background image is dark by nature; ours is whatever clip is supplied, so brand at 60% keeps the
            --on-brand copy at 4.5:1 over any footage. With no media the pending frame is --surface-sunken and the scrim goes
            opaque (even at 94% the frame's own pending label ghosted through the h2 at 390). */}
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", dev ? "bg-brand/60" : "bg-brand")} />

        {/* §2 row 10 thumb wrapper: in flow (padding 0 24) below 768; absolute, vertically centred at ≥768. */}
        <div className="relative z-2 px-6 md:absolute md:top-1/2 md:left-0 md:w-full md:-translate-y-1/2 md:px-0">
          <Grid24>
            <Col start={9} span={8}>
              {/* §3.5 thumb: aspect 492/344, radius 24, brand background; the whole frame is the play control. */}
              <button
                ref={thumbRef}
                type="button"
                className="group relative block w-full overflow-hidden rounded-xl bg-brand"
                style={{ aspectRatio: "492 / 344" }}
                aria-label={media.label}
                aria-haspopup="dialog"
                aria-controls={dialogId}
                aria-expanded={open}
                onClick={openLightbox}
              >
                {/* M36: the image scales 1 → 1.05 over --dur-roll --ease-roll on hover. */}
                <span className="absolute inset-0 block transition-transform duration-roll ease-roll will-change-transform group-hover:scale-105">
                  {dev ? (
                    <Image src={media.poster} alt="" fill className="object-cover" />
                  ) : (
                    <VideoFrame label={media.label} ratio="auto" className="absolute inset-0 rounded-none" />
                  )}
                </span>
                {/* §3.5 play box: 40x40, radius 6, 17px from bottom/right, brand with an on-brand glyph; hover inverts (M36). */}
                <span
                  aria-hidden="true"
                  className="absolute flex items-center justify-center bg-brand text-on-brand transition-colors duration-roll ease-roll group-hover:bg-on-brand group-hover:text-brand"
                  style={{ width: 40, height: 40, right: 17, bottom: 17, borderRadius: 6, paddingLeft: 2 }}
                >
                  {/* §3.5: 11x15 triangle drawn at 14 wide, fill currentColor. */}
                  <svg viewBox="0 0 11 15" style={{ width: 14 }} fill="currentColor">
                    <path d="M0.906 14.407 10.302 7.978a.57.57 0 0 0 0-.956L.906.593A.6.6 0 0 0 0 1.071V13.93a.6.6 0 0 0 .906.478Z" />
                  </svg>
                </span>
              </button>
            </Col>
          </Grid24>
        </div>

        {/* §2 row 10 ContentOverlay_wrapper: absolute z2 over the slab at ≥768 (pointer-events none, so the thumb underneath
            stays clickable; the h2 and contentInner opt back in); in flow below. */}
        <div className="relative z-2 md:pointer-events-none md:absolute md:inset-0">
          <Grid24 className="relative h-full">
            {/* §4 interlude h2 row: 38/600 Yellix → .t-display-m (en) / .t-jp-display (ja, zh). Absolute at (24, 24) from ≥768
                with max-width 300 (robot.com ≤1200) and 404 at ≥1024 (robot.com 403 at ≥1200, see deviations); in flow with
                padding 24 below 768. Line reveal per M4/M9, static under reduced motion. */}
            <div className="pointer-events-auto relative z-2 col-span-full px-6 pb-6 md:absolute md:top-6 md:left-6 md:max-w-75 md:p-0 lg:max-w-101">
              <RevealHeading as="h2" lang={locale} className={headingClass} text={t.home.interlude.line} />
            </div>

            {/* §2 row 10 contentInner: bottom-anchored flex row gap 16, margin-bottom 38. Cols 11 / span 13 at width 100% from
                ≥1024 (robot.com ≥1200); fit-content from column 2 at 768–1023; block with padding 24 below 768. */}
            <div
              className="pointer-events-auto col-span-full flex flex-col px-6 md:col-start-2 md:col-end-25 md:mt-auto md:w-fit md:flex-row md:gap-4 md:px-0 lg:col-start-11 lg:col-end-24 lg:w-full"
              /* §2 row 10: contentInner margin-bottom 3.8rem = 38px (pill bottom at 862 of 900). */
              style={{ marginBottom: 38 }}
            >
              {/* §2 row 10 title column: flex 1 (309.8 at 1440), max-width 240 below 1200; h3 fit-content, right-aligned. */}
              <div className="mb-6 w-full max-w-60 md:mb-4 md:flex-1 lg:max-w-none">
                {/* §4 title h4 row: 24/600/24 → .t-title-m (23/1.3). */}
                <h3 className="t-title-m ml-auto w-fit">
                  <Copy text={t.common.pageLabels.deployment} />
                </h3>
              </div>
              {/* §2 row 10 text column: 447 wide from ≥768 (448 here, see deviations), auto below. */}
              <div className="w-full md:w-112 md:shrink-0">
                {/* §4 interlude p row: 14/500/15.4 → .t-body-s at 500; padding-bottom 12 (robot.com ContentOverlay_text). */}
                <p className="t-body-s pb-3 font-medium">
                  <Copy text={t.deployment.hero.line} />
                </p>
                {/* §3.3 white-outline pill → outline-on-brand; content-spacers p + pill: margin-top 20. */}
                <PillLink href={`/${locale}/deployment/`} label={t.home.interlude.cta} variant="outline-on-brand" className="mt-5" />
              </div>
            </div>
          </Grid24>
        </div>
      </Band>

      {/* §3.5 / M37 lightbox: fixed inset 0, z 1000, brand at 60% (robot.com rgba(0,0,0,.6)); padding 3.8vw (54.72 at 1440),
          20px on phones; opacity 0 → 1 over --dur-roll --ease-roll; stays in the DOM. */}
      <div
        ref={dialogRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label={media.label}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={open ? trapFocus : undefined}
        className={cn(
          "fixed inset-0 z-1000 flex items-center justify-center bg-brand/60 transition-opacity duration-roll ease-roll",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        /* Opacity is inline so the click handler can write it before React renders (V34). */
        style={{ "--video-padding": "max(20px, 3.8vw)", padding: "var(--video-padding)", opacity: open ? 1 : 0 } as CSSProperties}
      >
        {/* Scrim: robot.com's VideoEmbed_overlay, cursor pointer, closes on click. */}
        <button type="button" tabIndex={-1} aria-label={t.common.dismiss} className="absolute inset-0 cursor-pointer" onClick={closeLightbox} />
        {/* §3.5 VideoEmbed_container: 16/9, width min(100%, (100svh − 2 x padding) x 16/9), radius 24 (1330.6x748.4 at 1440x900). */}
        <div
          className="relative mx-auto aspect-video overflow-hidden rounded-xl bg-brand"
          style={{ width: "min(100%, (100svh - var(--video-padding) * 2) * 1.7777777778)", maxHeight: "calc(100svh - var(--video-padding) * 2)" }}
        >
          {mounted &&
            (dev ? (
              <video controls playsInline autoPlay preload="auto" poster={media.poster} aria-label={media.label} className="size-full object-cover">
                <source src={media.src} />
              </video>
            ) : (
              <VideoFrame label={media.label} ratio="auto" className="absolute inset-0 rounded-none" />
            ))}
        </div>
        {/* §3.5 close control: 40x40 at (20, 20) from the top-right, on-brand glyph (robot.com's 30px "×" drawn as a 26px
            stroke icon, see deviations); hover scale 1.3 over 200ms. */}
        <button
          ref={closeRef}
          type="button"
          aria-label={t.common.dismiss}
          onClick={closeLightbox}
          className="absolute flex cursor-pointer items-center justify-center text-on-brand transition-transform ease-enter hover:scale-130"
          style={{ top: 20, right: 20, width: 40, height: 40, transitionDuration: "200ms" }}
        >
          <X aria-hidden="true" size={26} strokeWidth={1.75} />
        </button>
      </div>
    </>
  );
}

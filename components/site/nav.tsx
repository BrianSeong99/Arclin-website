"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { useLocale } from "@/lib/i18n/context";
import { locales, STORAGE_KEY, type Locale } from "@/lib/i18n";
import { NAV } from "@/lib/site";
import { DUR, EASE, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PillLink } from "@/components/home/pill";
import { getHeaderTheme, startBandTheme, subscribeHeaderTheme, type HeaderTheme } from "@/components/home/band-theme";
import { useLenis } from "@/components/home/smooth-scroll";
import { Copy } from "./copy";
import { Wordmark } from "./wordmark";

const LOCALE_SHORT: Record<Locale, string> = { ja: "JA", en: "EN", zh: "ZH" };

/** Bar height at rest (spec §3.1: 368x48; the menu tweens the height, never the width). */
const BAR_H = 48;

/**
 * Colour transition on the links, locale pill and toggle: 350ms expo-out on the theme swap (M14). Only the ink (and
 * the pill's border and fill) tween: Tailwind's `transition-colors` also lists outline-color, which made the focus ring
 * fade in over 350ms instead of snapping to its token (V39, A-7).
 */
const INK_SWAP = "duration-350 ease-expo-out";
const INK_SWAP_STYLE: CSSProperties = { transitionProperty: "color" };
const PILL_SWAP_STYLE: CSSProperties = { transitionProperty: "color, background-color, border-color" };

/** Skip-link geometry (§3.9): fixed (24, 32), 48 tall like the header CTA, radius --radius-xl. */
const SKIP_H = 48;

/**
 * The skip link (§3.9, M39, V38): the first focusable on the page, so it renders before the announcement bar (A-3).
 * At rest translated up 1px at opacity 0; on focus a brand pill at fixed (24, 32), 48 tall, revealed with a 200ms
 * ease-in-out transform. Its ring is --focus-ring-inverse (on-brand), which vanished against the highlight
 * announcement bar behind it at scrollY 0 (A-8): a --surface-brand halo under the ring keeps it legible there.
 * Enter moves focus to <main id="main" tabindex="-1">.
 */
export function SkipLink() {
  const { t } = useLocale();
  return (
    <a
      href="#main"
      className="on-brand t-label pointer-events-auto fixed left-6 top-8 z-10000 inline-flex -translate-y-px items-center rounded-xl bg-brand px-5 font-medium text-on-brand opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100"
      style={{
        height: SKIP_H,
        transition: "transform 200ms ease-in-out" /* M39: 200ms has no token */,
        boxShadow: "0 0 0 6px var(--surface-brand)" /* A-8: fills under the 2px ring at its 3px offset */,
      }}
    >
      <Copy text={t.common.skip} />
    </a>
  );
}

export interface NavProps {
  /**
   * Theme for the server render and first paint, before the band observer resolves one.
   * Pass "brand" on pages whose first band is a brand slab (the homepage hero), so the static HTML does not flash.
   */
  initialTheme?: HeaderTheme;
  /**
   * Render the skip link inside the header. Pages that put <SkipLink> before an announcement bar pass false
   * so the link stays the first Tab stop (A-3).
   */
  skipLink?: boolean;
}

/**
 * Band 2, the fixed header (spec §2 row 2, §3.1, §3.9; M11–M17, M19, M22, M24, M39).
 *
 * Shell: fixed, top 0, z 11, padding 16px 0, pointer-events none (children re-enable). Inside the 5px page gutter:
 * the glass bar centred at y = 16 + --announcement-offset (60 → 16 over scrollY 0–44, no transition), 48 tall,
 * radius --radius-xl, overflow hidden; it never shrinks or hides. Its glass swaps instantly with the band under it
 * (band-theme.ts, M12): --glass-on-brand + on-brand text over brand slabs, --glass-on-page + ink elsewhere.
 * The CTA (M13) and the wordmark, links and toggle (M14) tween their colours on the same swap.
 *
 * Width: robot.com's bar is 368 (100% below 768) and holds only a logo and a chevron; the brief keeps the five links
 * visible, so at ≥1280 the bar is max-content wide (deviation, recorded). Below 1280 the bar is robot.com's 368 and
 * the links live in a sheet inside the bar: open tweens the bar height 48 → content over --dur-menu expo-out, close
 * the reverse (M15/M19), backdrop 300ms (M16), chevron flips 600ms (M17), Lenis stops while open, Escape / backdrop
 * / route change close, focus moves to the first link after the tween. The closed sheet is inert and clipped, so
 * focus never enters it.
 *
 * CTA: <Pill> "Talk to us" absolute right 24 (111x48, size lg) at ≥1024; none at 768–1023 (robot.com's tablet has
 * none); at <768 a fixed bottom-centre pill (bottom 4px, size md).
 *
 * Locale switcher: in the bar from 768; below it the closed bar carries only the wordmark and the toggle like
 * robot.com's 390 bar (S02-2), and the JA/EN/ZH pill sits at the bottom of the sheet.
 *
 * Reduced motion: the height tween, backdrop, chevron and colour swaps are ≤1ms (globals.css); the bar still opens.
 */
export function Nav({ initialTheme = "page", skipLink = true }: NavProps) {
  const { t, locale } = useLocale();
  const pathname = usePathname() ?? `/${locale}/`;
  const reduce = usePrefersReducedMotion();
  const lenis = useLenis();
  const menuId = useId();
  const barRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const c = t.common;
  const home = `/${locale}/`;
  const contact = `/${locale}/contact/`;
  // The same page in another locale: swap the first segment.
  const rest = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");

  // Header theme from the band under the bar (M12). The first resolution runs before paint.
  const theme = useSyncExternalStore(
    subscribeHeaderTheme,
    () => getHeaderTheme(initialTheme),
    () => initialTheme,
  );
  useLayoutEffect(() => startBandTheme(), [pathname]);
  const brand = theme === "brand";
  const glass = brand ? "var(--glass-on-brand)" : "var(--glass-on-page)";
  const inkVar = brand ? "var(--on-brand)" : "var(--ink)";

  // Menu height tween (M15 open, M19 close): 48 ↔ 48 + sheet height, --dur-menu expo-out. Focus follows the tween.
  useEffect(() => {
    const bar = barRef.current;
    const sheet = sheetRef.current;
    if (!bar || !sheet) return;
    const target = open ? BAR_H + sheet.offsetHeight : BAR_H;
    const focusFirst = () => {
      if (open) sheet.querySelector<HTMLElement>("a")?.focus();
    };
    if (reduce) {
      bar.style.height = `${target}px`;
      focusFirst();
      return;
    }
    const controls = animate(bar, { height: target }, { duration: DUR.menu, ease: EASE.expoOut });
    controls.finished.then(focusFirst);
    return () => controls.stop();
  }, [open, reduce]);

  // Lenis stops while the menu is open (robot.com: html.lenis-stopped). Body/html overflow is left untouched.
  useEffect(() => {
    if (!open || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Route change closes the menu (state adjusted during render, no effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  const items = NAV.map((p, i) => {
    const href = `/${locale}${p.path}`;
    return { label: c.navLabels[i], href, on: `${pathname}/`.startsWith(href) };
  });
  const remember = (l: Locale) => () => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const muted = brand ? "text-on-brand-muted hover:text-on-brand" : "text-ink-muted hover:text-ink";
  const full = brand ? "text-on-brand" : "text-ink";

  const localePill = (className?: string) => (
    <div
      role="group"
      aria-label={c.localeSwitch}
      className={cn("inline-flex rounded-pill border p-0.5", INK_SWAP, brand ? "border-on-brand-muted/50" : "border-ink-muted/50", className)}
      style={PILL_SWAP_STYLE}
    >
      {locales.map((l) => {
        const cls = cn("t-caption rounded-pill px-2.5 py-1 font-medium", INK_SWAP);
        return l === locale ? (
          <span key={l} aria-current="true" lang={l} aria-label={c.localeNames[l]} className={cn(cls, brand ? "bg-page text-ink" : "bg-brand text-on-brand")} style={PILL_SWAP_STYLE}>
            {LOCALE_SHORT[l]}
          </span>
        ) : (
          <Link key={l} href={`/${l}${rest || "/"}`} hrefLang={l} lang={l} aria-label={c.localeNames[l]} onClick={remember(l)} className={cn(cls, muted)} style={INK_SWAP_STYLE}>
            {LOCALE_SHORT[l]}
          </Link>
        );
      })}
    </div>
  );

  // Header CTA (M13): glass like the bar; bg and colour tween 450ms expo-out on the theme swap. Roll-over label (M24).
  const ctaStyle = {
    backgroundColor: glass,
    color: inkVar,
    transition: "color 450ms var(--ease-expo-out), background-color 450ms var(--ease-expo-out)", // M13: 450ms has no token
  };

  return (
    <header className={cn("pointer-events-none fixed inset-x-0 top-0 z-11 py-4", brand && "on-brand")}>
      {skipLink && <SkipLink />}

      {/* flow-root: the bar's margin-top must not collapse through this box, or the CTA's top would shift too. */}
      <div className="relative flow-root" style={{ paddingInline: "var(--gutter-page)" }}>
        {/* Backdrop (M16): --surface-brand at 50%, opacity 300ms ease; tap closes. */}
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className={cn("fixed inset-0 bg-brand/50 xl:hidden", open ? "pointer-events-auto opacity-100" : "opacity-0")}
          style={{ transition: "opacity var(--dur-roll) ease" }}
        />

        {/* The bar. Height is inline (48 at rest) so the menu tween owns it. */}
        <div
          ref={barRef}
          className="glass pointer-events-auto relative mx-auto w-full max-w-full overflow-hidden rounded-xl md:max-w-92 xl:w-max xl:max-w-none"
          style={{ marginTop: "var(--announcement-offset, 0px)", height: BAR_H, backgroundColor: glass, color: inkVar }}
        >
          <div className="flex items-center justify-between gap-4" style={{ height: BAR_H, padding: "0 17px 0 23px" /* §3.1 Header_barTop */ }}>
            <Link href={home} aria-label={c.siteName} onClick={() => setOpen(false)} className="inline-flex flex-none items-center">
              {/* M14: both wordmark spans tween their colour 350ms expo-out on the theme swap. */}
              <Wordmark tone={brand ? "brand" : "page"} className="*:transition-colors *:duration-350 *:ease-expo-out" />
            </Link>

            <nav aria-label={c.siteName} className="hidden items-center gap-6 px-4 xl:flex">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  aria-current={it.on ? "page" : undefined}
                  className={cn("t-label whitespace-nowrap py-2 underline-offset-4", INK_SWAP, it.on ? cn(full, "underline") : muted)}
                  style={INK_SWAP_STYLE}
                >
                  <Copy text={it.label} />
                </Link>
              ))}
            </nav>

            <div className="flex flex-none items-center gap-3">
              {localePill("hidden md:inline-flex")}
              {/* Toggle (§3.1): 26x26, 1px currentColor border, radius --radius-sm; chevron flips scaleY(-1) 600ms expo-out (M17). */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? c.menuClose : c.menuOpen}
                onClick={() => setOpen((v) => !v)}
                className={cn("inline-flex size-6.5 items-center justify-center rounded-sm border border-current xl:hidden", INK_SWAP, full)}
                style={INK_SWAP_STYLE}
              >
                <ChevronDown className="size-4" aria-hidden style={{ transform: open ? "scaleY(-1)" : "none", transition: "transform var(--dur-unfold) var(--ease-expo-out)" }} />
              </button>
            </div>
          </div>

          {/* Sheet (below 1280): clipped by the bar at rest; inert so focus never enters a closed menu. */}
          <div id={menuId} ref={sheetRef} inert={!open} className="xl:hidden" style={{ padding: "20px 23px 15px 17px" }}>
            <nav aria-label={c.siteName} className="flex flex-col">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  aria-current={it.on ? "page" : undefined}
                  className={cn("t-title-m flex min-h-12 items-center border-b border-current/20 py-3", INK_SWAP, it.on ? full : muted)}
                  style={INK_SWAP_STYLE}
                >
                  <Copy text={it.label} />
                </Link>
              ))}
            </nav>
            {/* Below 768 the locale switcher lives here, so the closed bar is wordmark + toggle (S02-2). */}
            <div className="mt-4 md:hidden">{localePill()}</div>
            {/* 768–1023 has no header CTA (robot.com tablet), so the sheet carries it there. */}
            <div className="mt-4 hidden md:block lg:hidden">
              <PillLink href={contact} label={c.talkToUs} variant={brand ? "on-brand" : "on-page"} onClick={() => setOpen(false)} />
            </div>
          </div>
        </div>

        {/* CTA at ≥1024: absolute right 24, top = --announcement-offset (y 60 → 16), 111x48. */}
        <div className="pointer-events-auto absolute right-6 hidden lg:block" style={{ top: "var(--announcement-offset, 0px)", marginRight: "var(--gutter-page)" }}>
          {/* §3.1: 111.22x48. .pill--lg (19px padding + the 1.225 line box) is 57 tall, so the height is pinned here. */}
          <PillLink href={contact} label={c.talkToUs} size="lg" className="glass" style={{ ...ctaStyle, height: BAR_H, paddingBlock: 0 }} />
        </div>
      </div>

      {/* CTA below 768: re-homed to a fixed bottom-centre pill, bottom 4px, padding 11px 21px (§3.1). */}
      <div className="pointer-events-auto fixed bottom-1 left-1/2 -translate-x-1/2 md:hidden">
        <PillLink href={contact} label={c.talkToUs} className="glass" style={ctaStyle} />
      </div>
    </header>
  );
}

"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { DUR, easeExpoOut } from "@/lib/motion";

const LenisContext = createContext<Lenis | null>(null);

/** The running Lenis instance, or null when smooth scroll is off (reduced motion, SSR, not mounted). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Smooth wheel/touch scroll per spec §5 M1: robot.com runs Lenis with duration 1.2s, expo-out easing,
 * lerp off, wheelMultiplier 1, touchMultiplier 2, syncTouch false. Ticks on requestAnimationFrame.
 * Never starts under prefers-reduced-motion (the spec's reduced-motion rule, not robot.com's).
 * While active, <html> carries `.smooth-scroll` so the site's `scroll-behavior: smooth` yields to Lenis.
 * The lightbox and the menu pause it through useLenis().stop() / .start().
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  // A route change without a hash starts at the top. Next's own scroll handler skips the page's first element when it
  // is already in the viewport (the fixed skip link always is), and the smooth `scroll-behavior` on <html> then let the
  // locale switch drift to the bottom of the new page (2026-09-28). Layout effect: before paint, after Next's handler.
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
    lenis?.scrollTo(0, { immediate: true, force: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs per route, not per Lenis instance
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    let frame = 0;

    const start = () => {
      if (instance) return;
      instance = new Lenis({
        // duration + easing take precedence over lerp inside Lenis's Animate.fromTo, so lerp is effectively off.
        duration: DUR.scroll,
        easing: easeExpoOut,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: false,
        autoRaf: false,
        // We gate on the media query ourselves so the instance is never created, rather than created and neutered.
        respectReducedMotion: false,
      });
      document.documentElement.classList.add("smooth-scroll");
      const tick = (time: number) => {
        instance?.raf(time);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      setLenis(instance);
    };

    const stop = () => {
      if (!instance) return;
      cancelAnimationFrame(frame);
      instance.destroy();
      instance = null;
      document.documentElement.classList.remove("smooth-scroll");
      setLenis(null);
    };

    const sync = () => (mq.matches ? stop() : start());
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

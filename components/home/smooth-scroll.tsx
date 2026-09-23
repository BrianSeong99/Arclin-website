"use client";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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

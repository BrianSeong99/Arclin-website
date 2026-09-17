"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { HeroIllustration } from "./hero-illustration";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./hero-scene").then((m) => m.HeroScene), { ssr: false });

function webglOk() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero art: the SVG line illustration paints first (LCP-safe), then the 3D scene
 * loads after hydration and cross-fades in. Falls back to the SVG without WebGL.
 */
export function HeroVisual({ title }: { title: string }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    if (!webglOk()) return;
    const id = window.requestIdleCallback ? window.requestIdleCallback(() => setUse3d(true)) : window.setTimeout(() => setUse3d(true), 300);
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(id as number) : window.clearTimeout(id as number));
  }, []);

  return (
    <div className="relative aspect-[8/7] w-full">
      <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-0" : "opacity-100")} aria-hidden={ready}>
        <HeroIllustration title={title} className="h-full w-full" />
      </div>
      {use3d && (
        <div
          className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
          role="img"
          aria-label={title}
          onTransitionEnd={undefined}
        >
          <HeroScene animate={!reduce} className="!h-full !w-full" />
          <SceneReady onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}

/** Flips the crossfade one frame after the canvas mounts (first paint has happened). */
function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const id = window.setTimeout(onReady, 350);
    return () => window.clearTimeout(id);
  }, [onReady]);
  return null;
}

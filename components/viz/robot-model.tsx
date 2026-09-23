"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ModelViewerAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  poster?: string;
  alt?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "manual";
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "rotation-per-second"?: string;
  "interaction-prompt"?: "auto" | "none";
  "touch-action"?: "pan-y" | "pan-x" | "none";
  "shadow-intensity"?: string;
  exposure?: string;
};

declare module "react" {
  // Augmenting React's JSX namespace is the only way to type a custom element tag.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

export type RobotModelProps = {
  /** GLB source; only loaded when NEXT_PUBLIC_DEV_MEDIA=1, so production never ships an unapproved mesh. */
  src?: string;
  /** Still shown until the mesh has loaded, and instead of it under prefers-reduced-motion. */
  poster?: string;
  /** What the model shows; read by assistive tech and shown while the asset is pending. */
  label: string;
  /** CSS aspect-ratio, e.g. "1 / 1". */
  ratio?: string;
  className?: string;
};

/**
 * Rounded, clipped 3D frame around a <model-viewer> web component. The element is
 * imported on the client after mount, so the static export never touches it. In
 * production (or without a src) it renders the same sunken pending frame as VideoFrame.
 * Auto-rotate is off under prefers-reduced-motion; the viewer still answers to drag.
 */
export function RobotModel({ src, poster, label, ratio = "1 / 1", className }: RobotModelProps) {
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1" && !!src;
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!dev) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    let live = true;
    import("@google/model-viewer").then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
      mq.removeEventListener("change", sync);
    };
  }, [dev]);

  const frame = cn("relative w-full overflow-hidden rounded-lg bg-sunken", className);
  if (!dev || !ready) {
    return (
      <div className={cn(frame, "flex flex-col items-center justify-center gap-1 text-center")} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
        {poster && <Image src={poster} alt="" fill className="object-cover" />}
        <span className="t-caption relative text-ink-subtle">{label}</span>
        {!dev && <span className="t-caption relative text-ink-subtle">model: pending</span>}
      </div>
    );
  }
  return (
    <div className={frame} style={{ aspectRatio: ratio }}>
      <model-viewer
        src={src}
        poster={poster}
        alt={label}
        loading="lazy"
        reveal="auto"
        camera-controls
        auto-rotate={!reduced}
        rotation-per-second="12deg"
        interaction-prompt="none"
        touch-action="pan-y"
        shadow-intensity="0"
        exposure="1"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      />
    </div>
  );
}

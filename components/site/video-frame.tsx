import Image from "next/image";
import { cn } from "@/lib/utils";

export type VideoFrameProps = {
  /** Video source; only played when NEXT_PUBLIC_DEV_MEDIA=1, so production never ships an unapproved clip. */
  src?: string;
  poster?: string;
  /** What the clip shows; read by assistive tech and shown while the asset is pending. */
  label: string;
  /** CSS aspect-ratio, e.g. "16 / 9". */
  ratio?: string;
  className?: string;
};

/**
 * Rounded, clipped media frame. Renders the looping video only in dev media mode;
 * otherwise a sunken frame at the same ratio with the label and a pending line.
 * Under prefers-reduced-motion only the poster (or the frame) is shown.
 */
export function VideoFrame({ src, poster, label, ratio = "16 / 9", className }: VideoFrameProps) {
  const dev = process.env.NEXT_PUBLIC_DEV_MEDIA === "1" && !!src;
  const frame = cn("relative w-full overflow-hidden rounded-lg", className);
  if (!dev) {
    return (
      <div className={cn(frame, "flex flex-col items-center justify-center gap-1 bg-sunken text-center")} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
        {poster && <Image src={poster} alt="" fill className="object-cover" />}
        <span className="t-caption relative text-ink-subtle">{label}</span>
        <span className="t-caption relative text-ink-subtle">video: pending</span>
      </div>
    );
  }
  return (
    <div className={cn(frame, "bg-sunken")} style={{ aspectRatio: ratio }}>
      <video autoPlay muted loop playsInline preload="none" poster={poster} aria-label={label} className="size-full object-cover motion-reduce:hidden">
        <source src={src} />
      </video>
      {poster ? (
        <Image src={poster} alt={label} fill className="hidden object-cover motion-reduce:block" />
      ) : (
        <span className="t-caption hidden size-full items-center justify-center text-ink-subtle motion-reduce:flex">{label}</span>
      )}
    </div>
  );
}

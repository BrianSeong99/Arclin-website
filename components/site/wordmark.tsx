import { cn } from "@/lib/utils";
import { Mark } from "./mark";

/**
 * The horizontal lockup: the three-leaf mark beside "Arclin" in Coustard Black, with the kanji as a caption.
 * On brand surfaces the mark stays in colour (its dark leaf is lifted by the shade) and the words go on-brand.
 */
export function Wordmark({ className, tone = "page", size = "md" }: { className?: string; tone?: "page" | "brand"; size?: "md" | "lg" }) {
  const onBrand = tone === "brand";
  const lg = size === "lg";
  return (
    <span className={cn("inline-flex items-center", lg ? "gap-3.5" : "gap-2.5", className)}>
      <Mark size={lg ? 44 : 30} />
      <span className={cn("inline-flex items-baseline", lg ? "gap-3" : "gap-2")}>
        <span className={cn("font-display leading-none tracking-[-0.015em]", lg ? "text-[34px]" : "text-[22px]", onBrand ? "text-on-brand" : "text-ink")}>Arclin</span>
        <span className={cn("t-caption font-medium tracking-[0.16em]", onBrand ? "text-on-brand-muted" : "text-ink-subtle")}>智渡仁</span>
      </span>
    </span>
  );
}

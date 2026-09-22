import { cn } from "@/lib/utils";

/** "Arclin" in Italiana beside the kanji in the body face. Kurogane has no mark: the name is the mark. */
export function Wordmark({ className, tone = "page", size = "md" }: { className?: string; tone?: "page" | "brand"; size?: "md" | "lg" }) {
  const onBrand = tone === "brand";
  return (
    <span className={cn("inline-flex items-baseline gap-2.5", className)}>
      <span className={cn("font-display leading-none tracking-[0.01em]", size === "lg" ? "text-[40px]" : "text-[26px]", onBrand ? "text-on-brand" : "text-ink")}>Arclin</span>
      <span className={cn("t-caption font-medium tracking-[0.16em]", onBrand ? "text-on-brand-muted" : "text-ink-subtle")}>智渡仁</span>
    </span>
  );
}

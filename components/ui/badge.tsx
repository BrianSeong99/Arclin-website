import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/** Small pill tag. `highlight` is the one Soga mark permitted per view. */
const badgeVariants = cva("t-label inline-flex items-center gap-1.5 rounded-pill px-3 py-1", {
  variants: {
    variant: {
      neutral: "border border-border-strong text-ink-muted",
      highlight: "bg-highlight text-on-highlight",
      "on-brand": "border border-on-brand-muted/60 text-on-brand-muted",
      "on-highlight": "border border-on-highlight/40 text-on-highlight",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

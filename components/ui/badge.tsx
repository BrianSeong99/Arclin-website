import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default: "border border-line-strong text-ink-2",
        pine: "bg-pine/10 text-pine",
        ember: "bg-ember/10 text-ember",
        console: "border border-console-line bg-console-3 text-console-muted",
        signal: "border border-signal/40 bg-signal/10 text-signal",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

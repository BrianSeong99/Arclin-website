import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/**
 * Pill button. Kurogane: anything tappable is `radius-pill`, labels are sentence case,
 * minimum 48px tall on `md`.
 */
const buttonVariants = cva(
  "t-label inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        brand: "bg-brand text-on-brand hover:bg-ink",
        outline: "border border-border-strong bg-transparent text-ink hover:border-ink hover:bg-sunken",
        ghost: "text-ink-muted hover:bg-sunken hover:text-ink",
        "on-brand": "bg-page text-ink hover:bg-highlight hover:text-on-highlight",
        "on-brand-outline": "border border-on-brand-muted text-on-brand hover:border-on-brand hover:bg-on-brand/10",
        "on-highlight": "bg-brand text-on-brand hover:bg-ink",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-[15px]",
      },
    },
    defaultVariants: { variant: "brand", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export type ButtonLinkProps = ComponentProps<"a"> & VariantProps<typeof buttonVariants>;
export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

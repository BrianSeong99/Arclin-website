import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Copy } from "@/components/site/copy";

export type PillVariant = "on-page" | "on-brand" | "highlight" | "outline" | "outline-on-brand";
export type PillSize = "md" | "lg" | "inline";

/**
 * Colour roles (spec §3.3 Kurogane mapping):
 * on-page = ink pill on the page (robot.com black); on-brand = page-coloured pill on a brand slab (white);
 * highlight = the accent pill (yellow); outline / outline-on-brand = transparent with a currentColor border.
 */
const variantClass: Record<PillVariant, string> = {
  "on-page": "pill--on-page",
  "on-brand": "pill--on-brand",
  highlight: "pill--highlight",
  outline: "pill--outline",
  "outline-on-brand": "pill--outline-on-brand",
};
const sizeClass: Record<PillSize, string> = { md: "", lg: "pill--lg", inline: "pill--inline" };

interface PillOwnProps {
  /** The label, a copy string from useLocale().t; [GAP] markers render through <Copy>. */
  label: string;
  variant?: PillVariant;
  /** md = 11px 21px (ButtonPill), lg = 19px 20px (header CTA, 48 tall), inline = 11px 13px (statement CTA). */
  size?: PillSize;
  /**
   * Trailing line arrow (borrowed from easehealth.com's `.button.is-icon`, 2026-09-23): says "this goes somewhere"
   * without a verb. Lucide ArrowRight at Kurogane's 1.5px icon stroke, sized to the 14px label's cap height, inside
   * the label track so it rolls with the two copies; it never moves on hover. Opt in on primary CTAs only.
   */
  icon?: "arrow";
  className?: string;
}

/** Two stacked copies of the label; the second is presentational and rides in from below on hover (M22). */
function Label({ label, icon }: { label: string; icon?: "arrow" }) {
  const copy = (
    <span className="inline-flex items-center gap-2">
      <Copy text={label} />
      {icon === "arrow" && <ArrowRight aria-hidden="true" size={12} strokeWidth={1.5} className="shrink-0" />}
    </span>
  );
  return (
    <span className="pill__track">
      <span className="pill__label">{copy}</span>
      <span className="pill__label" aria-hidden="true">
        {copy}
      </span>
    </span>
  );
}

export type PillLinkProps = PillOwnProps & Omit<ComponentProps<"a">, "children" | "className">;

/**
 * Stacked-label roll-over pill as a link (spec §3.3, M22–M25). Hover rolls the label copies over
 * var(--dur-roll) var(--ease-roll); hover-out snaps; background and colour never change on hover.
 * Type is .t-label with the label line box at 1.225 so the travel is 17.15px. Reduced motion: no roll.
 */
export function PillLink({ label, variant = "on-page", size = "md", icon, className, ...rest }: PillLinkProps) {
  return (
    <a className={cn("pill t-label", variantClass[variant], sizeClass[size], className)} {...rest}>
      <Label label={label} icon={icon} />
    </a>
  );
}

export type PillButtonProps = PillOwnProps & Omit<ComponentProps<"button">, "children" | "className">;

/** The same pill as a <button>. */
export function PillButton({ label, variant = "on-page", size = "md", icon, className, type = "button", ...rest }: PillButtonProps) {
  return (
    <button type={type} className={cn("pill t-label", variantClass[variant], sizeClass[size], className)} {...rest}>
      <Label label={label} icon={icon} />
    </button>
  );
}

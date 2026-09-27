import { cn } from "@/lib/utils";

/**
 * The Arclin mark: three identical leaves (ellipses rx 150 / ry 165, long axis radial, centres 118 from the middle
 * at -90°, 150°, 30°) in a cyclic overlap — sage over gold, dark over sage, gold over dark — with a 12-unit paper gap
 * cut by masking each leaf with its neighbour. Colour leaves carry the brand shade (linear gradient lit from the
 * top-left plus a soft radial highlight and shadow); `ink` renders the mark in currentColor for monochrome uses.
 * Same construction as the Figma component "Mark" in the Arclin file.
 */
export function Mark({ size = 28, tone = "colour", className, title }: { size?: number | string; tone?: "colour" | "ink"; className?: string; title?: string }) {
  return (
    <svg viewBox="26 32 568 568" width={size} height={size} className={cn("shrink-0", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <defs>
        <mask id="am-gold"><rect width="620" height="632" fill="#fff"/><ellipse cx="207.8" cy="375.0" rx="162" ry="177" transform="rotate(240 207.8 375.0)" fill="#000"/></mask><linearGradient id="ag-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbeab8"/><stop offset=".5" stop-color="#e3c06a"/><stop offset="1" stop-color="#bd9440"/></linearGradient><mask id="am-sage"><rect width="620" height="632" fill="#fff"/><ellipse cx="412.2" cy="375.0" rx="162" ry="177" transform="rotate(120 412.2 375.0)" fill="#000"/></mask><linearGradient id="ag-sage" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#adc9b0"/><stop offset=".5" stop-color="#7fa085"/><stop offset="1" stop-color="#54755f"/></linearGradient><mask id="am-dark"><rect width="620" height="632" fill="#fff"/><ellipse cx="310.0" cy="198.0" rx="162" ry="177" transform="rotate(0 310.0 198.0)" fill="#000"/></mask><linearGradient id="ag-dark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#276b52"/><stop offset=".5" stop-color="#0d3a2f"/><stop offset="1" stop-color="#05221a"/></linearGradient><radialGradient id="ah" cx=".32" cy=".26" r=".62"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="as" cx=".78" cy=".82" r=".75"><stop offset="0" stop-color="#000" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      </defs>
      {tone === "colour" ? (
        <><g mask="url(#am-gold)"><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="url(#ag-gold)"/><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="url(#ah)"/><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="url(#as)"/></g><g mask="url(#am-sage)"><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="url(#ag-sage)"/><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="url(#ah)"/><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="url(#as)"/></g><g mask="url(#am-dark)"><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="url(#ag-dark)"/><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="url(#ah)"/><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="url(#as)"/></g></>
      ) : (
        <><g mask="url(#am-gold)"><ellipse cx="310.0" cy="198.0" rx="150" ry="165" transform="rotate(0 310.0 198.0)" fill="currentColor"/></g><g mask="url(#am-sage)"><ellipse cx="207.8" cy="375.0" rx="150" ry="165" transform="rotate(240 207.8 375.0)" fill="currentColor"/></g><g mask="url(#am-dark)"><ellipse cx="412.2" cy="375.0" rx="150" ry="165" transform="rotate(120 412.2 375.0)" fill="currentColor"/></g></>
      )}
    </svg>
  );
}

import type { ColorToken, ThemeId } from "@/lib/ds/tokens";

/**
 * One colour token row: swatch, "Aa" sample on its stated ground when the token is a text colour,
 * then id, name, the hex for this theme and the usage note. Backgrounds come from the CSS variable,
 * so the same row renders both themes depending on the data-theme scope it sits in.
 */
export function Swatch({ token, theme }: { token: ColorToken; theme: ThemeId }) {
  return (
    <div className="flex items-start gap-4">
      <div aria-hidden className="size-10 shrink-0 rounded-sm border border-hairline" style={{ background: `var(--${token.name})` }} />
      {token.textOn ? (
        <div
          aria-hidden
          className="t-label flex size-10 shrink-0 items-center justify-center rounded-sm border border-hairline"
          style={{ color: `var(--${token.name})`, background: `var(--${token.textOn})` }}
        >
          Aa
        </div>
      ) : (
        <div aria-hidden className="size-10 shrink-0" />
      )}
      <div className="min-w-0">
        <p className="t-label">
          <span className="text-ink-subtle">{token.id}</span> {token.name}
        </p>
        <p className="t-caption text-ink-subtle">
          {token.value[theme]}
          {token.textOn && ` · on ${token.textOn}`}
        </p>
        <p className="t-caption mt-1 text-pretty text-ink-muted">{token.usage}</p>
      </div>
    </div>
  );
}

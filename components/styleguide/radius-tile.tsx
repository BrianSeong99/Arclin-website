import type { RadiusToken } from "@/lib/ds/tokens";

/** One radius token: a surface-raised square with the radius applied, then id, name, value and usage. */
export function RadiusTile({ token }: { token: RadiusToken }) {
  return (
    <div>
      <div aria-hidden className="size-24 border border-hairline bg-raised shadow-soft" style={{ borderRadius: `var(--${token.name})` }} />
      <p className="t-label mt-3">
        <span className="text-ink-subtle">{token.id}</span> {token.name}
      </p>
      <p className="t-caption text-ink-subtle">{token.value}</p>
      <p className="t-caption mt-1 text-pretty text-ink-muted">{token.usage}</p>
    </div>
  );
}

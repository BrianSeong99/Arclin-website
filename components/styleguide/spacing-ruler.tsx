import type { SpacingToken } from "@/lib/ds/tokens";

/** One spacing token as a ruler: a bar exactly var(--space-N) wide, then id, name, value and usage. */
export function SpacingRuler({ token }: { token: SpacingToken }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline py-3">
      <div className="w-20 shrink-0">
        <div aria-hidden className="h-2 bg-brand" style={{ width: `var(--${token.name})` }} />
      </div>
      <p className="t-label w-32 shrink-0">
        <span className="text-ink-subtle">{token.id}</span> {token.name}
      </p>
      <p className="t-caption w-12 shrink-0 text-ink-muted">{token.value}</p>
      <p className="t-body-s text-ink-muted">{token.usage}</p>
    </div>
  );
}

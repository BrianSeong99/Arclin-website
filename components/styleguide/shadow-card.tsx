import type { ShadowToken, ThemeId } from "@/lib/ds/tokens";

/** One shadow token as a surface-raised card floating on surface-page, with id, name, value and usage. */
export function ShadowCard({ token, theme }: { token: ShadowToken; theme: ThemeId }) {
  return (
    <div className="rounded-md bg-raised p-5" style={{ boxShadow: `var(--${token.name})` }}>
      <p className="t-label">
        <span className="text-ink-subtle">{token.id}</span> {token.name}
      </p>
      <p className="t-caption text-ink-muted">{token.value[theme]}</p>
      <p className="t-body-s mt-1 text-pretty text-ink-muted">{token.usage}</p>
    </div>
  );
}

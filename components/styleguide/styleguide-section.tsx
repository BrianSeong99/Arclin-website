import type { ReactNode } from "react";

/** One numbered band of the styleguide: number, heading, optional one-line description, then the specimens. */
export function StyleguideSection({ number, title, description, children }: { number: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section className="border-t border-hairline">
      <div className="container-x band-y">
        <h2 className="t-title-l flex items-baseline gap-4">
          <span className="t-overline text-ink-subtle">{number}</span>
          {title}
        </h2>
        {description && <p className="t-body mt-2 max-w-[36em] text-pretty text-ink-muted">{description}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

import { Fragment } from "react";

/** Matches `[GAP: …]` (unconfirmed fact) and `[PLACEHOLDER…]` (pending legal / registry text). */
const GAP = /\[(?:GAP:|PLACEHOLDER)[^\]]*\]/g;

/**
 * Renders a copy string, marking every gap so an unconfirmed fact can never pass as one.
 * The mark is an outline only (dashed border-strong, attention ink, no fill): loud enough to be found, never decorative.
 */
export function Copy({ text }: { text: string }) {
  const parts = text.split(GAP);
  const gaps = text.match(GAP) ?? [];
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {gaps[i] && (
            <mark title={gaps[i]} className="gap t-label mx-0.5 inline-block rounded-sm border border-dashed border-border-strong bg-transparent px-2 py-1 align-baseline text-attention">
              {gaps[i]}
            </mark>
          )}
        </Fragment>
      ))}
    </>
  );
}

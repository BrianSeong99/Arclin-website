import { cn } from "@/lib/utils";
import { typeFamilies, type TypeFamily, type TypeStyle } from "@/lib/ds/tokens";

/** The next/font variable each token family resolves to (set on <html> by the locale layout). */
const familyVar: Record<TypeFamily, string> = {
  display: "var(--font-display)",
  ui: "var(--font-ui)",
  jp: "var(--font-jp)",
  zh: "var(--font-zh)",
};

const langOf: Partial<Record<TypeFamily, string>> = { jp: "ja", zh: "zh" };

const defaultSample: Record<TypeFamily, string> = {
  display: "It waits by the door in the morning",
  ui: "It waits by the door in the morning",
  jp: "朝、ドアのそばで待っています。",
  zh: "早晨，它在门边等候。",
};

/** Styles whose usage note cannot be checked against the family sentence; keyed by token name. */
const styleSample: Partial<Record<string, string>> = {
  numeral: "07:45 · 36.8 · 1,204",
};

/**
 * Classes whose font-size is a clamp() in app/globals.css, so they shrink below the token size on
 * phones. Mirror that file: t-display-m and t-numeral are fixed there and carry no note.
 */
const responsive = new Set(["t-display-xl", "t-display-l", "t-jp-display-xl", "t-jp-display-l", "t-jp-display", "t-zh-display-xl"]);

const responsiveNote = "responsive: shrinks below the token size on phones";

/** One type style: the sample line set in its .t- class, then the spec line and usage note. */
export function TypeSpecimen({ style, family }: { style: TypeStyle; family: TypeFamily }) {
  const cls = `t-${style.name}`;
  const sample = style.sample ?? styleSample[style.name] ?? defaultSample[family];
  const spec = [style.id, style.name, `${style.fontSize} / ${style.lineHeight}`, String(style.fontWeight), style.letterSpacing ?? "normal", typeFamilies[family]];
  if (responsive.has(cls)) spec.push(responsiveNote);
  return (
    <div className="border-t border-hairline py-6">
      <p lang={langOf[family]} className={cn(cls, "text-balance text-ink")} style={{ fontFamily: familyVar[family] }}>
        {sample}
      </p>
      <p className="t-caption mt-3 text-ink-muted">{spec.join(" · ")}</p>
      {style.usage && <p className="t-body-s mt-1 text-pretty text-ink-muted">{style.usage}</p>}
    </div>
  );
}

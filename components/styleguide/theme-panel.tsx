import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/ds/tokens";

/**
 * A surface-page panel for one theme. Night sets data-theme so every CSS variable inside
 * re-scopes to the Night values; Paper is the :root theme and needs no attribute.
 */
export function ThemePanel({ theme, className, children }: { theme: Theme; className?: string; children: ReactNode }) {
  return (
    <div data-theme={theme.id === "night" ? "night" : undefined} className={cn("rounded-lg border border-hairline bg-page p-5 text-ink sm:p-6", className)}>
      <p className="t-overline text-ink-subtle">{theme.name}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

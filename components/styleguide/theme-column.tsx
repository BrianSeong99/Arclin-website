import { colorTokens, type Theme } from "@/lib/ds/tokens";
import { ThemePanel } from "./theme-panel";
import { Swatch } from "./swatch";

/** Every colour token rendered under one theme, in token order. */
export function ThemeColumn({ theme }: { theme: Theme }) {
  return (
    <ThemePanel theme={theme}>
      <ul className="flex flex-col gap-5">
        {colorTokens.map((token) => (
          <li key={token.id}>
            <Swatch token={token} theme={theme.id} />
          </li>
        ))}
      </ul>
    </ThemePanel>
  );
}

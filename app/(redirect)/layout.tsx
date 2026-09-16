import type { ReactNode } from "react";

export const metadata = { title: "Arclin K.K.", robots: { index: false } };

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

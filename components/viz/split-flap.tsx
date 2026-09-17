"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Split-flap style readout: each character that changes drops in from above. */
export function SplitFlap({ value, className, tone = "console" }: { value: string; className?: string; tone?: "console" | "paper" }) {
  const prev = useRef(value);
  const [keys, setKeys] = useState<number[]>(() => value.split("").map(() => 0));
  useEffect(() => {
    if (prev.current === value) return;
    const old = prev.current;
    prev.current = value;
    setKeys((k) => value.split("").map((ch, i) => (old[i] === ch ? k[i] ?? 0 : (k[i] ?? 0) + 1)));
  }, [value]);
  const chars = value.split("");
  return (
    <span className={cn("inline-flex font-mono tabular", className)} aria-label={value}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "relative inline-block overflow-hidden rounded-[3px] text-center",
            ch === ":" ? "w-[0.45em]" : "w-[0.72em]",
            ch !== ":" && (tone === "console" ? "bg-console-3/80 shadow-[inset_0_-1px_0_var(--console-line)]" : "bg-paper-3/60"),
          )}
        >
          <span key={keys[i]} className="flap-in inline-block">
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

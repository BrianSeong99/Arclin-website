"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * TEMPORARY design-review toggle: reads `?<name>=<value>` from the URL on the client so candidate
 * treatments can be screenshotted on the live page (e.g. /ja/?art=blossoms&mask=window). The server
 * snapshot is `fallback`; the client snapshot reads the URL once (it never changes within a page).
 * Delete once the candidate is chosen.
 */
export function usePreviewVariant<T extends string>(name: string, fallback: T, allowed: readonly T[]): T {
  return useSyncExternalStore(
    noop,
    () => {
      const q = new URLSearchParams(window.location.search).get(name);
      return q && (allowed as readonly string[]).includes(q) ? (q as T) : fallback;
    },
    () => fallback,
  );
}

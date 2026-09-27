"use client";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { useLocale } from "@/lib/i18n/context";
import { Copy } from "@/components/site/copy";

/** localStorage key for the dismissed state (Arclin addition; robot.com has no dismiss). */
export const ANNOUNCE_DISMISSED_KEY = "arclin-announce-dismissed";

/** `--announcement-offset` is 44px at scrollY 0 and 0 at scrollY ≥ 44, linear, no transition (M11). */
export const ANNOUNCE_OFFSET = 44;
export const ANNOUNCE_OFFSET_VAR = "--announcement-offset";

function writeOffset(px: number) {
  document.documentElement.style.setProperty(ANNOUNCE_OFFSET_VAR, `${px}px`);
}

// Dismissed state as an external store over localStorage, so the server render (never dismissed) and the client agree.
const listeners = new Set<() => void>();
function readDismissed(): boolean {
  try {
    return localStorage.getItem(ANNOUNCE_DISMISSED_KEY) !== null;
  } catch {
    return false;
  }
}
function subscribeDismissed(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function dismiss() {
  try {
    localStorage.setItem(ANNOUNCE_DISMISSED_KEY, "1");
  } catch {}
  listeners.forEach((cb) => cb());
}

/**
 * Band 1, the announcement bar (spec §2 row 1, §3.2). In flow, so it scrolls away: a 5px wrapper margin and the
 * page gutter put the highlight slab at (5,5), 1430x38.83 at 1440 (380 wide at 390); padding 12px 20px, radius
 * --radius-xl, flex row gap 16, one line at every width (S01-1): the message never shrinks and the link label
 * truncates when the row runs out of room (robot.com's copy is shorter; ja carries 20 CJK glyphs at 390).
 * The whole slab is one link to the newsroom; hover underlines the label only, instantly. It writes
 * `--announcement-offset` on <html> (44 → 0 over scrollY 0–44) for the header to follow.
 * Arclin adds a dismiss control: it removes the bar, zeroes the offset and persists under ANNOUNCE_DISMISSED_KEY;
 * on a later visit the bar renders nothing. The static export cannot know that state, so it is read on mount.
 */
export function AnnounceBar() {
  const { t, locale } = useLocale();
  const dismissed = useSyncExternalStore(subscribeDismissed, readDismissed, () => false);

  useEffect(() => {
    if (dismissed) {
      writeOffset(0);
      return;
    }
    const sync = () => writeOffset(Math.max(0, ANNOUNCE_OFFSET - Math.round(window.scrollY)));
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      writeOffset(0);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div data-announce className="relative bg-page" style={{ marginTop: "var(--gutter-page)", paddingInline: "var(--gutter-page)" }}>
      <Link
        href={`/${locale}/newsroom/`}
        className="on-highlight group t-label flex items-center gap-4 rounded-xl bg-highlight px-5 py-3 text-on-highlight"
        style={{ lineHeight: 1.06 /* §4 "Announcement message" 14/600/14.84: the 38.83 slab needs the 1.06 leading, not t-label's 1.3 */ }}
      >
        {/* Wraps on phones (the JA copy already needs two lines at 390); one line from 768, where the 38.83 slab holds. */}
        <span className="min-w-0 md:shrink-0 md:whitespace-nowrap">
          <Copy text={t.home.announce.text} />
        </span>
        {/* me-8 keeps the label clear of the dismiss control. */}
        <span className="me-8 flex min-w-0 items-center gap-1 font-normal group-hover:underline">
          <span className="min-w-0 truncate">
            <Copy text={t.home.announce.cta} />
          </span>
          <ArrowRight className="size-3.5 shrink-0" aria-hidden />
        </span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t.common.dismiss}
        title={t.common.dismiss}
        className="on-highlight absolute inset-y-0 right-5 my-auto inline-flex size-6 items-center justify-center rounded-pill text-on-highlight"
        style={{ marginRight: "var(--gutter-page)" }}
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}

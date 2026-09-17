"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { RING_SEGMENTS, SCENE_FOR_SEG, SEG_HOUR, type SegId } from "@/lib/site";
import { Section, Kicker, Heading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { RingTimeline } from "@/components/viz/ring-timeline";
import { SceneIllustration, type SceneId } from "@/components/viz/mimamori-scenes";
import { FloorPlan } from "@/components/viz/floor-plan";
import { Crosshairs } from "@/components/site/crosshairs";
import { SplitFlap } from "@/components/viz/split-flap";
import { DemoTag } from "@/components/ui/demo-tag";
import { cn } from "@/lib/utils";

const RANGE: Record<SegId, [number, number]> = { day: [6, 17], evening: [17, 21], night: [21, 30] };

/**
 * Scroll-pinned Mimamori: the ring, split-flap clock and scene stay sticky on the left while the
 * three time bands scroll on the right; the band in view drives the clock (which keeps ticking
 * inside that band). Below 1024px the bands stack and tabs take over.
 */
export function Mimamori() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const [segId, setSegId] = useState<SegId>("day");
  const [hour, setHour] = useState<number>(SEG_HOUR.day);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);

  // tick inside the active band
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setHour((h) => {
        const [a, b] = RANGE[segId];
        const next = h + 0.1;
        const wrapped = next >= b ? a : next;
        return wrapped % 24;
      });
    }, 250);
    return () => clearInterval(id);
  }, [reduce, segId]);

  const select = (id: SegId) => {
    setSegId(id);
    setHour(SEG_HOUR[id]);
  };

  // band in view -> active (desktop pinned layout)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-band") as SegId;
            setSegId((cur) => {
              if (cur !== id) setHour(SEG_HOUR[id]);
              return id;
            });
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    bandRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const seg = t.segs.find((s) => s.id === segId) ?? t.segs[0];
  const hh = Math.floor(hour) % 24;
  const mm = Math.floor((hour - Math.floor(hour)) * 60);
  const clock = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

  const stage = (
    <div className="blueprint-grid relative rounded-2xl border border-console-line bg-console-2/60 p-5 sm:p-7">
      <Crosshairs tone="console" />
      <div className="mx-auto max-w-[360px]">
        <RingTimeline
          segments={RING_SEGMENTS}
          activeId={segId}
          hour={hour % 24}
          center={
            <div className="pointer-events-none text-center">
              <SplitFlap value={clock} className="text-[clamp(26px,3.4vw,38px)] leading-none text-console-text" />
              <div className="mt-2.5 text-[15px] text-signal">{seg.label}</div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-console-muted">{seg.range}</div>
            </div>
          }
        />
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-console-line bg-console px-3 pt-2">
        <div className="flex items-center justify-between px-1 pb-1 font-mono text-[9.5px] tracking-[0.18em] text-console-muted">
          <span>FLOOR 2 · {seg.range}</span>
          <span className="text-signal">{SCENE_FOR_SEG[segId].toUpperCase()}</span>
        </div>
        <FloorPlan tone="console" focus={segId} compact />
      </div>
    </div>
  );

  return (
    <Section id="mimamori" tone="console" num="04" className="blueprint-grid">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Reveal>
          <Kicker tone="console">{t.mimaLabel}</Kicker>
        </Reveal>
        <DemoTag tone="console" />
      </div>
      <Reveal>
        <Heading lines={[t.mimaH2a, t.mimaH2b]} className="mt-5" />
      </Reveal>
      <Reveal>
        <p className="mt-5 max-w-[36em] text-pretty text-console-muted">{t.mimaBody}</p>
      </Reveal>

      {/* tabs: mobile + reduced-motion fallback */}
      <div role="tablist" className="mt-10 flex flex-wrap gap-2 lg:hidden">
        {t.segs.map((s) => {
          const on = s.id === segId;
          return (
            <button key={s.id} type="button" role="tab" aria-selected={on} onClick={() => select(s.id as SegId)} className={cn("rounded-full border px-4 py-2 text-[13.5px]", on ? "border-signal bg-signal text-console" : "border-console-line text-console-text")}>
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        {/* pinned stage */}
        <div className="lg:sticky lg:top-24 lg:self-start">{stage}</div>
        {/* bands */}
        <div className="hidden lg:block">
          {t.segs.map((s, i) => (
            <div
              key={s.id}
              data-band={s.id}
              ref={(el) => {
                bandRefs.current[i] = el;
              }}
              className={cn("flex min-h-[70vh] flex-col justify-center border-t border-console-line py-16 transition-opacity duration-500", s.id === segId ? "opacity-100" : "opacity-35")}
            >
              <div className="font-mono text-[11px] tracking-[0.2em] text-signal">{String(i + 1).padStart(2, "0")} · {s.range}</div>
              <h3 className="mt-4 text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.3] text-console-text">{s.title}</h3>
              <p className="mt-4 max-w-[30em] text-pretty text-console-muted">{s.body}</p>
              <p className="mt-6 font-display text-2xl font-medium tracking-[-0.01em] text-signal">{s.quote}</p>
            </div>
          ))}
        </div>
        {/* mobile: active band only */}
        <div className="lg:hidden">
          <h3 className="text-[22px] font-medium text-console-text">{seg.title}</h3>
          <p className="mt-2.5 text-pretty text-console-muted">{seg.body}</p>
          <p className="mt-3.5 font-display text-xl font-medium tracking-[-0.01em] text-signal">{seg.quote}</p>
        </div>
      </div>

      <div className="mt-20 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
        {t.stories.map((st, i) => (
          <Reveal key={st.tag} delay={i * 0.1} className="grid content-start gap-3.5 rounded-xl border border-console-line bg-console-2 p-5">
            <div className="flex justify-between font-mono text-[11px] tracking-[0.16em] text-console-muted">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{st.tag}</span>
            </div>
            <div className="overflow-hidden rounded-lg border border-console-line bg-console">
              <SceneIllustration id={st.scene as SceneId} />
            </div>
            <h3 className="text-lg font-medium text-console-text">{st.title}</h3>
            <p className="text-pretty text-sm text-console-muted">{st.body}</p>
            <p className="border-t border-console-line pt-3 text-[12.5px] text-signal">{st.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

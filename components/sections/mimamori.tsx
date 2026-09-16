"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { RING_SEGMENTS, SCENE_FOR_SEG, SEG_HOUR, segFor, type SegId } from "@/lib/site";
import { Section, Kicker, Heading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { RingTimeline } from "@/components/viz/ring-timeline";
import { SceneIllustration, type SceneId } from "@/components/viz/mimamori-scenes";
import { DemoTag } from "@/components/ui/demo-tag";
import { cn } from "@/lib/utils";

/** 24h ring that advances ~1 minute per real second while in view; tabs jump to a time band. */
export function Mimamori() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const [hour, setHour] = useState(10);
  const paused = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current) setHour((h) => (h + 0.1) % 24);
    }, 250);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      paused.current = !e.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const segId = segFor(hour);
  const seg = t.segs.find((s) => s.id === segId) ?? t.segs[0];
  const hh = Math.floor(hour);
  const mm = Math.floor((hour - hh) * 60);
  const label = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;

  return (
    <Section id="mimamori" tone="console">
      <div ref={ref}>
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
        <div className="mt-14 grid items-center gap-[clamp(24px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
          <Reveal className="relative mx-auto w-full max-w-[460px]">
            <RingTimeline
              segments={RING_SEGMENTS}
              activeId={segId}
              hour={hour}
              center={
                <div className="pointer-events-none text-center">
                  <div className="font-mono text-[clamp(28px,4vw,40px)] leading-none text-console-text tabular">{label}</div>
                  <div className="mt-2.5 text-[15px] text-signal">{seg.label}</div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-console-muted">{seg.range}</div>
                </div>
              }
            />
          </Reveal>
          <div>
            <div role="tablist" className="flex flex-wrap gap-2">
              {t.segs.map((s) => {
                const on = s.id === segId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      paused.current = true;
                      setHour(SEG_HOUR[s.id as SegId]);
                    }}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[13.5px] transition-colors",
                      on ? "cursor-default border-signal bg-signal text-console" : "border-console-line text-console-text hover:border-signal",
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
            <div className="console-grid mt-6 rounded-xl border border-console-line bg-console-2 p-5">
              <SceneIllustration id={SCENE_FOR_SEG[segId] as SceneId} />
            </div>
            <h3 className="mt-6 text-[22px] font-medium text-console-text">{seg.title}</h3>
            <p className="mt-2.5 text-pretty text-console-muted">{seg.body}</p>
            <p className="mt-3.5 font-display text-xl italic text-signal">{seg.quote}</p>
          </div>
        </div>
        <div className="mt-[72px] grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
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
      </div>
    </Section>
  );
}

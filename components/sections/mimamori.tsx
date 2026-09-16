"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { RingTimeline } from "@/components/viz/ring-timeline";
import { SceneIllustration, type SceneId } from "@/components/viz/mimamori-scenes";
import { DemoTag } from "@/components/ui/demo-tag";
import { cn } from "@/lib/utils";

const SCENE_HOURS: Record<SceneId, number> = { patrol: 10, standup: 14.5, intake: 18.5, voice: 23.5 };
const CYCLE_MS = 5000;

export function Mimamori() {
  const { t } = useLocale();
  const s = t.mimamori;
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % s.scenes.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, s.scenes.length]);

  const scene = s.scenes[idx];
  const hour = SCENE_HOURS[scene.id as SceneId];
  const active = s.segments.find((seg) => (seg.start < seg.end ? hour >= seg.start && hour < seg.end : hour >= seg.start || hour < seg.end)) ?? s.segments[0];

  return (
    <Section id="mimamori" tone="console" className="console-grid">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} tone="console" aside={<DemoTag tone="console" />} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
          {/* ring */}
          <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <RingTimeline
              segments={s.segments}
              activeId={active.id}
              hour={hour}
              center={
                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-[0.25em] text-console-muted uppercase">{s.ringTitle}</div>
                  <div className="mt-2 font-mono text-3xl text-console-text tabular">
                    {String(Math.floor(hour)).padStart(2, "0")}:{String(Math.round((hour % 1) * 60)).padStart(2, "0")}
                  </div>
                  <div className="mt-2 max-w-[10rem] text-xs text-signal">{active.label}</div>
                </div>
              }
            />
            <ul className="mt-6 grid gap-2">
              {s.segments.map((seg) => (
                <li
                  key={seg.id}
                  className={cn(
                    "flex items-start gap-3 rounded-md border px-3 py-2 text-xs transition-colors",
                    seg.id === active.id ? "border-signal/40 bg-signal/5 text-console-text" : "border-console-line text-console-muted",
                  )}
                >
                  <span className="font-mono tabular">
                    {String(seg.start).padStart(2, "0")}–{String(seg.end).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-medium">{seg.label}</span>
                    <span className="block text-console-muted">{seg.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* storyboard */}
          <Reveal delay={0.1} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="overflow-hidden rounded-lg border border-console-line bg-console-2">
              <div className="flex items-center justify-between border-b border-console-line px-4 py-2.5">
                <span className="font-mono text-[10px] tracking-[0.25em] text-console-muted uppercase">
                  scene {String(idx + 1).padStart(2, "0")} / {String(s.scenes.length).padStart(2, "0")}
                </span>
                <span className="flex gap-1">
                  {s.scenes.map((sc, i) => (
                    <button
                      key={sc.id}
                      type="button"
                      aria-label={sc.title}
                      aria-current={i === idx}
                      onClick={() => setIdx(i)}
                      className={cn("h-1.5 rounded-full transition-all", i === idx ? "w-6 bg-signal" : "w-1.5 bg-console-line hover:bg-console-muted")}
                    />
                  ))}
                </span>
              </div>
              <div className="grid gap-6 p-5 sm:grid-cols-[1.2fr_1fr] sm:p-6">
                <div key={scene.id} className="rounded-md border border-console-line bg-console p-3 motion-safe:animate-[fade_0.5s_ease-out]">
                  <SceneIllustration id={scene.id as SceneId} />
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.2em] text-signal uppercase">{active.label}</div>
                  <h3 className="mt-2 text-xl font-medium text-console-text">{scene.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-console-muted">{scene.body}</p>
                </div>
              </div>
            </div>
            <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {s.scenes.map((sc, i) => (
                <li key={sc.id}>
                  <button
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-current={i === idx}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-left text-xs transition-colors",
                      i === idx ? "border-signal/50 text-console-text" : "border-console-line text-console-muted hover:text-console-text",
                    )}
                  >
                    <span className="mr-2 font-mono text-[10px] text-console-muted">{String(i + 1).padStart(2, "0")}</span>
                    {sc.title}
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-console-muted">{s.footnote}</p>
      </div>
    </Section>
  );
}

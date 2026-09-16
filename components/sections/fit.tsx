"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/context";
import { Section, SectionHeading } from "@/components/site/section";

export function Fit() {
  const { t } = useLocale();
  const s = t.fit;
  const reduce = useReducedMotion();
  return (
    <Section id="fit" tone="paper-2">
      <div className="container-x">
        <SectionHeading num={s.num} title={s.title} lead={s.lead} />
        <ul className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
          {s.items.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-start gap-4 py-4"
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
            >
              <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0" fill="none" stroke="var(--pine)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="3" strokeOpacity="0.5" />
                <motion.path
                  d="M7 12.5l3 3 7-7"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.15 * i + 0.25, duration: 0.4 }}
                />
              </svg>
              <span className="text-base text-ink">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

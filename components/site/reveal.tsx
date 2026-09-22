"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { EASE_ENTER, DUR_ENTER, DUR_SLOW } from "@/lib/motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

type MotionDivProps = Omit<ComponentProps<typeof motion.div>, "children"> & { children?: ReactNode };
type Props = MotionDivProps & { delay?: number; once?: boolean; amount?: number | "some" | "all" };

/** Fade-up on entering the viewport, 320ms, no spring. Honours prefers-reduced-motion. */
export function Reveal({ delay = 0, once = true, amount = 0.15, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string}>{children}</div>;
  return (
    <motion.div variants={variants} initial="hidden" whileInView="show" viewport={{ once, amount }} transition={{ duration: DUR_SLOW, ease: EASE_ENTER, delay }} {...rest}>
      {children}
    </motion.div>
  );
}

/** Parent that staggers its <StaggerItem> children. */
export function Stagger({ stagger = 0.06, children, ...rest }: MotionDivProps & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string}>{children}</div>;
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} transition={{ staggerChildren: stagger }} {...rest}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: MotionDivProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string}>{children}</div>;
  return (
    <motion.div variants={variants} transition={{ duration: DUR_ENTER, ease: EASE_ENTER }} {...rest}>
      {children}
    </motion.div>
  );
}

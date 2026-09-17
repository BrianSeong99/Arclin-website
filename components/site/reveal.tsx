"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

type MotionDivProps = Omit<ComponentProps<typeof motion.div>, "children"> & { children?: ReactNode };
type Props = MotionDivProps & { delay?: number; once?: boolean; amount?: number | "some" | "all" };

/** Fade-up on entering the viewport. Honours prefers-reduced-motion (renders static). */
export function Reveal({ delay = 0, once = true, amount = 0.15, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string}>{children}</div>;
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its Reveal-like children. Use with <Stagger.Item>. */
export function Stagger({ stagger = 0.08, children, ...rest }: MotionDivProps & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: stagger }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: MotionDivProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className as string}>{children}</div>;
  return (
    <motion.div variants={variants} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} {...rest}>
      {children}
    </motion.div>
  );
}

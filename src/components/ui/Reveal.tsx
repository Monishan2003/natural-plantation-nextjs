"use client";

import { motion } from "motion/react";
import { easeEntrance } from "@/lib/motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/** Scroll-reveal wrapper used site-wide. Respects prefers-reduced-motion
 *  via the global CSS reset (animations collapse to ~0ms). */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: easeEntrance, delay }}
    >
      {children}
    </MotionTag>
  );
}

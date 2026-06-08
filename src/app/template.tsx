"use client";

import { motion } from "motion/react";
import { easeEntrance } from "@/lib/motion";

/** Runs on every route change — a quick, restrained fade/rise so navigating
 *  between pages feels smooth without slowing perceived speed. Respects
 *  prefers-reduced-motion via the global CSS reset. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeEntrance }}
    >
      {children}
    </motion.div>
  );
}

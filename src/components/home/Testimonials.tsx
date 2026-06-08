"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/content/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => setI((p) => (p + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % count), 6000);
    return () => clearInterval(t);
  }, [paused, count]);

  const t = TESTIMONIALS[i];

  return (
    <section className="section-y bg-cloud">
      <div className="container-max">
        <SectionHeader eyebrow="What Our Partners Say" title="Trusted across the North & East" />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="rounded-[var(--radius-xl)] bg-white p-8 shadow-card md:p-12">
            <Quote className="text-green-500" size={36} />
            <div className="min-h-[9rem] md:min-h-[7rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 text-body-lg font-medium text-ink"
                >
                  “{t.quote}”
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-display text-sm font-bold text-white">
                {initials(t.name)}
              </span>
              <div>
                <p className="font-semibold text-blue-900">{t.name}</p>
                <p className="text-small text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-soft transition-colors hover:bg-blue-50"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === i ? "w-7 bg-green-600" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-soft transition-colors hover:bg-blue-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

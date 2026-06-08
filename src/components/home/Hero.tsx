"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { easeEntrance } from "@/lib/motion";
import { BRAND } from "@/content/company";

const SLIDES = [
  "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=2000&q=80",
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[88vh] overflow-hidden md:min-h-[92vh] mt-16">
      {/* Mobile: single static priority image (protects LCP) */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={SLIDES[0]}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Desktop: Ken Burns cross-fade */}
      <div className="absolute inset-0 hidden md:block">
        <AnimatePresence>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 8, ease: "linear" }}
            >
              <Image
                src={SLIDES[i]}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/55 to-green-700/55" />

      {/* Content */}
      <div className="container-max relative z-10 flex min-h-[88vh] flex-col justify-center md:min-h-[92vh]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeEntrance }}
          className="eyebrow text-green-300"
        >
          {BRAND.name} · Group of Companies
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeEntrance }}
          className="mt-4 max-w-4xl text-display font-bold text-white"
        >
          Rooted in the North.
          <br />
          <span className="text-green-300">Growing for Sri Lanka.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeEntrance }}
          className="mt-6 max-w-xl text-body-lg text-white/85"
        >
          A diversified Sri Lankan group in retail, agriculture and enterprise —
          built in the Northern Province, serving customers nationwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeEntrance }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link href="/companies" className={buttonVariants("primary")}>
            Explore Our Companies
          </Link>
          <Link
            href="/contact"
            className={buttonVariants(
              "secondary",
              "border-white/70 text-white hover:bg-white/10",
            )}
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Slide indicators + scroll cue */}
      <div className="absolute inset-x-0 bottom-7 z-10 hidden justify-center gap-2 md:flex">
        {SLIDES.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === i ? "w-7 bg-green-300" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center md:hidden">
        <ChevronDown className="animate-bounce text-white/70" size={24} />
      </div>
    </section>
  );
}

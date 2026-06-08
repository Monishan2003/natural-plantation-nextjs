"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { buttonVariants } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";
import { easeEntrance } from "@/lib/motion";

const NAV: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Companies", "/companies"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onHero = false;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-soft backdrop-blur"
      >
        <div className="container-max flex h-16 items-center justify-between">
          <Link href="/" aria-label="Natural Plantation — home">
            <Logo invert={onHero} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "text-sm font-medium transition-colors",
                    onHero
                      ? "text-white/90 hover:text-white"
                      : active
                        ? "text-green-700"
                        : "text-slate-700 hover:text-blue-600",
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <Link href="/contact" className={buttonVariants("primary", "px-5 py-2 min-h-0")}>
              Contact Us
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={clsx(
              "flex h-11 w-11 items-center justify-center rounded-md lg:hidden",
              onHero ? "text-white" : "text-blue-700",
            )}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-blue-600 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easeEntrance }}
            role="dialog"
            aria-modal="true"
          >
            <div className="container-max flex h-16 items-center justify-between">
              <Logo invert />
              <button
                type="button"
                aria-label="Close menu"
                autoFocus
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-md text-white"
              >
                <X size={26} />
              </button>
            </div>

            <motion.ul
              className="container-max mt-6 flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV.map(([label, href]) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-2xl font-semibold text-white"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-6">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className={buttonVariants("white", "w-full")}
                >
                  Contact Us
                </Link>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
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
  const pathname = usePathname();

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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-soft backdrop-blur">
        <div className="container-max flex h-16 items-center justify-between">
          <Link href="/" aria-label="Natural Plantation — home">
            <Logo />
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
                    active ? "text-green-700" : "text-slate-700 hover:text-blue-600",
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
            className="flex h-11 w-11 items-center justify-center rounded-md text-blue-700 lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile slide-in drawer (3/4 width, not full screen) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-ink/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 right-0 z-[70] flex w-[78%] max-w-[330px] flex-col bg-blue-900 shadow-lifted lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: easeEntrance }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <Logo invert />
                <button
                  type="button"
                  aria-label="Close menu"
                  autoFocus
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <motion.nav
                className="flex flex-1 flex-col px-5 pt-3"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {NAV.map(([label, href]) => {
                  const active = pathname === href;
                  return (
                    <motion.div
                      key={href}
                      variants={{
                        hidden: { opacity: 0, x: 22 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={clsx(
                          "flex items-center justify-between border-b border-white/10 py-3.5 font-body text-base font-medium transition-colors",
                          active ? "text-green-300" : "text-white/85 hover:text-white",
                        )}
                      >
                        {label}
                        <ChevronRight
                          size={16}
                          className={active ? "text-green-300" : "text-white/30"}
                        />
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  className="mt-7"
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className={buttonVariants("primary", "w-full")}
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

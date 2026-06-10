"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { easeEntrance } from "@/lib/motion";
import { clsx } from "@/lib/clsx";
import type { Faq, FaqCategory } from "@/lib/queries";

interface Props {
  categories: FaqCategory[];
  faqs: Faq[];
}

export function FaqExplorer({ categories, faqs }: Props) {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      if (activeCat !== "all" && f.category_id !== activeCat) return false;
      if (!q) return true;
      return (
        f.question_en.toLowerCase().includes(q) ||
        f.answer_en.toLowerCase().includes(q)
      );
    });
  }, [faqs, activeCat, query]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    faqs.forEach((f) =>
      m.set(f.category_id, (m.get(f.category_id) ?? 0) + 1),
    );
    return m;
  }, [faqs]);

  function CategoryName(id: string) {
    const c = categories.find((c) => c.id === id);
    return c ? `${c.icon ?? ""} ${c.name_en}`.trim() : "";
  }

  return (
    <div>
      {/* Search */}
      <div className="mx-auto mb-6 max-w-2xl">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-small text-ink shadow-soft placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="mb-8 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setActiveCat("all")}
          className={clsx(
            "rounded-full px-4 py-2 text-small font-medium transition-colors",
            activeCat === "all"
              ? "bg-green-600 text-white"
              : "bg-white text-slate-700 shadow-soft hover:bg-blue-50",
          )}
        >
          All <span className="ml-1 text-xs opacity-70">({faqs.length})</span>
        </button>
        {categories.map((c) => {
          const n = counts.get(c.id) ?? 0;
          if (n === 0) return null;
          const active = activeCat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCat(c.id)}
              className={clsx(
                "rounded-full px-4 py-2 text-small font-medium transition-colors",
                active
                  ? "bg-green-600 text-white"
                  : "bg-white text-slate-700 shadow-soft hover:bg-blue-50",
              )}
            >
              {c.icon} {c.name_en}{" "}
              <span className="ml-1 text-xs opacity-70">({n})</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {visible.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] bg-white p-10 text-center shadow-soft">
          <p className="text-body text-slate-500">
            No questions match — try a different keyword or category.
          </p>
        </div>
      ) : (
        <ul className="mx-auto max-w-3xl space-y-3">
          {visible.map((f) => {
            const isOpen = openId === f.id;
            return (
              <li
                key={f.id}
                className="overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-soft transition-shadow hover:shadow-card"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                >
                  <span className="flex-1">
                    <span className="block text-base font-semibold text-blue-900">
                      {f.question_en}
                    </span>
                    {activeCat === "all" && (
                      <span className="mt-1 block text-xs text-slate-500">
                        {CategoryName(f.category_id)}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    size={20}
                    className={clsx(
                      "shrink-0 text-blue-600 transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeEntrance }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-6 py-5">
                        <p className="text-body leading-relaxed text-slate-700 whitespace-pre-line">
                          {f.answer_en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

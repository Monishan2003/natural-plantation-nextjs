"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/sections/NewsCard";
import { clsx } from "@/lib/clsx";
import type { NewsArticle } from "@/lib/queries";

const PAGE = 6;

export function NewsList({ articles }: { articles: NewsArticle[] }) {
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ["All", ...Array.from(set)];
  }, [articles]);

  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(
    () => (active === "All" ? articles : articles.filter((a) => a.category === active)),
    [active, articles],
  );

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActive(cat);
              setVisible(PAGE);
            }}
            className={clsx(
              "rounded-full px-4 py-2 text-small font-medium transition-colors",
              active === cat
                ? "bg-green-600 text-white"
                : "bg-white text-slate-700 shadow-soft hover:bg-blue-50",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <p className="mt-12 text-center text-body text-slate-500">
          No articles in this category yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a, idx) => (
            <NewsCard key={a.id} article={a} featured={active === "All" && idx === 0} />
          ))}
        </div>
      )}

      {/* Load more */}
      {visible < filtered.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="rounded-full border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Load more articles
          </button>
        </div>
      )}
    </div>
  );
}

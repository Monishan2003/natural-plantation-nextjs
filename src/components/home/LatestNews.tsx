import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { NewsCard } from "@/components/sections/NewsCard";
import type { NewsArticle } from "@/lib/queries";

export function LatestNews({ articles }: { articles: NewsArticle[] }) {
  if (!articles.length) return null;

  return (
    <section className="section-y bg-white">
      <div className="container-max">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            align="left"
            eyebrow="Stay Updated"
            title="Latest news & updates"
            className="mb-0"
          />
          <Link
            href="/news"
            className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-green-700"
          >
            View all news <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((a, idx) => (
            <Reveal key={a.id} delay={idx * 0.08}>
              <NewsCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Card";
import { getBlogPosts, getSiteSetting } from "@/lib/queries";
import { safeImage } from "@/lib/img";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories from the field, the warehouse and the office — long-reads from Natural Plantation on agriculture, retail, sustainability and life in the Northern Province.",
};

interface PageHeroes { blog?: string }

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const [posts, heroes] = await Promise.all([
    getBlogPosts(),
    getSiteSetting<PageHeroes>("page_heroes"),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Natural Plantation Blog"
        title="Stories from the field"
        lead="Long-reads from across the group — agriculture, retail, sustainability, and the people who make it work."
        image={heroes?.blog ?? "/images/agri-team.png"}
      />

      <section className="section-y bg-white">
        <div className="container-max">
          {posts.length === 0 ? (
            <div className="rounded-[var(--radius-lg)] bg-cloud p-12 text-center">
              <p className="text-body text-slate-500">
                No posts published yet — check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, idx) => (
                <Reveal key={p.id} delay={(idx % 3) * 0.06}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block"
                      aria-label={p.title}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={safeImage(p.cover_url, "/images/div-farming.png")}
                          alt={p.title}
                          fill
                          sizes="(max-width:768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      {p.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {p.tags.slice(0, 2).map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                        </div>
                      )}
                      <h2 className="text-h4 font-semibold leading-tight text-blue-900">
                        <Link
                          href={`/blog/${p.slug}`}
                          className="hover:text-green-700"
                        >
                          {p.title}
                        </Link>
                      </h2>
                      {p.excerpt && (
                        <p className="mt-2 line-clamp-3 flex-1 text-small text-slate-700">
                          {p.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} />
                          {formatDate(p.published_at)}
                        </span>
                        {p.reading_time && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {p.reading_time}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-green-700"
                      >
                        Read article <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </>
  );
}

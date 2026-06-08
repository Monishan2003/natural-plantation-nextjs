import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { NewsList } from "@/components/news/NewsList";
import { CTABand } from "@/components/sections/CTABand";
import { getNews } from "@/lib/queries";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "News",
  description:
    "The latest news and updates from across the Natural Plantation group — company, agriculture, retail and community.",
};

export default async function NewsPage() {
  const articles = await getNews();

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News & updates"
        lead="What's happening across the group — from new branches and harvests to community initiatives."
        image="/images/hero-background.png"
      />

      <section className="section-y bg-cloud">
        <div className="container-max">
          {articles.length > 0 ? (
            <NewsList articles={articles} />
          ) : (
            <p className="text-center text-body text-slate-500">No news yet — check back soon.</p>
          )}
        </div>
      </section>

      <CTABand />
    </>
  );
}

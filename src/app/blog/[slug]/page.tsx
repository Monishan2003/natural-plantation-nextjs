import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/Card";
import { CTABand } from "@/components/sections/CTABand";
import { getBlogPost, getBlogPosts } from "@/lib/queries";
import { safeImage } from "@/lib/img";
import { BRAND } from "@/content/company";

export const revalidate = 1800;

// Build-time generation for every published post.
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  // Article JSON-LD — boost SEO and AI-assistant grounding.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_url ? [post.cover_url] : undefined,
    datePublished: post.published_at ?? undefined,
    author: { "@type": "Person", name: post.author || BRAND.name },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
    },
  };

  const isHtml = (post.content ?? "").trim().startsWith("<");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header band — same brand wash, leaves room for the cover */}
      <section className="brand-gradient relative overflow-hidden">
        <div className="container-max pt-28 pb-12 md:pt-32 md:pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> All articles
          </Link>
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <Badge
                  key={t}
                  className="bg-white/15 text-white hover:bg-white/20"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="mt-4 max-w-4xl text-display font-bold leading-tight text-white">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 max-w-2xl text-body-lg text-white/85">
              {post.excerpt}
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-white/75">
            <span className="flex items-center gap-2">
              <User size={15} />
              {post.author || BRAND.name}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={15} />
              {formatDate(post.published_at)}
            </span>
            {post.reading_time && (
              <span className="flex items-center gap-2">
                <Clock size={15} />
                {post.reading_time}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.cover_url && (
        <div className="container-max -mt-10 md:-mt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] shadow-lifted">
            <Image
              src={safeImage(post.cover_url, "/images/div-farming.png")}
              alt={post.title}
              fill
              priority
              sizes="(max-width:1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <section className="section-y bg-white">
        <div className="container-max">
          <article
            className="mx-auto max-w-3xl text-body-lg leading-relaxed text-slate-800
                       [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-h3 [&_h2]:font-bold [&_h2]:text-blue-900
                       [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-h4 [&_h3]:font-semibold [&_h3]:text-blue-900
                       [&_p]:mb-5
                       [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-green-700
                       [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
                       [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-green-500 [&_blockquote]:bg-green-50/40 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic
                       [&_img]:my-6 [&_img]:rounded-[var(--radius-lg)]"
          >
            {isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
            ) : (
              <div className="whitespace-pre-line">{post.content ?? ""}</div>
            )}
          </article>
        </div>
      </section>

      <CTABand />
    </>
  );
}

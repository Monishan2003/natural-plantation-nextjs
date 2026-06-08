import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/Card";
import { safeImage } from "@/lib/img";
import type { NewsArticle } from "@/lib/queries";

const FALLBACK = "/images/div-farming.png";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function NewsCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div
        className={`relative aspect-[16/9] overflow-hidden ${
          featured ? "md:aspect-auto md:w-1/2" : ""
        }`}
      >
        <Image
          src={safeImage(article.image_url, FALLBACK)}
          alt={article.title}
          fill
          sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Badge>{article.category}</Badge>
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:justify-center md:p-9" : ""}`}>
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <CalendarDays size={14} />
          {formatDate(article.date)} · {article.read_time_min} min read
        </p>
        <h3
          className={`mt-2 font-semibold text-blue-900 ${
            featured ? "text-h3" : "text-h4"
          }`}
        >
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-small text-slate-700">{article.excerpt}</p>
        <Link
          href={`/news#${article.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-green-700"
        >
          Read more <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

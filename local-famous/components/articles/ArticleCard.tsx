import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article, priority }: { article: Article; priority?: boolean }) {
  const cat = CATEGORIES.find((c) => c.id === article.category);
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid gap-4 sm:gap-5"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-rule/12">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {cat && (
          <span
            className="absolute left-3 top-3 rounded-full bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: cat.color }}
          >
            {cat.short}
          </span>
        )}
      </div>
      <div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
          <span>{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readingMinutes} min read</span>
        </div>
        <h3 className="mt-2 font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.1] text-balance group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-muted leading-relaxed">
          {article.dek}
        </p>
        <div className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle group-hover:text-accent transition-colors">
          By {article.author} <ArrowUpRight size={12} />
        </div>
      </div>
    </Link>
  );
}

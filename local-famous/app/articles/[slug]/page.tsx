import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles, articleBySlug } from "@/lib/data/articles";
import { episodes } from "@/lib/data/episodes";
import { CATEGORIES } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Reveal } from "@/components/system/Reveal";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      images: [article.coverImage],
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
      images: [article.coverImage],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const cat = CATEGORIES.find((c) => c.id === article.category);
  const related = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);
  const pairedEpisode = article.relatedEpisodeSlug
    ? episodes.find((e) => e.slug === article.relatedEpisodeSlug)
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    image: [article.coverImage],
  };

  return (
    <Reveal>
      <article className="container-app pt-8 sm:pt-10 md:pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={12} /> All articles
        </Link>

        {/* Title block */}
        <header data-reveal className="mt-8 md:mt-12 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
            {cat && (
              <span className="rounded-full px-2 py-0.5" style={{ color: cat.color }}>
                {cat.label}
              </span>
            )}
            <span>·</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readingMinutes} min read</span>
          </div>

          <h1 className="display mt-5 text-[clamp(2.25rem,7vw,5.5rem)]">
            {article.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink-muted leading-relaxed text-balance">
            {article.dek}
          </p>

          <div className="mt-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
            <span className="text-ink">By {article.author}</span>
          </div>
        </header>

        {/* Cover */}
        <figure data-reveal className="mt-10 md:mt-14 -mx-4 md:mx-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-none md:rounded-2xl ring-1 ring-rule/14 shadow-elevate">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
          </div>
        </figure>

        {/* Body */}
        <section data-reveal className="mt-12 md:mt-16 grid gap-12 lg:grid-cols-[1fr_260px]">
          <ArticleBody blocks={article.blocks} />

          {/* Sidebar — related podcast episode + tags */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] self-start space-y-6">
            {pairedEpisode && (
              <Link
                href={`/episodes/${pairedEpisode.slug}`}
                className="group block overflow-hidden rounded-2xl border border-rule/14 bg-surface"
              >
                <div className="relative aspect-[5/3]">
                  <Image
                    src={pairedEpisode.artwork}
                    alt={pairedEpisode.title}
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Paired episode
                  </div>
                  <div className="mt-2 font-serif text-lg leading-[1.15] group-hover:text-accent transition-colors">
                    {pairedEpisode.title}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                    EP {String(pairedEpisode.number).padStart(3, "0")} · Listen →
                  </div>
                </div>
              </Link>
            )}

            {article.tags.length > 0 && (
              <div>
                <div className="eyebrow">
                  <span>Filed under</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {article.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* More */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28 border-t border-rule/12 pt-12">
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-3xl">More like this</h2>
              <Link
                href="/articles"
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent"
              >
                All articles <ArrowRight size={12} />
              </Link>
            </div>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Reveal>
  );
}

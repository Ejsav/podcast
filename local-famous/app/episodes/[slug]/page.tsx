import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Hash, Mic } from "lucide-react";
import { episodes, getEpisode } from "@/lib/data/episodes";
import { getGuest } from "@/lib/data/guests";
import { CATEGORIES } from "@/lib/types";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { TranscriptViewer } from "@/components/episodes/TranscriptViewer";
import { EpisodePlayButton } from "@/components/episodes/EpisodePlayButton";
import { BookmarkButton } from "@/components/episodes/BookmarkButton";
import { ShareTriggerButton } from "@/components/episodes/ShareTriggerButton";
import { ClipsForEpisode } from "@/components/episodes/ClipsForEpisode";
import { articles } from "@/lib/data/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatDate, formatDuration } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) return {};
  return {
    title: ep.title,
    description: ep.description,
    openGraph: {
      title: ep.title,
      description: ep.description,
      type: "article",
      publishedTime: ep.publishedAt,
      images: [{ url: ep.artwork, width: 1200, height: 1200 }],
    },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const ep = getEpisode(slug);
  if (!ep) notFound();

  const guests = ep.guests.map(getGuest).filter(Boolean);
  const cat = CATEGORIES.find((c) => c.id === ep.category);
  const related = episodes
    .filter((e) => e.slug !== ep.slug && e.category === ep.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: ep.title,
    description: ep.description,
    datePublished: ep.publishedAt,
    duration: `PT${Math.floor(ep.duration / 60)}M${ep.duration % 60}S`,
    associatedMedia: { "@type": "MediaObject", contentUrl: ep.audioUrl },
    image: ep.artwork,
    partOfSeries: { "@type": "PodcastSeries", name: "Local Famous" },
  };

  const wordCount = (ep.transcript ?? []).reduce(
    (sum, c) => sum + c.text.split(/\s+/).length,
    0,
  );
  const readingMinutes = Math.max(1, Math.round(wordCount / 220));

  return (
    <article className="container-app pt-10 pb-20 md:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/episodes"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={12} /> All episodes
      </Link>

      {/* HERO */}
      <header className="mt-8 grid gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-rule/14 shadow-elevate">
          <Image
            src={ep.artwork}
            alt={ep.title}
            fill
            sizes="(min-width:1024px) 420px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
            <span>EP {String(ep.number).padStart(3, "0")}</span>
            <span>·</span>
            <span>{formatDate(ep.publishedAt)}</span>
            {cat && (
              <>
                <span>·</span>
                <span className="text-accent">{cat.label}</span>
              </>
            )}
          </div>

          <h1 className="display mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] text-balance">
            {ep.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {ep.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <EpisodePlayButton episode={ep} size="md" />
            <BookmarkButton slug={ep.slug} variant="pill" />
            <ShareTriggerButton episode={ep} />
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-3 max-w-md text-sm">
            <div className="rounded-lg border border-rule/14 bg-surface px-3 py-3">
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-subtle">
                Duration
              </dt>
              <dd className="mt-1 inline-flex items-center gap-1 font-medium tabular-nums">
                <Clock size={12} className="text-ink-muted" />
                {formatDuration(ep.duration)}
              </dd>
            </div>
            <div className="rounded-lg border border-rule/14 bg-surface px-3 py-3">
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-subtle">
                Read
              </dt>
              <dd className="mt-1 inline-flex items-center gap-1 font-medium tabular-nums">
                <Mic size={12} className="text-ink-muted" />
                {readingMinutes} min
              </dd>
            </div>
            <div className="rounded-lg border border-rule/14 bg-surface px-3 py-3">
              <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-subtle">
                Chapters
              </dt>
              <dd className="mt-1 inline-flex items-center gap-1 font-medium tabular-nums">
                <Hash size={12} className="text-ink-muted" />
                {ep.chapters.length}
              </dd>
            </div>
          </dl>

          {ep.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {ep.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* DESCRIPTION + GUESTS */}
      <section className="mt-16 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="prose-editorial max-w-prose">
          <p>{ep.description}</p>
        </div>

        {guests.length > 0 && (
          <aside className="rounded-2xl border border-rule/14 bg-surface p-6">
            <div className="eyebrow"><span>Featured</span></div>
            <ul className="mt-4 grid gap-4">
              {guests.map((g) =>
                g ? (
                  <li key={g.slug}>
                    <Link href={`/guests/${g.slug}`} className="group flex items-center gap-3">
                      <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full ring-1 ring-rule/12">
                        <Image src={g.photo} alt={g.name} fill sizes="48px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-lg leading-tight group-hover:text-accent transition-colors">
                          {g.name}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">{g.role}</span>
                      </span>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </aside>
        )}
      </section>

      {/* CLIPS — quick-share moments from the episode */}
      <ClipsForEpisode episodeSlug={ep.slug} />

      {/* CHAPTERS */}
      <section className="mt-16">
        <div className="editorial-divider">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">№ Chapters</span>
          <span className="h-px bg-rule/12" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">{ep.chapters.length}</span>
        </div>
        <ol className="mt-6 grid gap-2 md:grid-cols-2">
          {ep.chapters.map((c, i) => (
            <li key={c.t} className="flex items-baseline gap-3 rounded-lg border border-rule/12 bg-surface px-4 py-3">
              <span className="font-mono text-[11px] tabular-nums text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[11px] tabular-nums text-accent">{formatDuration(c.t)}</span>
              <span className="flex-1 text-sm">{c.title}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* TRANSCRIPT */}
      <section className="mt-12 md:mt-16">
        <div className="editorial-divider">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">№ Transcript</span>
          <span className="h-px bg-rule/12" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
            {readingMinutes} min read
          </span>
        </div>
        <div className="mt-6">
          <TranscriptViewer episode={ep} />
        </div>
      </section>

      {/* PAIRED ARTICLE */}
      {(() => {
        const paired = articles.find((a) => a.relatedEpisodeSlug === ep.slug);
        if (!paired) return null;
        return (
          <section className="mt-20">
            <div className="editorial-divider">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                № Paired feature
              </span>
              <span className="h-px bg-rule/12" />
              <Link
                href="/articles"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent"
              >
                All articles →
              </Link>
            </div>
            <div className="mt-8 max-w-md">
              <ArticleCard article={paired} />
            </div>
          </section>
        );
      })()}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="editorial-divider">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
              № More from {cat?.label ?? "this thread"}
            </span>
            <span className="h-px bg-rule/12" />
            <Link
              href="/episodes"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-accent"
            >
              All →
            </Link>
          </div>
          <ul className="mt-8 grid gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <EpisodeCard episode={r} variant="horizontal" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

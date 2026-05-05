"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import type { Episode } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import { usePlayer } from "@/components/player/PlayerProvider";
import { formatDate, formatDuration, cn } from "@/lib/utils";

interface Props {
  episode: Episode;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export function EpisodeCard({ episode, variant = "default", className }: Props) {
  const { play, toggle, isPlaying, episode: cur } = usePlayer();
  const isActive = cur?.slug === episode.slug && isPlaying;
  const cat = CATEGORIES.find((c) => c.id === episode.category);

  function onPlay(e: React.MouseEvent) {
    e.preventDefault();
    if (cur?.slug === episode.slug) toggle();
    else play(episode);
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className={cn(
          "group flex gap-4 rounded-xl border border-rule/14 bg-surface p-3 transition-colors hover:border-rule/30",
          className,
        )}
      >
        <div className="relative h-24 w-32 flex-none overflow-hidden rounded-lg ring-1 ring-rule/10">
          <Image
            src={episode.artwork}
            alt={episode.title}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
            <span>EP {String(episode.number).padStart(3, "0")}</span>
            <span>·</span>
            <span>{formatDuration(episode.duration)}</span>
          </div>
          <h3 className="mt-1.5 font-serif text-lg leading-tight text-ink line-clamp-2">
            {episode.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-muted leading-relaxed">{episode.subtitle}</p>
        </div>
        <button
          onClick={onPlay}
          className="grid h-9 w-9 flex-none place-items-center self-start rounded-full border border-rule/15 hover:bg-accent hover:text-accent-fg hover:border-transparent transition-colors"
          aria-label={isActive ? "Pause" : "Play"}
        >
          {isActive ? <Pause size={13} /> : <Play size={13} className="ml-0.5" fill="currentColor" />}
        </button>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/episodes/${episode.slug}`}
        className={cn("group flex flex-col gap-3", className)}
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-lg ring-1 ring-rule/12">
          <Image
            src={episode.artwork}
            alt={episode.title}
            fill
            sizes="(min-width:768px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
            EP {String(episode.number).padStart(3, "0")} · {formatDuration(episode.duration)}
          </div>
          <h3 className="mt-1 font-serif text-base leading-snug line-clamp-2">{episode.title}</h3>
        </div>
      </Link>
    );
  }

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={`/episodes/${episode.slug}`}
        className="block relative overflow-hidden rounded-xl ring-1 ring-rule/12"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={episode.artwork}
            alt={episode.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="rounded-full bg-bg/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
              EP {String(episode.number).padStart(3, "0")}
            </span>
            {cat && (
              <span className="rounded-full bg-bg/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                {cat.short}
              </span>
            )}
          </div>
          <div className="absolute right-3 bottom-3 font-mono text-[10px] tabular-nums text-white/95">
            {formatDuration(episode.duration)}
          </div>
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-2 px-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
          {formatDate(episode.publishedAt)}
        </div>
        <h3 className="font-serif text-2xl leading-[1.1] text-balance">
          <Link href={`/episodes/${episode.slug}`} className="hover:text-accent transition-colors">
            {episode.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink-muted leading-relaxed">{episode.subtitle}</p>
        <div className="mt-1 flex items-center justify-between">
          <button
            onClick={onPlay}
            className="inline-flex items-center gap-1.5 rounded-full border border-rule/15 bg-surface px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-fg hover:border-transparent transition-colors"
          >
            {isActive ? <Pause size={11} /> : <Play size={11} fill="currentColor" />}
            {isActive ? "Pause" : "Play"}
          </button>
          <Link
            href={`/episodes/${episode.slug}`}
            className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
          >
            Show notes <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}

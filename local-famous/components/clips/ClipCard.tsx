"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { episodes } from "@/lib/data/episodes";
import { CATEGORIES } from "@/lib/types";
import type { Clip } from "@/lib/types";
import { formatDuration } from "@/lib/utils";
import { formatViews } from "@/lib/data/clips";
import { cn } from "@/lib/utils";

/**
 * 9:16 editorial clip card. Click starts the parent episode's audio
 * at the clip's startAt timestamp using the existing global player.
 */
export function ClipCard({
  clip,
  className,
}: {
  clip: Clip;
  className?: string;
}) {
  const { play, setExpanded } = usePlayer();
  const episode = episodes.find((e) => e.slug === clip.episodeSlug);
  const cat = CATEGORIES.find((c) => c.id === clip.category);

  if (!episode) return null;

  function onPlay() {
    if (!episode) return;
    play(episode, clip.startAt ?? 0);
    // Open the mini-player expanded sheet for context on mobile.
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setExpanded(true);
    }
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play clip: ${clip.title}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl ring-1 ring-rule/12 bg-surface text-left transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {/* 9:16 media surface */}
      <div className="relative aspect-[9/16] overflow-hidden">
        <Image
          src={clip.thumbnail}
          alt={clip.title}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 70vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

        {/* Category pill */}
        {cat && (
          <span
            className="absolute left-3 top-3 rounded-full bg-bg/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: cat.color }}
          >
            {cat.short}
          </span>
        )}

        {/* Duration */}
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 font-mono text-[10px] text-white tabular-nums">
          {formatDuration(clip.duration)}
        </span>

        {/* Play glyph */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-14 w-14 place-items-center rounded-full bg-bg/90 text-ink shadow-elevate transition-transform duration-300 group-hover:scale-110">
          <Play size={18} fill="currentColor" className="ml-0.5" />
        </span>

        {/* Pull-quote overlay */}
        {clip.quote && (
          <figure className="absolute inset-x-3 bottom-16 sm:bottom-20">
            <blockquote className="font-serif text-[clamp(0.95rem,1.8vw,1.15rem)] leading-[1.15] text-white text-balance italic">
              &ldquo;{clip.quote}&rdquo;
            </blockquote>
          </figure>
        )}

        {/* Bottom meta */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
          <span className="truncate">EP {String(episode.number).padStart(3, "0")}</span>
          <span>{formatViews(clip.views)} plays</span>
        </div>
      </div>

      {/* Card foot */}
      <div className="p-3.5">
        <p className="line-clamp-2 text-sm leading-snug text-ink group-hover:text-accent transition-colors">
          {clip.title}
        </p>
      </div>
    </button>
  );
}

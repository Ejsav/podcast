"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import { episodes } from "@/lib/data/episodes";
import { CATEGORIES } from "@/lib/types";
import { usePlayer } from "@/components/player/PlayerProvider";
import { formatDate, formatDuration } from "@/lib/utils";

export function Coverage() {
  const items = episodes.slice(0, 6);
  const { play, toggle, isPlaying, episode: cur } = usePlayer();

  return (
    <ul data-reveal-stagger className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((ep, i) => {
        const cat = CATEGORIES.find((c) => c.id === ep.category);
        const isActive = cur?.slug === ep.slug && isPlaying;
        return (
          <li
            key={ep.slug}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="group flex flex-col"
          >
            <Link
              href={`/episodes/${ep.slug}`}
              className="block relative overflow-hidden rounded-xl ring-1 ring-rule/12"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={ep.artwork}
                  alt={ep.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="rounded-full bg-bg/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
                    EP {String(ep.number).padStart(3, "0")}
                  </span>
                  {cat && (
                    <span className="rounded-full bg-bg/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                      {cat.label}
                    </span>
                  )}
                </div>
                <div className="absolute right-3 bottom-3 font-mono text-[10px] tabular-nums text-white/95">
                  {formatDuration(ep.duration)}
                </div>
              </div>
            </Link>

            <div className="mt-4 flex flex-col gap-2 px-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                {formatDate(ep.publishedAt)}
              </div>
              <h3 className="font-serif text-2xl leading-[1.1] text-balance">
                <Link href={`/episodes/${ep.slug}`} className="hover:text-accent transition-colors">
                  {ep.title}
                </Link>
              </h3>
              <p className="line-clamp-2 text-sm text-ink-muted leading-relaxed">{ep.subtitle}</p>
              <div className="mt-1 flex items-center justify-between">
                <button
                  onClick={() => (cur?.slug === ep.slug ? toggle() : play(ep))}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rule/15 bg-surface px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-fg hover:border-transparent transition-colors"
                >
                  {isActive ? <Pause size={11} /> : <Play size={11} fill="currentColor" />}
                  {isActive ? "Pause" : "Play"}
                </button>
                <Link
                  href={`/episodes/${ep.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
                >
                  Show notes <ArrowUpRight size={11} />
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

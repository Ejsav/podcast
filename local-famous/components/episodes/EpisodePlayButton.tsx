"use client";

import { Play, Pause } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import type { Episode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  episode: Episode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function EpisodePlayButton({ episode, size = "lg", className }: Props) {
  const { play, toggle, isPlaying, episode: cur } = usePlayer();
  const isActive = cur?.slug === episode.slug && isPlaying;

  function onClick() {
    if (cur?.slug === episode.slug) toggle();
    else play(episode);
  }

  const sizes: Record<string, string> = {
    sm: "h-10 w-10",
    md: "h-12 w-12",
    lg: "h-14 w-14",
  };
  const icon = size === "sm" ? 14 : size === "md" ? 18 : 22;

  return (
    <button
      onClick={onClick}
      className={cn(
        "grid place-items-center rounded-full bg-ink text-bg shadow-elevate transition-all hover:bg-accent hover:text-accent-fg hover:scale-105 active:scale-95",
        sizes[size],
        className,
      )}
      aria-label={isActive ? "Pause episode" : "Play episode"}
    >
      {isActive ? (
        <Pause size={icon} fill="currentColor" />
      ) : (
        <Play size={icon} fill="currentColor" className="ml-0.5" />
      )}
    </button>
  );
}

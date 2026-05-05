"use client";

import { usePlayer } from "@/components/player/PlayerProvider";
import { cn } from "@/lib/utils";

/**
 * "On Air" indicator. Live-pulses red when audio is playing,
 * dims to a small dot when nothing is playing.
 */
export function OnAirDot({ withLabel = true, className }: { withLabel?: boolean; className?: string }) {
  const { isPlaying, episode } = usePlayer();
  const live = isPlaying && !!episode;

  return (
    <span
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inset-0 animate-live-pulse rounded-full bg-live opacity-60" />
        )}
        <span
          className={cn(
            "relative h-2 w-2 rounded-full",
            live ? "bg-live" : "bg-ink/30 dark:bg-ink/40",
          )}
        />
      </span>
      {withLabel && (
        <span className={live ? "text-live" : "text-ink-muted"}>
          {live ? "On Air" : "Off Air"}
        </span>
      )}
    </span>
  );
}

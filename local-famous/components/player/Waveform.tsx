"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

// Deterministic pseudo-waveform so it renders the same on server and client.
function hash(i: number, seed = 1) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function Waveform({
  bars = 120,
  progress = 0,
  onSeek,
  seed = 7,
  className,
  compact = false,
}: {
  bars?: number;
  progress?: number; // 0..1
  onSeek?: (p: number) => void;
  seed?: number;
  className?: string;
  compact?: boolean;
}) {
  const heights = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < bars; i++) {
      const n =
        0.3 +
        0.7 *
          Math.abs(
            Math.sin(i * 0.18 + seed) * 0.6 +
              hash(i, seed) * 0.8 -
              0.2,
          );
      arr.push(Math.min(1, Math.max(0.12, n)));
    }
    return arr;
  }, [bars, seed]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(p);
  }

  return (
    <div
      role={onSeek ? "slider" : undefined}
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuenow={progress}
      aria-label="Seek audio"
      tabIndex={onSeek ? 0 : undefined}
      onClick={handleClick}
      className={cn(
        "relative flex w-full items-center gap-[2px]",
        onSeek && "cursor-pointer",
        compact ? "h-8" : "h-14",
        className,
      )}
    >
      {heights.map((h, i) => {
        const played = i / bars <= progress;
        return (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-full transition-colors",
              played ? "bg-accent" : "bg-rule/25",
            )}
            style={{ height: `${h * 100}%` }}
          />
        );
      })}
    </div>
  );
}

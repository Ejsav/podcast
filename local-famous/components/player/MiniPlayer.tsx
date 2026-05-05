"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Pause,
  Play,
  Rewind,
  FastForward,
  X,
  Gauge,
  Share2,
  ListMusic,
} from "lucide-react";
import { usePlayer } from "./PlayerProvider";
import { Waveform } from "./Waveform";
import { formatDuration } from "@/lib/utils";
import { BookmarkButton } from "@/components/episodes/BookmarkButton";
import { ShareModal } from "@/components/episodes/ShareModal";
import { cn } from "@/lib/utils";

const RATES = [0.8, 1, 1.25, 1.5, 1.75, 2];

export function MiniPlayer() {
  const {
    episode,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    expanded,
    toggle,
    seek,
    skip,
    setExpanded,
    setRate,
    close,
  } = usePlayer();

  const [shareOpen, setShareOpen] = useState(false);

  if (!episode) return null;

  const progress = duration > 0 ? currentTime / duration : 0;
  const activeChapter =
    [...episode.chapters].reverse().find((c) => c.t <= currentTime) ??
    episode.chapters[0];

  return (
    <>
      {/* Expanded sheet — 100dvh hugs the iOS visible area, even with URL bar */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex h-dvh flex-col bg-bg/95 backdrop-blur-2xl transition-transform duration-500 ease-editorial pt-safe pb-safe",
          expanded ? "translate-y-0" : "translate-y-full pointer-events-none",
        )}
        aria-hidden={!expanded}
        data-print-hide
      >
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute -top-40 left-[10%] h-[40rem] w-[40rem] rounded-full bg-accent/15 blur-[140px]" />
          <div className="absolute -bottom-40 right-[5%] h-[34rem] w-[34rem] rounded-full bg-[hsl(40,80%,60%)]/15 blur-[140px]" />
        </div>

        <div className="container-app flex flex-1 flex-col overflow-y-auto py-10">
          <div className="flex items-center justify-between">
            <span className="eyebrow"><span>Now Playing</span></span>
            <button
              onClick={() => setExpanded(false)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 transition-colors"
              aria-label="Minimize player"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="mt-10 grid flex-1 grid-cols-1 gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
            <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-2xl ring-1 ring-rule/15 shadow-elevate">
              <Image
                src={episode.artwork}
                alt={episode.title}
                fill
                sizes="(min-width:1024px) 420px, 90vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                <span>EP {episode.number.toString().padStart(3, "0")}</span>
                <span className="h-1 w-1 rounded-full bg-ink-subtle" />
                <span>{formatDuration(episode.duration)}</span>
              </div>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] text-balance">
                {episode.title}
              </h2>
              {episode.subtitle && (
                <p className="mt-3 max-w-2xl text-base text-ink-muted leading-relaxed">
                  {episode.subtitle}
                </p>
              )}
              {activeChapter && (
                <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-rule/15 bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {activeChapter.title}
                </div>
              )}

              <div className="mt-10">
                <Waveform
                  progress={progress}
                  onSeek={(p) => seek(p * duration)}
                  seed={episode.number}
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-ink-muted">
                  <span>{formatDuration(currentTime)}</span>
                  <span>-{formatDuration(Math.max(0, duration - currentTime))}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => skip(-15)}
                    className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 transition-colors"
                    aria-label="Rewind 15 seconds"
                  >
                    <Rewind size={18} />
                  </button>
                  <button
                    onClick={toggle}
                    className="grid h-16 w-16 place-items-center rounded-full bg-ink text-bg shadow-elevate transition-transform hover:scale-105 active:scale-95"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button
                    onClick={() => skip(30)}
                    className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 transition-colors"
                    aria-label="Forward 30 seconds"
                  >
                    <FastForward size={18} />
                  </button>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <RateMenu rate={playbackRate} setRate={setRate} />
                  <BookmarkButton slug={episode.slug} />
                  <button
                    onClick={() => setShareOpen(true)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-rule/15 hover:bg-surface-2 transition-colors"
                    aria-label="Share with timestamp"
                  >
                    <Share2 size={14} />
                  </button>
                  <button
                    onClick={close}
                    className="grid h-9 w-9 place-items-center rounded-full border border-rule/15 hover:bg-surface-2 transition-colors"
                    aria-label="Close player"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-12 border-t border-rule/12 pt-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                  <ListMusic size={11} /> Chapters · {episode.chapters.length}
                </div>
                <ul className="mt-4 grid gap-1">
                  {episode.chapters.map((ch) => {
                    const active = activeChapter?.t === ch.t;
                    return (
                      <li key={ch.t}>
                        <button
                          onClick={() => seek(ch.t)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                            active
                              ? "bg-surface-2 text-ink"
                              : "text-ink-muted hover:bg-surface-2/60 hover:text-ink",
                          )}
                        >
                          <span className="w-12 font-mono text-[11px] tabular-nums text-ink-subtle">
                            {formatDuration(ch.t)}
                          </span>
                          <span className="flex-1 truncate">{ch.title}</span>
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Link
                href={`/episodes/${episode.slug}`}
                onClick={() => setExpanded(false)}
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                Open full episode page →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mini bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-rule/14 bg-bg/85 backdrop-blur-md transition-transform duration-300 pb-safe",
          expanded ? "translate-y-full" : "translate-y-0",
        )}
        data-print-hide
      >
        {/* Slim progress bar at the very top — GPU-composited scaleX, no width animation */}
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-rule/10">
          <div
            className="h-full w-full origin-left bg-accent"
            style={{ transform: `scaleX(${progress.toFixed(4)})`, willChange: "transform" }}
          />
        </div>

        <div className="container-app flex items-center gap-3 sm:gap-4 py-3">
          <button
            onClick={() => setExpanded(true)}
            className="group flex min-w-0 flex-1 items-center gap-3 text-left"
            aria-label="Expand player"
          >
            <div className="relative h-12 w-12 flex-none overflow-hidden rounded-md ring-1 ring-rule/15">
              <Image
                src={episode.artwork}
                alt={episode.title}
                fill
                sizes="48px"
                className="object-cover"
              />
              {isPlaying && (
                <span className="absolute inset-0 grid place-items-center bg-ink/40">
                  <span className="flex gap-0.5">
                    <Bar />
                    <Bar delay="0.15s" />
                    <Bar delay="0.3s" />
                  </span>
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{episode.title}</div>
              <div className="truncate font-mono text-[11px] tabular-nums text-ink-muted">
                EP {episode.number.toString().padStart(3, "0")} · {formatDuration(currentTime)} / {formatDuration(duration || episode.duration)}
              </div>
            </div>
            <ChevronUp
              size={16}
              className="text-ink-muted transition-transform group-hover:-translate-y-0.5"
            />
          </button>

          <div className="hidden md:block max-w-md flex-[1.4]">
            <Waveform compact progress={progress} onSeek={(p) => seek(p * duration)} seed={episode.number} />
          </div>

          <div className="flex flex-none items-center gap-1">
            <button
              onClick={() => skip(-15)}
              className="hidden sm:grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 transition-colors"
              aria-label="Rewind 15 seconds"
            >
              <Rewind size={15} />
            </button>
            <button
              onClick={toggle}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg hover:bg-accent hover:text-accent-fg transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" className="ml-0.5" />}
            </button>
            <button
              onClick={() => skip(30)}
              className="hidden sm:grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 transition-colors"
              aria-label="Forward 30 seconds"
            >
              <FastForward size={15} />
            </button>
            <button
              onClick={close}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 transition-colors"
              aria-label="Close player"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      <ShareModal
        episode={episode}
        currentTime={currentTime}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </>
  );
}

function Bar({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="block h-3 w-0.5 origin-bottom rounded-full bg-bg/95"
      style={{
        animation: "bar 0.85s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      <style jsx>{`
        @keyframes bar {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </span>
  );
}

function RateMenu({ rate, setRate }: { rate: number; setRate: (r: number) => void }) {
  return (
    <label className="inline-flex items-center gap-1.5 rounded-full border border-rule/15 bg-surface px-2.5 py-1.5 text-xs text-ink-muted">
      <Gauge size={13} />
      <select
        value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
        className="bg-transparent font-mono text-xs text-ink focus:outline-none"
        aria-label="Playback rate"
      >
        {RATES.map((r) => (
          <option key={r} value={r} className="bg-surface text-ink">
            {r}×
          </option>
        ))}
      </select>
    </label>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, AlignLeft, Crosshair } from "lucide-react";
import type { Episode } from "@/lib/types";
import { usePlayer } from "@/components/player/PlayerProvider";
import { formatDuration, cn } from "@/lib/utils";

export function TranscriptViewer({ episode }: { episode: Episode }) {
  const { seek, currentTime, episode: cur } = usePlayer();
  const [q, setQ] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isCurrent = cur?.slug === episode.slug;
  const safeCues = useMemo(() => episode.transcript ?? [], [episode.transcript]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return safeCues;
    return safeCues.filter((c) => c.text.toLowerCase().includes(query));
  }, [q, safeCues]);

  // Determine active cue based on current time
  const activeIndex = useMemo(() => {
    if (!isCurrent) return -1;
    let i = -1;
    for (let k = 0; k < filtered.length; k++) {
      if (filtered[k]!.t <= currentTime) i = k;
      else break;
    }
    return i;
  }, [filtered, currentTime, isCurrent]);

  // Auto-scroll active cue into view
  useEffect(() => {
    if (!autoScroll || activeIndex < 0) return;
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-cue="${activeIndex}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeIndex, autoScroll]);

  function highlight(text: string, term: string) {
    if (!term) return text;
    const i = text.toLowerCase().indexOf(term.toLowerCase());
    if (i < 0) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="rounded bg-accent/25 px-0.5 text-ink">{text.slice(i, i + term.length)}</mark>
        {text.slice(i + term.length)}
      </>
    );
  }

  if (safeCues.length === 0) {
    return (
      <div className="rounded-2xl border border-rule/14 bg-surface px-6 py-12 text-center">
        <AlignLeft size={18} className="mx-auto text-ink-muted" />
        <p className="mt-3 text-sm text-ink-muted">Transcript coming soon.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-rule/14 bg-surface">
      <div className="flex flex-col gap-3 border-b border-rule/12 px-5 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
          <AlignLeft size={11} />
          <span>Transcript</span>
          <span className="text-ink-subtle/70">· {safeCues.length} cues</span>
        </div>
        <div className="flex flex-1 items-center gap-2 sm:justify-end">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={12} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search transcript"
              className="h-9 w-full rounded-full border border-rule/15 bg-bg pl-8 pr-8 text-xs placeholder:text-ink-subtle focus:border-rule/40 focus:outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded-full text-ink-muted hover:bg-surface-2"
                aria-label="Clear search"
              >
                <X size={10} />
              </button>
            )}
          </div>
          <button
            onClick={() => setAutoScroll((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors",
              autoScroll
                ? "border-accent bg-accent-soft/40 text-accent"
                : "border-rule/15 bg-bg text-ink-muted hover:border-rule/30",
            )}
            title="Auto-scroll"
          >
            <Crosshair size={10} />
            Follow
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="max-h-[28rem] overflow-y-auto px-5 py-4"
      >
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-sm text-ink-muted">
            No matches for &ldquo;{q}&rdquo;.
          </div>
        ) : (
          <ul className="grid gap-1">
            {filtered.map((cue, i) => {
              const active = i === activeIndex;
              return (
                <li key={`${cue.t}-${i}`} data-cue={i}>
                  <button
                    onClick={() => seek(cue.t)}
                    className={cn(
                      "group flex w-full gap-4 rounded-md px-3 py-2 text-left transition-colors",
                      active
                        ? "bg-accent-soft/40 text-ink"
                        : "hover:bg-surface-2/70",
                    )}
                  >
                    <span
                      className={cn(
                        "w-12 flex-none font-mono text-[11px] tabular-nums",
                        active ? "text-accent" : "text-ink-subtle",
                      )}
                    >
                      {formatDuration(cue.t)}
                    </span>
                    <span className={cn("text-sm leading-relaxed", active ? "text-ink" : "text-ink-muted")}>
                      {cue.speaker && (
                        <strong className="mr-1.5 font-medium text-ink">{cue.speaker}:</strong>
                      )}
                      {highlight(cue.text, q)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

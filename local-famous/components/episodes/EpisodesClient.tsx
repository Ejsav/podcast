"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, X, Bookmark } from "lucide-react";
import type { Episode } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import { EpisodeCard } from "./EpisodeCard";
import { useBookmarks } from "@/lib/hooks/useBookmarks";
import { cn } from "@/lib/utils";

export function EpisodesClient({ episodes }: { episodes: Episode[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const { slugs: bookmarks, hydrated } = useBookmarks();

  // honor /episodes?bookmarks=1 from command palette
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("bookmarks") === "1") setOnlyBookmarked(true);
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return episodes.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (onlyBookmarked && hydrated && !bookmarks.includes(e.slug)) return false;
      if (!query) return true;
      const hay = `${e.title} ${e.subtitle} ${e.description} ${e.tags.join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [episodes, q, cat, onlyBookmarked, bookmarks, hydrated]);

  const totalSaved = hydrated ? bookmarks.length : 0;

  return (
    <div>
      {/* Sticky filter bar — sits exactly below the fixed header */}
      <div
        className="sticky z-20 -mx-4 mb-10 border-y border-rule/14 bg-bg/90 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 sm:py-4 lg:-mx-12 lg:px-12"
        style={{ top: "var(--header-h)" }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1 max-w-xl">
            <Search size={14} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search episodes by title, guest, neighborhood…"
              className="h-11 w-full rounded-full border border-rule/15 bg-surface pl-10 pr-10 text-sm placeholder:text-ink-subtle focus:border-rule/40 focus:outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-ink-muted hover:bg-surface-2"
                aria-label="Clear"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCat("all")}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                cat === "all"
                  ? "border-ink bg-ink text-bg"
                  : "border-rule/15 bg-surface text-ink-muted hover:border-rule/30",
              )}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  cat === c.id
                    ? "border-ink bg-ink text-bg"
                    : "border-rule/15 bg-surface text-ink-muted hover:border-rule/30",
                )}
              >
                {c.short}
              </button>
            ))}

            <span className="mx-1 hidden h-5 w-px bg-rule/15 lg:block" />

            <button
              onClick={() => setOnlyBookmarked((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                onlyBookmarked
                  ? "border-accent bg-accent-soft/40 text-accent"
                  : "border-rule/15 bg-surface text-ink-muted hover:border-rule/30",
              )}
            >
              <Bookmark size={12} />
              Saved {hydrated && totalSaved > 0 && <span className="font-mono">({totalSaved})</span>}
            </button>

            <span className="ml-auto inline-flex rounded-full border border-rule/15 bg-surface p-0.5 font-mono text-[10px] uppercase tracking-[0.14em]">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded-full px-3 py-1.5 transition-colors",
                    view === v ? "bg-ink text-bg" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {v}
                </button>
              ))}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
          <span>
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
            {q && ` for "${q}"`}
          </span>
          {(q || cat !== "all" || onlyBookmarked) && (
            <button
              onClick={() => {
                setQ("");
                setCat("all");
                setOnlyBookmarked(false);
              }}
              className="text-accent hover:underline underline-offset-4 normal-case tracking-normal text-[11px]"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-rule/14 bg-surface px-6 py-24 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-surface-2">
            <Search size={16} className="text-ink-muted" />
          </div>
          <h3 className="mt-4 font-serif text-2xl">Nothing matches.</h3>
          <p className="mt-2 text-sm text-ink-muted">Try a different search or category.</p>
        </div>
      ) : view === "grid" ? (
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep) => (
            <li key={ep.slug}>
              <EpisodeCard episode={ep} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-3">
          {filtered.map((ep) => (
            <li key={ep.slug}>
              <EpisodeCard episode={ep} variant="horizontal" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

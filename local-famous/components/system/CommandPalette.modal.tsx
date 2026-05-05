"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Mic,
  Users,
  Building2,
  Send,
  Star,
  Sparkles,
  Sun,
  Moon,
  Bookmark,
  Keyboard,
  Play,
  FileText,
} from "lucide-react";
import { episodes } from "@/lib/data/episodes";
import { guests } from "@/lib/data/guests";
import { businesses } from "@/lib/data/businesses";
import { articles } from "@/lib/data/articles";
import { useTheme } from "./ThemeProvider";
import { usePlayer } from "@/components/player/PlayerProvider";
import { cn } from "@/lib/utils";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Episodes" | "Articles" | "Guests" | "Directory" | "Actions";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  run: () => void;
  keywords?: string;
};

export default function PaletteModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { theme, toggle: toggleTheme } = useTheme();
  const { play } = usePlayer();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const commands: Cmd[] = useMemo(() => {
    const nav: Cmd[] = [
      { id: "nav-home", label: "Home", group: "Navigate", icon: Sparkles, run: () => router.push("/") },
      { id: "nav-episodes", label: "All Episodes", group: "Navigate", icon: Mic, run: () => router.push("/episodes") },
      { id: "nav-directory", label: "Local Directory", group: "Navigate", icon: Star, run: () => router.push("/local-directory") },
      { id: "nav-submit", label: "Submit a Story", group: "Navigate", icon: Send, run: () => router.push("/submit-a-story") },
      { id: "nav-feature", label: "Be Featured", group: "Navigate", icon: Users, run: () => router.push("/be-featured") },
      { id: "nav-sponsor", label: "Sponsor", group: "Navigate", icon: Building2, run: () => router.push("/sponsor") },
    ];

    const ep: Cmd[] = episodes.map((e) => ({
      id: `ep-${e.slug}`,
      label: e.title,
      hint: `EP ${String(e.number).padStart(3, "0")}`,
      group: "Episodes",
      icon: Play,
      keywords: e.tags.join(" ") + " " + e.subtitle,
      run: () => {
        play(e);
        router.push(`/episodes/${e.slug}`);
      },
    }));

    const arts: Cmd[] = articles.map((a) => ({
      id: `art-${a.slug}`,
      label: a.title,
      hint: `${a.readingMinutes} min`,
      group: "Articles",
      icon: FileText,
      keywords: a.tags.join(" ") + " " + a.dek + " " + a.author,
      run: () => router.push(`/articles/${a.slug}`),
    }));

    const gs: Cmd[] = guests.map((g) => ({
      id: `g-${g.slug}`,
      label: g.name,
      hint: g.role,
      group: "Guests",
      icon: Users,
      keywords: (g.location ?? "") + " " + g.role,
      run: () => router.push(`/guests/${g.slug}`),
    }));

    const biz: Cmd[] = businesses.map((b) => ({
      id: `b-${b.slug}`,
      label: b.name,
      hint: `${b.category} · ${b.neighborhood}`,
      group: "Directory",
      icon: Star,
      keywords: b.tagline,
      run: () => router.push("/local-directory"),
    }));

    const actions: Cmd[] = [
      {
        id: "a-theme",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        icon: theme === "dark" ? Sun : Moon,
        run: () => toggleTheme(),
      },
      {
        id: "a-bookmarks",
        label: "View bookmarks",
        group: "Actions",
        icon: Bookmark,
        run: () => router.push("/episodes?bookmarks=1"),
      },
      {
        id: "a-keys",
        label: "Show keyboard shortcuts",
        group: "Actions",
        icon: Keyboard,
        run: () => window.dispatchEvent(new CustomEvent("lf:show-shortcuts")),
      },
    ];

    return [...nav, ...ep, ...arts, ...gs, ...biz, ...actions];
  }, [router, play, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase();
      return hay.includes(query);
    });
  }, [commands, q]);

  const grouped = useMemo(() => {
    const m = new Map<Cmd["group"], Cmd[]>();
    filtered.forEach((c) => {
      if (!m.has(c.group)) m.set(c.group, []);
      m.get(c.group)!.push(c);
    });
    return Array.from(m.entries());
  }, [filtered]);

  const flat = filtered;

  useEffect(() => setActive(0), [q]);

  function execute(c: Cmd) {
    onClose();
    setTimeout(() => c.run(), 0);
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-start justify-center px-3 sm:px-4 pt-[8vh] sm:pt-[14vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-md" />
      <div
        role="dialog"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-rule/15 bg-surface shadow-elevate"
      >
        <div className="flex items-center gap-3 border-b border-rule/12 px-4">
          <Search size={16} className="text-ink-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search episodes, guests, businesses, actions…"
            className="h-12 w-full bg-transparent text-[16px] sm:text-[15px] outline-none placeholder:text-ink-subtle"
            inputMode="search"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, flat.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") {
                const c = flat[active];
                if (c) execute(c);
              }
            }}
          />
          <kbd className="hidden sm:inline-block rounded border border-rule/15 bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60dvh] sm:max-h-[55vh] overflow-y-auto py-2 overscroll-contain">
          {flat.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-ink-muted">
              No results for &ldquo;{q}&rdquo;
            </div>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group}>
                <div className="eyebrow !text-[10px] mt-2 px-5 py-1.5 !text-ink-subtle">
                  <span>{group}</span>
                </div>
                {items.map((c) => {
                  const idx = flat.indexOf(c);
                  const Icon = c.icon;
                  const isActive = idx === active;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => execute(c)}
                      onMouseEnter={() => setActive(idx)}
                      className={cn(
                        "flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors",
                        isActive ? "bg-surface-2" : "hover:bg-surface-2/60",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 flex-none items-center justify-center rounded-md border border-rule/12",
                          isActive ? "bg-accent text-accent-fg border-transparent" : "bg-surface text-ink-muted",
                        )}
                      >
                        <Icon size={13} />
                      </span>
                      <span className="flex-1 truncate text-ink">{c.label}</span>
                      {c.hint && (
                        <span className="hidden sm:block font-mono text-[11px] text-ink-subtle">
                          {c.hint}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-rule/12 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
          <div className="hidden sm:flex items-center gap-3">
            <span><kbd className="rounded border border-rule/20 px-1">↑↓</kbd> navigate</span>
            <span><kbd className="rounded border border-rule/20 px-1">↵</kbd> select</span>
          </div>
          <span className="ml-auto">{flat.length} results</span>
        </div>
      </div>
    </div>
  );
}

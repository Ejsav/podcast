"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect } from "react";
import { useBookmarks } from "@/lib/hooks/useBookmarks";
import { cn } from "@/lib/utils";

interface Props {
  slug: string;
  variant?: "icon" | "pill";
  className?: string;
}

export function BookmarkButton({ slug, variant = "icon", className }: Props) {
  const { has, toggle, hydrated } = useBookmarks();
  const saved = hydrated && has(slug);

  // Keyboard: B to bookmark current
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target;
      const inField =
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (e.key.toLowerCase() === "b" && !inField && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggle(slug);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug, toggle]);

  if (variant === "pill") {
    return (
      <button
        onClick={() => toggle(slug)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
          saved
            ? "border-accent/40 bg-accent-soft/40 text-accent dark:text-accent dark:bg-accent-soft"
            : "border-rule/15 bg-surface text-ink-muted hover:bg-surface-2 hover:text-ink",
          className,
        )}
        aria-pressed={saved}
        aria-label={saved ? "Remove bookmark" : "Save for later"}
      >
        {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={() => toggle(slug)}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border transition-colors",
        saved
          ? "border-accent/30 bg-accent-soft/40 text-accent"
          : "border-rule/15 hover:bg-surface-2 text-ink-muted hover:text-ink",
        className,
      )}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Save for later"}
      title={saved ? "Remove bookmark · B" : "Save for later · B"}
    >
      {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["/"], label: "Open command palette (no modifier)" },
  { keys: ["?"], label: "Show this shortcuts panel" },
  { keys: ["Space"], label: "Play / pause current episode" },
  { keys: ["⇧", "←"], label: "Skip back 15 seconds" },
  { keys: ["⇧", "→"], label: "Skip forward 30 seconds" },
  { keys: ["T"], label: "Toggle light / dark theme" },
  { keys: ["B"], label: "Bookmark current episode" },
  { keys: ["Esc"], label: "Close any open dialog" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onShow() {
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      const t = e.target;
      const inField =
        t instanceof HTMLElement &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);

      if (e.key === "?" && !inField) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("lf:show-shortcuts", onShow);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("lf:show-shortcuts", onShow);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[75] grid place-items-center px-4"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-label="Keyboard shortcuts"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-rule/15 bg-surface shadow-elevate"
      >
        <div className="flex items-center justify-between border-b border-rule/12 px-5 py-4">
          <div>
            <div className="eyebrow !text-[10px]"><span>Reference</span></div>
            <div className="mt-1 font-serif text-xl">Keyboard shortcuts</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-2"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <ul className="divide-y divide-rule/10">
          {SHORTCUTS.map((s) => (
            <li key={s.label} className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-ink">{s.label}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-rule/15 bg-surface-2 px-1.5 font-mono text-[11px] text-ink"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-rule/12 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
          Press <kbd className="rounded border border-rule/20 px-1">?</kbd> any time
        </div>
      </div>
    </div>
  );
}

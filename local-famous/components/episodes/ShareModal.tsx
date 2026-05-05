"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Copy, Check, Twitter, Facebook, Mail, Link as LinkIcon } from "lucide-react";
import type { Episode } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

interface Props {
  episode: Episode;
  currentTime?: number;
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ episode, currentTime = 0, open, onClose }: Props) {
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    const u = new URL(`/episodes/${episode.slug}`, window.location.origin);
    if (includeTimestamp && currentTime > 1) {
      u.searchParams.set("t", String(Math.floor(currentTime)));
    }
    return u.toString();
  }, [episode.slug, includeTimestamp, currentTime]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  const shareText = `${episode.title} — Local Famous`;

  const targets = [
    {
      label: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-label="Share episode"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-rule/15 bg-surface shadow-elevate"
      >
        <div className="flex items-start justify-between border-b border-rule/12 px-5 py-4">
          <div>
            <div className="eyebrow !text-[10px]"><span>Share</span></div>
            <h3 className="mt-1 font-serif text-xl">{episode.title}</h3>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
              EP {String(episode.number).padStart(3, "0")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-2"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <label className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-4 py-3 text-sm">
            <span className="flex items-center gap-2 text-ink">
              <span>Start at</span>
              <span className="font-mono text-xs text-ink-muted tabular-nums">
                {formatDuration(currentTime)}
              </span>
            </span>
            <span
              className="relative inline-flex h-5 w-9 cursor-pointer items-center"
              role="switch"
              aria-checked={includeTimestamp}
              tabIndex={0}
              onClick={() => setIncludeTimestamp((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIncludeTimestamp((v) => !v);
                }
              }}
            >
              <span
                className={
                  "absolute inset-0 rounded-full transition-colors " +
                  (includeTimestamp ? "bg-accent" : "bg-rule/20")
                }
              />
              <span
                className={
                  "absolute h-4 w-4 rounded-full bg-bg shadow transition-transform " +
                  (includeTimestamp ? "translate-x-[18px]" : "translate-x-0.5")
                }
              />
            </span>
          </label>

          <div className="flex items-center gap-2 rounded-lg border border-rule/15 bg-bg p-1 pl-3">
            <LinkIcon size={13} className="text-ink-subtle" />
            <input
              readOnly
              value={url}
              className="h-9 flex-1 truncate bg-transparent font-mono text-xs text-ink focus:outline-none"
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              onClick={copyLink}
              className={
                "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors " +
                (copied ? "bg-accent text-accent-fg" : "bg-ink text-bg hover:bg-accent hover:text-accent-fg")
              }
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {targets.map((t) => (
              <a
                key={t.label}
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg border border-rule/12 bg-surface px-3 py-4 text-xs text-ink-muted hover:border-rule/30 hover:bg-surface-2 hover:text-ink transition-colors"
              >
                <t.icon size={14} />
                {t.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

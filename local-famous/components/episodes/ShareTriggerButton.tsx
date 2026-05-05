"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import type { Episode } from "@/lib/types";
import { ShareModal } from "./ShareModal";
import { usePlayer } from "@/components/player/PlayerProvider";

export function ShareTriggerButton({ episode }: { episode: Episode }) {
  const [open, setOpen] = useState(false);
  const { episode: cur, currentTime } = usePlayer();
  const t = cur?.slug === episode.slug ? currentTime : 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-rule/15 bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors"
      >
        <Share2 size={12} />
        Share
      </button>
      <ShareModal episode={episode} currentTime={t} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

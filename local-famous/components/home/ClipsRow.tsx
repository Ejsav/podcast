"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clips } from "@/lib/data/clips";
import { ClipCard } from "@/components/clips/ClipCard";

/**
 * Horizontally-scrolling strip of 9:16 clips for the home page.
 * Snap points + arrow buttons + edge fades.
 */
export function ClipsRow() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-clip-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Edge fades — hidden on very small screens where they cut content */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 sm:w-12 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 sm:w-12 bg-gradient-to-l from-bg to-transparent" />

      {/* Arrow controls — desktop only */}
      <div className="hidden md:flex absolute -top-14 right-0 gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll clips left"
          className="grid h-9 w-9 place-items-center rounded-full border border-rule/15 bg-surface hover:bg-surface-2 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll clips right"
          className="grid h-9 w-9 place-items-center rounded-full border border-rule/15 bg-surface hover:bg-surface-2 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scroll-px-4 sm:scroll-px-8 lg:scroll-px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {clips.map((c) => (
          <div
            key={c.id}
            data-clip-card
            className="w-[64vw] max-w-[14rem] sm:w-[15rem] md:w-[16rem] lg:w-[15rem] shrink-0 snap-start"
          >
            <ClipCard clip={c} />
          </div>
        ))}
      </div>
    </div>
  );
}

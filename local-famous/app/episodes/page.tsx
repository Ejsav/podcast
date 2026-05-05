import type { Metadata } from "next";
import { episodes } from "@/lib/data/episodes";
import { EpisodesClient } from "@/components/episodes/EpisodesClient";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "The full Local Famous archive. Local culture, business, drama, events, and the personalities everyone is talking about.",
};

export default function EpisodesIndexPage() {
  const sorted = [...episodes].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="container-app pt-14 pb-20 md:pt-20">
      <header className="border-b border-rule/14 pb-8">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span>№ Archive</span>
          <span>{sorted.length} episodes</span>
        </div>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)] text-balance">
          Every <em className="serif-italic text-accent">dispatch</em>, in one place.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-ink-muted leading-relaxed">
          Browse the full archive, filter by category, search by guest or neighborhood, and save the ones you want to come back to. The good stuff doesn&rsquo;t expire.
        </p>
      </header>

      <div className="mt-4">
        <EpisodesClient episodes={sorted} />
      </div>
    </div>
  );
}

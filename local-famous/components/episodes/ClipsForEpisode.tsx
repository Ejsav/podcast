import { clipsForEpisode } from "@/lib/data/clips";
import { ClipCard } from "@/components/clips/ClipCard";

/**
 * Server component wrapper — renders a small grid of clips
 * pulled directly from the parent episode's audio.
 */
export function ClipsForEpisode({ episodeSlug }: { episodeSlug: string }) {
  const clips = clipsForEpisode(episodeSlug);
  if (clips.length === 0) return null;

  return (
    <section className="mt-12 md:mt-16">
      <div className="editorial-divider">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          № Clips
        </span>
        <span className="h-px bg-rule/12" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          {clips.length} from this episode
        </span>
      </div>
      <p className="mt-4 max-w-prose text-sm text-ink-muted">
        Tap a clip to jump to that moment in the episode.
      </p>
      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {clips.map((c) => (
          <ClipCard key={c.id} clip={c} />
        ))}
      </div>
    </section>
  );
}

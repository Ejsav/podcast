import type { Clip } from "@/lib/types";

export const clips: Clip[] = [
  {
    id: "clip-1",
    episodeSlug: "sofia-marin-insurgent-campaign",
    title: "\"They didn't expect a teacher to show up with receipts.\"",
    thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    duration: 47,
    views: 4_200_000,
    category: "social-drama",
    startAt: 320,
    quote: "They didn't expect a teacher to show up with receipts.",
  },
  {
    id: "clip-2",
    episodeSlug: "maya-okafor-supper-club-empire",
    title: "The investor offer she turned down on speakerphone",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    duration: 62,
    views: 1_800_000,
    category: "local-businesses",
    startAt: 780,
    quote: "I don't want to be a restaurant. I want to be the reason you called your mom.",
  },
  {
    id: "clip-3",
    episodeSlug: "lena-park-nightlife-kingmaker",
    title: "\"I booked him when nobody would let him in the building.\"",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    duration: 38,
    views: 980_000,
    category: "food-nightlife",
    startAt: 1420,
    quote: "I booked him when nobody would let him in the building.",
  },
  {
    id: "clip-4",
    episodeSlug: "jamal-reyes-state-champs",
    title: "The parent meeting that rebuilt the program",
    thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80",
    duration: 81,
    views: 2_100_000,
    category: "events-culture",
    startAt: 512,
  },
  {
    id: "clip-5",
    episodeSlug: "devin-cross-barbershop-power",
    title: "\"Three candidates in one Saturday. Same chair.\"",
    thumbnail: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    duration: 54,
    views: 720_000,
    category: "popular-people",
    startAt: 890,
    quote: "Three candidates in one Saturday. Same chair.",
  },
  {
    id: "clip-6",
    episodeSlug: "ty-richardson-sneaker-empire",
    title: "The one rule that built a seven-figure business",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    duration: 44,
    views: 3_300_000,
    category: "national-conversations",
    startAt: 1860,
  },
];

export function clipsForEpisode(episodeSlug: string): Clip[] {
  return clips.filter((c) => c.episodeSlug === episodeSlug);
}

export function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

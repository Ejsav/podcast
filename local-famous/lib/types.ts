export type Category =
  | "local-businesses"
  | "popular-people"
  | "social-drama"
  | "events-culture"
  | "food-nightlife"
  | "national-conversations";

export const CATEGORIES: { id: Category; label: string; short: string; color: string }[] = [
  { id: "local-businesses", label: "Local Businesses", short: "Business", color: "#D7FF1C" },
  { id: "popular-people", label: "Popular People", short: "People", color: "#6BB8FF" },
  { id: "social-drama", label: "Social Drama", short: "Drama", color: "#FF4D3D" },
  { id: "events-culture", label: "Events & Culture", short: "Events", color: "#B57BFF" },
  { id: "food-nightlife", label: "Food & Nightlife", short: "Food", color: "#FFB03D" },
  { id: "national-conversations", label: "National Conversations", short: "National", color: "#4DFFB0" },
];

export interface Guest {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  location?: string;
  links?: { label: string; href: string }[];
}

export interface Chapter {
  t: number; // seconds
  title: string;
}

export interface TranscriptCue {
  t: number; // seconds
  end: number;
  speaker: string;
  text: string;
}

export interface Episode {
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  description: string;
  publishedAt: string; // ISO
  duration: number; // seconds
  audioUrl: string;
  artwork: string;
  category: Category;
  tags: string[];
  guests: string[]; // guest slugs
  chapters: Chapter[];
  transcript: TranscriptCue[];
  featured?: boolean;
}

export interface Clip {
  id: string;
  episodeSlug: string;
  title: string;
  thumbnail: string;
  duration: number; // seconds
  views: number;
  category: Category;
  /** Optional seek point inside the parent episode audio */
  startAt?: number;
  /** Optional direct-playable MP4 for audiograms / video clips */
  videoUrl?: string;
  /** Optional pull-quote overlay */
  quote?: string;
}

/**
 * Article = long-form written feature that complements the podcast.
 * Blocks are rendered by ArticleBody — each block type maps to an
 * element in the editorial prose stylesheet.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "pullquote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "divider" };

export interface Article {
  slug: string;
  title: string;
  dek: string; // subtitle / deck
  author: string;
  publishedAt: string; // ISO
  readingMinutes: number;
  coverImage: string;
  category: Category;
  tags: string[];
  /** Optional reference to the episode this article pairs with */
  relatedEpisodeSlug?: string;
  blocks: ArticleBlock[];
  featured?: boolean;
}

export interface Business {
  slug: string;
  name: string;
  tagline: string;
  category: string; // e.g., "Coffee", "Barbershop", "Nightlife"
  neighborhood: string;
  photo: string;
  rating: number; // 0-5
  featured?: boolean;
  description: string;
  website?: string;
  address?: string;
}

export interface Person {
  slug: string;
  name: string;
  handle: string;
  role: string; // "Chef", "DJ", "Business owner", "Athlete"
  neighborhood?: string;
  photo: string;
  followers: string; // display string like "42K"
  tagline: string;
}

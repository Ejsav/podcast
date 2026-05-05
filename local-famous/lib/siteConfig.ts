/**
 * Single source of truth for site-level config.
 * Override via environment variables in Vercel / .env.local.
 */
export const siteConfig = {
  name: "Local Famous",
  tagline: "The people, places, drama, and businesses everyone is talking about.",
  description:
    "An editorial podcast on local culture, business, drama, events, and the personalities everyone is talking about. New episode every Tuesday.",

  /** Public site URL (without trailing slash) */
  url:
    (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
      "https://localfamous.fm"),

  /** Where RSS feed is served */
  feedPath: "/feed.xml",

  /** Artwork used for podcast directories (3000x3000 recommended) */
  coverArt:
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=3000&q=80",

  podcast: {
    language: "en-us",
    author: "Local Famous Media",
    ownerName: "Local Famous Media",
    ownerEmail: "hello@localfamous.fm",
    category: "Society & Culture",
    subcategory: "Places & Travel",
    explicit: false,
    copyright: `© ${new Date().getFullYear()} Local Famous Media`,
    /** Apple Podcasts requires these to be valid */
    type: "episodic" as const,
  },

  social: {
    twitter: "@localfamous",
    instagram: "https://instagram.com/localfamous",
    youtube: "https://youtube.com/@localfamous",
    tiktok: "https://tiktok.com/@localfamous",
  },

  contact: {
    tips: "tips@localfamous.fm",
    sponsor: "sponsor@localfamous.fm",
    press: "press@localfamous.fm",
  },
} as const;

export type SiteConfig = typeof siteConfig;

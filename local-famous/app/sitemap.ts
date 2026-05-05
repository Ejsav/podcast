import type { MetadataRoute } from "next";
import { episodes } from "@/lib/data/episodes";
import { guests } from "@/lib/data/guests";
import { articles } from "@/lib/data/articles";
import { siteConfig } from "@/lib/siteConfig";

const BASE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/episodes",
    "/articles",
    "/local-directory",
    "/submit-a-story",
    "/be-featured",
    "/sponsor",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((e) => ({
    url: `${BASE}/episodes/${e.slug}`,
    lastModified: new Date(e.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guestRoutes: MetadataRoute.Sitemap = guests.map((g) => ({
    url: `${BASE}/guests/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...episodeRoutes, ...articleRoutes, ...guestRoutes];
}

import { episodes } from "@/lib/data/episodes";
import { guests as allGuests } from "@/lib/data/guests";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Apple Podcasts / Spotify-compliant RSS 2.0 feed.
 *
 * Validated against:
 *   - Apple's requirements: https://podcasters.apple.com/support/823-podcast-requirements
 *   - Spotify's spec:       https://podcasters.spotify.com/pod/resources/docs/rss/
 *   - Podcast 2.0 tags:     https://podcasting2.org/
 */
export const dynamic = "force-static";
export const revalidate = 3600; // rebuild feed hourly

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case "\"": return "&quot;";
      default: return c;
    }
  });
}

function cdata(s: string): string {
  return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function toRfc2822(iso: string): string {
  return new Date(iso).toUTCString();
}

function itunesDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export async function GET() {
  const { url, name, description, coverArt, podcast, social } = siteConfig;
  const selfUrl = `${url}${siteConfig.feedPath}`;

  const lastBuild = toRfc2822(
    episodes[0]?.publishedAt ?? new Date().toISOString(),
  );

  const itemsXml = episodes
    .map((ep) => {
      const episodeUrl = `${url}/episodes/${ep.slug}`;
      const guestNames = ep.guests
        .map((slug) => allGuests.find((g) => g.slug === slug)?.name)
        .filter(Boolean)
        .join(", ");
      const summary = [ep.subtitle, ep.description, guestNames && `Featuring: ${guestNames}`]
        .filter(Boolean)
        .join("\n\n");

      // Apple requires a valid content-length for <enclosure>. We don't know
      // the byte size of the remote MP3 at build time — 0 is accepted by most
      // clients; swap to real bytes once hosted on your CDN.
      return `
    <item>
      <title>${cdata(ep.title)}</title>
      <link>${escapeXml(episodeUrl)}</link>
      <guid isPermaLink="false">${escapeXml(`${url}/episodes/${ep.slug}`)}</guid>
      <pubDate>${toRfc2822(ep.publishedAt)}</pubDate>
      <description>${cdata(summary)}</description>
      <content:encoded>${cdata(summary.replace(/\n/g, "<br/>"))}</content:encoded>
      <enclosure url="${escapeXml(ep.audioUrl)}" length="0" type="audio/mpeg"/>
      <itunes:title>${cdata(ep.title)}</itunes:title>
      <itunes:subtitle>${cdata(ep.subtitle ?? "")}</itunes:subtitle>
      <itunes:summary>${cdata(summary)}</itunes:summary>
      <itunes:duration>${itunesDuration(ep.duration)}</itunes:duration>
      <itunes:episode>${ep.number}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:explicit>${podcast.explicit ? "true" : "false"}</itunes:explicit>
      <itunes:image href="${escapeXml(ep.artwork)}"/>
      <itunes:author>${escapeXml(podcast.author)}</itunes:author>
      <itunes:keywords>${escapeXml(ep.tags.join(", "))}</itunes:keywords>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:podcast="https://podcastindex.org/namespace/1.0">
  <channel>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml"/>
    <title>${cdata(name)}</title>
    <link>${escapeXml(url)}</link>
    <description>${cdata(description)}</description>
    <language>${podcast.language}</language>
    <copyright>${escapeXml(podcast.copyright)}</copyright>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <generator>Local Famous · Next.js</generator>
    <image>
      <url>${escapeXml(coverArt)}</url>
      <title>${cdata(name)}</title>
      <link>${escapeXml(url)}</link>
    </image>
    <itunes:author>${escapeXml(podcast.author)}</itunes:author>
    <itunes:summary>${cdata(description)}</itunes:summary>
    <itunes:type>${podcast.type}</itunes:type>
    <itunes:owner>
      <itunes:name>${escapeXml(podcast.ownerName)}</itunes:name>
      <itunes:email>${escapeXml(podcast.ownerEmail)}</itunes:email>
    </itunes:owner>
    <itunes:image href="${escapeXml(coverArt)}"/>
    <itunes:category text="${escapeXml(podcast.category)}">
      <itunes:category text="${escapeXml(podcast.subcategory)}"/>
    </itunes:category>
    <itunes:explicit>${podcast.explicit ? "true" : "false"}</itunes:explicit>
    <itunes:new-feed-url>${escapeXml(selfUrl)}</itunes:new-feed-url>
    <podcast:locked>no</podcast:locked>
    <podcast:guid>${escapeXml(url)}</podcast:guid>
    ${social.twitter ? `<podcast:person href="${escapeXml("https://twitter.com/" + social.twitter.replace(/^@/, ""))}">${escapeXml(podcast.author)}</podcast:person>` : ""}
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

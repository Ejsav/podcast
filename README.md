# Local Famous

A premium podcast & media brand website covering local culture, business stories, social moments, events, and personalities — built to feel like the start of a real media business.

**Tagline:** The people, places, drama, and businesses everyone is talking about.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS 3.4 + custom design tokens
- **3D:** Three.js + React Three Fiber (shader-driven hero)
- **Motion:** Motion (Framer Motion) + Lenis smooth scroll
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Fonts:** Bricolage Grotesque (display) + Inter (body) + JetBrains Mono

## Getting Started

```bash
cd local-famous
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint
- `npm run typecheck` — TypeScript check

## Project Structure

```
app/
  api/                          → newsletter, submit-story, be-featured
  episodes/                     → /episodes (list) + /episodes/[slug] (detail)
  guests/[slug]/                → guest profile pages
  submit-a-story/               → pitch form
  be-featured/                  → featuring form
  sponsor/                      → 3 sponsor tiers
  local-directory/              → filterable business directory
  layout.tsx                    → root: fonts, player provider, nav/footer
  page.tsx                      → homepage (10 sections)
  opengraph-image.tsx           → dynamic OG image
  sitemap.ts / robots.ts        → SEO
components/
  home/                         → Hero3D (R3F), LatestEpisode, FeaturedClips, etc.
  episodes/                     → EpisodeCard, TranscriptViewer, EpisodesClient
  player/                       → PlayerProvider, MiniPlayer, Waveform
  forms/                        → SubmitStoryForm, BeFeaturedForm, FormField
  directory/                    → DirectoryClient
  nav/                          → Navbar, Footer
  ui/                           → Button, Badge, Section
lib/
  data/                         → episodes, guests, businesses, people, clips
  schemas.ts                    → Zod validation
  types.ts                      → TS types
  utils.ts                      → cn(), formatDuration(), formatDate()…
```

## Pages

| Route | Description |
|---|---|
| `/` | Home: 3D hero, latest episode, clips grid, business spotlight, popular people, CTAs, directory preview, email signup |
| `/episodes` | Searchable episode archive with category filters |
| `/episodes/[slug]` | Episode detail: player, chapters, transcript w/ search + auto-scroll, related episodes, JSON-LD schema |
| `/guests/[slug]` | Guest profile + their episodes |
| `/submit-a-story` | Story pitch form (Zod-validated) |
| `/be-featured` | Feature application form (Zod-validated) |
| `/sponsor` | 3 tiers: Starter $250, Local Feature $500, Featured Partner $1000+ |
| `/local-directory` | Filterable directory (search + category + neighborhood) |

## Content Categories

1. Local Businesses
2. Popular People
3. Social Drama
4. Events & Culture
5. Food & Nightlife
6. National Conversations

## Audio Player

The persistent audio player (`components/player/`) uses a single shared `<audio>` element mounted at the root layout. State lives in `PlayerProvider` context:

- Mini-player stays docked while you navigate
- Full-screen expanded view with waveform scrubbing + chapter list
- Keyboard shortcuts: `Space` play/pause, `Shift+←/→` skip 15s, `Esc` minimize
- Variable playback rate (0.8×–2×)

## Transcripts

Each episode has timestamped cues (`lib/types.ts::TranscriptCue`). The `TranscriptViewer` supports:
- Click-to-seek
- Full-text search with highlighting
- Auto-scroll to the currently-playing cue

## Replacing Mock Content

All mock data lives in `lib/data/`. To ship real content:

1. Replace `lib/data/episodes.ts` with your episodes (point `audioUrl` to your CDN).
2. Replace `lib/data/guests.ts`, `businesses.ts`, `people.ts`, `clips.ts`.
3. Or wire these up to a CMS (Sanity, Contentlayer, Payload) — the types are defined in `lib/types.ts`.

## API Routes

The three POST endpoints (`/api/newsletter`, `/api/submit-story`, `/api/be-featured`) currently validate with Zod and log. To go live:

- **Newsletter:** integrate Resend / ConvertKit / Beehiiv
- **Forms:** persist to Postgres (via Drizzle/Prisma) + send notification via Resend
- Add Cloudflare Turnstile or reCAPTCHA before production

## SEO

- Per-page metadata (`generateMetadata`) on episode + guest pages
- Dynamic OpenGraph image at `/opengraph-image`
- JSON-LD `PodcastSeries` on root, `PodcastEpisode` on episode pages
- Sitemap + robots auto-generated
- Accessible semantics throughout (landmarks, ARIA labels, keyboard nav)

## Performance

- `next/image` with remote patterns configured for Unsplash
- Dynamic import for R3F canvas (`ssr: false`) to keep the critical path light
- Static `generateStaticParams` for all episode + guest pages
- Lenis respects `prefers-reduced-motion`
- Font loading via `next/font` (no layout shift)

## Deployment

Deploy to Vercel:

```bash
vercel
```

Add environment variables when you wire up form/newsletter integrations.

## Roadmap

- [ ] Swap mock audio to real episode CDN (Cloudflare R2 or S3)
- [ ] Add RSS 2.0 feed with iTunes/Spotify tags
- [ ] CMS integration (Sanity recommended for non-dev editing)
- [ ] Resend integration for forms + newsletter
- [ ] Postgres (Neon) + Drizzle for submissions
- [ ] Playwright E2E tests + Lighthouse CI in GitHub Actions
- [ ] Short-form clip player with autoplay feed (TikTok-style)

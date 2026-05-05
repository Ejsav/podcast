import Link from "next/link";
import { Mail, Instagram, Youtube, Music2 } from "lucide-react";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Listen",
    links: [
      { label: "All Episodes", href: "/episodes" },
      { label: "Articles", href: "/articles" },
      { label: "Apple Podcasts", href: "https://podcasts.apple.com" },
      { label: "Spotify", href: "https://spotify.com" },
      { label: "RSS Feed", href: "/feed.xml" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Submit a Story", href: "/submit-a-story" },
      { label: "Be Featured", href: "/be-featured" },
      { label: "Local Directory", href: "/local-directory" },
      { label: "Sponsor", href: "/sponsor" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Press", href: "/press" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-rule/14 bg-surface" data-print-hide>
      <div className="container-app pt-20 pb-10">
        {/* Big editorial wordmark */}
        <div className="border-b border-rule/14 pb-12">
          <div className="font-serif tracking-tightest leading-[0.85] text-[clamp(4rem,12vw,12rem)] text-ink">
            Local <em className="serif-italic text-accent">Famous.</em>
          </div>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-ink-muted text-base">
              An editorial podcast on local culture — the people, places, drama, and businesses everyone is talking about.
            </p>
            <form
              action="/api/newsletter"
              method="post"
              className="flex w-full max-w-sm items-center gap-2 rounded-full border border-rule/15 bg-bg p-1 pl-5"
            >
              <Mail size={14} className="text-ink-muted" />
              <input
                name="email"
                type="email"
                required
                placeholder="email@yourcity.com"
                className="h-9 flex-1 bg-transparent text-sm placeholder:text-ink-subtle focus:outline-none"
              />
              <button type="submit" className="btn btn-accent !h-9 !px-4 !text-xs">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-4">
          <div className="space-y-3">
            <div className="eyebrow"><span>Follow</span></div>
            <div className="flex gap-2">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                { icon: Music2, label: "TikTok", href: "https://tiktok.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-rule/15 hover:bg-surface-2 hover:border-rule/30 transition-colors"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
            <div className="text-xs text-ink-subtle">
              Tips: <a href="mailto:tips@localfamous.fm" className="underline underline-offset-4">tips@localfamous.fm</a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="space-y-3">
              <div className="eyebrow"><span>{col.title}</span></div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink hover:text-accent transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-rule/12 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
            © {new Date().getFullYear()} Local Famous Media · Made with care, locally.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
            Press <kbd className="rounded border border-rule/20 px-1">?</kbd> for shortcuts
          </p>
        </div>
      </div>
    </footer>
  );
}

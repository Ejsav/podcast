import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider, themeInitScript } from "@/components/system/ThemeProvider";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { CommandPaletteProvider } from "@/components/system/CommandPalette";
import { ScrollProgress } from "@/components/system/ScrollProgress";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { DeferredChrome } from "@/components/system/DeferredChrome";
import { siteConfig } from "@/lib/siteConfig";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Local Famous — The people, places, drama & businesses everyone is talking about.",
    template: "%s · Local Famous",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.podcast.author }],
  keywords: [
    "podcast", "local culture", "media", "small business stories", "city stories",
    "neighborhood", "drama", "events", "interviews",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  twitter: { card: "summary_large_image", site: siteConfig.social.twitter },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: siteConfig.feedPath, title: `${siteConfig.name} Podcast Feed` }],
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0D0B" },
  ],
};

const podcastJsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "Local Famous",
  url: "https://localfamous.fm",
  description:
    "The people, places, drama, and businesses everyone is talking about.",
  inLanguage: "en-US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Cuts ~120ms TCP+TLS off first image fetch on slow networks */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastJsonLd) }}
        />
      </head>
      <body className="bg-bg text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-3 focus:py-1.5 focus:text-bg"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <PlayerProvider>
            <CommandPaletteProvider>
              <ScrollProgress />
              <Navbar />
              <main id="main" className="pb-32">
                {children}
              </main>
              <Footer />
              <DeferredChrome />
            </CommandPaletteProvider>
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Pause } from "lucide-react";
import { episodes } from "@/lib/data/episodes";
import { usePlayer } from "@/components/player/PlayerProvider";
import { OnAirDot } from "@/components/system/OnAirDot";
import { formatDuration } from "@/lib/utils";

const TICKER = [
  "Coffee shop war ends in handshake",
  "Maya Okafor's supper club hits 2,400-person waitlist",
  "Lena Park warehouse residency goes weekly",
  "Jamal Reyes signs Pelicans two-way",
  "Sofia Marin polls jump 11 points after debate",
  "Ty Richardson opens second location in Westside",
  "City council moves to legalize curb-side dining permanently",
  "Sneaker drop crashes Southside Sole site at 11:02 a.m.",
];

export function EditorialHero() {
  const latest = episodes[0]!;
  const { play, toggle, isPlaying, episode } = usePlayer();
  const isCurrent = episode?.slug === latest.slug && isPlaying;

  return (
    <section className="relative overflow-hidden border-b border-rule/14">
      {/* Aurora gradient backdrop — pure CSS, GPU-cheap. Smaller blur radius on phones to keep paint cheap. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-[5%] h-[60vw] w-[60vw] max-h-[42rem] max-w-[42rem] rounded-full bg-accent/15 blur-[80px] sm:blur-[120px] dark:bg-accent/12" />
        <div className="absolute -bottom-24 right-[5%] h-[55vw] w-[55vw] max-h-[36rem] max-w-[36rem] rounded-full bg-[hsl(40,80%,60%)]/15 blur-[80px] sm:blur-[120px] dark:bg-[hsl(20,80%,55%)]/15" />
      </div>

      <div className="container-app pt-10 sm:pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          {/* LEFT — Display headline */}
          <div className="max-w-5xl">
            <div className="flex items-center gap-4">
              <span className="eyebrow"><span>Volume 03 · Issue 47</span></span>
              <span className="hidden sm:inline-flex"><OnAirDot /></span>
            </div>

            <h1 className="display mt-5 sm:mt-7 text-[clamp(2.5rem,11vw,11rem)]">
              The people, places,{" "}
              <em className="serif-italic text-accent">drama,</em>
              <br />
              and businesses{" "}
              <span className="whitespace-nowrap">
                <em className="serif-italic">everyone</em> is
              </span>{" "}
              talking about.
            </h1>

            <div className="mt-7 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link href="/episodes" className="btn btn-primary">
                Browse the archive
                <ArrowRight size={14} />
              </Link>
              <Link href="/submit-a-story" className="btn btn-ghost">
                Submit a story
              </Link>
              <span className="ml-2 hidden md:inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                ⌘K to search
              </span>
            </div>
          </div>

          {/* RIGHT — Latest episode card */}
          <aside
            aria-label="Latest episode"
            className="relative w-full max-w-full sm:max-w-md lg:w-[26rem] shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-rule/15 bg-surface shadow-elevate"
          >
            <div className="relative aspect-[5/3] overflow-hidden">
              <Image
                src={latest.artwork}
                alt={latest.title}
                fill
                priority
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full bg-bg/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                  Now playing
                </span>
              </div>
              <button
                onClick={() => (episode?.slug === latest.slug ? toggle() : play(latest))}
                className="group absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full bg-bg text-ink shadow-elevate transition-transform hover:scale-105"
                aria-label={isCurrent ? "Pause episode" : "Play episode"}
              >
                {isCurrent ? <Pause size={18} /> : <Play size={18} className="ml-0.5" fill="currentColor" />}
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                <span>EP {String(latest.number).padStart(3, "0")}</span>
                <span>{formatDuration(latest.duration)}</span>
              </div>
              <h2 className="mt-3 font-serif text-2xl leading-[1.1] text-balance">
                {latest.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-ink-muted leading-relaxed">
                {latest.subtitle}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/episodes/${latest.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
                >
                  Read the show notes <ArrowRight size={12} />
                </Link>
                <div className="flex gap-1.5">
                  {latest.tags.slice(0, 2).map((t) => (
                    <span key={t} className="tag !h-5 !px-1.5 !text-[9px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Marquee ticker — editorial newsstand feel */}
      <div className="border-t border-rule/12 bg-surface-2/50">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden py-2.5 sm:py-3">
          <div className="flex-none pl-3 sm:pl-5 pr-1 sm:pr-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent mr-1.5 sm:mr-2 align-middle" />
            <span className="hidden sm:inline">Trending </span>now
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="marquee-track animate-marquee gap-8 sm:gap-12 pr-8 sm:pr-12">
              {[...TICKER, ...TICKER].map((s, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-ink-muted whitespace-nowrap"
                >
                  <span className="h-1 w-1 rounded-full bg-ink-subtle" />
                  {s}
                </span>
              ))}
            </div>
            {/* Edge fades — narrower on mobile */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-12 bg-gradient-to-r from-[rgb(var(--surface-2))] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-12 bg-gradient-to-l from-[rgb(var(--surface-2))] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

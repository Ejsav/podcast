import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { getGuest, guests } from "@/lib/data/guests";
import { episodes } from "@/lib/data/episodes";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuest(slug);
  if (!g) return {};
  return {
    title: `${g.name} — ${g.role}`,
    description: g.bio,
    openGraph: { title: g.name, description: g.bio, images: [g.photo] },
  };
}

export default async function GuestPage({ params }: Props) {
  const { slug } = await params;
  const guest = getGuest(slug);
  if (!guest) notFound();

  const guestEpisodes = episodes.filter((e) => e.guests.includes(guest.slug));

  return (
    <div className="container-app pt-10 pb-20 md:pt-14">
      <Link
        href="/episodes"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={12} /> All episodes
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-[360px_1fr] lg:items-start">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-rule/14">
          <Image
            src={guest.photo}
            alt={guest.name}
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div>
          <span className="eyebrow"><span>Guest</span></span>
          <h1 className="display mt-5 text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
            {guest.name}
          </h1>
          <div className="mt-3 font-serif text-2xl text-ink-muted italic">{guest.role}</div>
          {guest.location && (
            <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
              <MapPin size={11} /> {guest.location}
            </div>
          )}

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink">{guest.bio}</p>

          {guest.links && guest.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {guest.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-rule/15 bg-surface px-3.5 py-1.5 text-xs font-medium hover:border-rule/40 hover:bg-surface-2 transition-colors"
                >
                  {l.label} <ExternalLink size={11} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {guestEpisodes.length > 0 && (
        <section className="mt-20">
          <div className="editorial-divider">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">№ Episodes featuring {guest.name}</span>
            <span className="h-px bg-rule/12" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">{guestEpisodes.length}</span>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {guestEpisodes.map((ep) => (
              <li key={ep.slug}>
                <EpisodeCard episode={ep} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

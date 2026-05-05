import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star, MapPin } from "lucide-react";
import { businesses } from "@/lib/data/businesses";

export function DirectoryStrip() {
  const top = businesses.slice(0, 4);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {top.map((b, i) => (
        <Link
          key={b.slug}
          href="/local-directory"
          data-reveal
          style={{ "--i": i } as React.CSSProperties}
          className="group relative overflow-hidden rounded-xl border border-rule/14 bg-surface"
        >
          <div className="relative aspect-[5/3] overflow-hidden">
            <Image
              src={b.photo}
              alt={b.name}
              fill
              sizes="(min-width:1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent" />
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-bg/90 px-2 py-1 font-mono text-[10px] text-ink">
              <Star size={10} className="fill-accent text-accent" />
              <span className="tabular-nums">{b.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-ink-subtle">
              <span>{b.category}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={10} /> {b.neighborhood}
              </span>
            </div>
            <h3 className="mt-2 font-serif text-lg leading-tight">{b.name}</h3>
            <p className="mt-1 line-clamp-1 text-sm text-ink-muted">{b.tagline}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              View directory <ArrowUpRight size={11} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

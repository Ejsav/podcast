import Link from "next/link";
import Image from "next/image";
import { people } from "@/lib/data/people";

export function PeopleStrip() {
  return (
    <ul
      data-reveal-stagger
      className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0 sm:grid sm:snap-none sm:grid-cols-2 lg:grid-cols-4"
    >
      {people.slice(0, 8).map((p, i) => (
        <li
          key={p.slug}
          data-reveal
          style={{ "--i": i } as React.CSSProperties}
          className="snap-start min-w-[260px] sm:min-w-0"
        >
          <Link
            href={`/episodes`}
            className="group relative block overflow-hidden rounded-2xl border border-rule/14 bg-surface"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={p.photo}
                alt={p.name}
                fill
                sizes="260px"
                className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/75">
                  {p.role}
                </div>
                <div className="mt-1 font-serif text-2xl leading-[1.05] text-white">
                  {p.name}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

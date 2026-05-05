import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import { episodes } from "@/lib/data/episodes";
import { businesses } from "@/lib/data/businesses";

export function Spotlight() {
  const ep = episodes[1] ?? episodes[0]!;
  const biz = businesses.find((b) => b.featured) ?? businesses[0]!;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Big editorial story card */}
      <article
        data-reveal
        className="lg:col-span-7 group relative overflow-hidden rounded-2xl border border-rule/14 bg-surface"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={ep.artwork}
            alt={ep.title}
            fill
            sizes="(min-width:1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-fg">
              Featured
            </span>
            <span className="rounded-full bg-bg/85 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
              EP {String(ep.number).padStart(3, "0")}
            </span>
          </div>
          <div className="absolute inset-x-5 bottom-5">
            <h3 className="font-serif text-3xl md:text-4xl leading-[1.05] text-white text-balance max-w-2xl">
              {ep.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/85 line-clamp-2">{ep.subtitle}</p>
            <Link
              href={`/episodes/${ep.slug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2 text-xs font-medium text-ink hover:bg-accent hover:text-accent-fg transition-colors"
            >
              Read the show notes →
            </Link>
          </div>
        </div>
      </article>

      {/* Quote + Business spotlight stacked */}
      <div className="lg:col-span-5 grid gap-10">
        <blockquote
          data-reveal
          className="relative rounded-2xl border border-rule/14 bg-surface-2 p-8"
        >
          <Quote size={28} className="text-accent" />
          <p className="mt-5 font-serif text-2xl leading-[1.2] text-balance">
            &ldquo;The ones who built it are the ones who get to name it. We&rsquo;ve been here. We&rsquo;re still here.&rdquo;
          </p>
          <footer className="mt-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            <span>Maya Okafor — EP 042</span>
            <span>03:14</span>
          </footer>
        </blockquote>

        <article
          data-reveal
          className="group relative overflow-hidden rounded-2xl border border-rule/14 bg-surface"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={biz.photo}
              alt={biz.name}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent" />
            <div className="absolute left-4 top-4 rounded-full bg-bg/85 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
              Business spotlight
            </div>
            <div className="absolute inset-x-4 bottom-4">
              <h4 className="font-serif text-2xl text-white">{biz.name}</h4>
              <p className="text-sm text-white/85">{biz.tagline}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

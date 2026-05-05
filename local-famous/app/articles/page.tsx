import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/data/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Reveal } from "@/components/system/Reveal";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Long-form features from Local Famous — the stories behind the episodes.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesIndexPage() {
  const [lead, ...rest] = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <Reveal>
      <section className="container-app pt-10 sm:pt-14 md:pt-20">
        <div data-reveal className="max-w-3xl">
          <span className="eyebrow">
            <span>Features</span>
          </span>
          <h1 className="display mt-5 sm:mt-7 text-[clamp(2.5rem,8vw,6.5rem)]">
            The stories <em className="serif-italic text-accent">behind</em> the show.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-ink-muted leading-relaxed">
            Reporting, essays, and deep-dives from our editorial team — published alongside
            every episode we care enough to keep writing about.
          </p>
        </div>

        {lead && (
          <div data-reveal className="mt-14 md:mt-20">
            <Link
              href={`/articles/${lead.slug}`}
              className="group grid gap-6 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-7 relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-rule/14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lead.coverImage}
                  alt={lead.title}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="md:col-span-5 md:self-center">
                <div className="eyebrow">
                  <span>Lead story</span>
                </div>
                <h2 className="mt-4 font-serif text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.02] text-balance group-hover:text-accent transition-colors">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-lg text-base text-ink-muted leading-relaxed">
                  {lead.dek}
                </p>
                <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                  <span>By {lead.author}</span>
                  <span>·</span>
                  <span>{lead.readingMinutes} min read</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read the feature <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="editorial-divider mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                № Archive
              </span>
              <span className="h-px bg-rule/12" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                {rest.length} more
              </span>
            </div>
            <div
              data-reveal
              data-reveal-stagger
              className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((a, i) => (
                <div key={a.slug} style={{ ["--i" as string]: i }}>
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
}

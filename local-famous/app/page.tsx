import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/system/Reveal";
import { EditorialHero } from "@/components/home/EditorialHero";
import { SectionMast } from "@/components/home/SectionMast";
import { Spotlight } from "@/components/home/Spotlight";
import { Coverage } from "@/components/home/Coverage";
import { PeopleStrip } from "@/components/home/PeopleStrip";
import { Manifesto } from "@/components/home/Manifesto";
import { DirectoryStrip } from "@/components/home/DirectoryStrip";
import { Newsletter } from "@/components/home/Newsletter";
import { ClipsRow } from "@/components/home/ClipsRow";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articles } from "@/lib/data/articles";

export default function HomePage() {
  return (
    <Reveal>
      <EditorialHero />

      {/* The Latest — featured spotlight */}
      <section className="container-app pt-20 md:pt-28 space-y-12">
        <SectionMast
          number="01"
          eyebrow="The Latest"
          title={<>This week the city is <em className="serif-italic text-accent">talking about…</em></>}
          description="Each issue we anchor on one story — the kind that gets retold at every dinner table, group chat, and bar this week."
        />
        <Spotlight />
      </section>

      {/* Coverage — recent episodes grid */}
      <section className="container-app pt-24 md:pt-32 space-y-12">
        <SectionMast
          number="02"
          eyebrow="Coverage"
          title={<>Recent <em className="serif-italic">dispatches.</em></>}
          rightSlot={
            <div className="mt-3 md:mt-0">
              <Link href="/episodes" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent">
                Open the archive <ArrowRight size={12} />
              </Link>
            </div>
          }
        />
        <Coverage />
      </section>

      {/* Clips — short vertical strip, tap to jump into an episode */}
      <section className="container-app pt-24 md:pt-32 space-y-10">
        <SectionMast
          number="2b"
          eyebrow="Clips"
          title={<>The moments <em className="serif-italic text-accent">worth sharing.</em></>}
          description="Quotable audiograms from recent episodes. Tap any card to jump into the episode at the exact moment it happened."
        />
        <ClipsRow />
      </section>

      {/* People — popular faces */}
      <section className="container-app pt-24 md:pt-32 space-y-12">
        <SectionMast
          number="03"
          eyebrow="People"
          title={<>The names <em className="serif-italic text-accent">everyone</em> is dropping.</>}
          description="The personalities driving conversations across the city — entrepreneurs, organizers, athletes, and the quietly powerful."
        />
        <PeopleStrip />
      </section>

      {/* Features / articles teaser */}
      <section className="container-app pt-24 md:pt-32 space-y-10">
        <SectionMast
          number="3b"
          eyebrow="Features"
          title={<>The stories <em className="serif-italic">behind</em> the show.</>}
          rightSlot={
            <div className="mt-3 md:mt-0">
              <Link href="/articles" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent">
                All articles <ArrowRight size={12} />
              </Link>
            </div>
          }
        />
        <div data-reveal data-reveal-stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <div key={a.slug} style={{ ["--i" as string]: i }}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-app pt-24 md:pt-32">
        <Manifesto />
      </section>

      {/* Directory preview */}
      <section className="container-app pt-24 md:pt-32 space-y-12">
        <SectionMast
          number="04"
          eyebrow="Directory"
          title={<>The <em className="serif-italic">short list.</em></>}
          rightSlot={
            <div className="mt-3 md:mt-0">
              <Link href="/local-directory" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent">
                Browse the directory <ArrowRight size={12} />
              </Link>
            </div>
          }
          description="Hand-vetted, no pay-to-play. Just the spots we send our friends to."
        />
        <DirectoryStrip />
      </section>

      {/* Newsletter */}
      <section className="container-app pt-24 md:pt-32">
        <Newsletter />
      </section>

      {/* Closing block — kinetic statement */}
      <section className="container-app pt-28 md:pt-40 pb-12">
        <div data-reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow"><span>Last word</span></span>
            <p className="display mt-6 text-[clamp(2rem,4.5vw,3.5rem)] text-balance">
              Every neighborhood has a story. We just <em className="serif-italic text-accent">show up first.</em>
            </p>
          </div>
          <div className="md:col-span-5 md:pt-12">
            <p className="max-w-md text-base text-ink-muted leading-relaxed">
              Built in the city, for the city. Tip line is always open. The bar tab is rarely closed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/submit-a-story" className="btn btn-primary">Submit a tip</Link>
              <Link href="/be-featured" className="btn btn-ghost">Be featured</Link>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

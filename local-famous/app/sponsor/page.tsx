import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles, Star, Crown, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Reach the audience already talking about your city. Three sponsor packages for local businesses, regional brands, and featured partners.",
};

const TIERS = [
  {
    name: "Starter",
    price: 250,
    tagline: "For new local businesses ready to be heard.",
    icon: Sparkles,
    features: [
      "30-second host read on 1 episode",
      "Logo placement on episode page",
      "Mention in weekly newsletter",
      "Social post tag on our channels",
      "Basic performance report",
    ],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    name: "Local Feature",
    price: 500,
    tagline: "For established businesses ready to scale.",
    icon: Star,
    features: [
      "60-second host read on 2 episodes",
      "Premium placement on episode pages",
      "Featured section in newsletter",
      "Dedicated social clip + reel",
      "Custom tracking link + report",
      "Listed in Local Directory",
    ],
    cta: "Become a Feature",
    highlight: true,
  },
  {
    name: "Featured Partner",
    price: 1000,
    priceSuffix: "+",
    tagline: "Full-brand partnerships built with you.",
    icon: Crown,
    features: [
      "Season-long integration across episodes",
      "Co-branded content segment",
      "Custom short-form video production",
      "Homepage hero placement",
      "Dedicated newsletter feature",
      "Quarterly strategy session",
      "First access to new placements",
    ],
    cta: "Talk Partnership",
    highlight: false,
  },
];

const STATS = [
  { value: "412k", label: "Weekly listeners" },
  { value: "73%", label: "Local to the city" },
  { value: "6.2M", label: "Monthly clip views" },
  { value: "94%", label: "Brand recall (sponsor study)" },
];

export default function SponsorPage() {
  return (
    <div className="container-app pt-14 pb-20 md:pt-20">
      <header className="border-b border-rule/14 pb-10">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span>№ Sponsor</span>
          <span>2026 rate card</span>
        </div>
        <h1 className="display mt-6 text-[clamp(2.75rem,8vw,7rem)] text-balance">
          The audience that already <em className="serif-italic text-accent">shows up</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-ink-muted leading-relaxed">
          Hand-produced sponsorships, no generic ad reads, no programmatic stuffing. Every placement is read, written, and produced by the team — to feel like part of the show, because it is.
        </p>
      </header>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule/14 bg-rule/14 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-7">
            <dd className="font-serif text-4xl tracking-tightest tabular-nums">{s.value}</dd>
            <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>

      <section className="mt-20">
        <div className="editorial-divider">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">№ Packages</span>
          <span className="h-px bg-rule/12" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">Three tiers</span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <article
                key={tier.name}
                className={
                  "relative flex flex-col overflow-hidden rounded-2xl border p-8 transition-colors " +
                  (tier.highlight
                    ? "border-ink bg-ink text-bg"
                    : "border-rule/14 bg-surface hover:border-rule/30")
                }
              >
                {tier.highlight && (
                  <span className="absolute right-5 top-5 rounded-full bg-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-accent-fg">
                    Most popular
                  </span>
                )}

                <div
                  className={
                    "grid h-10 w-10 place-items-center rounded-lg " +
                    (tier.highlight ? "bg-accent text-accent-fg" : "bg-surface-2 text-accent")
                  }
                >
                  <Icon size={16} />
                </div>

                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                  {tier.name}
                </div>
                <div className="mt-2 flex items-baseline gap-1 font-serif">
                  <span className="text-5xl tracking-tightest">${tier.price}</span>
                  {tier.priceSuffix && <span className="text-3xl opacity-60">{tier.priceSuffix}</span>}
                  <span className="ml-1 font-sans text-xs opacity-60">/ placement</span>
                </div>
                <p className={"mt-3 text-sm " + (tier.highlight ? "text-bg/75" : "text-ink-muted")}>
                  {tier.tagline}
                </p>

                <ul className="mt-7 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        size={13}
                        className={
                          "mt-1 flex-none " + (tier.highlight ? "text-accent" : "text-accent")
                        }
                      />
                      <span className={"leading-relaxed " + (tier.highlight ? "text-bg/90" : "text-ink")}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Link
                    href={`mailto:sponsor@localfamous.fm?subject=${encodeURIComponent(tier.name + " inquiry")}`}
                    className={
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors " +
                      (tier.highlight
                        ? "bg-accent text-accent-fg hover:bg-bg hover:text-ink"
                        : "bg-ink text-bg hover:bg-accent hover:text-accent-fg")
                    }
                  >
                    {tier.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CUSTOM */}
      <section className="mt-20 rounded-3xl border border-rule/14 bg-surface p-8 md:p-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span className="eyebrow"><span>Custom</span></span>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.5rem)] text-balance">
              Building something <em className="serif-italic text-accent">bigger</em>?
            </h2>
            <p className="mt-4 max-w-xl text-ink-muted leading-relaxed">
              Season sponsorships, live events, co-produced series, and regional multi-brand campaigns. We build the package around you.
            </p>
          </div>
          <Link
            href="mailto:partnerships@localfamous.fm"
            className="btn btn-primary"
          >
            Email partnerships <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}

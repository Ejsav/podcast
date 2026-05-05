import type { Metadata } from "next";
import { BeFeaturedForm } from "@/components/forms/BeFeaturedForm";

export const metadata: Metadata = {
  title: "Be Featured",
  description:
    "Business owners, creators, event hosts, and local personalities: pitch yourself for a Local Famous feature.",
};

const STEPS = [
  { n: "01", title: "Submit", body: "Fill out the form. Takes 3 minutes." },
  { n: "02", title: "Review", body: "The team reviews submissions every Monday." },
  { n: "03", title: "Pre-interview", body: "If it's a fit, a quick 20-minute call." },
  { n: "04", title: "Record", body: "Studio session or on-location. We produce it." },
];

export default function BeFeaturedPage() {
  return (
    <div className="container-app pt-14 pb-20 md:pt-20">
      <header className="border-b border-rule/14 pb-8">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span>№ Be Featured</span>
          <span>Editorial pitches</span>
        </div>
        <h1 className="display mt-6 text-[clamp(2.5rem,8vw,7rem)] text-balance">
          The feature that turns locals into <em className="serif-italic text-accent">legends.</em>
        </h1>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[360px_1fr]">
        <aside className="lg:sticky lg:top-28 self-start">
          <p className="text-base text-ink-muted leading-relaxed">
            Business owners, creators, event hosts, local personalities — pitch us the story. If it&rsquo;s good, we tell it right.
          </p>
          <ol className="mt-8 grid gap-3">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4 rounded-lg border border-rule/14 bg-surface p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent tabular-nums">{s.n}</span>
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="mt-0.5 text-sm text-ink-muted">{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </aside>

        <BeFeaturedForm />
      </div>
    </div>
  );
}

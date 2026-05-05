import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  { kicker: "01", title: "Local first.", body: "We start at the corner store and let the story tell us how big it gets." },
  { kicker: "02", title: "On the record.", body: "Real people. Real names. Real venues. The internet doesn't need more vague gossip." },
  { kicker: "03", title: "Receipts.", body: "Public moments deserve public scrutiny. Private moments stay private — until they aren't." },
  { kicker: "04", title: "Credit the city.", body: "When the work travels, the city travels with it." },
];

export function Manifesto() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-rule/14 bg-ink text-bg">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-32 -left-20 h-[36rem] w-[36rem] rounded-full bg-accent/40 blur-[140px]" />
        <div className="absolute -bottom-40 right-0 h-[40rem] w-[40rem] rounded-full bg-[hsl(40,90%,60%)]/25 blur-[150px]" />
      </div>

      <div className="grid gap-12 p-8 md:p-14 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <span className="eyebrow !text-bg/55"><span>The brief</span></span>
          <h2 className="display mt-6 text-[clamp(2.25rem,6vw,4.5rem)] text-bg">
            We don&apos;t cover cities.
            <br />
            <em className="serif-italic text-accent">We belong to one.</em>
          </h2>
          <p className="mt-6 max-w-xl text-bg/75 leading-relaxed">
            Local Famous is an editorial podcast made the way papers used to be made — by people who know the block, the bar, the back-room, and the names everybody pretends not to know. Four pillars. No exceptions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/submit-a-story"
              className="inline-flex items-center gap-2 rounded-full bg-bg px-5 py-2.5 text-sm font-medium text-ink hover:bg-accent hover:text-accent-fg transition-colors"
            >
              Bring us a story <ArrowRight size={14} />
            </Link>
            <Link
              href="/be-featured"
              className="inline-flex items-center gap-2 rounded-full border border-bg/25 px-5 py-2.5 text-sm font-medium text-bg hover:bg-bg/10 transition-colors"
            >
              Pitch yourself
            </Link>
          </div>
        </div>

        <ul className="lg:col-span-5 grid gap-px overflow-hidden rounded-2xl bg-bg/10">
          {PILLARS.map((p, i) => (
            <li
              key={p.kicker}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="bg-ink/85 p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">№ {p.kicker}</span>
                <span className="font-serif text-2xl text-bg">{p.title}</span>
              </div>
              <p className="mt-2 max-w-md text-sm text-bg/70 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

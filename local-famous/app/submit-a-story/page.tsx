import type { Metadata } from "next";
import { SubmitStoryForm } from "@/components/forms/SubmitStoryForm";

export const metadata: Metadata = {
  title: "Submit a Story",
  description:
    "Pitch Local Famous a story: drama, business news, events, personalities, or moments the city should hear about.",
};

const NOTES = [
  { label: "We protect your identity if asked", body: "Off-the-record means off-the-record." },
  { label: "We don't chase rumors", body: "Receipts help. Specifics help more." },
  { label: "Local matters, but national reach", body: "The best local stories travel." },
];

export default function SubmitStoryPage() {
  return (
    <div className="container-app pt-14 pb-20 md:pt-20">
      <header className="border-b border-rule/14 pb-8">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span>№ Submit</span>
          <span>Tipline</span>
        </div>
        <h1 className="display mt-6 text-[clamp(2.5rem,8vw,7rem)] text-balance">
          Got something the city <em className="serif-italic text-accent">needs</em> to hear?
        </h1>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[360px_1fr]">
        <aside className="lg:sticky lg:top-28 self-start">
          <p className="text-base text-ink-muted leading-relaxed">
            Local drama, a business that&rsquo;s next, an event nobody&rsquo;s covering, a funny situation, a public moment — if it&rsquo;s worth talking about, we want to hear about it.
          </p>

          <div className="mt-8 space-y-3">
            {NOTES.map((n) => (
              <div key={n.label} className="rounded-lg border border-rule/14 bg-surface p-4">
                <div className="font-medium">{n.label}</div>
                <div className="mt-1 text-xs text-ink-muted">{n.body}</div>
              </div>
            ))}
          </div>
        </aside>

        <SubmitStoryForm />
      </div>
    </div>
  );
}

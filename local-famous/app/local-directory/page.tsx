import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DirectoryClient } from "@/components/directory/DirectoryClient";
import { businesses } from "@/lib/data/businesses";

export const metadata: Metadata = {
  title: "Local Directory",
  description:
    "A hand-curated directory of the businesses worth your time. Not a list — a short list.",
};

export default function DirectoryPage() {
  return (
    <div className="container-app pt-14 pb-20 md:pt-20">
      <header className="border-b border-rule/14 pb-8">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span>№ Directory</span>
          <span>{businesses.length} entries</span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="display text-[clamp(3rem,8vw,7rem)] text-balance">
            The <em className="serif-italic text-accent">short list.</em>
          </h1>
          <Link
            href="/be-featured"
            className="inline-flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent"
          >
            Get listed <ArrowRight size={12} />
          </Link>
        </div>
        <p className="mt-6 max-w-2xl text-base text-ink-muted leading-relaxed">
          Every business here was personally vetted by the Local Famous team. No pay-to-play. No algorithmic ranking. Just the spots we actually send our friends to.
        </p>
      </header>

      <div className="mt-4">
        <DirectoryClient businesses={businesses} />
      </div>
    </div>
  );
}

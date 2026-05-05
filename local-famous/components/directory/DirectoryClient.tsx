"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, Star, MapPin, X } from "lucide-react";
import type { Business } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DirectoryClient({ businesses }: { businesses: Business[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [hood, setHood] = useState<string>("all");

  const categories = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.category))).sort(),
    [businesses],
  );
  const hoods = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.neighborhood))).sort(),
    [businesses],
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return businesses.filter((b) => {
      if (cat !== "all" && b.category !== cat) return false;
      if (hood !== "all" && b.neighborhood !== hood) return false;
      if (!query) return true;
      const hay = (b.name + " " + b.tagline + " " + b.description).toLowerCase();
      return hay.includes(query);
    });
  }, [businesses, q, cat, hood]);

  return (
    <div>
      <div
        className="sticky z-20 -mx-4 mb-10 border-y border-rule/14 bg-bg/90 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 sm:py-4 lg:-mx-12 lg:px-12"
        style={{ top: "var(--header-h)" }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={14} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, tag, or vibe"
              className="h-11 w-full rounded-full border border-rule/15 bg-surface pl-10 pr-10 text-sm placeholder:text-ink-subtle focus:border-rule/40 focus:outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-ink-muted hover:bg-surface-2"
                aria-label="Clear"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="h-11 rounded-full border border-rule/15 bg-surface px-4 text-sm focus:border-rule/40 focus:outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={hood}
              onChange={(e) => setHood(e.target.value)}
              className="h-11 rounded-full border border-rule/15 bg-surface px-4 text-sm focus:border-rule/40 focus:outline-none"
            >
              <option value="all">All neighborhoods</option>
              {hoods.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
          {filtered.length} of {businesses.length} businesses
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-rule/14 bg-surface px-6 py-24 text-center">
          <h3 className="font-serif text-2xl">Nothing matches.</h3>
          <p className="mt-2 text-sm text-ink-muted">Try a different filter.</p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((biz) => (
            <li key={biz.slug}>
              <article
                className={cn(
                  "group flex flex-col overflow-hidden rounded-xl border bg-surface transition-all duration-300 hover:-translate-y-0.5",
                  biz.featured ? "border-accent/40 hover:border-accent" : "border-rule/14 hover:border-rule/30",
                )}
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={biz.photo}
                    alt={biz.name}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {biz.featured && (
                    <div className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-accent-fg">
                      Featured
                    </div>
                  )}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-bg/90 px-2 py-1 font-mono text-[10px] text-ink">
                    <Star size={10} className="fill-accent text-accent" />
                    <span className="tabular-nums">{biz.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                    <span>{biz.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={10} /> {biz.neighborhood}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl leading-tight transition-colors group-hover:text-accent">
                    {biz.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{biz.tagline}</p>
                  <div className="mt-auto pt-5 border-t border-rule/12 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
                    {biz.address}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

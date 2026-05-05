import Image from "next/image";
import type { ArticleBlock } from "@/lib/types";

/**
 * Renders a typed ArticleBlock[] using the editorial prose styles
 * defined in globals.css (.prose-editorial already handles drop-cap,
 * headings, and rhythm).
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-editorial max-w-prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "list":
            return (
              <ul key={i} className="my-6 list-disc pl-6 space-y-2 marker:text-accent">
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "pullquote":
            return (
              <figure
                key={i}
                className="my-10 border-l-2 border-accent pl-6 md:-ml-6 md:pl-8"
              >
                <blockquote className="font-serif text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.15] text-balance italic">
                  &ldquo;{b.text}&rdquo;
                </blockquote>
                {b.attribution && (
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle not-italic">
                    — {b.attribution}
                  </figcaption>
                )}
              </figure>
            );
          case "image":
            return (
              <figure key={i} className="my-10 -mx-4 md:mx-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-none md:rounded-xl ring-1 ring-rule/14">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
                {b.caption && (
                  <figcaption className="mt-3 px-4 md:px-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-subtle">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "divider":
            return (
              <hr
                key={i}
                className="my-10 border-0 text-center before:content-['§'] before:font-serif before:text-xl before:text-ink-subtle"
              />
            );
        }
      })}
    </div>
  );
}

interface Props {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export function SectionMast({ number, eyebrow, title, description, rightSlot }: Props) {
  return (
    <div className="border-b border-rule/14 pb-6">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
        <span>№ {number}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <h2
          data-reveal
          className="display text-[clamp(2.5rem,6vw,4.5rem)] text-balance"
        >
          {title}
        </h2>
        {(description || rightSlot) && (
          <div className="md:max-w-sm md:text-right">
            {description && (
              <p className="text-base leading-relaxed text-ink-muted">{description}</p>
            )}
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

export function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle"
    >
      {children}
      {required && <span className="text-accent">*</span>}
    </label>
  );
}

const baseField =
  "mt-2 w-full rounded-lg border bg-bg px-4 text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none transition-colors";

export function Input({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={cn(
        baseField,
        "h-12",
        error
          ? "border-[rgb(var(--live))]/60 focus:border-[rgb(var(--live))]"
          : "border-rule/15 focus:border-accent/60",
        className,
      )}
    />
  );
}

export function Textarea({
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      {...props}
      className={cn(
        baseField,
        "min-h-[140px] py-3 resize-y leading-relaxed",
        error
          ? "border-[rgb(var(--live))]/60 focus:border-[rgb(var(--live))]"
          : "border-rule/15 focus:border-accent/60",
        className,
      )}
    />
  );
}

export function Select({
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={cn(
        baseField,
        "h-12 appearance-none",
        error
          ? "border-[rgb(var(--live))]/60"
          : "border-rule/15 focus:border-accent/60",
        className,
      )}
    >
      {children}
    </select>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgb(var(--live))]">
      {message}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, Check } from "lucide-react";
import { beFeaturedSchema, type BeFeaturedInput } from "@/lib/schemas";
import { Label, Input, Textarea, Select, FieldError } from "./FormField";

export function BeFeaturedForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BeFeaturedInput>({
    resolver: zodResolver(beFeaturedSchema),
  });

  async function onSubmit(data: BeFeaturedInput) {
    setStatus("idle");
    setServerError(null);
    try {
      const res = await fetch("/api/be-featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Could not submit");
      setStatus("ok");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-fg">
          <Check size={20} />
        </div>
        <h3 className="mt-5 font-serif text-3xl">Submission received.</h3>
        <p className="mt-3 mx-auto max-w-md text-ink-muted">
          The team reviews features every Monday. We&rsquo;ll be in touch if it&rsquo;s a fit.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-accent underline underline-offset-4"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 md:grid-cols-2 rounded-2xl border border-rule/14 bg-surface p-6 md:p-10"
    >
      <div>
        <Label htmlFor="name" required>Your name</Label>
        <Input id="name" placeholder="First Last" error={!!errors.name} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <Label htmlFor="email" required>Email</Label>
        <Input id="email" type="email" placeholder="you@email.com" error={!!errors.email} {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="type" required>I&rsquo;m a...</Label>
        <Select id="type" error={!!errors.type} {...register("type")}>
          <option value="">Pick one</option>
          <option value="business-owner">Business Owner</option>
          <option value="creator">Creator</option>
          <option value="event-host">Event Host</option>
          <option value="personality">Local Personality</option>
          <option value="other">Other</option>
        </Select>
        <FieldError message={errors.type?.message} />
      </div>

      <div>
        <Label htmlFor="businessOrHandle">Business / handle</Label>
        <Input
          id="businessOrHandle"
          placeholder="@yourbiz, Your Shop Name, etc."
          {...register("businessOrHandle")}
        />
      </div>

      <div>
        <Label htmlFor="neighborhood">Neighborhood</Label>
        <Input id="neighborhood" placeholder="Westside, Downtown…" {...register("neighborhood")} />
      </div>

      <div>
        <Label htmlFor="website">Website / link</Label>
        <Input id="website" type="url" placeholder="https://" error={!!errors.website} {...register("website")} />
        <FieldError message={errors.website?.message} />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="pitch" required>Why you?</Label>
        <Textarea
          id="pitch"
          placeholder="What's the story? What's happening right now that we'd want to cover?"
          rows={7}
          error={!!errors.pitch}
          {...register("pitch")}
        />
        <FieldError message={errors.pitch?.message} />
      </div>

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[rgb(var(--accent))]" {...register("consent")} />
          <span>
            I agree to be contacted about this submission and understand features are at Local Famous&rsquo;s discretion.
          </span>
        </label>
        <FieldError message={errors.consent?.message as string | undefined} />
      </div>

      <div className="md:col-span-2 flex items-center justify-between border-t border-rule/12 pt-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
          Reviewed every Monday. Most replies within 7 days.
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-accent">
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          {isSubmitting ? "Sending" : "Submit for review"}
        </button>
      </div>

      {status === "error" && serverError && (
        <div className="md:col-span-2 rounded-lg border border-[rgb(var(--live))]/30 bg-[rgb(var(--live))]/10 p-4 text-sm text-[rgb(var(--live))]">
          {serverError}
        </div>
      )}
    </form>
  );
}

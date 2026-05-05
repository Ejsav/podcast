"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, Check } from "lucide-react";
import { submitStorySchema, type SubmitStoryInput } from "@/lib/schemas";
import { Label, Input, Textarea, Select, FieldError } from "./FormField";

export function SubmitStoryForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubmitStoryInput>({
    resolver: zodResolver(submitStorySchema),
  });

  async function onSubmit(data: SubmitStoryInput) {
    setStatus("idle");
    setServerError(null);
    try {
      const res = await fetch("/api/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Could not submit story");
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
        <h3 className="mt-5 font-serif text-3xl">Got it.</h3>
        <p className="mt-3 mx-auto max-w-md text-ink-muted">
          Thanks for the tip. We read every submission. If it&rsquo;s the kind of story we chase, you&rsquo;ll hear from us.
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
      <div className="md:col-span-2">
        <Label htmlFor="title" required>Story headline</Label>
        <Input id="title" placeholder="One sentence that hooks us." error={!!errors.title} {...register("title")} />
        <FieldError message={errors.title?.message} />
      </div>

      <div>
        <Label htmlFor="category" required>Category</Label>
        <Select id="category" error={!!errors.category} {...register("category")}>
          <option value="">Pick one</option>
          <option value="drama">Social Drama</option>
          <option value="business">Business Story</option>
          <option value="event">Event / Culture</option>
          <option value="person">Popular Person</option>
          <option value="funny">Funny Situation</option>
          <option value="other">Something Else</option>
        </Select>
        <FieldError message={errors.category?.message} />
      </div>

      <div>
        <Label htmlFor="neighborhood">Neighborhood</Label>
        <Input id="neighborhood" placeholder="Eastside, Downtown, etc." {...register("neighborhood")} />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="story" required>The story</Label>
        <Textarea
          id="story"
          placeholder="The who, the what, the why it matters, and why now."
          rows={8}
          error={!!errors.story}
          {...register("story")}
        />
        <FieldError message={errors.story?.message} />
      </div>

      <div>
        <Label htmlFor="name" required>Your name</Label>
        <Input id="name" placeholder="Real name please" error={!!errors.name} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <Label htmlFor="email" required>Your email</Label>
        <Input id="email" type="email" placeholder="you@email.com" error={!!errors.email} {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-muted">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[rgb(var(--accent))]" {...register("consent")} />
          <span>
            I&rsquo;m submitting this in good faith, the info is accurate to my knowledge, and I understand we may follow up or reach out.
          </span>
        </label>
        <FieldError message={errors.consent?.message as string | undefined} />
      </div>

      <div className="md:col-span-2 flex items-center justify-between border-t border-rule/12 pt-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-subtle">
          We read every submission. We can&rsquo;t promise a feature.
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-accent">
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          {isSubmitting ? "Sending" : "Send the tip"}
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

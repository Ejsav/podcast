"use client";

import { useState } from "react";
import { Loader2, Check, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErr(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Could not subscribe");
      setState("ok");
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-rule/14 bg-surface">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -top-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="grid gap-10 p-8 md:p-14 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <span className="eyebrow"><span>The Local Famous Brief</span></span>
          <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)] text-balance">
            One <em className="serif-italic text-accent">smart</em> dispatch a week.
          </h2>
          <p className="mt-5 max-w-md text-ink-muted leading-relaxed">
            New episode, the trending local story behind it, and one small business worth your time. No filler, no autoplay, no algorithm.
          </p>
          <ul className="mt-6 grid gap-2.5 text-sm text-ink-muted">
            {[
              "Tuesday 7am — every week",
              "Three sections, six minutes",
              "Unsubscribe in one click",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check size={13} className="text-accent" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} data-reveal className="space-y-3">
          {state === "ok" ? (
            <div className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-8 text-center dark:bg-accent-soft/30">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-fg">
                <Check size={18} />
              </div>
              <h3 className="mt-4 font-serif text-2xl">You&rsquo;re in.</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Watch your inbox Tuesday morning. Real Tuesday. 7am sharp.
              </p>
            </div>
          ) : (
            <>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                  Email address
                </span>
                <div className="mt-2 flex items-center gap-2 rounded-full border border-rule/15 bg-bg p-1 pl-5 focus-within:border-rule/40 transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourcity.com"
                    className="h-11 flex-1 bg-transparent text-base placeholder:text-ink-subtle focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="btn btn-accent !h-11 !px-5"
                  >
                    {state === "loading" ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <>Subscribe <ArrowRight size={13} /></>
                    )}
                  </button>
                </div>
              </label>
              {err && (
                <div className="text-xs text-[rgb(var(--live))]">{err}</div>
              )}
              <p className="text-xs text-ink-subtle">
                By subscribing you agree to our terms. We never share your email.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

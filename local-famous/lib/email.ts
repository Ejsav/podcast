/**
 * Thin email layer. Uses Resend when RESEND_API_KEY is set;
 * otherwise logs to the server console so local development
 * never blocks on external setup.
 *
 * To go live:
 *   1. npm i resend
 *   2. In Vercel project env vars, set:
 *        RESEND_API_KEY   = re_XXXXX
 *        LF_NOTIFY_EMAIL  = where to receive form notifications
 *        LF_FROM_EMAIL    = a verified sender (e.g., hello@localfamous.fm)
 *   3. Deploy. That's it — these helpers pick it up automatically.
 */

type SendArgs = {
  subject: string;
  text: string;
  replyTo?: string;
  /** Tag used in logs / Resend dashboard */
  tag?: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LF_NOTIFY_EMAIL = process.env.LF_NOTIFY_EMAIL ?? "hello@localfamous.fm";
const LF_FROM_EMAIL = process.env.LF_FROM_EMAIL ?? "Local Famous <hello@localfamous.fm>";

export async function notifyTeam({ subject, text, replyTo, tag }: SendArgs) {
  if (!RESEND_API_KEY) {
    // Dev / preview fallback — no network call, just log.
    // Keeps the submission flow working end-to-end without secrets.
    console.log(
      `[email:${tag ?? "notify"}] (no RESEND_API_KEY — dry run)\n  to: ${LF_NOTIFY_EMAIL}\n  subject: ${subject}\n  replyTo: ${replyTo ?? "-"}\n  ${text.slice(0, 400)}`,
    );
    return { ok: true, dryRun: true };
  }

  // Fetch directly — avoids requiring `resend` as a dependency for
  // codebases that haven't installed it yet. The Resend REST API is stable.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: LF_FROM_EMAIL,
      to: [LF_NOTIFY_EMAIL],
      subject,
      text,
      reply_to: replyTo,
      tags: tag ? [{ name: "kind", value: tag }] : undefined,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error(`[email:${tag}] Resend ${res.status}: ${err}`);
    // We purposely do not rethrow — users should see "thanks" even if our
    // notification pipeline is temporarily down. We'll surface it in Sentry.
    return { ok: false, error: `Resend ${res.status}` };
  }

  return { ok: true, dryRun: false };
}

/**
 * Add a subscriber to a newsletter list. This is a thin helper:
 *   - Resend Audiences if RESEND_AUDIENCE_ID is set, OR
 *   - just notifies the team address otherwise.
 * Swap for ConvertKit / Beehiiv by editing this function only — no
 * callers change.
 */
export async function subscribeNewsletter(email: string) {
  if (!RESEND_API_KEY) {
    console.log(`[email:newsletter] (dry run) ${email}`);
    return { ok: true, dryRun: true };
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      },
    );
    if (!res.ok && res.status !== 409 /* already exists */) {
      const err = await res.text().catch(() => "");
      console.error(`[email:newsletter] Resend audiences ${res.status}: ${err}`);
      return { ok: false, error: `Resend ${res.status}` };
    }
    return { ok: true };
  }

  // No audience configured — just alert the team.
  return notifyTeam({
    tag: "newsletter",
    subject: "New newsletter subscriber",
    text: `New sub: ${email}`,
  });
}

import { NextResponse } from "next/server";
import { submitStorySchema } from "@/lib/schemas";
import { notifyTeam } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = submitStorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const d = parsed.data;
    await notifyTeam({
      tag: "submit-story",
      subject: `[tip] ${d.category.toUpperCase()} — ${d.title}`,
      replyTo: d.email,
      text: [
        `From: ${d.name} <${d.email}>`,
        `Category: ${d.category}`,
        d.neighborhood ? `Neighborhood: ${d.neighborhood}` : null,
        "",
        d.story,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

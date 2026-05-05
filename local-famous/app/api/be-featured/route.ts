import { NextResponse } from "next/server";
import { beFeaturedSchema } from "@/lib/schemas";
import { notifyTeam } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = beFeaturedSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const d = parsed.data;
    await notifyTeam({
      tag: "be-featured",
      subject: `[featured] ${d.type} — ${d.name}`,
      replyTo: d.email,
      text: [
        `From: ${d.name} <${d.email}>`,
        `Type: ${d.type}`,
        d.businessOrHandle ? `Business / handle: ${d.businessOrHandle}` : null,
        d.neighborhood ? `Neighborhood: ${d.neighborhood}` : null,
        d.website ? `Website: ${d.website}` : null,
        "",
        d.pitch,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

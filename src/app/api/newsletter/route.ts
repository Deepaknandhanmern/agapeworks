import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const bodySchema = z.object({ email: z.email("Enter a valid email address") });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();

  // Upsert so re-subscribing (or double-submitting) never errors — the
  // person just ends up subscribed either way, which is all they asked for.
  await db.newsletterSubscriber.upsert({
    where: { email },
    create: { email },
    update: {},
  });

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { db } from "@/lib/db";
import { triageEnquiry } from "@/lib/ai/enquiry-triage";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  const { website, ...fields } = parsed.data;

  // Honeypot tripped — a real visitor never sees or fills this field.
  // Accept silently (don't tip off the bot) instead of logging or erroring.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = await db.enquiry.create({
    data: {
      name: fields.name,
      email: fields.email,
      company: fields.company || null,
      service: fields.service,
      budget: fields.budget,
      timeline: fields.timeline,
      source: fields.source || null,
      message: fields.message,
    },
  });

  // Best-effort AI triage — never blocks or fails the submission response.
  // Adds a few seconds of latency to this request; acceptable for a
  // low-volume contact form and keeps the implementation dependency-free
  // (no queue/worker infra).
  const triage = await triageEnquiry({
    service: fields.service,
    budget: fields.budget,
    timeline: fields.timeline,
    message: fields.message,
  });
  if (triage) {
    await db.enquiry
      .update({
        where: { id: enquiry.id },
        data: { priority: triage.priority, aiSummary: triage.summary },
      })
      .catch(() => null);
  }

  return NextResponse.json({ ok: true });
}

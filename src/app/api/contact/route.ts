import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";

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

  // No email provider is configured yet (e.g. Resend, Nodemailer/SMTP).
  // Wire one up here once credentials are available — for now, submissions
  // are logged server-side so nothing is silently dropped.
  console.log("New contact form submission:", {
    ...fields,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

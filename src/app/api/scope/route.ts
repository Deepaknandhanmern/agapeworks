import { NextResponse } from "next/server";
import { scopeRequestSchema } from "@/lib/ai/scope-schema";
import { getScopeEstimate } from "@/lib/ai/scope-estimate";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = scopeRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }

  const estimate = await getScopeEstimate(parsed.data);

  if (!estimate) {
    return NextResponse.json(
      { error: "Couldn't generate an estimate right now — please try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ estimate });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { addStatusPageComment } from "@/lib/data/status-page";

const commentSchema = z.object({
  authorName: z.string().min(1, "Enter your name").max(100),
  message: z.string().min(1, "Enter a message").max(2000),
});

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }

  const comment = await addStatusPageComment(token, parsed.data.authorName, parsed.data.message);
  if (!comment) {
    return NextResponse.json({ error: "Status page not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

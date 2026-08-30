import { z } from "zod";
import { anthropic, SCOPING_MODEL } from "@/lib/ai/client";
import { buildConciergeSystemPrompt } from "@/lib/ai/concierge-prompt";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "Chat isn't available right now — try the contact form instead." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const stream = anthropic.messages.stream({
      model: SCOPING_MODEL,
      max_tokens: 512,
      system: buildConciergeSystemPrompt(),
      messages: parsed.data.messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        stream.on("text", (text) => controller.enqueue(encoder.encode(text)));
        stream.on("end", () => controller.close());
        stream.on("error", () => controller.close());
      },
      cancel() {
        stream.abort();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

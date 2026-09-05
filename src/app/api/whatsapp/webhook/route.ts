import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

// Needs Node's `crypto` module for signature verification - explicit so this
// never silently ends up on the Edge runtime, where that module isn't
// available.
export const runtime = "nodejs";

/**
 * Meta's webhook verification handshake (done once, when the webhook URL is
 * registered in the Meta App dashboard): it calls this URL with a challenge
 * value and expects that exact value echoed back, as plain text, only if
 * hub.verify_token matches what we configured on our side.
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && verifyToken && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

interface WhatsAppTextMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WhatsAppWebhookPayload {
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: {
        messages?: WhatsAppTextMessage[];
        statuses?: unknown[];
      };
    }>;
  }>;
}

/** Constant-time-safe comparison of the raw body against Meta's HMAC-SHA256 signature header. */
function isValidSignature(rawBody: string, signatureHeader: string | null, appSecret: string): boolean {
  if (!signatureHeader?.startsWith("sha256=")) return false;

  const expected = createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
  const provided = signatureHeader.slice("sha256=".length);

  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(provided, "hex");
  if (expectedBuffer.length !== providedBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

export async function POST(request: Request) {
  // Read as raw text first - signature verification is over the exact raw
  // bytes Meta sent, not a re-serialized version of the parsed JSON (which
  // can differ in whitespace/key order and would make every signature fail).
  const rawBody = await request.text();

  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    const signatureHeader = request.headers.get("x-hub-signature-256");
    if (!isValidSignature(rawBody, signatureHeader, appSecret)) {
      console.error("[whatsapp/webhook] Rejected: invalid X-Hub-Signature-256");
      return new NextResponse("Invalid signature", { status: 401 });
    }
  } else {
    // Not yet configured - accept but flag it loudly, since an unverified
    // webhook accepts requests from anyone who finds the URL.
    console.warn("[whatsapp/webhook] WHATSAPP_APP_SECRET not set - skipping signature verification");
  }

  let payload: WhatsAppWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      // Only "messages" carries actual inbound messages; other fields (and
      // value.statuses, e.g. sent/delivered/read receipts) are ignored here.
      if (change.field && change.field !== "messages") continue;

      for (const message of change.value?.messages ?? []) {
        if (message.type !== "text" || !message.text) continue;

        console.log("[whatsapp/webhook] Incoming text message", {
          from: message.from,
          messageId: message.id,
          text: message.text.body,
          timestamp: message.timestamp,
        });
      }
    }
  }

  // Meta expects a fast 200 - no downstream work (e.g. a reply) happens here
  // yet, so this returns immediately either way.
  return NextResponse.json({ received: true }, { status: 200 });
}

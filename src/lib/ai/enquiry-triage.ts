import "server-only";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { anthropic, SCOPING_MODEL } from "./client";

const TriageResultSchema = z.object({
  priority: z.enum(["high", "medium", "low"]),
  summary: z
    .string()
    .describe("One sentence, under 20 words, scannable in a dashboard list row"),
});

export type TriageResult = z.infer<typeof TriageResultSchema>;

const SYSTEM_PROMPT = `You triage inbound leads for Agape Works, a small studio of senior
engineers doing fixed-scope web/mobile/SaaS/AI development work. Given a contact form
submission, decide how urgently the team should respond and write a one-line summary.

Weigh these signals together — no single field decides it alone:
- Budget: "$50k+" and "$25k-$50k" signal a serious, funded project. "Not sure yet" or
  "Under $10k" often means early-stage or a poor fit for a fixed-scope studio.
- Timeline: "ASAP" or "Within 1 month" paired with a real budget is high priority.
  "Just exploring" is rarely high priority regardless of budget.
- Message content: a clear, specific project description outranks a vague one. Red flags
  (unrealistic scope for the stated budget, spam-like or templated text, no real project
  described) should lower priority even if budget/timeline look good.

Return "high" only for leads worth answering first today. Return "low" for leads that can
wait or are likely a poor fit. Most real, plausible leads should land at "medium".`;

/**
 * Best-effort classification — returns null on any failure (missing/invalid
 * API key, rate limit, parse failure) so callers can skip the DB update
 * instead of blocking enquiry creation on it.
 */
export async function triageEnquiry(input: {
  service: string;
  budget: string;
  timeline: string;
  message: string;
}): Promise<TriageResult | null> {
  try {
    const response = await anthropic.messages.parse({
      model: SCOPING_MODEL,
      max_tokens: 1024,
      output_config: {
        effort: "low",
        format: zodOutputFormat(TriageResultSchema),
      },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Service: ${input.service}\nBudget: ${input.budget}\nTimeline: ${input.timeline}\nMessage:\n${input.message}`,
        },
      ],
    });

    return response.parsed_output;
  } catch {
    return null;
  }
}

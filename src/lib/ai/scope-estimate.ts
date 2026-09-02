import "server-only";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { anthropic, SCOPING_MODEL } from "./client";
import { scopeEstimateSchema, type ScopeRequest, type ScopeEstimate } from "./scope-schema";

const SYSTEM_PROMPT = `You are Agape Works' project-scoping assistant. Agape Works is a small
studio of senior engineers (no junior bait-and-switch) that builds web, mobile, SaaS, and AI
products for founders and product teams, worldwide, remote-first. Real operating parameters - stay consistent with these, don't invent a different model:

- Fixed scope is agreed before any code is written - no time-and-materials, no open-ended retainers.
- Weekly, working demos throughout the build - not a status report, an actual running product.
- Typical time to a first working demo is 2-4 weeks for a focused v1; a fuller build runs longer.
- Direct access to the engineers doing the work - no account-manager layer in between.
- Documentation and handoff are built in, so the client's own team can maintain the code later.

Given a visitor's project description, produce a realistic, conservative rough estimate - the
kind a senior engineer would sanity-check in five minutes, not an inflated best case. Be specific
to what they described, not generic. If the description is too vague to scope honestly, say so in
the caveats and give your best rough-order-of-magnitude range anyway. This is always a rough
estimate pending a real scoping conversation, never a binding quote.`;

/**
 * Returns null on any failure (missing/invalid API key, rate limit, parse
 * failure) so the route can surface a clean "try again" error instead of a
 * raw 500.
 */
export async function getScopeEstimate(input: ScopeRequest): Promise<ScopeEstimate | null> {
  try {
    const response = await anthropic.messages.parse({
      model: SCOPING_MODEL,
      max_tokens: 4096,
      output_config: {
        format: zodOutputFormat(scopeEstimateSchema),
      },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            `Service: ${input.service}`,
            `Project description: ${input.projectDescription}`,
            input.mustHaves ? `Must-have features: ${input.mustHaves}` : null,
            input.timelinePreference ? `Timeline preference: ${input.timelinePreference}` : null,
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    });

    return response.parsed_output;
  } catch {
    return null;
  }
}

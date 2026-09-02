import { z } from "zod";

// No server-only imports here - this file is shared by the client-side form
// (scope-form.tsx) and the server-side route/estimate call. Keeping the
// Anthropic client out of this module is what keeps it safe to import from
// a "use client" component.

export const scopeRequestSchema = z.object({
  service: z.string().min(1, "Select a service"),
  projectDescription: z
    .string()
    .min(20, "Tell us a bit more about what you're building (at least 20 characters)"),
  mustHaves: z.string().optional(),
  timelinePreference: z.string().optional(),
});

export type ScopeRequest = z.infer<typeof scopeRequestSchema>;

export const scopeEstimateSchema = z.object({
  timeline: z
    .string()
    .describe("Rough timeline to a first working demo, e.g. '4-6 weeks to first working demo'"),
  engagementType: z
    .string()
    .describe("How the engagement would likely be structured, e.g. 'Fixed-scope build' or 'Discovery sprint, then fixed-scope build'"),
  phases: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .min(2)
    .max(5)
    .describe("2-5 build phases in order"),
  budgetRange: z
    .string()
    .describe("A rough, honest USD range for a project like this, e.g. '$15k-$25k'"),
  recommendations: z
    .string()
    .describe("1-2 sentences of practical, specific advice for this exact project"),
  caveats: z
    .string()
    .describe("1 sentence noting this is a rough AI-generated estimate, not a binding quote"),
});

export type ScopeEstimate = z.infer<typeof scopeEstimateSchema>;

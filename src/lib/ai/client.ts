import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Zero-arg constructor resolves ANTHROPIC_API_KEY from the environment.
// Both callers (enquiry triage, project scoping) treat a missing/invalid key
// as a soft failure — see their own try/catch — so this never throws here.
export const anthropic = new Anthropic();

export const SCOPING_MODEL = "claude-opus-5";

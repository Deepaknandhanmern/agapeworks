// Shared between the server actions, the dashboard detail view, and the
// public status page. Kept out of client-project-actions.ts deliberately —
// a "use server" file may only export async functions, so a plain constant
// exported from one silently breaks (throws at runtime, not at compile
// time) when a client component imports it.
export const PHASES = ["Discovery", "Build", "QA", "Launched"] as const;

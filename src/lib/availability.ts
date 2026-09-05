// Pure constants/types, no server-only imports - safe to import from both
// Server and Client Components (see lib/data/site-settings.ts for the
// actual DB-backed read, which does have a server-only dependency).
export type AvailabilityStatus = "open" | "limited" | "booked";

export const AVAILABILITY_COPY: Record<AvailabilityStatus, { badge: string; text: string }> = {
  open: { badge: "Open", text: "Currently taking on new projects" },
  limited: { badge: "Limited", text: "Limited availability - taking select projects" },
  booked: { badge: "Booked", text: "Fully booked - waitlist available" },
};

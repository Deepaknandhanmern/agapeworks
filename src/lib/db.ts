import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Standard Next.js dev-mode singleton: without this, every HMR reload of a
// module that imports `db` would open a fresh PrismaClient (and a fresh
// connection pool), quickly exhausting connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Prisma 7 requires a driver adapter. Uses DATABASE_URL (Supabase's pooled
  // pgbouncer connection) — DIRECT_URL is reserved for the CLI/migrations,
  // see prisma7.config.ts.
  const adapter = new PrismaPg(process.env.DATABASE_URL!);
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

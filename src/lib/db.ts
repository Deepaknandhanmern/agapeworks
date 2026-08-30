import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Standard Next.js dev-mode singleton: without this, every HMR reload of a
// module that imports `db` would open a fresh PrismaClient (and a fresh
// SQLite connection), quickly exhausting connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Prisma 7 requires a driver adapter — swap this for @prisma/adapter-pg
  // if this ever moves to a hosted Postgres (see prisma/schema.prisma).
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

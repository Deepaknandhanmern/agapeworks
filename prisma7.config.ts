// Config for the Prisma CLI (migrate, studio, db pull) — required by Prisma
// 7, named `prisma7.config.ts` (not `prisma.config.ts`) per this major
// version. This only configures CLI/migration tooling; the app's runtime
// PrismaClient connects via a driver adapter instead (see src/lib/db.ts).
//
// Uses DIRECT_URL, not DATABASE_URL: DATABASE_URL is Supabase's pooled
// (pgbouncer transaction-mode) connection, which doesn't support the
// session-level operations `prisma migrate`/`db push` need. DIRECT_URL is
// the direct/session-mode connection, reserved for CLI use only.
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});

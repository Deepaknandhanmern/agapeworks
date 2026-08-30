// Seeds the 3 real portfolio projects (the only copy of this data left,
// now that src/lib/portfolio-data.ts reads from the DB) so a fresh clone
// isn't left with an empty portfolio page. Blog posts have no equivalent
// seed anymore — the one-time migration from src/content/blog/*.mdx
// already ran and those files were removed; new posts are written through
// the dashboard from here on.
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

loadEnv({ path: ".env.local" });

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const legacyProjects = [
  {
    name: "Zenvyra Cleaning",
    url: "https://zenvyracleaning.in",
    description: "Cleaning services website built and launched by Agape Works.",
    screenshot: null,
    order: 0,
  },
  {
    name: "UCX Group",
    url: "https://ucx-group.com",
    description: "Corporate website built and launched by Agape Works.",
    screenshot: "/portfolio/ucx-group.png",
    order: 1,
  },
  {
    name: "Kathir Solar Solutions",
    url: "https://kathirsolarsolutions.in",
    description: "Solar energy company website built and launched by Agape Works.",
    screenshot: null,
    order: 2,
  },
];

async function seedProjects() {
  const existingCount = await prisma.project.count();
  if (existingCount > 0) {
    console.log("  projects already seeded, skipping");
    return;
  }

  for (const project of legacyProjects) {
    await prisma.project.create({ data: project });
    console.log(`  project: ${project.name}`);
  }
}

async function main() {
  console.log("Seeding projects...");
  await seedProjects();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

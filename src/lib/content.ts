import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
};

export type CaseStudyMeta = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  services: string[];
  liveUrl?: string;
  date: string;
};

function slugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readSource(dir: string, slug: string): string {
  return fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return slugsIn(BLOG_DIR)
    .map((slug) => {
      const { data } = matter(readSource(BLOG_DIR, slug));
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        author: (data.author as string) ?? "Agape Works",
        tags: (data.tags as string[]) ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostSource(slug: string): string | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return slugsIn(CASE_STUDIES_DIR)
    .map((slug) => {
      const { data } = matter(readSource(CASE_STUDIES_DIR, slug));
      return {
        slug,
        title: data.title as string,
        client: data.client as string,
        summary: data.summary as string,
        services: (data.services as string[]) ?? [],
        liveUrl: data.liveUrl as string | undefined,
        date: data.date as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCaseStudySource(slug: string): string | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

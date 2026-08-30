import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { db } from "@/lib/db";

const CASE_STUDIES_DIR = path.join(process.cwd(), "src/content/case-studies");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage: string | null;
};

export type BlogPost = BlogPostMeta & { content: string };

export type CaseStudyMeta = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  services: string[];
  liveUrl?: string;
  date: string;
};

/** Public-facing: published posts only, newest first. */
export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return posts.map(toBlogPostMeta);
}

/** Public-facing: a single published post by slug, or null if missing/unpublished. */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await db.blogPost.findFirst({ where: { slug, published: true } });
  if (!post) return null;

  return { ...toBlogPostMeta(post), content: post.content };
}

function toBlogPostMeta(post: {
  slug: string;
  title: string;
  description: string;
  date: Date;
  author: string;
  tags: string;
  coverImage: string | null;
}): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date.toISOString(),
    author: post.author,
    tags: JSON.parse(post.tags) as string[],
    coverImage: post.coverImage,
  };
}

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

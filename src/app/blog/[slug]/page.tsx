import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Header } from "@/components/ui/header-3";
import { mdxComponents } from "@/components/mdx-components";
import { getAllBlogPosts, getBlogPostSource, type BlogPostMeta } from "@/lib/content";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getBlogPostSource(slug);
  if (!source) return {};

  const { frontmatter } = await compileMDX<BlogPostMeta>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: `${frontmatter.title} — Agape Works`,
    description: frontmatter.description,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = getBlogPostSource(slug);
  if (!source) notFound();

  const { content, frontmatter } = await compileMDX<BlogPostMeta>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-2xl px-4 pb-24 pt-20 sm:pt-28">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
            <span>·</span>
            <span>{frontmatter.author}</span>
            {frontmatter.tags?.map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-8 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {frontmatter.title}
          </h1>
          <div>{content}</div>
        </article>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Header } from "@/components/ui/header-3";
import { mdxComponents } from "@/components/mdx-components";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// New posts created after the last build still render (and get cached)
// on first visit instead of 404ing until the next deploy.
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Agape Works`,
    description: post.description,
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
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8 sm:pt-10">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.author}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-8 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div>{content}</div>
        </article>
      </main>
    </div>
  );
}

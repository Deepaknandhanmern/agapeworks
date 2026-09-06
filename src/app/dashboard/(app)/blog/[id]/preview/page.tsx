import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft, Eye } from "lucide-react";
import { mdxComponents } from "@/components/mdx-components";
import { getBlogPostByIdForDashboard } from "@/lib/data/dashboard";
import { readingMinutes } from "@/lib/reading-time";

/**
 * Renders a post exactly as the public page will, including unpublished
 * drafts - which /blog/[slug] deliberately 404s on (getBlogPostBySlug filters
 * to published: true).
 *
 * Lives under /dashboard rather than adding a ?preview flag to the public
 * route on purpose: the public blog pages are statically generated via
 * generateStaticParams, and reading a search param or session there would
 * force every post to render dynamically just to serve the occasional draft.
 */
function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostByIdForDashboard(id);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  });

  const tags = JSON.parse(post.tags) as string[];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to posts
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              post.published
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-amber-500/10 text-amber-600"
            }`}
          >
            <Eye className="size-3.5" />
            {post.published ? "Published" : "Draft - not visible publicly"}
          </span>
          {post.published && (
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium underline underline-offset-4"
            >
              View live
            </Link>
          )}
          <Link
            href={`/dashboard/blog/${post.id}`}
            className="text-sm font-medium underline underline-offset-4"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Same widths/type scale as the public article so the preview is
          representative rather than approximate. */}
      <article className="mx-auto w-full max-w-2xl rounded-xl border bg-card px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.author}</span>
          <span>·</span>
          <span>{readingMinutes(post.content)} min read</span>
          {tags.map((tag) => (
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
    </div>
  );
}

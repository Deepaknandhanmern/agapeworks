import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/content";

/**
 * End-of-post navigation: up to three related posts, plus previous/next in
 * publication order. Without this every post is a dead end - the only way
 * onward is the browser back button.
 *
 * "Related" is scored by shared tags, falling back to the most recent posts
 * when nothing overlaps, so this still renders something useful on a blog
 * whose posts don't share tags yet.
 */
export function RelatedPosts({
  current,
  all,
}: {
  current: BlogPostMeta;
  all: BlogPostMeta[];
}) {
  const others = all.filter((p) => p.slug !== current.slug);
  if (others.length === 0) return null;

  // `all` is ordered newest-first (getAllBlogPosts orders by date desc), so
  // the entry before this one in the array is the *newer* post.
  const index = all.findIndex((p) => p.slug === current.slug);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const scored = others
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, 3)
    .map((s) => s.post);

  return (
    <div className="mt-16 border-t pt-10">
      {(newer || older) && (
        <nav className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-between">
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group flex max-w-xs flex-col gap-1 text-sm"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                Older post
              </span>
              <span className="font-medium text-foreground group-hover:underline">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/blog/${newer.slug}`}
              className="group flex max-w-xs flex-col gap-1 text-sm sm:items-end sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                Newer post
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="font-medium text-foreground group-hover:underline">
                {newer.title}
              </span>
            </Link>
          )}
        </nav>
      )}

      <h2 className="mb-5 text-lg font-semibold text-foreground">Keep reading</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {scored.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col gap-2 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20"
          >
            <span className="text-xs text-muted-foreground">{p.readingMinutes} min read</span>
            <span className="font-medium leading-snug text-foreground group-hover:underline">
              {p.title}
            </span>
            <span className="line-clamp-2 text-sm text-muted-foreground">{p.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

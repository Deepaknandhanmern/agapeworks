import type { Metadata } from "next";
import { Header } from "@/components/ui/header-3";
import { getAllBlogPosts } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Agape Works",
  description: "Notes on product strategy, SaaS development, SEO, and AEO from Agape Works.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-20 text-center sm:pt-28">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Blog
          </div>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Notes on building software that ships.
          </h1>
          <p className="max-w-xl text-balance text-lg leading-7 text-muted-foreground">
            Product strategy, SaaS development, SEO, and AEO — written from the inside of real
            engagements, not from a content calendar.
          </p>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 pb-24">
          <div className="flex flex-col divide-y divide-border border-t">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 first:pt-0"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-foreground group-hover:underline">
                  {post.title}
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Read post
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
            {posts.length === 0 && (
              <p className="py-8 text-muted-foreground">No posts published yet — check back soon.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

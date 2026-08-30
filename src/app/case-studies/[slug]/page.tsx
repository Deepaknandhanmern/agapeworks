import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/ui/header-3";
import { mdxComponents } from "@/components/mdx-components";
import {
  getAllCaseStudies,
  getCaseStudySource,
  type CaseStudyMeta,
} from "@/lib/content";

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = getCaseStudySource(slug);
  if (!source) return {};

  const { frontmatter } = await compileMDX<CaseStudyMeta>({
    source,
    options: { parseFrontmatter: true },
  });

  return {
    title: `${frontmatter.title} — Agape Works`,
    description: frontmatter.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = getCaseStudySource(slug);
  if (!source) notFound();

  const { content, frontmatter } = await compileMDX<CaseStudyMeta>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8 sm:pt-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {frontmatter.services?.map((service) => (
              <span
                key={service}
                className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {service}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">{frontmatter.summary}</p>
          {frontmatter.liveUrl && (
            <a
              href={frontmatter.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Visit live site
              <ExternalLink className="size-3.5" />
            </a>
          )}
          <div>{content}</div>
        </article>
      </main>
    </div>
  );
}

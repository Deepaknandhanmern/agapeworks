import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { HeadingAnchor } from "@/components/ui/heading-anchor";

/**
 * Derives the heading id from the rendered text. Done here rather than with
 * rehype-slug/rehype-autolink-headings so the anchors cost no new
 * dependencies - the heading children are already plain text in this content.
 */
function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && "props" in node) {
    return toText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function slugify(node: ReactNode): string {
  return toText(node)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  h2: ({ children, ...props }) => {
    const slug = slugify(children);
    return (
      // scroll-mt clears the fixed header when jumping to an anchor.
      <h2
        id={slug}
        className="group mt-10 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground"
        {...props}
      >
        {children}
        <HeadingAnchor slug={slug} />
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const slug = slugify(children);
    return (
      <h3
        id={slug}
        className="group mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-foreground"
        {...props}
      >
        {children}
        <HeadingAnchor slug={slug} />
      </h3>
    );
  },
  p: (props) => <p className="mb-4 leading-7 text-muted-foreground" {...props} />,
  ul: (props) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-2 border-border pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props} />
  ),
};

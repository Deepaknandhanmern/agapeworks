import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  h2: (props) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground" {...props} />
  ),
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

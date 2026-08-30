import { notFound } from "next/navigation";
import { BlogPostForm } from "../blog-post-form";
import { updateBlogPostAction } from "@/lib/actions/blog-actions";
import { getBlogPostByIdForDashboard } from "@/lib/data/dashboard";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostByIdForDashboard(id);
  if (!post) notFound();

  const action = updateBlogPostAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Edit post</h1>
      <BlogPostForm
        action={action}
        defaultValues={{
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          author: post.author,
          tags: (JSON.parse(post.tags) as string[]).join(", "),
          date: post.date.toISOString().slice(0, 10),
          published: post.published,
          coverImage: post.coverImage,
        }}
      />
    </div>
  );
}

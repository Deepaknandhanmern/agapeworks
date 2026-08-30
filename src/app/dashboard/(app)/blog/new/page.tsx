import { BlogPostForm } from "../blog-post-form";
import { createBlogPostAction } from "@/lib/actions/blog-actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">New post</h1>
      <BlogPostForm action={createBlogPostAction} />
    </div>
  );
}

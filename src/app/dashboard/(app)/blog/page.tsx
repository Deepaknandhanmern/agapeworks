import Link from "next/link";
import { getAllBlogPostsForDashboard } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "../delete-button";
import { deleteBlogPostAction } from "@/lib/actions/blog-actions";

export default async function DashboardBlogPage() {
  const posts = await getAllBlogPostsForDashboard();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Blog posts</h1>
        <Button asChild>
          <Link href="/dashboard/blog/new">New post</Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b last:border-0">
                <td className="p-4 font-medium text-foreground">{post.title}</td>
                <td className="p-4 text-muted-foreground">
                  {post.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-accent text-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/blog/${post.id}`}>Edit</Link>
                    </Button>
                    <DeleteButton action={deleteBlogPostAction.bind(null, post.id)} label={post.title} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import Link from "next/link";
import { getAllTestimonialsForDashboard } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/button";
import { CopyableText } from "@/components/ui/copyable-text";
import { DeleteButton } from "../delete-button";
import { deleteTestimonialAction } from "@/lib/actions/testimonial-actions";

export default async function DashboardTestimonialsPage() {
  const testimonials = await getAllTestimonialsForDashboard();
  const unpublishedCount = testimonials.filter((t) => !t.published).length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Testimonials</h1>
        <Button asChild>
          <Link href="/dashboard/testimonials/new">New testimonial</Link>
        </Button>
      </div>

      <div className="mb-6 rounded-xl border bg-card p-4 text-sm">
        <p className="mb-1 font-medium text-foreground">Want a client to write their own?</p>
        <p className="text-muted-foreground">
          Send them this link -{" "}
          <CopyableText text="https://agapeworks.in/submit-testimonial" className="font-mono text-xs" />{" "}
          - submissions land here unpublished, ready for you to review below.
          {unpublishedCount > 0 && (
            <span className="ml-1 font-medium text-foreground">
              ({unpublishedCount} awaiting review)
            </span>
          )}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="p-4 font-medium">Author</th>
              <th className="p-4 font-medium">Quote</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b last:border-0">
                <td className="p-4 font-medium text-foreground">
                  {t.authorName}
                  {(t.authorRole || t.authorCompany) && (
                    <p className="font-normal text-muted-foreground">
                      {[t.authorRole, t.authorCompany].filter(Boolean).join(", ")}
                    </p>
                  )}
                </td>
                <td className="max-w-sm truncate p-4 text-muted-foreground">{t.quote}</td>
                <td className="p-4 text-muted-foreground">{t.published ? "Published" : "Hidden"}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/testimonials/${t.id}`}>Edit</Link>
                    </Button>
                    <DeleteButton
                      action={deleteTestimonialAction.bind(null, t.id)}
                      label={t.authorName}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

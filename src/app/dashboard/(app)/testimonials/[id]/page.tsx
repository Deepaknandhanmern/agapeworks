import { notFound } from "next/navigation";
import { TestimonialForm } from "../testimonial-form";
import { updateTestimonialAction } from "@/lib/actions/testimonial-actions";
import { getTestimonialByIdForDashboard } from "@/lib/data/dashboard";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialByIdForDashboard(id);
  if (!testimonial) notFound();

  const action = updateTestimonialAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Edit testimonial</h1>
      <TestimonialForm
        action={action}
        defaultValues={{
          quote: testimonial.quote,
          authorName: testimonial.authorName,
          authorRole: testimonial.authorRole ?? "",
          authorCompany: testimonial.authorCompany ?? "",
          order: testimonial.order,
          avatar: testimonial.avatar,
          published: testimonial.published,
        }}
      />
    </div>
  );
}

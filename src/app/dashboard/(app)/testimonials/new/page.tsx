import { TestimonialForm } from "../testimonial-form";
import { createTestimonialAction } from "@/lib/actions/testimonial-actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">New testimonial</h1>
      <TestimonialForm action={createTestimonialAction} />
    </div>
  );
}

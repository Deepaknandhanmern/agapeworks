import { Quote } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/testimonials-data";

// Real client quotes only, written through the dashboard (/dashboard/testimonials)
// - never fabricated. Renders nothing at all until at least one is published,
// same empty-state discipline as the portfolio's Landing Page section.
export async function TestimonialsSection() {
  const testimonials = await getPublishedTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t"><div className="mx-auto w-full max-w-5xl px-4 py-24">
      <div className="mb-12 flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          What clients say
        </h2>
        <p className="max-w-lg text-muted-foreground">
          Straight from the people we&apos;ve built with.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.id} className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
            <Quote className="size-6 text-orange-500" />
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {t.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element -- static local asset, not worth next/image for a single file
                <img
                  src={t.avatar}
                  alt={t.authorName}
                  className="size-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="grid size-10 shrink-0 place-content-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                  {t.authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-sm">
                <p className="font-medium text-foreground">{t.authorName}</p>
                {(t.authorRole || t.authorCompany) && (
                  <p className="text-muted-foreground">
                    {[t.authorRole, t.authorCompany].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div></section>
  );
}

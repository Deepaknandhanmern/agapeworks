import { db } from "@/lib/db";

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
  authorCompany: string | null;
  avatar: string | null;
};

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  return db.testimonial.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      quote: true,
      authorName: true,
      authorRole: true,
      authorCompany: true,
      avatar: true,
    },
  });
}

import { prisma } from "@/lib/db";
import type { TestimonialModel } from "@/generated/prisma/models";

/**
 * Phase 6/7: public testimonials. Only rows that are published AND have the
 * person's consent are ever shown or counted.
 */
export async function getPublishedTestimonials(): Promise<TestimonialModel[]> {
  return prisma.testimonial.findMany({
    where: { published: true, consent: true },
    orderBy: { createdAt: "desc" },
  });
}

/** Phase 7: true when the public testimonials page and nav entry should exist. */
export async function hasPublishedTestimonials(): Promise<boolean> {
  const count = await prisma.testimonial.count({
    where: { published: true, consent: true },
  });
  return count > 0;
}

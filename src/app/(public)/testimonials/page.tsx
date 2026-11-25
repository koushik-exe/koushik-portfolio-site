import type { Metadata } from "next";

import {
  getPublishedTestimonials,
  hasPublishedTestimonials,
} from "@/lib/data/testimonials";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const hasTestimonials = await hasPublishedTestimonials();
  return createPageMetadata({
    title: "Testimonials",
    description:
      "What colleagues and collaborators say about working with Koushik C on data analysis, reporting and day-to-day collaboration.",
    path: "/testimonials",
    noIndex: !hasTestimonials,
  });
}

export default async function TestimonialsPage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <section
      aria-labelledby="testimonials-heading"
      id="testimonials"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            Testimonials
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="testimonials-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              What people say
            </h1>

            {testimonials.length === 0 ? (
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
                No testimonials yet. This page and its navigation link stay
                hidden until a real quote is published with the person&rsquo;s
                consent.
              </p>
            ) : (
              <ul className="mt-10 border-t border-border">
                {testimonials.map((testimonial) => (
                  <li
                    key={testimonial.id}
                    className="border-b border-border py-8"
                  >
                    <blockquote>
                      <p className="text-lg leading-relaxed text-pretty text-foreground">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <footer className="mt-4 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                        {testimonial.name}
                      </footer>
                    </blockquote>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

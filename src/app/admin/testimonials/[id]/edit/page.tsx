import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getAdminTestimonial } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Edit testimonial | Admin",
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const testimonial = await getAdminTestimonial(id);
  if (!testimonial) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/admin/testimonials"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
      >
        &larr; Testimonials
      </Link>
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        Edit testimonial
      </h1>
      <div className="mt-8">
        <TestimonialForm
          initial={{
            id: testimonial.id,
            quote: testimonial.quote,
            name: testimonial.name,
            consent: testimonial.consent,
            published: testimonial.published,
          }}
        />
      </div>
    </div>
  );
}

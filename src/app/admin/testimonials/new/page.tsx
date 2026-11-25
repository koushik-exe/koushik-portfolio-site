import type { Metadata } from "next";
import Link from "next/link";

import { TestimonialForm } from "@/components/admin/testimonial-form";

export const metadata: Metadata = {
  title: "New testimonial | Admin",
  robots: { index: false, follow: false },
};

export default function NewTestimonialPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/admin/testimonials"
        className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
      >
        &larr; Testimonials
      </Link>
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
        New testimonial
      </h1>
      <div className="mt-8">
        <TestimonialForm />
      </div>
    </div>
  );
}

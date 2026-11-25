import type { Metadata } from "next";
import Link from "next/link";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deleteTestimonial } from "@/lib/actions/admin";
import { getAdminTestimonials } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Testimonials | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();

  return (
    <div className="mx-auto w-full max-w-content">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The public page stays hidden until one is published with consent.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">New testimonial</Link>
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          No testimonials yet. Add one only when a real quote and consent
          exist.
        </p>
      ) : (
        <ul className="mt-8 border-t border-border">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="border-b border-border py-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    — {testimonial.name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge on={testimonial.published} />
                    <StatusBadge
                      on={testimonial.consent}
                      onLabel="Consent given"
                      offLabel="No consent"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <DeleteDialog
                    id={testimonial.id}
                    itemLabel="testimonial"
                    itemName={`${testimonial.name}'s quote`}
                    action={deleteTestimonial}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

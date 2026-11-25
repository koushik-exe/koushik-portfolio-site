"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { saveTestimonial } from "@/lib/actions/admin";
import {
  testimonialSchema,
  type TestimonialFormValues,
} from "@/lib/schemas/admin";
import {
  errorClasses,
  fieldClasses,
  hintClasses,
  inputClasses,
  labelClasses,
} from "@/components/admin/form-styles";

export type TestimonialDefaults = {
  id: number;
  quote: string;
  name: string;
  consent: boolean;
  published: boolean;
};

export function TestimonialForm({ initial }: { initial?: TestimonialDefaults }) {
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    mode: "onBlur",
    defaultValues: {
      quote: initial?.quote ?? "",
      name: initial?.name ?? "",
      consent: initial?.consent ?? false,
      published: initial?.published ?? false,
    },
  });

  const onSubmit: SubmitHandler<TestimonialFormValues> = async (data) => {
    setAnnouncement(null);
    const formData = new FormData();
    formData.set("id", initial ? String(initial.id) : "");
    for (const [key, value] of Object.entries(data)) {
      formData.set(key, String(value));
    }
    const result = await saveTestimonial(formData);
    if (result.status === "invalid") {
      let first: keyof TestimonialFormValues | null = null;
      for (const [key, message] of Object.entries(result.errors)) {
        const field = key as keyof TestimonialFormValues;
        setError(field, { message });
        first ??= field;
      }
      if (first) setFocus(first);
      setAnnouncement("Please check the highlighted fields.");
      return;
    }
    if (result.status === "saved") {
      router.push("/admin/testimonials");
      router.refresh();
      return;
    }
    setAnnouncement(
      result.status === "error"
        ? result.message
        : "Could not save the testimonial.",
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <p role="status" className={errorClasses}>
        {announcement}
      </p>

      <div className={fieldClasses}>
        <label htmlFor="testimonial-quote" className={labelClasses}>
          Quote (Required)
        </label>
        <textarea
          id="testimonial-quote"
          {...register("quote")}
          rows={6}
          className={inputClasses}
          aria-invalid={errors.quote ? true : undefined}
        />
        {errors.quote?.message ? (
          <span className={errorClasses}>{errors.quote.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="testimonial-name" className={labelClasses}>
          Name (Required)
        </label>
        <input
          id="testimonial-name"
          {...register("name")}
          className={inputClasses}
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name?.message ? (
          <span className={errorClasses}>{errors.name.message}</span>
        ) : null}
      </div>

      <div className="space-y-3">
        <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            {...register("consent")}
            className="size-4 rounded border-input accent-primary"
          />
          The person gave consent to publish this quote
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            {...register("published")}
            className="size-4 rounded border-input accent-primary"
          />
          Published
        </label>
        <p className={hintClasses}>
          The public page and navigation entry stay hidden until at least one
          testimonial is published with consent.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving" : "Save testimonial"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/testimonials">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

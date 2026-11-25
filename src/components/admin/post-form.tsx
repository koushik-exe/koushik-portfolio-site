"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { savePost } from "@/lib/actions/admin";
import { postSchema, type PostFormValues } from "@/lib/schemas/admin";
import {
  errorClasses,
  fieldClasses,
  hintClasses,
  inputClasses,
  labelClasses,
} from "@/components/admin/form-styles";

export type PostDefaults = {
  id: number;
  title: string;
  slug: string;
  description: string;
  publishedAt: Date | null;
  tags: string[];
  source: string;
  published: boolean;
};

export function PostForm({ initial }: { initial?: PostDefaults }) {
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onBlur",
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      description: initial?.description ?? "",
      publishedAt: initial?.publishedAt
        ? initial.publishedAt.toISOString().slice(0, 10)
        : "",
      tags: initial?.tags.join(", ") ?? "",
      source: initial?.source ?? "",
      published: initial?.published ?? false,
    },
  });

  const description = useWatch({ control, name: "description" }) ?? "";
  const published = useWatch({ control, name: "published" });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    setAnnouncement(null);
    const formData = new FormData();
    formData.set("id", initial ? String(initial.id) : "");
    for (const [key, value] of Object.entries(data)) {
      formData.set(key, String(value));
    }
    const result = await savePost(formData);
    if (result.status === "invalid") {
      let first: keyof PostFormValues | null = null;
      for (const [key, message] of Object.entries(result.errors)) {
        const field = key as keyof PostFormValues;
        setError(field, { message });
        first ??= field;
      }
      if (first) setFocus(first);
      setAnnouncement("Please check the highlighted fields.");
      return;
    }
    if (result.status === "saved") {
      router.push("/admin/posts");
      router.refresh();
      return;
    }
    setAnnouncement(
      result.status === "error" ? result.message : "Could not save the post.",
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <p role="status" className={errorClasses}>
        {announcement}
      </p>

      <div className={fieldClasses}>
        <label htmlFor="post-title" className={labelClasses}>
          Title (Required)
        </label>
        <input
          id="post-title"
          {...register("title")}
          className={inputClasses}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title?.message ? (
          <span className={errorClasses}>{errors.title.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="post-slug" className={labelClasses}>
          Slug (Required)
        </label>
        <input
          id="post-slug"
          {...register("slug")}
          className={inputClasses}
          aria-invalid={errors.slug ? true : undefined}
          aria-describedby="post-hint-slug"
        />
        <p id="post-hint-slug" className={hintClasses}>
          Lowercase letters, numbers and hyphens. Used in /blog/&lt;slug&gt;.
        </p>
        {errors.slug?.message ? (
          <span className={errorClasses}>{errors.slug.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="post-description" className={labelClasses}>
          Description (Required)
        </label>
        <input
          id="post-description"
          {...register("description")}
          className={inputClasses}
          aria-invalid={errors.description ? true : undefined}
        />
        <p className={hintClasses}>{description.length} of 160 characters.</p>
        {errors.description?.message ? (
          <span className={errorClasses}>{errors.description.message}</span>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldClasses}>
          <label htmlFor="post-published-at" className={labelClasses}>
            Published date (optional)
          </label>
          <input
            id="post-published-at"
            type="date"
            {...register("publishedAt")}
            className={inputClasses}
          />
          <p className={hintClasses}>
            Saving as published fills in today&rsquo;s date if this is empty.
          </p>
          {errors.publishedAt?.message ? (
            <span className={errorClasses}>{errors.publishedAt.message}</span>
          ) : null}
        </div>

        <div className={fieldClasses}>
          <label htmlFor="post-tags" className={labelClasses}>
            Tags (optional)
          </label>
          <input
            id="post-tags"
            {...register("tags")}
            className={inputClasses}
            placeholder="SQL, Excel"
          />
          <p className={hintClasses}>Separate tags with commas.</p>
          {errors.tags?.message ? (
            <span className={errorClasses}>{errors.tags.message}</span>
          ) : null}
        </div>
      </div>

      <div className={fieldClasses}>
        <label htmlFor="post-source" className={labelClasses}>
          MDX source (Required)
        </label>
        <textarea
          id="post-source"
          {...register("source")}
          rows={16}
          className={`${inputClasses} font-mono text-xs`}
          aria-invalid={errors.source ? true : undefined}
          aria-describedby="post-hint-source"
        />
        <p id="post-hint-source" className={hintClasses}>
          Markdown with GFM tables and footnotes. Custom components:
          DataTable, BarChart and LineChart. Imports, raw HTML and level-1
          headings are rejected.
        </p>
        {errors.source?.message ? (
          <span className={errorClasses}>{errors.source.message}</span>
        ) : null}
      </div>

      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          {...register("published")}
          className="size-4 rounded border-input accent-primary"
        />
        Published
      </label>
      {published ? (
        <p className={hintClasses}>
          Published posts appear on /blog. Drafts stay private and can be
          previewed from the edit page.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving" : "Save post"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/posts">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

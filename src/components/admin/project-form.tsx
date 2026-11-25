"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { saveProject } from "@/lib/actions/admin";
import { projectSchema, type ProjectFormValues } from "@/lib/schemas/admin";
import {
  errorClasses,
  fieldClasses,
  hintClasses,
  inputClasses,
  labelClasses,
} from "@/components/admin/form-styles";

export type ProjectDefaults = {
  id: number;
  title: string;
  slug: string;
  type: string | null;
  status: string;
  tools: string[];
  summary: string;
  problem: string | null;
  approach: string | null;
  result: string;
  learned: string | null;
  repository: string | null;
  live: string | null;
  sortOrder: number;
  published: boolean;
  featured: boolean;
};

export function ProjectForm({ initial }: { initial?: ProjectDefaults }) {
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    mode: "onBlur",
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      type: initial?.type ?? "",
      status: initial?.status ?? "Personal project",
      tools: initial?.tools.join(", ") ?? "",
      summary: initial?.summary ?? "",
      problem: initial?.problem ?? "",
      approach: initial?.approach ?? "",
      result: initial?.result ?? "",
      learned: initial?.learned ?? "",
      repository: initial?.repository ?? "",
      live: initial?.live ?? "",
      sortOrder: initial?.sortOrder ?? 0,
      published: initial?.published ?? false,
      featured: initial?.featured ?? false,
    },
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    setAnnouncement(null);
    const formData = new FormData();
    formData.set("id", initial ? String(initial.id) : "");
    for (const [key, value] of Object.entries(data)) {
      formData.set(key, String(value));
    }
    const result = await saveProject(formData);
    if (result.status === "invalid") {
      let first: keyof ProjectFormValues | null = null;
      for (const [key, message] of Object.entries(result.errors)) {
        const field = key as keyof ProjectFormValues;
        setError(field, { message });
        first ??= field;
      }
      if (first) setFocus(first);
      setAnnouncement("Please check the highlighted fields.");
      return;
    }
    if (result.status === "saved") {
      router.push("/admin/projects");
      router.refresh();
      return;
    }
    setAnnouncement(
      result.status === "error" ? result.message : "Could not save the project.",
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <p role="status" className={errorClasses}>
        {announcement}
      </p>

      <div className={fieldClasses}>
        <label htmlFor="project-title" className={labelClasses}>
          Title (Required)
        </label>
        <input
          id="project-title"
          {...register("title")}
          className={inputClasses}
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? "project-error-title" : undefined}
        />
        {errors.title?.message ? (
          <span id="project-error-title" className={errorClasses}>
            {errors.title.message}
          </span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-slug" className={labelClasses}>
          Slug (Required)
        </label>
        <input
          id="project-slug"
          {...register("slug")}
          className={inputClasses}
          aria-invalid={errors.slug ? true : undefined}
          aria-describedby="project-hint-slug"
        />
        <p id="project-hint-slug" className={hintClasses}>
          Lowercase letters, numbers and hyphens. Used in /projects/&lt;slug&gt;.
        </p>
        {errors.slug?.message ? (
          <span className={errorClasses}>{errors.slug.message}</span>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldClasses}>
          <label htmlFor="project-status" className={labelClasses}>
            Status (Required)
          </label>
          <input
            id="project-status"
            {...register("status")}
            className={inputClasses}
            aria-invalid={errors.status ? true : undefined}
          />
          {errors.status?.message ? (
            <span className={errorClasses}>{errors.status.message}</span>
          ) : null}
        </div>

        <div className={fieldClasses}>
          <label htmlFor="project-type" className={labelClasses}>
            Type (optional)
          </label>
          <input
            id="project-type"
            {...register("type")}
            className={inputClasses}
            aria-invalid={errors.type ? true : undefined}
          />
          {errors.type?.message ? (
            <span className={errorClasses}>{errors.type.message}</span>
          ) : null}
        </div>
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-tools" className={labelClasses}>
          Tools (optional)
        </label>
        <input
          id="project-tools"
          {...register("tools")}
          className={inputClasses}
          placeholder="SQL, Excel, Python"
        />
        <p className={hintClasses}>Separate tools with commas.</p>
        {errors.tools?.message ? (
          <span className={errorClasses}>{errors.tools.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-summary" className={labelClasses}>
          Summary (Required)
        </label>
        <textarea
          id="project-summary"
          {...register("summary")}
          rows={3}
          className={inputClasses}
          aria-invalid={errors.summary ? true : undefined}
        />
        {errors.summary?.message ? (
          <span className={errorClasses}>{errors.summary.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-problem" className={labelClasses}>
          Problem (optional)
        </label>
        <textarea
          id="project-problem"
          {...register("problem")}
          rows={4}
          className={inputClasses}
        />
        {errors.problem?.message ? (
          <span className={errorClasses}>{errors.problem.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-approach" className={labelClasses}>
          Approach (optional)
        </label>
        <textarea
          id="project-approach"
          {...register("approach")}
          rows={4}
          className={inputClasses}
        />
        {errors.approach?.message ? (
          <span className={errorClasses}>{errors.approach.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-result" className={labelClasses}>
          Result (Required)
        </label>
        <textarea
          id="project-result"
          {...register("result")}
          rows={3}
          className={inputClasses}
          aria-invalid={errors.result ? true : undefined}
        />
        <p className={hintClasses}>
          Only outcomes that exist. If none are measured, say &ldquo;No measured
          result yet.&rdquo;
        </p>
        {errors.result?.message ? (
          <span className={errorClasses}>{errors.result.message}</span>
        ) : null}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-learned" className={labelClasses}>
          What I learned (optional)
        </label>
        <textarea
          id="project-learned"
          {...register("learned")}
          rows={3}
          className={inputClasses}
        />
        {errors.learned?.message ? (
          <span className={errorClasses}>{errors.learned.message}</span>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={fieldClasses}>
          <label htmlFor="project-repository" className={labelClasses}>
            Repository URL (optional)
          </label>
          <input
            id="project-repository"
            {...register("repository")}
            className={inputClasses}
            placeholder="https://github.com/..."
          />
          {errors.repository?.message ? (
            <span className={errorClasses}>{errors.repository.message}</span>
          ) : null}
        </div>

        <div className={fieldClasses}>
          <label htmlFor="project-live" className={labelClasses}>
            Live URL (optional)
          </label>
          <input
            id="project-live"
            {...register("live")}
            className={inputClasses}
            placeholder="https://..."
          />
          {errors.live?.message ? (
            <span className={errorClasses}>{errors.live.message}</span>
          ) : null}
        </div>
      </div>

      <div className={fieldClasses}>
        <label htmlFor="project-sort-order" className={labelClasses}>
          Sort order
        </label>
        <input
          id="project-sort-order"
          type="number"
          min={0}
          max={999}
          {...register("sortOrder", { valueAsNumber: true })}
          className={inputClasses}
        />
        <p className={hintClasses}>Lower numbers appear first.</p>
        {errors.sortOrder?.message ? (
          <span className={errorClasses}>{errors.sortOrder.message}</span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            {...register("published")}
            className="size-4 rounded border-input accent-primary"
          />
          Published
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            {...register("featured")}
            className="size-4 rounded border-input accent-primary"
          />
          Featured on the home page
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving" : "Save project"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/projects">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}

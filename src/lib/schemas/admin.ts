import { z } from "zod";

/**
 * Shared Zod schemas for the admin CRUD forms (Phase 7, DESIGN 14). The client
 * forms use them through react-hook-form; every Server Action re-validates the
 * same schema on the server.
 */

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slugSchema = z
  .string()
  .trim()
  .min(1, { message: "Enter a slug." })
  .max(80, { message: "Slug is too long." })
  .regex(slugPattern, {
    message: "Use lowercase letters, numbers and single hyphens, like my-project.",
  });

const optionalText = (max: number) =>
  z.string().trim().max(max, { message: `Keep this under ${max} characters.` });

const optionalUrl = z
  .string()
  .trim()
  .max(2048, { message: "URL is too long." })
  .refine((value) => value === "" || /^https?:\/\/\S+$/.test(value), {
    message: "Enter a full URL starting with https://",
  });

const dateString = z
  .string()
  .trim()
  .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Use a date like 2026-11-25.",
  });

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Enter a title." })
    .max(120, { message: "Title is too long." }),
  slug: slugSchema,
  type: optionalText(60),
  status: z
    .string()
    .trim()
    .min(1, { message: "Enter a status." })
    .max(60, { message: "Status is too long." }),
  tools: optionalText(500),
  summary: z
    .string()
    .trim()
    .min(1, { message: "Enter a summary." })
    .max(400, { message: "Keep the summary under 400 characters." }),
  problem: optionalText(1200),
  approach: optionalText(2000),
  result: z
    .string()
    .trim()
    .min(1, { message: "Enter a result." })
    .max(600, { message: "Keep the result under 600 characters." }),
  learned: optionalText(1200),
  repository: optionalUrl,
  live: optionalUrl,
  sortOrder: z
    .number({ message: "Enter a whole number." })
    .int({ message: "Enter a whole number." })
    .min(0, { message: "Use 0 or higher." })
    .max(999, { message: "Use 999 or lower." }),
  published: z.boolean(),
  featured: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Enter a title." })
    .max(120, { message: "Title is too long." }),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .min(1, { message: "Enter a description." })
    .max(160, { message: "Keep the description under 160 characters." }),
  publishedAt: dateString,
  tags: optionalText(300),
  source: z
    .string()
    .trim()
    .min(1, { message: "Enter the MDX source." })
    .max(50000, { message: "The source is too long." }),
  published: z.boolean(),
});

export type PostFormValues = z.infer<typeof postSchema>;

export const testimonialSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(1, { message: "Enter the quote." })
    .max(1000, { message: "Keep the quote under 1000 characters." }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Enter the person's name." })
    .max(100, { message: "Name is too long." }),
  consent: z.boolean(),
  published: z.boolean(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;

/** "SQL, Excel, Python" -> ["SQL", "Excel", "Python"] */
export function parseCommaList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** "" -> undefined, for optional database columns. */
export function emptyToUndefined(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** "" -> null; "2026-11-25" -> Date. Only call after schema validation. */
export function dateOrNull(value: string): Date | null {
  return value.trim() === "" ? null : new Date(`${value.trim()}T00:00:00.000Z`);
}

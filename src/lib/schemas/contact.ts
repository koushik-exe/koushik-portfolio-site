import { z } from "zod";

/**
 * Shared Zod schema for the contact form. Used by the client form and the
 * Server Action in `src/lib/actions/contact.ts`; the server re-validates.
 *
 * Rules (Phase 5):
 * - name: 1–100 chars, trimmed, no line breaks (header-injection guard).
 * - email: valid email, trimmed, no line breaks.
 * - message: 10–2000 chars, trimmed, line breaks allowed.
 * - subject: optional, up to 120 chars, trimmed, no line breaks.
 * - honeypot: must be empty. A filled honeypot marks the submission as spam.
 *
 * The newline checks run before `.trim()` so that a trailing newline is
 * rejected rather than cleaned away.
 */

const noLineBreaks = (value: string): boolean => !/[\r\n]/.test(value);

export const contactSchema = z.object({
  name: z
    .string()
    .refine(noLineBreaks, { message: "Name cannot contain line breaks." })
    .trim()
    .min(1, { message: "Enter your name." })
    .max(100, { message: "Name is too long." }),
  email: z
    .string()
    .refine(noLineBreaks, { message: "Email cannot contain line breaks." })
    .trim()
    .email({ message: "Enter an email address like name@example.com." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Enter at least 10 characters in your message." })
    .max(2000, { message: "Your message is too long." }),
  subject: z
    .string()
    .refine(noLineBreaks, { message: "Subject cannot contain line breaks." })
    .trim()
    .max(120, { message: "Subject is too long." })
    .optional(),
  honeypot: z
    .string()
    .optional()
    .refine((value) => value === undefined || value.trim() === "", {
      message: "Something went wrong, please try again.",
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * True when the honeypot field was filled. Real visitors never fill it;
 * bots do. The Server Action returns a normal success result for those.
 */
export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}

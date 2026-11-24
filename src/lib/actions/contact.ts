"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import type { ZodError } from "zod";

import { headers } from "next/headers";

import {
  rateLimitErrorFailsClosed,
  spamProtectionStatus,
  type SpamProtectionMode,
} from "@/lib/spam-protection";
import { contactSchema, isHoneypotFilled } from "@/lib/schemas/contact";

/**
 * Spam protection (Phase 5): Upstash Redis + Ratelimit — 5 messages per 10
 * minutes per IP.
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = "10 m";

const SUCCESS_MESSAGE = "Thank you — your message is on its way.";
const FAILED_MESSAGE =
  "Sorry, your message could not be sent. Please try again later.";
const RATE_LIMITED_MESSAGE =
  "Too many messages sent recently. Please wait and try again.";
const DEV_MESSAGE = "Email is not configured yet.";

export type ContactResult =
  | { status: "sent"; message: string }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "rate_limited"; message: string }
  | { status: "failed"; message: string };

function getUpstashRatelimiter(): Ratelimit {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW),
  });
}

/** Development-only fallback limiter (module-level map). */
const memoryAttempts = new Map<string, { count: number; resetAt: number }>();

function memoryAllow(key: string): boolean {
  const now = Date.now();
  const entry = memoryAttempts.get(key);
  if (!entry || entry.resetAt <= now) {
    memoryAttempts.set(key, { count: 1, resetAt: now + 600_000 });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  return true;
}

/**
 * Visitor IP, from headers only: the first comma-separated value of
 * `x-forwarded-for`, then `x-real-ip`, then a fixed fallback.
 */
function forwardedIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) {
    return first;
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

function fieldErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".") as string;
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}

/** Server-log name of an error — the type only, never values. */
function errorName(error: unknown): string {
  return error instanceof Error ? error.name : typeof error;
}

async function isRateLimited(
  ip: string,
  mode: SpamProtectionMode,
): Promise<boolean> {
  if (mode === "fail-closed") {
    return true;
  }
  if (mode === "memory") {
    return !memoryAllow(`contact:${ip}`);
  }
  try {
    const limiter = getUpstashRatelimiter();
    const { success } = await limiter.limit(`contact:${ip}`);
    return !success;
  } catch (error) {
    if (rateLimitErrorFailsClosed(process.env.NODE_ENV === "production")) {
      console.error(`contact form: rate limit error: ${errorName(error)}`);
      return true;
    }
    return !memoryAllow(`contact:${ip}`);
  }
}

export async function contactUs(formData: FormData): Promise<ContactResult> {
  const raw = Object.fromEntries(formData.entries());

  // (a) Honeypot first: bots get a normal success. Nothing is sent and the
  // rate limiter is not touched, so bots learn nothing.
  if (isHoneypotFilled(raw)) {
    return { status: "sent", message: SUCCESS_MESSAGE };
  }

  // (b) Production fail-closed before anything is sent: missing Resend,
  // email and Upstash variables.
  const missingSend = ["CONTACT_EMAIL", "CONTACT_FROM", "RESEND_API_KEY"].filter(
    (name) => !process.env[name],
  );
  const spam = spamProtectionStatus(process.env);
  if (
    process.env.NODE_ENV === "production" &&
    (missingSend.length > 0 || spam.mode === "fail-closed")
  ) {
    for (const name of [...missingSend, ...spam.missing]) {
      console.error(`contact form: missing environment variable ${name}`);
    }
    return { status: "failed", message: FAILED_MESSAGE };
  }

  // (c) Validation, rate limit and send.
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "invalid", errors: fieldErrors(parsed.error) };
  }
  const data = parsed.data;

  const contactEmail = process.env.CONTACT_EMAIL;
  const contactFrom = process.env.CONTACT_FROM;
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!contactEmail || !contactFrom || !resendApiKey) {
    console.error(
      `contact form: environment variables missing: ${missingSend.join(", ")}`,
    );
    return { status: "failed", message: DEV_MESSAGE };
  }

  const ip = forwardedIp(await headers());
  if (await isRateLimited(ip, spam.mode)) {
    return { status: "rate_limited", message: RATE_LIMITED_MESSAGE };
  }

  const subject = data.subject || "Contact form message";
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.subject ? `Subject: ${data.subject}` : null,
    "",
    "Message:",
    data.message,
    "",
    "This message was sent via the contact form.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      to: contactEmail,
      from: contactFrom,
      replyTo: data.email,
      subject,
      text,
    });
    return { status: "sent", message: SUCCESS_MESSAGE };
  } catch (error) {
    console.error("contact form: Resend send failed", error);
    return { status: "failed", message: FAILED_MESSAGE };
  }
}

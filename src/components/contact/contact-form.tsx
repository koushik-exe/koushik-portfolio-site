"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { contactUs, type ContactResult } from "@/lib/actions/contact";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";

/**
 * Contact form (Phase 5, DESIGN 14). Client component because it submits the
 * shared Zod schema through the Server Action and manages sending/success
 * states.
 */

const inputClasses =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const errorClasses = "text-sm text-destructive";
const labelClasses = "text-sm font-medium text-foreground";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  const focusFirstInvalid = (fieldErrors: Record<string, string>): void => {
    if (fieldErrors.name) {
      nameRef.current?.focus();
    } else if (fieldErrors.email) {
      emailRef.current?.focus();
    } else if (fieldErrors.message) {
      messageRef.current?.focus();
    } else if (fieldErrors.subject) {
      subjectRef.current?.focus();
    }
  };

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitting(true);
    setAnnouncement(null);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("subject", data.subject ?? "");
    formData.append("honeypot", data.honeypot ?? "");
    try {
      const result: ContactResult = await contactUs(formData);
      if (result.status === "sent") {
        setSent(true);
        setSuccessMessage(result.message);
        return;
      }
      if (result.status === "invalid") {
        for (const [key, message] of Object.entries(result.errors)) {
          setError(key as keyof ContactFormData, { message });
        }
        focusFirstInvalid(result.errors);
        setAnnouncement("Please check the highlighted fields.");
        return;
      }
      setAnnouncement(result.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="pt-6" data-testid="contact-success">
        <p className="flex items-center gap-2 text-foreground">
          <CheckCircle2 aria-hidden="true" className="size-5" />
          {successMessage ?? "Thank you — your message is on its way."}
        </p>
        <Link href="/">Back home</Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      data-testid="contact-form"
    >
      {announcement ? (
        <p role="status" className="text-sm text-destructive">
          {announcement}
        </p>
      ) : null}

      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          Name
        </label>
        <input
          id="contact-name"
          {...register("name", { required: true })}
          autoComplete="name"
          disabled={submitting}
          ref={nameRef}
          className={inputClasses}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-error-name" : undefined}
        />
        {errors.name?.message ? (
          <span id="contact-error-name" className={errorClasses}>
            {errors.name.message}
          </span>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClasses}>
          Email
        </label>
        <input
          id="contact-email"
          {...register("email", { required: true })}
          autoComplete="email"
          type="email"
          disabled={submitting}
          ref={emailRef}
          className={inputClasses}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-error-email" : undefined}
        />
        {errors.email?.message ? (
          <span id="contact-error-email" className={errorClasses}>
            {errors.email.message}
          </span>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          {...register("message", { required: true })}
          disabled={submitting}
          rows={6}
          ref={messageRef}
          className={`min-h-[144px] ${inputClasses}`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-error-message" : undefined}
        />
        {errors.message?.message ? (
          <span id="contact-error-message" className={errorClasses}>
            <AlertCircle aria-hidden="true" className="mr-1 inline size-4" />
            {errors.message.message}
          </span>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClasses}>
          Subject (optional)
        </label>
        <input
          id="contact-subject"
          {...register("subject")}
          disabled={submitting}
          ref={subjectRef}
          className={inputClasses}
          aria-describedby={errors.subject ? "contact-error-subject" : undefined}
        />
        {errors.subject?.message ? (
          <span id="contact-error-subject" className={errorClasses}>
            {errors.subject.message}
          </span>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive technology. */}
      <input
        type="text"
        {...register("honeypot")}
        hidden
        aria-hidden="true"
        tabIndex={-1}
        className="hidden"
      />

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending" : "Send message"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Your message is used only to reply. Your IP address is used briefly to limit spam.
        </p>
      </div>
    </form>
  );
}

export { ArrowUpRight };






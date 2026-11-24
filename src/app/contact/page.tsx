import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Koushik C",
  description: "Contact Koushik C — the contact form is coming soon.",
};

export default function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      id="contact"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
          <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
            Contact
          </p>
          <div className="lg:col-span-8 lg:col-start-5">
            <h1
              id="contact-heading"
              className="font-heading text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-5xl"
            >
              Contact
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-pretty text-muted-foreground">
              The contact form is coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";

import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Koushik C",
  description:
    "Contact Koushik C through the validated form. I’m based in Karur, Tamil Nadu and open to relocating to Chennai, Bengaluru or Coimbatore.",
};

const socials = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
];

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
              You can send a message through this form. I’m based in Karur,
              Tamil Nadu, and I’m open to relocating to Chennai, Bengaluru or
              Coimbatore.
            </p>
            <ContactForm />
          </div>
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase lg:pt-2">
              Find me on
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base text-foreground underline-offset-4 hover:underline"
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

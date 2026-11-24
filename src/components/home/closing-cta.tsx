import { Download } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { Button } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      id="contact"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-content px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <SectionHeading
          index="04"
          label="Contact"
          titleId="cta-heading"
          title="Hiring for an entry-level analyst?"
          intro="I’m based in Karur and open to relocating to Chennai, Bengaluru or Coimbatore. If you’re hiring a data analyst, business analyst or MIS analyst, I’d like to hear about it."
        />

        <div className="mt-12 grid gap-x-8 lg:grid-cols-12">
          <div className="flex flex-wrap items-center gap-3 lg:col-span-8 lg:col-start-5">
            <Button asChild>
              <Link href="/contact">Contact me</Link>
            </Button>
            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-border sm:block"
            />
            <a
              href="/Koushik_C_Resume.pdf"
              download
              className="flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground hover:underline"
            >
              <Download aria-hidden="true" className="size-4" />
              Download resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

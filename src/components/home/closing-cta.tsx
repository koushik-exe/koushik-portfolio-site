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

        <div className="mt-10 grid gap-x-8 lg:grid-cols-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:col-span-8 lg:col-start-5">
            <Button asChild size="lg" className="h-11 px-5 text-sm">
              <Link href="/contact">Contact me</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 border-input px-5 text-sm hover:border-foreground"
            >
              <a href="/Koushik_C_Resume.pdf" download>
                <Download aria-hidden="true" className="size-4" />
                Download resume (PDF)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

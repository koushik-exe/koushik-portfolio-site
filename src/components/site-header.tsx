import Link from "next/link";

import { ContactCta } from "@/components/contact-cta";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-content items-center gap-4 px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center gap-3 rounded-md text-foreground transition-colors duration-200 outline-none hover:text-link focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-heading text-xl font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-border md:block"
          />
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground md:inline">
            {siteConfig.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 lg:gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-8">
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-border lg:block"
          />
          <span className="hidden items-center gap-2 xl:flex">
            <span aria-hidden="true" className="size-1 shrink-0 bg-link" />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              {siteConfig.availability}
            </span>
          </span>
          <ThemeToggle />
          <ContactCta className="hidden lg:inline-flex" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

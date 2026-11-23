import Link from "next/link";

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
          className="flex min-w-0 items-center gap-3 rounded-sm transition-opacity duration-200 outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
          <span aria-hidden="true" className="hidden h-4 w-px bg-border lg:block" />
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground lg:inline">
            {siteConfig.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-5 lg:gap-7">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

"use client";

import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ContactCta } from "@/components/contact-cta";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

const socials = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
];

export function MobileNav({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 lg:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="data-[side=right]:w-[85%] max-w-xs gap-0 overscroll-contain border-border p-0 sm:max-w-xs"
      >
        <SheetHeader className="shrink-0 gap-1.5 border-b border-border px-5 py-4 pr-14">
          <SheetTitle className="font-heading text-lg font-semibold">
            {siteConfig.name}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
            {siteConfig.role}
          </p>
        </SheetHeader>

        <nav
          aria-label="Mobile"
          className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
        >
          <ul className="flex flex-col">
            {nav.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <li
                  key={item.href}
                  className="border-b border-border last:border-b-0"
                >
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex min-h-14 items-center gap-3 rounded-md px-3 text-base transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="w-5 font-mono text-[0.6875rem] tabular-nums text-muted-foreground"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-1 h-px bg-foreground transition-opacity duration-200",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-px"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <SheetFooter className="shrink-0 gap-4 border-t border-border px-5 py-5">
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1 shrink-0 bg-link" />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              {siteConfig.availability}
            </span>
          </p>
          <p className="text-[0.8125rem] leading-relaxed text-muted-foreground text-pretty">
            {siteConfig.location}
          </p>
          <ContactCta className="w-full" onClick={() => setOpen(false)} />
          <ul className="flex items-center gap-5">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 rounded-md text-sm font-medium text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {label}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

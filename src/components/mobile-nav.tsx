"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 md:hidden"
          aria-label="Navigation menu"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="data-[side=right]:w-[85%] max-w-xs overscroll-contain border-border bg-background p-0 sm:max-w-xs"
      >
        <SheetHeader className="border-b border-border px-5 py-4 pr-14">
          <SheetTitle className="font-heading text-lg font-semibold">
            Navigation
          </SheetTitle>
          <SheetDescription className="sr-only">
            Links to the main sections of this site.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-2 py-2">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item) => (
              <li
                key={item.href}
                className="border-b border-border/70 last:border-b-0"
              >
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-sm px-3 text-base text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

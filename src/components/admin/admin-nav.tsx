"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Projects", href: "/admin/projects" },
  { label: "Posts", href: "/admin/posts" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Messages", href: "/admin/messages" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="border-b border-border">
      <ul className="mx-auto flex h-12 max-w-content items-center gap-6 px-5 sm:px-8 lg:px-12">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${active ? "text-foreground" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

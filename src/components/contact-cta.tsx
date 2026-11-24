"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function ContactCta({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isCurrent = pathname === siteConfig.primaryAction.href;

  return (
    <Button asChild className={className}>
      <Link
        href={siteConfig.primaryAction.href}
        aria-current={isCurrent ? "page" : undefined}
        onClick={onClick}
      >
        {siteConfig.primaryAction.label}
      </Link>
    </Button>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Phase 10: move focus to the main landmark after a client-side route change
 * so keyboard and screen-reader users start at the new content. The first
 * render and in-page hash navigation are left alone.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    if (window.location.hash) return;

    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}

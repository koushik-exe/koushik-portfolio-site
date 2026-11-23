"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let lenis: Lenis | null = null;

    const start = () => {
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        anchors: false,
        respectReducedMotion: true,
      });
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => {
      if (reducedMotion.matches) {
        stop();
      } else if (!lenis) {
        start();
      }
    };

    sync();
    reducedMotion.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return children;
}

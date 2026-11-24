import type { Metadata } from "next";

import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { inter, jetbrainsMono, sourceSerif } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <SmoothScroll>
            <a
              href="#main"
              className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground ring-2 ring-ring ring-offset-2 ring-offset-background transition-transform duration-200 outline-none focus:translate-y-0"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main
              id="main"
              tabIndex={-1}
              className="flex flex-1 flex-col scroll-mt-20 outline-none lg:scroll-mt-24"
            >
              {children}
            </main>
            <SiteFooter />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

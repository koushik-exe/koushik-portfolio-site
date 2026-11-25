import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/next";

import "lenis/dist/lenis.css";
import "../globals.css";
import { RouteFocus } from "@/components/a11y/route-focus";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeColorSync } from "@/components/providers/theme-color-sync";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brandColors } from "@/lib/brand-colors";
import { inter, jetbrainsMono, sourceSerif } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import { openGraphImage, twitterImage } from "@/lib/seo";

const defaultTitle = `${siteConfig.name} - ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_IN",
    url: "/",
    images: [openGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [twitterImage],
  },
};

/**
 * Phase 7: the header's Testimonials link depends on the database. A 5-minute
 * ISR window keeps public pages cached; admin testimonial mutations call
 * `revalidatePath("/", "layout")` so the link appears or disappears at once.
 */
export const revalidate = 300;

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brandColors.paper },
    { media: "(prefers-color-scheme: dark)", color: brandColors.night },
  ],
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
          <ThemeColorSync />
          <RouteFocus />
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
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

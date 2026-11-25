import * as React from "react";
import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

import { BarChart, type BarChartProps } from "@/components/blog/bar-chart";
import { CodeBlock } from "@/components/blog/code-block";
import { DataTable } from "@/components/blog/data-table";
import { LineChart, type LineChartProps } from "@/components/blog/line-chart";
import { cn } from "@/lib/utils";

import { guardMdx } from "./guard-mdx";
import { rehypeHeadingIds } from "./rehype-heading-ids";
import { safeHref } from "./safe-href";

/**
 * Phase 8: the fixed MDX component set from DESIGN 16.3. Only these names are
 * available to authors; the guard rejects imports, raw HTML and unknown JSX.
 */

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map((child) => textFromChildren(child)).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

function CodePre({ children }: { children?: React.ReactNode }) {
  const child = React.Children.toArray(children)[0];
  if (React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
    const className = child.props.className ?? "";
    const language = /language-([\w-]+)/.exec(className)?.[1];
    const code = textFromChildren(child.props.children).replace(/\n$/, "");
    return <CodeBlock code={code} language={language} />;
  }
  return (
    <pre className="my-8 overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-[0.8125rem] leading-[1.6] sm:text-sm">
      {children}
    </pre>
  );
}

const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-16 mb-4 scroll-mt-24 font-heading text-[2rem] leading-[1.15] font-semibold tracking-[-0.015em] text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-10 mb-3 scroll-mt-24 font-heading text-2xl leading-[1.3] font-semibold text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-8 mb-2 scroll-mt-24 font-heading text-xl leading-[1.3] font-semibold text-balance text-foreground",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "my-4 text-base leading-[1.65] text-pretty text-foreground sm:text-lg",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, href, children, ...props }) => {
    const safe = safeHref(href);
    if (!safe) return <span className={className}>{children}</span>;
    const external = /^https?:\/\//i.test(safe);
    return (
      <a
        href={safe}
        className={cn(
          "text-link underline underline-offset-2 hover:text-link-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-4 list-none space-y-3 pl-0 [&_ul]:mt-3 [&_ul]:pl-4 [&>li]:relative [&>li]:pl-4 [&>li]:before:absolute [&>li]:before:top-[0.7em] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-2 [&>li]:before:bg-muted-foreground [&>li]:before:content-[''] [&>li.task-list-item]:pl-0 [&>li.task-list-item]:before:hidden",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-4 list-decimal space-y-3 pl-6 marker:font-mono marker:text-[0.8125rem] marker:tabular-nums marker:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("[&>p]:my-0", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-8 border-l border-border pl-6 font-heading text-xl leading-[1.5] text-foreground sm:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("my-16 border-0 border-t border-border", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-[2px] bg-muted px-1 py-0.5 font-mono text-[0.9em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: CodePre,
  table: ({ className, ...props }) => (
    <div
      tabIndex={0}
      role="region"
      aria-label="Data table"
      className="my-8 overflow-x-auto border-y border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <table
        className={cn(
          "w-full border-collapse text-left text-sm",
          className,
        )}
        {...props}
      />
    </div>
  ),
  caption: ({ className, ...props }) => (
    <caption
      className={cn(
        "caption-top px-4 pt-3 pb-3 text-left text-[0.8125rem] leading-normal font-normal text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn("bg-muted", className)} {...props} />
  ),
  tr: ({ className, ...props }) => (
    <tr
      className={cn("border-t border-border first:border-t-0", className)}
      {...props}
    />
  ),
  th: ({ className, align, style, ...props }) => {
    const textAlign =
      align ??
      (typeof style?.textAlign === "string" ? style.textAlign : undefined);
    return (
      <th
        scope="col"
        className={cn(
          "border-b border-border px-4 py-3 font-mono text-[0.6875rem] font-normal tracking-[0.14em] text-muted-foreground uppercase",
          textAlign === "right"
            ? "text-right"
            : textAlign === "center"
              ? "text-center"
              : "text-left",
          className,
        )}
        {...props}
      />
    );
  },
  td: ({ className, align, style, ...props }) => {
    const textAlign =
      align ??
      (typeof style?.textAlign === "string" ? style.textAlign : undefined);
    return (
      <td
        className={cn(
          "px-4 py-3 text-foreground",
          textAlign === "right"
            ? "text-right font-mono tabular-nums"
            : textAlign === "center"
              ? "text-center"
              : "text-left",
          className,
        )}
        {...props}
      />
    );
  },
  input: ({ className, ...props }) => (
    <input
      className={cn("mr-2 size-4 translate-y-[1px] accent-primary", className)}
      {...props}
    />
  ),
  DataTable,
  BarChart,
  LineChart,
};

/** Admin preview: same components, but charts stay static (no page motion). */
const staticMdxComponents: MDXComponents = {
  ...mdxComponents,
  BarChart: (props: BarChartProps) => <BarChart {...props} animate={false} />,
  LineChart: (props: LineChartProps) => <LineChart {...props} animate={false} />,
};

type RenderMdxOptions = {
  animateCharts?: boolean;
};

/**
 * Compile and run a post's MDX on the server. The authoring guard runs before
 * remark-gfm, and the fixed component map above is the only extension point.
 * Public article pages keep the chart draw-in; the admin preview passes
 * `animateCharts: false` so no motion runs in the admin area.
 */
export async function renderMdx(
  source: string,
  options: RenderMdxOptions = {}
): Promise<React.ReactElement> {
  const { default: MDXContent } = await evaluate(source, {
    ...runtime,
    development: false,
    remarkPlugins: [guardMdx, remarkGfm],
    rehypePlugins: [rehypeHeadingIds],
  });

  return (
    <MDXContent
      components={
        options.animateCharts === false ? staticMdxComponents : mdxComponents
      }
    />
  );
}

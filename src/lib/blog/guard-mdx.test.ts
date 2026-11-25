import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { describe, expect, it } from "vitest";

import { guardMdx, MDX_COMPONENTS } from "./guard-mdx";

const plugins = { remarkPlugins: [guardMdx, remarkGfm] };

async function compileWithGuard(source: string): Promise<void> {
  await compile(source, plugins);
}

describe("guardMdx", () => {
  it("allows Markdown and the three custom components", async () => {
    await expect(
      compileWithGuard(
        [
          "## A heading",
          "",
          "Some **text** with a [link](/projects).",
          "",
          '<DataTable caption="Orders" rows={[{ month: "Jan", orders: 12 }]} />',
          "",
          '<BarChart title="Orders peak" data={[{ label: "Jan", value: 12 }]} />',
          "",
          '<LineChart title="Trend" series={[{ name: "Orders", values: [1, 2] }]} />',
          "",
          "| Month | Orders |",
          "|---|---|",
          "| Jan | 12 |",
        ].join("\n"),
      ),
    ).resolves.toBeUndefined();
  });

  it("rejects imports and exports", async () => {
    await expect(compileWithGuard("import x from 'x'")).rejects.toThrow(
      "imports or exports",
    );
  });

  it("rejects raw HTML", async () => {
    await expect(compileWithGuard("<div>Hello</div>")).rejects.toThrow(
      "Raw HTML is not allowed",
    );
  });

  it("rejects an unknown custom component", async () => {
    await expect(compileWithGuard("<Chart data={[1]} />")).rejects.toThrow(
      "Only DataTable, BarChart and LineChart",
    );
  });

  it("rejects a level-1 heading", async () => {
    await expect(compileWithGuard("# Title")).rejects.toThrow("level-1 heading");
  });

  it("rejects a child expression but allows a comment expression", async () => {
    await expect(compileWithGuard("{process.env.SECRET}")).rejects.toThrow(
      "Do not use {...} expressions",
    );
    await expect(compileWithGuard("{/* a note */}")).resolves.toBeUndefined();
  });

  it("exposes the allowed component names", () => {
    expect(MDX_COMPONENTS).toEqual(["DataTable", "BarChart", "LineChart"]);
  });
});

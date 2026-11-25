/**
 * Phase 6: idempotent seed. Upserts the three Projects by `slug`; never deletes rows.
 * Sources the data from `src/lib/projects.ts` (the canonical copy, kept until pages match).
 * Includes a read-only count query to prove the connection before writing anything.
 */
import { prisma } from "../src/lib/db";
import { projects, featuredProjects } from "../src/lib/projects";

const featuredSlugs = new Set(
  featuredProjects.filter((f) => f.home).map((f) => f.slug),
);

async function main(): Promise<void> {
  // Read-only proof of the connection before any write.
  const before = await prisma.project.count();
  console.log(`Seed: connection OK, project count before = ${before}`);

  for (const [index, p] of projects.entries()) {
    const data = {
      slug: p.slug,
      title: p.title,
      type: p.type,
      status: p.status,
      tools: [...p.tools],
      summary: p.summary,
      problem: p.problem,
      approach: p.approach,
      result: p.result,
      learned: p.learned,
      repository: p.links.repository,
      live: p.links.live,
      published: true,
      featured: featuredSlugs.has(p.slug),
      sortOrder: index,
    };
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: data,
      // Update is intentionally empty: re-seeding never overwrites admin edits.
      update: {},
    });
  }

  const after = await prisma.project.count();
  console.log(`Seed: project count after = ${after}`);

  const postCount = await prisma.post.count();
  console.log(`Seed: post count after = ${postCount}`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { skillGroups } from "@/lib/skills";

/**
 * Skills inventory for the About page (DESIGN 7.9): one h3 category per row in
 * the 3-column margin, ruled rows of item name and detail in the 8-column
 * content column. Replaces the old comma wall in src/app/about/page.tsx.
 */
export function SkillsInventory() {
  return (
    <>
      {skillGroups.map((group) => (
        <div
          key={group.label}
          className="mt-8 grid gap-x-8 gap-y-3 border-t border-border pt-4 lg:grid-cols-12"
        >
          <h3 className="font-heading text-2xl leading-[1.3] font-semibold lg:col-span-3 lg:pt-2">
            {group.label}
          </h3>
          <dl className="lg:col-span-8 lg:col-start-5">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="grid gap-y-2 border-b border-border py-6 sm:grid-cols-3 sm:gap-x-8"
              >
                <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase sm:col-span-1">
                  {item.name}
                </dt>
                {item.detail ? (
                  <dd className="text-base leading-relaxed text-foreground sm:col-span-2">
                    {item.detail}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      ))}
    </>
  );
}

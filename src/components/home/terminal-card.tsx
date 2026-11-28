import { BentoCard } from "@/components/home/bento-card";
import { terminalCaption, terminalLines } from "@/lib/identity";

/**
 * Terminal card (DESIGN.md 25.6). Three commands, PROFILE output only.
 *
 * Static server component: no typing, no cursor, no ASCII art, no horizontal
 * scroll and no focusable element. The `$` is decorative, so it is hidden from
 * assistive technology and the command word carries the meaning.
 */
export function TerminalCard() {
  return (
    <BentoCard className="md:col-span-2 xl:col-span-5">
      <figure>
        <figcaption className="sr-only">{terminalCaption}</figcaption>

        <div className="space-y-4 font-mono text-[0.8125rem] leading-relaxed md:text-sm">
          {terminalLines.map((line) => (
            <div key={line.command} className="space-y-1">
              <p className="flex gap-2 text-foreground">
                <span aria-hidden="true" className="text-muted-foreground">
                  $
                </span>
                <span>{line.command}</span>
              </p>

              <div className="space-y-1">
                {line.output.map((output) => (
                  <p
                    key={output.text}
                    className={
                      output.muted
                        ? "break-words text-muted-foreground"
                        : "break-words text-foreground"
                    }
                  >
                    {output.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </figure>
    </BentoCard>
  );
}

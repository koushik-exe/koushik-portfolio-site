"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { AdminActionResult } from "@/lib/actions/admin";

/**
 * Confirmation dialog for every destructive admin action (DESIGN 17). It names
 * the item, uses the native <dialog> element for focus trapping, and calls the
 * Server Action after confirmation.
 */
export function DeleteDialog({
  id,
  itemLabel,
  itemName,
  action,
}: {
  id: number;
  itemLabel: string;
  itemName: string;
  action: (formData: FormData) => Promise<AdminActionResult>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const titleId = `delete-title-${itemLabel}-${id}`;

  const open = () => {
    setError(null);
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
  };

  const confirm = () => {
    const formData = new FormData();
    formData.set("id", String(id));
    startTransition(async () => {
      const result = await action(formData);
      if (result.status === "deleted") {
        dialogRef.current?.close();
        router.refresh();
        return;
      }
      setError(
        result.status === "error"
          ? result.message
          : "Could not delete this item. Please try again.",
      );
    });
  };

  return (
    <>
      <Button type="button" variant="ghost" size="sm" onClick={open}>
        Delete
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border border-border bg-background p-6 text-foreground shadow-lg backdrop:bg-foreground/40 backdrop:backdrop-blur-sm"
      >
        <h2 id={titleId} className="font-heading text-xl font-semibold">
          Delete {itemLabel}?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This permanently deletes <strong className="text-foreground">{itemName}</strong>.
          This cannot be undone.
        </p>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={close} disabled={pending}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={confirm}
            disabled={pending}
          >
            {pending ? "Deleting" : "Delete"}
          </Button>
        </div>
      </dialog>
    </>
  );
}

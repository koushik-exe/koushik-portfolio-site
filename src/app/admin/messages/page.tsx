import type { Metadata } from "next";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { deleteMessage, toggleMessageRead } from "@/lib/actions/admin";
import { getAdminMessages } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Messages | Admin",
  robots: { index: false, follow: false },
};

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();
  const unread = messages.filter((message) => !message.read).length;

  return (
    <div className="mx-auto w-full max-w-content">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Messages
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {messages.length === 0
            ? "Messages from the contact form appear here."
            : `${messages.length} total, ${unread} unread.`}
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          No messages yet.
        </p>
      ) : (
        <ul className="mt-8 border-t border-border">
          {messages.map((message) => (
            <li key={message.id} className="border-b border-border py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{message.name}</p>
                    <StatusBadge
                      on={!message.read}
                      onLabel="Unread"
                      offLabel="Read"
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${message.email}`}
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      {message.email}
                    </a>
                    {" · "}
                    <time dateTime={message.createdAt.toISOString()}>
                      {dateFormat.format(message.createdAt)}
                    </time>
                  </p>
                  {message.subject ? (
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {message.subject}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-foreground">
                    {message.message}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <form action={toggleMessageRead}>
                    <input type="hidden" name="id" value={message.id} />
                    <input
                      type="hidden"
                      name="read"
                      value={String(!message.read)}
                    />
                    <Button type="submit" variant="ghost" size="sm">
                      {message.read ? "Mark unread" : "Mark read"}
                    </Button>
                  </form>
                  <DeleteDialog
                    id={message.id}
                    itemLabel="message"
                    itemName={`the message from ${message.name}`}
                    action={deleteMessage}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

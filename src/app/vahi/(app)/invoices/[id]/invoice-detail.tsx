"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Mail, ExternalLink, BellRing } from "lucide-react";
import { setInvoiceStatusAction, sendReminderAction } from "@/lib/vahi/actions";
import { Button } from "@/components/ui/button";

export function InvoiceStatusToggle({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();
  const next = status === "paid" ? "unpaid" : "paid";

  return (
    <Button
      variant="outline"
      disabled={pending}
      onClick={() => startTransition(() => setInvoiceStatusAction(id, next))}
    >
      {pending ? "Updating..." : `Mark as ${next}`}
    </Button>
  );
}

export function SendReminderButton({ id, hasEmail }: { id: string; hasEmail: boolean }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ error?: string; sent?: boolean } | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        variant="outline"
        disabled={pending || !hasEmail}
        onClick={() =>
          startTransition(async () => {
            const res = await sendReminderAction(id);
            setResult(res.error ? { error: res.error } : { sent: true });
          })
        }
      >
        <BellRing className="size-4" /> {pending ? "Sending..." : "Send reminder now"}
      </Button>
      {!hasEmail && <p className="text-xs text-muted-foreground">Add an email for this customer to send reminders.</p>}
      {result?.error && <p className="text-xs text-destructive">{result.error}</p>}
      {result?.sent && <p className="text-xs text-[#006300]">Reminder sent.</p>}
    </div>
  );
}

export function ShareLinks({ publicUrl, customerPhone }: { publicUrl: string; customerPhone?: string | null }) {
  const message = `Here's your invoice: ${publicUrl}`;
  const waHref = customerPhone
    ? `https://wa.me/${customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent("Your invoice")}&body=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
      >
        <MessageCircle className="size-4" /> WhatsApp
      </a>
      <a
        href={mailHref}
        className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
      >
        <Mail className="size-4" /> Email
      </a>
      <a
        href={publicUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
      >
        <ExternalLink className="size-4" /> View / print
      </a>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, IndianRupee } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const UPI_VPA = "deepaknandhan25-2@okaxis";
const PAYEE_NAME = "Vivira AI";

// QR generated from a standard UPI deep-link URI (upi://pay?...) via a
// public QR-rendering endpoint - no QR library needed, and nothing in the
// encoded URI is sensitive (it's the same payee/amount a merchant would
// print on a physical counter QR code).
function buildUpiQrUrl(amount: number, planName: string) {
  const upiUri = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(
    PAYEE_NAME,
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Vivira AI - ${planName}`)}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(upiUri)}`;
}

export function ViviraUpiPaymentDialog({
  planName,
  amount,
  billingLabel,
  trigger,
}: {
  planName: string;
  amount: number;
  billingLabel: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setConfirmed(false);
      trackEvent("vivira_upi_dialog_open", { plan: planName });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay for {planName}</DialogTitle>
          <DialogDescription>
            Scan with any UPI app to pay {billingLabel}. No account or password needed here.
          </DialogDescription>
        </DialogHeader>

        {!confirmed ? (
          <div className="flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- externally generated QR image, not a local asset */}
            <img
              src={buildUpiQrUrl(amount, planName)}
              alt={`UPI payment QR code for ${planName}`}
              width={220}
              height={220}
              className="rounded-lg border"
            />
            <div className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
              <IndianRupee className="size-4" />
              {amount.toLocaleString("en-IN")}
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Or pay manually to UPI ID <span className="font-medium text-foreground">{UPI_VPA}</span>
            </p>
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                trackEvent("vivira_upi_paid_confirmed", { plan: planName });
                setConfirmed(true);
              }}
            >
              I&apos;ve paid
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              After paying, tap the button above and we&apos;ll activate your account within one
              business day.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span className="grid size-12 place-content-center rounded-full bg-emerald-500/10">
              <Check className="size-6 text-emerald-600" />
            </span>
            <p className="font-medium text-foreground">Thanks - payment noted.</p>
            <p className="text-sm text-muted-foreground">
              We&apos;ll activate your {planName} account within one business day and email you
              once it&apos;s live.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Adapted from a pasted "toast.tsx" component that used a ref/imperative-
// handle API (`toasterRef.current?.show(...)`) — reworked into plain
// functions instead, matching sonner's own ergonomics (its whole appeal is
// `toast.success("x")` callable from anywhere, no ref to thread through
// props). Also drops the `dark:` variants — this site has no dark mode.

type Variant = "default" | "success" | "error" | "warning";
type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

interface NotifyAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
}

interface NotifyOptions {
  title?: string;
  duration?: number;
  position?: Position;
  action?: NotifyAction;
  onDismiss?: () => void;
}

// Reuses the same paid/unpaid green (#0ca30c/#006300) already established
// for status pills elsewhere in the dashboard, not an arbitrary green.
const variantStyles: Record<Variant, string> = {
  default: "bg-card border-border",
  success: "bg-card border-[#0ca30c]/40",
  error: "bg-card border-destructive/40",
  warning: "bg-card border-amber-500/40",
};

const titleColor: Record<Variant, string> = {
  default: "text-foreground",
  success: "text-[#006300]",
  error: "text-destructive",
  warning: "text-amber-600",
};

const actionToneClass: Record<Variant, string> = {
  default: "text-foreground border-border hover:bg-muted/40",
  success: "text-[#006300] border-[#0ca30c]/40 hover:bg-[#0ca30c]/10",
  error: "text-destructive border-destructive/40 hover:bg-destructive/10",
  warning: "text-amber-600 border-amber-500/40 hover:bg-amber-500/10",
};

const variantIcons: Record<Variant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

function showToast(message: string, variant: Variant, options: NotifyOptions = {}) {
  const { title, duration = 4000, position = "bottom-right", action, onDismiss } = options;
  const Icon = variantIcons[variant];

  sonnerToast.custom(
    (id) => (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "flex w-full max-w-xs items-start justify-between gap-3 rounded-xl border p-3 shadow-md",
          variantStyles[variant],
        )}
      >
        <div className="flex items-start gap-2">
          <Icon className={cn("mt-0.5 size-4 shrink-0", titleColor[variant])} />
          <div className="space-y-0.5">
            {title && <p className={cn("text-xs font-medium leading-none", titleColor[variant])}>{title}</p>}
            <p className="text-xs text-muted-foreground">{message}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {action && (
            <Button
              variant={action.variant ?? "outline"}
              size="sm"
              className={cn("h-7 px-2 text-xs", actionToneClass[variant])}
              onClick={() => {
                action.onClick();
                sonnerToast.dismiss(id);
              }}
            >
              {action.label}
            </Button>
          )}
          <button
            type="button"
            onClick={() => {
              sonnerToast.dismiss(id);
              onDismiss?.();
            }}
            aria-label="Dismiss notification"
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="size-3" />
          </button>
        </div>
      </motion.div>
    ),
    { duration, position },
  );
}

export const notify = {
  default: (message: string, options?: NotifyOptions) => showToast(message, "default", options),
  success: (message: string, options?: NotifyOptions) => showToast(message, "success", options),
  error: (message: string, options?: NotifyOptions) => showToast(message, "error", options),
  warning: (message: string, options?: NotifyOptions) => showToast(message, "warning", options),
};

/** Mount once per app tree — every notify.*() call renders into this. */
export function NotificationsToaster() {
  return <SonnerToaster toastOptions={{ unstyled: true, className: "flex justify-end" }} />;
}

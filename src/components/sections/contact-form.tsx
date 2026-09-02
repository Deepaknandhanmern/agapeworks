"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, Mail } from "lucide-react";
import { LoaderHelix } from "@/components/ui/loader-helix";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { services } from "@/lib/services-data";
import {
  contactFormSchema,
  type ContactFormValues,
  timelineOptions,
  sourceOptions,
} from "@/lib/contact-schema";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

const STEP_FIELDS = [
  ["service", "timeline"],
  ["message", "source"],
  ["name", "email", "company"],
] as const;

const STEP_LABELS = ["Your project", "The details", "You"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function ContactForm() {
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: "",
      message: "",
      source: "",
      name: "",
      email: "",
      company: "",
      website: "",
    },
  });

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      trackEvent("contact_form_submitted", { service: data.service });
      reset();
      setStep(0);
    } catch {
      setErrorMessage("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  };

  const isLastStep = step === STEP_FIELDS.length - 1;

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
      />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-3 py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="size-12 text-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground">Message sent</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Thanks for reaching out - we&apos;ll get back to you within one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-6">
            {/* Progress */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Step {step + 1} of {STEP_FIELDS.length}
                </span>
                <span className="font-medium text-foreground">{STEP_LABELS[step]}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEP_FIELDS.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Honeypot - hidden from real visitors */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
              {...register("website")}
            />

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="service">Service you need</Label>
                    <Select
                      value={watch("service")}
                      onValueChange={(v) => {
                        setValue("service", v, { shouldValidate: true });
                      }}
                    >
                      <SelectTrigger id="service" className="h-11 w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.step + s.title} value={s.title}>
                            {s.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="Something else">Something else</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError message={errors.service?.message} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select
                      value={watch("timeline")}
                      onValueChange={(v) =>
                        setValue("timeline", v as (typeof timelineOptions)[number], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger id="timeline" className="h-11 w-full">
                        <SelectValue placeholder="Select a timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError message={errors.timeline?.message} />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Tell us about your project</Label>
                    <Textarea
                      id="message"
                      placeholder="What are you trying to build?"
                      className="min-h-40 resize-none"
                      {...register("message")}
                    />
                    <FieldError message={errors.message?.message} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="source">How did you hear about us? (optional)</Label>
                    <Select
                      value={watch("source") || undefined}
                      onValueChange={(v) =>
                        setValue("source", v as (typeof sourceOptions)[number], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger id="source" className="h-11 w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceOptions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Jane Cooper"
                        className="h-11"
                        {...register("name")}
                      />
                      <FieldError message={errors.name?.message} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        className="h-11"
                        {...register("email")}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="company">Company (optional)</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      className="h-11"
                      {...register("company")}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {errorMessage}
              </motion.p>
            )}

            <div className="flex items-center justify-between gap-4 pt-2">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={goBack}>
                  <ChevronLeft className="size-4" />
                  Back
                </Button>
              ) : (
                <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <Mail className="size-3.5" />
                  We reply within 1 business day.
                </p>
              )}

              {isLastStep ? (
                <span className="ml-auto inline-flex items-center gap-3">
                  {status === "loading" && (
                    <LoaderHelix variant="minimal" dots={3} speed={1} />
                  )}
                  <AntiMetalButton
                    type="submit"
                    disabled={status === "loading"}
                    label={status === "loading" ? "Sending" : "Send message"}
                  />
                </span>
              ) : (
                <Button type="button" onClick={goNext} className="ml-auto">
                  Next
                </Button>
              )}
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

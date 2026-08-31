"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { LoaderHelix } from "@/components/ui/loader-helix";
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
import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { services } from "@/lib/services-data";
import { timelineOptions } from "@/lib/contact-schema";
import { scopeRequestSchema, type ScopeRequest, type ScopeEstimate } from "@/lib/ai/scope-schema";
import { useSpeechToText } from "@/lib/use-speech-to-text";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

// Staged reveal for the estimate result — sections cascade in one after
// another instead of appearing all at once, so the "it actually scoped my
// project" moment reads as more than a plain state swap.
const resultContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
} as const;
const resultItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
} as const;
const statPop = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 22 } },
} as const;
const phaseList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function ScopeForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [estimate, setEstimate] = React.useState<ScopeEstimate | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ScopeRequest>({
    resolver: zodResolver(scopeRequestSchema),
    defaultValues: {
      service: "",
      projectDescription: "",
      mustHaves: "",
      timelinePreference: "",
    },
  });

  const { isSupported: speechSupported, start: startListening, stop: stopListening } =
    useSpeechToText();

  const handleVoiceStop = async () => {
    const transcript = await stopListening();
    if (!transcript) return;

    const existing = watch("projectDescription").trim();
    setValue("projectDescription", existing ? `${existing} ${transcript}` : transcript, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: ScopeRequest) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/scope", {
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

      setEstimate(json.estimate);
      setStatus("success");
      trackEvent("scope_estimate_completed", { service: data.service });
    } catch {
      setErrorMessage("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  };

  const startOver = () => {
    setEstimate(null);
    setStatus("idle");
    reset();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
      />

      <AnimatePresence mode="wait">
        {status === "success" && estimate ? (
          <motion.div
            key="result"
            variants={resultContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={resultItem}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Sparkles className="size-4" />
              Your rough estimate
            </motion.div>

            <motion.div variants={resultContainer} className="grid gap-4 sm:grid-cols-2">
              <motion.div variants={statPop} className="rounded-xl border bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Timeline
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{estimate.timeline}</p>
              </motion.div>
              <motion.div variants={statPop} className="rounded-xl border bg-background p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Rough budget range
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">{estimate.budgetRange}</p>
              </motion.div>
            </motion.div>

            <motion.div variants={resultItem}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Likely engagement
              </p>
              <p className="mt-1 text-sm text-foreground">{estimate.engagementType}</p>
            </motion.div>

            <motion.div variants={resultItem}>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                How we&apos;d phase it
              </p>
              <motion.ol variants={phaseList} className="flex flex-col gap-2">
                {estimate.phases.map((phase, i) => (
                  <motion.li
                    key={phase.name}
                    variants={resultItem}
                    className="flex gap-3 rounded-lg border bg-background p-3"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{phase.name}</p>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>

            <motion.div variants={resultItem}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Our take
              </p>
              <p className="mt-1 text-sm text-foreground">{estimate.recommendations}</p>
            </motion.div>

            <motion.p variants={resultItem} className="text-xs italic text-muted-foreground">
              {estimate.caveats}
            </motion.p>

            <motion.div variants={resultItem} className="flex flex-wrap items-center gap-3 border-t pt-4">
              <AntiMetalButton href="/contact" label="Turn this into a real scope" />
              <button
                type="button"
                onClick={startOver}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                Start over
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="service">Service you need</Label>
              <Select
                value={watch("service")}
                onValueChange={(v) => setValue("service", v, { shouldValidate: true })}
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
              <div className="flex items-center justify-between">
                <Label htmlFor="projectDescription">What are you building?</Label>
                {speechSupported && (
                  <span className="text-xs text-muted-foreground">or speak it below</span>
                )}
              </div>
              <Textarea
                id="projectDescription"
                placeholder="Describe the product, who it's for, and what it needs to do."
                className="min-h-32 resize-none"
                {...register("projectDescription")}
              />
              {speechSupported && (
                <AIVoiceInput onStart={startListening} onStop={handleVoiceStop} className="py-0" />
              )}
              <FieldError message={errors.projectDescription?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="mustHaves">Must-have features (optional)</Label>
              <Textarea
                id="mustHaves"
                placeholder="Anything that's non-negotiable for launch?"
                className="min-h-20 resize-none"
                {...register("mustHaves")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="timelinePreference">Timeline preference (optional)</Label>
              <Select
                value={watch("timelinePreference") || undefined}
                onValueChange={(v) => setValue("timelinePreference", v, { shouldValidate: true })}
              >
                <SelectTrigger id="timelinePreference" className="h-11 w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              <p className="hidden text-xs text-muted-foreground sm:block">
                Takes about 15 seconds. No email required.
              </p>
              <span className="ml-auto inline-flex items-center gap-3">
                {status === "loading" && <LoaderHelix variant="minimal" dots={3} speed={1} />}
                <Button type="submit" disabled={status === "loading"} className="gap-1.5">
                  {status === "loading" ? "Scoping…" : "Get my estimate"}
                  {status !== "loading" && <ArrowRight className="size-4" />}
                </Button>
              </span>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

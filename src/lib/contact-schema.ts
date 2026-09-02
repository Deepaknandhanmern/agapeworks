import { z } from "zod";

export const timelineOptions = [
  "ASAP",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Just exploring",
] as const;

export const sourceOptions = [
  "Google search",
  "Referral",
  "Social media",
  "Portfolio / case study",
  "Other",
] as const;

export const stepOneSchema = z.object({
  service: z.string().min(1, "Select a service"),
  timeline: z.enum(timelineOptions, { message: "Select a timeline" }),
});

export const stepTwoSchema = z.object({
  message: z.string().min(10, "Tell us a bit more (at least 10 characters)"),
  source: z.union([z.enum(sourceOptions), z.literal("")]).optional(),
});

export const stepThreeSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email address"),
  company: z.string().optional(),
});

export const contactFormSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
  // Honeypot — real visitors never see or fill this field. Deliberately has
  // no length/format constraint: a filled value must still pass validation
  // so the route handler can accept it silently (return success) instead of
  // tipping off the bot with a validation error.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

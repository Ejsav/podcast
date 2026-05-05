import { z } from "zod";

export const submitStorySchema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Enter a valid email"),
  category: z.enum([
    "drama",
    "business",
    "event",
    "person",
    "funny",
    "other",
  ]),
  neighborhood: z.string().max(100).optional(),
  title: z.string().min(5, "A headline helps us get the point").max(140),
  story: z.string().min(30, "Give us at least a paragraph").max(4000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You need to confirm" }),
  }),
});

export type SubmitStoryInput = z.infer<typeof submitStorySchema>;

export const beFeaturedSchema = z.object({
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Enter a valid email"),
  type: z.enum([
    "business-owner",
    "creator",
    "event-host",
    "personality",
    "other",
  ]),
  businessOrHandle: z.string().max(160).optional(),
  neighborhood: z.string().max(100).optional(),
  website: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  pitch: z
    .string()
    .min(50, "Tell us why you're worth featuring (at least a few lines)")
    .max(4000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You need to confirm" }),
  }),
});

export type BeFeaturedInput = z.infer<typeof beFeaturedSchema>;

export const newsletterSchema = z.object({
  email: z.string().email(),
});

import { z } from "zod";

/**
 * Contact form schema — validated server-side before any DB write
 * (AGENT.md §9.3). `website` is a honeypot: real users never fill it.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more").max(3000),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

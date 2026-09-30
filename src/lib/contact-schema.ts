import { z } from "zod";

const NAME_MAX_LENGTH = 100;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name")
    .max(NAME_MAX_LENGTH, `Keep your name under ${NAME_MAX_LENGTH} characters`),
  email: z.string().trim().pipe(z.email("Enter a valid email address")),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, `Write at least ${MESSAGE_MIN_LENGTH} characters`)
    .max(MESSAGE_MAX_LENGTH, `Keep the message under ${MESSAGE_MAX_LENGTH} characters`),
  turnstileToken: z.string().min(1, "Complete the verification"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = keyof Omit<ContactInput, "turnstileToken">;

export const contactResponseSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true) }),
  z.object({
    ok: z.literal(false),
    error: z.enum(["validation", "verification", "server"]),
  }),
]);

export type ContactResponse = z.infer<typeof contactResponseSchema>;

import { z } from "zod";

const NAME_MAX_LENGTH = 100;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;
const MAX_LINKS = 3;
const LINK_PATTERN = /https?:\/\/|www\./gi;
const LINE_BREAK_PATTERN = /[\r\n]/;

export const TURNSTILE_ACTION = "contact";
export const HONEYPOT_FIELD = "website";

function countLinks(text: string): number {
  return text.match(LINK_PATTERN)?.length ?? 0;
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name")
    .max(NAME_MAX_LENGTH, `Keep your name under ${NAME_MAX_LENGTH} characters`)
    .refine((name) => !LINE_BREAK_PATTERN.test(name), "Enter your name on a single line"),
  email: z.string().trim().pipe(z.email("Enter a valid email address")),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, `Write at least ${MESSAGE_MIN_LENGTH} characters`)
    .max(MESSAGE_MAX_LENGTH, `Keep the message under ${MESSAGE_MAX_LENGTH} characters`)
    .refine((message) => countLinks(message) <= MAX_LINKS, `Include at most ${MAX_LINKS} links`),
  [HONEYPOT_FIELD]: z.string().optional(),
  turnstileToken: z.string().min(1, "Complete the verification"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = "name" | "email" | "message";

export const contactResponseSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true) }),
  z.object({
    ok: z.literal(false),
    error: z.enum(["validation", "verification", "rate_limited", "server"]),
  }),
]);

export type ContactResponse = z.infer<typeof contactResponseSchema>;

import { z } from "zod";
import { contactSchema } from "../src/lib/contact-schema";
import type { ContactInput, ContactResponse } from "../src/lib/contact-schema";

const CONTACT_PATH = "/api/contact";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SENDER_NAME = "kamilkolodziejczyk.dev";

const turnstileResultSchema = z.object({ success: z.boolean() });

function json(body: ContactResponse, status: number): Response {
  return Response.json(body, { status });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  return origin !== null && origin === new URL(request.url).origin;
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string | null): Promise<boolean> {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) {
    body.append("remoteip", remoteIp);
  }
  const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
  const result = turnstileResultSchema.safeParse(await response.json());
  return result.success && result.data.success;
}

function formatEmail({ name, email, message }: ContactInput): string {
  return [`From: ${name} <${email}>`, "", message].join("\n");
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }
  if (!isSameOrigin(request)) {
    return new Response(null, { status: 403 });
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return json({ ok: false, error: "validation" }, 400);
  }

  const isHuman = await verifyTurnstile(
    parsed.data.turnstileToken,
    env.TURNSTILE_SECRET_KEY,
    request.headers.get("CF-Connecting-IP"),
  );
  if (!isHuman) {
    return json({ ok: false, error: "verification" }, 403);
  }

  try {
    await env.CONTACT_EMAIL.send({
      from: { email: env.CONTACT_FROM, name: SENDER_NAME },
      to: env.CONTACT_TO,
      replyTo: { email: parsed.data.email, name: parsed.data.name },
      subject: `New message from ${parsed.data.name}`,
      text: formatEmail(parsed.data),
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return json({ ok: false, error: "server" }, 502);
  }

  return json({ ok: true }, 200);
}

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === CONTACT_PATH) {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

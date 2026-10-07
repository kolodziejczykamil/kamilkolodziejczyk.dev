import { z } from "zod";
import { contactSchema, HONEYPOT_FIELD, TURNSTILE_ACTION } from "../src/lib/contact-schema";
import type { ContactInput, ContactResponse } from "../src/lib/contact-schema";

const CONTACT_PATH = "/api/contact";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SENDER_NAME = "kamilkolodziejczyk.dev";
const WWW_PREFIX = "www.";
const PERMANENT_REDIRECT = 301;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);
const MAX_BODY_BYTES = 16_384;
const DAILY_COUNTER_TTL_SECONDS = 2 * 24 * 60 * 60;

const turnstileResultSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
  action: z.string().optional(),
  metadata: z.object({ result_with_testing_key: z.boolean().optional() }).optional(),
});

function json(body: ContactResponse, status: number): Response {
  return Response.json(body, { status });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  return origin !== null && origin === new URL(request.url).origin;
}

function isBodyTooLarge(request: Request): boolean {
  const length = Number(request.headers.get("Content-Length") ?? MAX_BODY_BYTES + 1);
  return !Number.isFinite(length) || length > MAX_BODY_BYTES;
}

function dailyCounterKey(): string {
  return `sent:${new Date().toISOString().slice(0, 10)}`;
}

async function readDailyCount(env: Env): Promise<number> {
  return Number((await env.CONTACT_LIMITS.get(dailyCounterKey())) ?? 0);
}

async function incrementDailyCount(env: Env, current: number): Promise<void> {
  await env.CONTACT_LIMITS.put(dailyCounterKey(), String(current + 1), {
    expirationTtl: DAILY_COUNTER_TTL_SECONDS,
  });
}

async function verifyTurnstile(token: string, request: Request, env: Env): Promise<boolean> {
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) {
    body.append("remoteip", remoteIp);
  }
  const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
  const result = turnstileResultSchema.safeParse(await response.json());
  if (!result.success || !result.data.success) {
    return false;
  }
  const { hostname, action, metadata } = result.data;
  if (metadata?.result_with_testing_key) {
    return true;
  }
  return hostname === new URL(request.url).hostname && action === TURNSTILE_ACTION;
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
  if (isBodyTooLarge(request)) {
    return new Response(null, { status: 413 });
  }

  const clientKey = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const { success: isWithinRateLimit } = await env.CONTACT_RATE_LIMITER.limit({ key: clientKey });
  if (!isWithinRateLimit) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return json({ ok: false, error: "validation" }, 400);
  }

  const isHuman = await verifyTurnstile(parsed.data.turnstileToken, request, env);
  if (!isHuman) {
    return json({ ok: false, error: "verification" }, 403);
  }

  if (parsed.data[HONEYPOT_FIELD]) {
    return json({ ok: true }, 200);
  }

  const sentToday = await readDailyCount(env);
  if (sentToday >= Number(env.CONTACT_DAILY_LIMIT)) {
    return json({ ok: false, error: "rate_limited" }, 429);
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

  await incrementDailyCount(env, sentToday);
  return json({ ok: true }, 200);
}

function canonicalRedirect(url: URL): string | null {
  if (LOCAL_HOSTNAMES.has(url.hostname)) {
    return null;
  }
  const isWww = url.hostname.startsWith(WWW_PREFIX);
  const isInsecure = url.protocol === "http:";
  if (!isWww && !isInsecure) {
    return null;
  }
  const canonical = new URL(url);
  canonical.protocol = "https:";
  canonical.hostname = isWww ? url.hostname.slice(WWW_PREFIX.length) : url.hostname;
  return canonical.toString();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const redirectTo = canonicalRedirect(url);
    if (redirectTo) {
      return Response.redirect(redirectTo, PERMANENT_REDIRECT);
    }
    if (url.pathname === CONTACT_PATH) {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

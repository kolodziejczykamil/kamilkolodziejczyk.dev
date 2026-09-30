const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

if (!siteKey) {
  throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set. See .env.example.");
}

export const TURNSTILE_SITE_KEY = siteKey;

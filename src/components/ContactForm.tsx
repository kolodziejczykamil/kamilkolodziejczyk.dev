"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import type { FormEvent } from "react";
import { FormField } from "@/components/FormField";
import { contact } from "@/content/profile";
import { contactResponseSchema, contactSchema, HONEYPOT_FIELD, TURNSTILE_ACTION } from "@/lib/contact-schema";
import type { ContactField, ContactResponse } from "@/lib/contact-schema";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile-site-key";

const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_RESPONSE_FIELD = "cf-turnstile-response";
const CONTACT_ENDPOINT = "/api/contact";

type FieldErrors = Partial<Record<ContactField, string>>;

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const { form: copy } = contact;

const errorMessages: Record<Exclude<ContactResponse, { ok: true }>["error"], string> = {
  validation: copy.genericError,
  verification: copy.verificationError,
  rate_limited: copy.rateLimitedError,
  server: copy.genericError,
};

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export function ContactForm() {
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const renderTurnstile = useCallback(() => {
    const container = turnstileContainerRef.current;
    if (!container || !window.turnstile || widgetIdRef.current) {
      return;
    }
    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      action: TURNSTILE_ACTION,
      theme: "dark",
      appearance: "interaction-only",
      "response-field-name": TURNSTILE_RESPONSE_FIELD,
    });
  }, []);

  const resetTurnstile = () => {
    if (widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  };

  const isFormVisible = status.kind !== "success";

  useEffect(() => {
    if (!isFormVisible) {
      return;
    }
    renderTurnstile();
    return () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = undefined;
      }
    };
  }, [renderTurnstile, isFormVisible]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: readField(formData, "name"),
      email: readField(formData, "email"),
      message: readField(formData, "message"),
      [HONEYPOT_FIELD]: readField(formData, HONEYPOT_FIELD),
      turnstileToken: readField(formData, TURNSTILE_RESPONSE_FIELD),
    });

    if (!parsed.success) {
      const { fieldErrors: errors } = z.flattenError(parsed.error);
      setFieldErrors({ name: errors.name?.[0], email: errors.email?.[0], message: errors.message?.[0] });
      setStatus(errors.turnstileToken ? { kind: "error", message: copy.verificationError } : { kind: "idle" });
      return;
    }

    setFieldErrors({});
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = contactResponseSchema.parse(await response.json());
      if (result.ok) {
        setStatus({ kind: "success" });
        return;
      }
      setStatus({ kind: "error", message: errorMessages[result.error] });
    } catch {
      setStatus({ kind: "error", message: copy.genericError });
    }
    resetTurnstile();
  };

  if (!isFormVisible) {
    return (
      <div role="status" className="rounded-xl border border-signal/40 bg-signal/5 p-6 sm:p-8">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 text-signal" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx={12} cy={12} r={10} pathLength={1} className="diagram-stroke" />
          <polyline
            points="7.5,12.5 10.5,15.5 16.5,9"
            pathLength={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="diagram-stroke"
            style={{ "--diagram-delay": "400ms" }}
          />
        </svg>
        <p className="mt-4 font-display text-xl font-semibold">{copy.successTitle}</p>
        <p className="mt-1 text-muted">{copy.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm text-paper underline decoration-line underline-offset-4 transition-colors hover:decoration-signal"
        >
          {copy.sendAnotherLabel}
        </button>
      </div>
    );
  }

  const isSubmitting = status.kind === "submitting";

  return (
    <>
      <Script src={TURNSTILE_SCRIPT_URL} strategy="lazyOnload" onReady={renderTurnstile} />
      <form noValidate onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2">
        <FormField
          name="name"
          label={copy.nameLabel}
          placeholder={copy.namePlaceholder}
          autoComplete="name"
          error={fieldErrors.name}
        />
        <FormField
          name="email"
          type="email"
          label={copy.emailLabel}
          placeholder={copy.emailPlaceholder}
          autoComplete="email"
          error={fieldErrors.email}
        />
        <FormField
          name="message"
          multiline
          label={copy.messageLabel}
          placeholder={copy.messagePlaceholder}
          error={fieldErrors.message}
          className="sm:col-span-2"
        />
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            {copy.honeypotLabel}
            <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div ref={turnstileContainerRef} className="empty:hidden sm:col-span-2" />
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-md border border-signal bg-signal px-5 py-3 font-display font-semibold leading-none text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px] hover:shadow-signal/60 disabled:translate-y-0 disabled:opacity-70 disabled:shadow-none"
          >
            {isSubmitting && (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M8 2 A6 6 0 1 1 2 8" strokeLinecap="round" />
              </svg>
            )}
            {isSubmitting ? copy.submittingLabel : copy.submitLabel}
          </button>
          <p role="alert" className="text-sm text-danger empty:hidden">
            {status.kind === "error" ? status.message : ""}
          </p>
        </div>
      </form>
    </>
  );
}

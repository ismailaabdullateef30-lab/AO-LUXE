"use client";

/**
 * ContactForm - the short "just send a message" form on /contact.
 *
 * For full event enquiries visitors are pointed to /book instead;
 * this is the quick alternative. Messages go to /api/contact and
 * are emailed to the address in /lib/site.ts.
 */

import { useForm } from "react-hook-form";
import { useState } from "react";
import { site } from "@/lib/site";

type ContactFields = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>();

  const onSubmit = async (values: ContactFields) => {
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json().catch(() => ({ ok: false }));

      if (response.ok && result.ok) {
        setStatus({ state: "sent" });
        reset();
      } else {
        setStatus({
          state: "error",
          message:
            result.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "We couldn't reach the server. Please try again.",
      });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="border border-gold/40 bg-ink-soft p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold">
          <span className="font-display text-xl text-gold">✓</span>
        </div>
        <h3 className="mt-6 font-display text-2xl text-cream">
          Thank you! We&apos;ll be in touch within 24 hours.
        </h3>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="btn-outline mt-7"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-ink-line bg-ink-soft/60 p-6 sm:p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            className="field"
            {...register("name", {
              required: "Please tell us your name.",
              minLength: { value: 2, message: "Please tell us your name." },
            })}
          />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            className="field"
            {...register("email", {
              required: "We need an email to reply to.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "That email doesn't look right.",
              },
            })}
          />
          {errors.email && (
            <span className="field-error">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="field-label">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="How can we help?"
          className="field resize-y"
          {...register("message", {
            required: "Please write a short message.",
            minLength: { value: 5, message: "Please write a little more." },
          })}
        />
        {errors.message && (
          <span className="field-error">{errors.message.message}</span>
        )}
      </div>

      {status.state === "error" && (
        <p
          role="alert"
          className="mt-5 border border-[#E0876A]/40 bg-[#E0876A]/10 px-4 py-3 font-body text-sm text-[#E0876A]"
        >
          {status.message} You can also email us at{" "}
          <a href={`mailto:${site.contact.email}`} className="underline">
            {site.contact.email}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={sending} className="btn-gold mt-7">
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

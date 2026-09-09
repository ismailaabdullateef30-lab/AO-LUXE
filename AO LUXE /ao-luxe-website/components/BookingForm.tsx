"use client";

/**
 * BookingForm - the enquiry form on /book.
 *
 * - Built with React Hook Form for validation.
 * - "Send on WhatsApp" opens WhatsApp with every answer already
 *   written into the message. Needs no server and no API key.
 * - "Send by Email" posts to /api/booking, which emails the details
 *   to the address in /lib/site.ts. Needs RESEND_API_KEY to be set.
 * - If the visitor arrives from a "Book This Service" button
 *   (e.g. /book?service=day-of) that service is pre-ticked.
 *
 * The event-type list is defined below; the service checkboxes come
 * from /lib/services.ts.
 */

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { serviceById, services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";

/** Options in the "Event Type" dropdown. Add or rename freely. */
const EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Corporate",
  "Private Dinner",
  "Other",
] as const;

type BookingFields = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  services: string[];
  eventDate: string;
  guestCount: string;
  location: string;
  notes: string;
  company: string; // honeypot - hidden from real visitors
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; via: "email" | "whatsapp" }
  | { state: "error"; message: string };

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service");

  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<BookingFields>({
    defaultValues: {
      // Pre-tick the service the visitor clicked through with.
      services: preselected ? [preselected] : [],
    },
  });

  const onSubmit = async (values: BookingFields) => {
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json().catch(() => ({ ok: false }));

      if (response.ok && result.ok) {
        setStatus({ state: "sent", via: "email" });
        reset({ services: [] });
      } else {
        setStatus({
          state: "error",
          message:
            result.error ??
            "Something went wrong sending your request. Please try again.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message:
          "We couldn't reach the server. Check your connection and try again.",
      });
    }
  };

  /**
   * Turns the filled-in form into a readable WhatsApp message.
   * Anything left blank is simply left out rather than sent as an
   * empty line.
   */
  const buildWhatsAppMessage = (v: BookingFields) => {
    const serviceTitles = (v.services ?? [])
      .map((id) => serviceById(id)?.title ?? id)
      .join(", ");

    const lines = [
      "Hello AO Luxe Events, I would like to book an event.",
      "",
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Event type: ${v.eventType}`,
      `Services: ${serviceTitles}`,
    ];

    if (v.eventDate) lines.push(`Date: ${v.eventDate}`);
    if (v.guestCount) lines.push(`Guests: ${v.guestCount}`);
    if (v.location) lines.push(`Location: ${v.location}`);
    if (v.notes) lines.push("", `Notes: ${v.notes}`);

    return lines.join("\n");
  };

  /**
   * Sends the booking straight to WhatsApp instead of by email.
   *
   * The blank tab is opened synchronously, before validation runs,
   * because browsers block pop-ups that appear after an await. If the
   * browser blocks it anyway we fall back to navigating this tab.
   */
  const sendOnWhatsApp = async () => {
    const tab = window.open("", "_blank");

    const valid = await trigger();
    if (!valid) {
      tab?.close();
      return;
    }

    const url = whatsappLink(buildWhatsAppMessage(getValues()));

    if (tab) {
      tab.location.href = url;
    } else {
      window.location.href = url;
    }

    setStatus({ state: "sent", via: "whatsapp" });
  };

  // ── Success screen ──────────────────────────────────────────
  if (status.state === "sent") {
    return (
      <div className="border border-gold/40 bg-ink-soft p-10 text-center sm:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold">
          <span className="font-display text-2xl text-gold">✓</span>
        </div>
        <h2 className="mt-7 font-display text-3xl text-cream">
          {status.via === "whatsapp"
            ? "Your details are ready in WhatsApp."
            : "Thank you! We'll be in touch within 24 hours."}
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-cream-muted">
          {status.via === "whatsapp"
            ? "We have opened WhatsApp with your booking details filled in. Press send there and we will pick it up straight away."
            : "Your booking request is with our team. If your date is close or you would rather talk it through now, message us on WhatsApp."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {status.via === "email" && (
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Chat on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => setStatus({ state: "idle" })}
            className="btn-outline"
          >
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  const sending = status.state === "sending";

  // ── The form ────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-ink-line bg-ink-soft/60 p-6 sm:p-10"
    >
      {/* Honeypot: hidden from people, tempting to spam bots. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
        {...register("company")}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <label htmlFor="name" className="field-label">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className="field"
            {...register("name", {
              required: "Please tell us your name.",
              minLength: { value: 2, message: "Please tell us your name." },
            })}
          />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="field-label">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="email"
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

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="field-label">
            Phone Number <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="070XXXXXXXX"
            className="field"
            {...register("phone", {
              required: "A phone number helps us respond faster.",
              pattern: {
                // Accepts 0803..., +234803..., and spaced variants.
                value: /^(\+?234|0)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/,
                message: "Use a Nigerian format, e.g. 07087054909.",
              },
            })}
          />
          {errors.phone ? (
            <span className="field-error">{errors.phone.message}</span>
          ) : (
            <span className="mt-1.5 block font-body text-xs text-cream-muted/60">
              Nigerian format, e.g. 070XXXXXXXX
            </span>
          )}
        </div>

        {/* Event type */}
        <div>
          <label htmlFor="eventType" className="field-label">
            Event Type <span className="text-gold">*</span>
          </label>
          <select
            id="eventType"
            defaultValue=""
            className="field appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%23B8952A' stroke-width='1.4'/></svg>\")",
            }}
            {...register("eventType", { required: "Please choose an event type." })}
          >
            <option value="" disabled>
              Select an event type
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-ink text-cream">
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <span className="field-error">{errors.eventType.message}</span>
          )}
        </div>

        {/* Event date */}
        <div>
          <label htmlFor="eventDate" className="field-label">
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            className="field [color-scheme:dark]"
            {...register("eventDate")}
          />
        </div>

        {/* Guest count */}
        <div>
          <label htmlFor="guestCount" className="field-label">
            Expected Guest Count
          </label>
          <input
            id="guestCount"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="e.g. 150"
            className="field"
            {...register("guestCount")}
          />
        </div>

        {/* Location - full width */}
        <div className="sm:col-span-2">
          <label htmlFor="location" className="field-label">
            Event Location / Venue
          </label>
          <input
            id="location"
            type="text"
            placeholder="City, area, or the venue name if you have one"
            className="field"
            {...register("location")}
          />
        </div>
      </div>

      {/* Services - checkboxes, at least one required */}
      <fieldset className="mt-8">
        <legend className="field-label">
          Service Required <span className="text-gold">*</span>
        </legend>
        <div className="mt-1 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex cursor-pointer items-center gap-3 border border-ink-line bg-ink px-4 py-3 transition-colors duration-200 hover:border-gold/50"
            >
              <input
                type="checkbox"
                value={service.id}
                // Ticks the box straight away when the visitor arrives
                // from a "Book This Service" button, before hydration.
                defaultChecked={preselected === service.id}
                // [color-scheme:dark] stops the browser drawing a white box on the dark form
                className="h-4 w-4 flex-none accent-[#B8952A] [color-scheme:dark]"
                {...register("services", {
                  required: "Choose at least one service.",
                })}
              />
              <span className="font-body text-sm text-cream">{service.title}</span>
            </label>
          ))}
        </div>
        {errors.services && (
          <span className="field-error">
            {errors.services.message as string}
          </span>
        )}
      </fieldset>

      {/* Notes */}
      <div className="mt-8">
        <label htmlFor="notes" className="field-label">
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={5}
          placeholder="Tell us about the occasion: the theme you have in mind, your budget range, or anything else we should know."
          className="field resize-y"
          {...register("notes")}
        />
      </div>

      {/* Error message from the server */}
      {status.state === "error" && (
        <p
          role="alert"
          className="mt-6 border border-[#E0876A]/40 bg-[#E0876A]/10 px-4 py-3 font-body text-sm text-[#E0876A]"
        >
          {status.message} You can also reach us directly at{" "}
          <a href={`mailto:${site.contact.email}`} className="underline">
            {site.contact.email}
          </a>
          .
        </p>
      )}

      {/*
        Two ways to send the same filled-in form. WhatsApp leads
        because it reaches us fastest and most clients prefer it;
        email is there for anyone who would rather have a written
        record. Both carry exactly the same details.
      */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={sendOnWhatsApp}
          disabled={sending}
          className="btn-gold"
        >
          Send on WhatsApp
        </button>
        <button type="submit" disabled={sending} className="btn-outline">
          {sending ? "Sending…" : "Send by Email"}
        </button>
      </div>
      <p className="mt-4 font-body text-xs text-cream-muted">
        Whichever you choose, we reply to every request within 24 hours.
      </p>
    </form>
  );
}

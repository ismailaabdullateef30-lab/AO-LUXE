/**
 * BOOKING PAGE (/book)
 *
 * The form itself lives in /components/BookingForm.tsx.
 * It is wrapped in <Suspense> because it reads the ?service=
 * value from the URL, which Next.js requires a boundary for.
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Event",
  description:
    "Request a booking with AO Luxe Events. Tell us your date, guest count and the services you need. We reply within 24 hours.",
};

export default function BookPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-ink-line">
        <div className="section text-center">
          <p className="eyebrow">Booking</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">
            Let&apos;s begin with the details
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
            Fill in what you know so far. Nothing here is binding. We&apos;ll come
            back with availability, honest pricing and a first idea of how your
            occasion could look.
          </p>
        </div>
      </section>

      {/* The form */}
      <section className="section">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="border border-ink-line bg-ink-soft/60 p-10 font-body text-sm text-cream-muted">
                  Loading the booking form…
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </div>

          {/* Reassurance panel */}
          <aside className="lg:col-span-4">
            <div className="border border-ink-line bg-ink-soft p-7">
              <h2 className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
                What Happens Next
              </h2>
              <ol className="mt-6 space-y-5">
                {[
                  "We read your request and check the date against our calendar.",
                  "A coordinator calls or emails you within 24 hours with availability and honest pricing.",
                  "If it's a fit, we book a consultation and start building the concept.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-body text-[11px] tracking-[0.15em] text-gold/70">
                      0{i + 1}
                    </span>
                    <span className="font-body text-sm leading-relaxed text-cream-muted">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-ink-line pt-6">
                <p className="font-body text-sm text-cream-muted">
                  Prefer to talk it through?
                </p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-body text-sm text-gold transition-colors duration-200 hover:text-gold-light"
                >
                  WhatsApp {site.contact.whatsappDisplay}
                </a>
                <a
                  href={`tel:${site.contact.phoneIntl}`}
                  className="mt-2 block font-body text-sm text-gold transition-colors duration-200 hover:text-gold-light"
                >
                  Call {site.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/**
 * CONTACT PAGE (/contact)
 *
 *   1. Header
 *   2. Contact cards - WhatsApp, phone, email, Instagram (all clickable)
 *   3. Map + short message form
 *
 * Phone numbers, email and social links all come from /lib/site.ts.
 */

import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import {
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach AO Luxe Events by WhatsApp, phone, email or Instagram, or send a message straight from this page.",
};

/** The four ways to reach us, shown as cards. */
const channels = [
  {
    label: "WhatsApp",
    value: site.contact.whatsappDisplay,
    href: whatsappLink(),
    note: "Fastest reply, usually within the hour",
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Phone",
    value: site.contact.phoneDisplay,
    href: `tel:${site.contact.phoneIntl}`,
    note: "Mon–Sat, 9am – 7pm WAT",
    Icon: PhoneIcon,
    external: false,
  },
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "For quotes, briefs and documents",
    Icon: MailIcon,
    external: false,
  },
  {
    label: "Instagram",
    value: site.contact.instagramHandle,
    href: site.contact.instagramUrl,
    note: "See our most recent events",
    Icon: InstagramIcon,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── 1. HEADER ───────────────────────────────────────── */}
      <section className="border-b border-ink-line">
        <div className="section text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">
            We&apos;re available and ready
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
            Whichever way you prefer to reach us, someone from the team will get
            back to you. For a full event enquiry, the{" "}
            <Link href="/book" className="text-gold underline underline-offset-4">
              booking form
            </Link>{" "}
            gets you a faster, more detailed answer.
          </p>
        </div>
      </section>

      {/* ── 2. CONTACT CARDS ────────────────────────────────── */}
      <section className="section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, value, href, note, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col border border-ink-line bg-ink-soft p-7 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(184,149,42,0.08)]"
            >
              <div className="h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110">
                <Icon />
              </div>
              <span className="mt-5 font-body text-[11px] uppercase tracking-[0.18em] text-gold">
                {label}
              </span>
              <span className="mt-2 break-all font-display text-xl text-cream">
                {value}
              </span>
              <span className="mt-3 font-body text-xs leading-relaxed text-cream-muted">
                {note}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── 3. MAP + MESSAGE FORM ───────────────────────────── */}
      <section className="border-t border-ink-line bg-ink-soft/40">
        <div className="section grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Map */}
          <div className="lg:col-span-5">
            <p className="eyebrow">Where We Are</p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-cream">
              Based in {site.contact.location}
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-cream-muted">
              We plan and deliver events nationwide. Consultations happen at our
              office, at your venue, or over a video call, whichever suits you.
            </p>

            {/*
              MAP - currently a general area search.
              To pin an exact address: open Google Maps, find the location,
              click Share → Embed a map, and paste that iframe's src below.
            */}
            <div className="mt-7 aspect-[4/3] w-full overflow-hidden border border-ink-line">
              <iframe
                title={`Map showing ${site.contact.location}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  site.contact.location,
                )}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.4] contrast-[1.1]"
              />
            </div>
          </div>

          {/* Short message form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Send A Message</p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-cream">
              A quick question is welcome too
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-cream-muted">
              Not ready for a full booking form? Write us a line here and
              we&apos;ll pick it up from there.
            </p>

            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

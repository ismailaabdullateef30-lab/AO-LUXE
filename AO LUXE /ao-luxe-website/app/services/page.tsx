/**
 * SERVICES PAGE (/services)
 *
 * One detailed section per service, driven entirely by /lib/services.ts.
 * Each "Book This Service" button carries the service through to the
 * booking form, which pre-ticks the matching checkbox.
 */

import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { serviceIcons } from "@/components/Icons";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full event planning, partial planning, day-of coordination, and venue and vendor sourcing from AO Luxe Events.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-ink-line">
        <div className="section text-center">
          <p className="eyebrow">Our Services</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">
            Planning, at the level you need it
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
            Four ways in, depending on how much of the work you want to carry
            yourself. We are a planning house. We don&apos;t decorate or cater;
            we source the specialists who do and hold them to their word, which
            keeps our advice on your side rather than our own price list.
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-body text-sm leading-relaxed text-cream-muted/70">
            Prices below are starting points. Every quote is built around your
            guest count, venue and date, and we put it in writing before anything
            is committed.
          </p>
        </div>
      </section>

      {/* One block per service */}
      {services.map((service, index) => {
        const Icon = serviceIcons[service.icon];
        const flipped = index % 2 === 1; // alternate the layout for rhythm

        return (
          <section
            key={service.id}
            id={service.id}
            className={`border-b border-ink-line ${
              flipped ? "bg-ink-soft/40" : "bg-ink"
            }`}
          >
            <div className="section grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left: title, description, price, CTA */}
              <div
                className={`lg:col-span-5 ${
                  flipped ? "lg:order-2 lg:col-start-8" : ""
                }`}
              >
                <div className="h-10 w-10 text-gold">
                  <Icon />
                </div>

                <span className="mt-6 block font-body text-[11px] tracking-[0.2em] text-gold/60">
                  0{index + 1}
                </span>

                <h2 className="mt-2 font-display text-4xl leading-tight text-cream sm:text-5xl">
                  {service.title}
                </h2>

                <p className="mt-6 font-body text-base leading-relaxed text-cream-muted">
                  {service.description}
                </p>

                <p className="mt-8 border-l-2 border-gold pl-4 font-display text-2xl text-gold">
                  {service.price}
                </p>

                <Link
                  href={`/book?service=${service.id}`}
                  className="btn-gold mt-8"
                >
                  Book This Service
                </Link>
              </div>

              {/* Right: what's included */}
              <div
                className={`lg:col-span-6 ${
                  flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                }`}
              >
                <div className="border border-ink-line bg-ink-soft p-8 lg:p-10">
                  <h3 className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
                    What&apos;s Included
                  </h3>
                  <ul className="mt-7 space-y-4">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-gold"
                        />
                        <span className="font-body text-sm leading-relaxed text-cream">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTABanner
        heading="Not sure which service you need?"
        subheading="Send us the details of your occasion and we'll advise honestly, with no obligation."
      />
    </>
  );
}

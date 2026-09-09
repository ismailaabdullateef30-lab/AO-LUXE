/**
 * CTABanner - the deep-gold strip that invites visitors to book.
 * Reused at the bottom of several pages.
 */

import Link from "next/link";
import { whatsappLink } from "@/lib/site";

type CTABannerProps = {
  heading?: string;
  subheading?: string;
};

export default function CTABanner({
  heading = "Ready to make your event unforgettable?",
  subheading = "Tell us the date and the vision. We'll take it from there.",
}: CTABannerProps) {
  return (
    <section className="bg-gold-dark">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-16 text-center lg:flex-row lg:justify-between lg:px-10 lg:text-left">
        <div>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 font-body text-sm text-ink/75">{subheading}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex items-center justify-center border border-ink bg-ink px-8 py-3.5 font-body text-[12px] uppercase tracking-[0.18em] text-gold transition-opacity duration-300 hover:opacity-85"
          >
            Book Now
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-ink px-8 py-3.5 font-body text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ink hover:text-gold"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

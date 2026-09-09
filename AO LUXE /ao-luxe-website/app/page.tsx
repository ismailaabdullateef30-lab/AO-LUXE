/**
 * HOMEPAGE (/)
 *
 * Sections, in order:
 *   1. Hero            - logo, tagline, main call to action
 *   2. Introduction    - the brand statement
 *   3. Services        - four preview cards
 *   4. Why Choose Us   - Class, Value, Elegance
 *   5. Gallery teaser  - four photographs
 *   6. The film        - click-to-play showreel
 *   7. CTA banner      - gold strip
 */

import Link from "next/link";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import PhotoSlot from "@/components/PhotoSlot";
import CTABanner from "@/components/CTABanner";
import Showreel from "@/components/Showreel";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Homepage gallery slots.
 * Drop photos into /public/images/gallery/ using these exact file
 * names, or change the `src` values below to match your file names.
 */
const galleryTeaser = [
  {
    src: "/images/gallery/event-1.jpg",
    alt: "Couple in matching red aso-oke and gele at a traditional wedding planned by AO Luxe Events",
  },
  {
    src: "/images/gallery/event-2.jpg",
    alt: "Bride and groom in red traditional attire at their wedding reception venue",
  },
  {
    src: "/images/gallery/event-3.jpg",
    alt: "Couple in white lace and agbada at their nikkai, planned by AO Luxe Events",
  },
  {
    src: "/images/gallery/event-4.jpg",
    alt: "Bride and groom in white traditional attire on their wedding day",
  },
  {
    src: "/images/gallery/event-5.jpg",
    alt: "Guests arriving under a draped canopy at a reception planned by AO Luxe Events",
  },
];

/** The three brand pillars shown in "Why Choose Us". */
const pillars = [
  {
    title: "Class",
    body: "Restraint is the luxury. We brief for fewer, better decisions: the right room, the right suppliers, the right running order, so the day reads considered rather than crowded.",
  },
  {
    title: "Value",
    body: "A beautiful event and a respected budget are not opposites. We are honest about costs from the first conversation and spend where guests will actually feel it.",
  },
  {
    title: "Elegance",
    body: "The mark of a well-planned event is that nobody notices it being run. We hold the timeline, the vendors and the small emergencies quietly, in the background.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────
       * The pieces cross-fade in on a staggered timeline and settle
       * together: glow → logo → rule → button. Each animation
       * overlaps the one before it, so the hero resolves rather than
       * appearing in steps. Timings live in tailwind.config.ts, and
       * the global reduced-motion rule in globals.css collapses the
       * whole sequence for visitors who ask for less movement.
       */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-ink px-6 py-20">
        {/* Gold glow - blooms first, behind everything */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-glow-bloom rounded-full bg-gold/[0.09] blur-[120px]"
        />

        {/*
          Deliberately no `z-*` here. A z-index would open a stacking
          context and cut the logo off from the background it blends
          into. DOM order alone already paints this above the glow.
        */}
        <div className="relative flex flex-col items-center text-center">
          {/*
            The exact supplied logo file - never redrawn.
            It already carries the "AO LUXE EVENTS" wordmark and the
            tagline, so the hero doesn't repeat them underneath.
          */}
          <Logo
            href={null}
            priority
            sizeHint={520}
            className="w-[min(78vw,420px)]"
            imageClassName="animate-logo-settle"
          />

          {/* Rule + location - draws outward once the logo has settled */}
          <div
            className="mt-9 flex items-center gap-5"
            style={{ animationDelay: "0.85s" }}
          >
            <span
              className="h-px w-14 origin-right animate-rule-draw bg-gold/50"
              style={{ animationDelay: "0.85s" }}
            />
            <span
              className="animate-rise-in font-body text-[11px] uppercase tracking-[0.3em] text-cream-muted"
              style={{ animationDelay: "0.9s" }}
            >
              Nigeria
            </span>
            <span
              className="h-px w-14 origin-left animate-rule-draw bg-gold/50"
              style={{ animationDelay: "0.85s" }}
            />
          </div>

          {/* Call to action - last to arrive */}
          <Link
            href="/book"
            className="btn-gold mt-10 animate-rise-in"
            style={{ animationDelay: "1.15s" }}
          >
            Book Your Event
          </Link>
        </div>

        {/* Scroll hint - fades in after everything else has settled */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-rise-in flex-col items-center gap-2 sm:flex"
          style={{ animationDelay: "1.6s" }}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream-muted/60">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </section>

      {/* ── 2. INTRODUCTION ─────────────────────────────────── */}
      <section className="section text-center">
        <p className="eyebrow">Welcome to AO Luxe Events</p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.15] text-cream sm:text-5xl">
          Occasions worth remembering, planned with care from the very first idea.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
          AO Luxe Events is an event planning house working across Nigeria. We
          take on weddings, milestone birthdays, private dinners and corporate
          occasions, building the concept, holding the budget, sourcing and
          managing every vendor, and running the day itself, so you can arrive as
          a guest at your own celebration.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/services" className="btn-outline">
            Explore Our Services
          </Link>
          <Link href="/about" className="btn-outline">
            Meet The Team
          </Link>
        </div>
      </section>

      {/* ── 3. SERVICES PREVIEW ─────────────────────────────── */}
      <section className="border-y border-ink-line bg-ink-soft/40">
        <div className="section">
          <div className="max-w-2xl">
            <p className="eyebrow">What We Do</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
              Four ways to work with us
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-cream-muted">
              Hand us the whole occasion, or just the part you&apos;d rather not carry.
              Either way, the same team and the same standard see it through.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US ────────────────────────────────── */}
      <section className="section">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
            Three words we actually hold ourselves to
          </h2>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="border-t border-gold/30 pt-7">
              <span className="font-body text-[11px] tracking-[0.2em] text-gold/60">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-3xl text-cream">
                {pillar.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-cream-muted">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. GALLERY TEASER ───────────────────────────────── */}
      <section id="recent-work" className="border-t border-ink-line bg-ink-soft/40">
        <div className="section">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Recent Work</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
                A look at days we&apos;ve planned
              </h2>
            </div>
            <a
              href={site.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[12px] uppercase tracking-[0.16em] text-gold transition-colors duration-200 hover:text-gold-light"
            >
              See more on Instagram →
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {galleryTeaser.map((photo) => (
              <PhotoSlot
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className="aspect-[3/4]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. THE FILM ─────────────────────────────────────
       * The video is portrait, so it sits beside the copy rather
       * than stretching across the page. Nothing downloads until
       * the visitor presses play - see components/Showreel.tsx.
       */}
      <section id="the-film" className="border-t border-ink-line">
        <div className="section grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">The Film</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
              See a day come together
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-cream-muted">
              Photographs show you the room. Film shows you the feeling: the
              arrival, the drums, the moment the couple walks in and the whole
              hall turns. This is what a day we&apos;ve planned actually looks
              like from the inside.
            </p>
            <Link href="/book" className="btn-outline mt-8">
              Plan Yours
            </Link>
          </div>

          <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:col-start-8 lg:max-w-none">
            <Showreel />
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ───────────────────────────────────── */}
      <CTABanner />
    </>
  );
}

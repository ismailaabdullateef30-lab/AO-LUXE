/**
 * ABOUT PAGE (/about)
 *
 *   1. Page header
 *   2. Owner / founder - photo, name, role, story
 *   3. The team - a single group photograph
 *   4. Our approach - how we work
 *   5. CTA banner
 *
 * Names, roles, bios and photo paths are all edited in /lib/team.ts.
 */

import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import PhotoSlot from "@/components/PhotoSlot";
import { owner, teamPhoto } from "@/lib/team";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the founder and team behind AO Luxe Events, a Nigerian luxury event planning house built on class, value and elegance.",
};

/** How we work - shown under the team. */
const approach = [
  {
    step: "01",
    title: "We listen first",
    body: "Before a single vendor is approached we want to know the occasion behind the occasion: who is coming, what matters to you, and what the day needs to feel like.",
  },
  {
    step: "02",
    title: "We plan in the open",
    body: "You see the concept, the layout and the full budget before we commit to anything. No hidden vendor mark-ups, no surprises two weeks out.",
  },
  {
    step: "03",
    title: "We carry the day",
    body: "On the day itself our team runs setup, suppliers, timing and teardown. Your only job is to be present at your own celebration.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1. HEADER ───────────────────────────────────────── */}
      <section className="border-b border-ink-line">
        <div className="section text-center">
          <p className="eyebrow">Our Story</p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.1] text-cream sm:text-6xl">
            The people behind the evenings you remember
          </h1>
          <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-cream-muted">
            {site.name} is a small, deliberate team. The same people who take your
            first call are the ones standing in the room on the day, which is
            exactly how we like it.
          </p>
        </div>
      </section>

      {/* ── 2. FOUNDER ──────────────────────────────────────── */}
      <section className="section">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <PhotoSlot
              src={owner.photo}
              alt={`${owner.name}, ${owner.role} of ${site.name}`}
              monogram="AO"
              className="aspect-[4/5]"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Founder</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
              {owner.name}
            </h2>
            {/* Skip the role line while the name is still the placeholder,
                so it doesn't read the same thing twice. */}
            {owner.name !== owner.role && (
              <p className="mt-3 font-body text-[11px] uppercase tracking-[0.18em] text-gold">
                {owner.role}
              </p>
            )}

            <div className="mt-7 space-y-5 font-body text-base leading-relaxed text-cream-muted">
              <p>{owner.bio}</p>
            </div>

            <p className="mt-8 border-l-2 border-gold pl-5 font-display text-2xl italic text-gold">
              {site.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. TEAM ─────────────────────────────────────────
       * One group photograph rather than individual cards. The image
       * is portrait (3:4), so it sits beside the copy instead of
       * being cropped into a wide band.
       */}
      <section className="border-y border-ink-line bg-ink-soft/40">
        <div className="section grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">The Team</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
              Specialists, not generalists
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-cream-muted">
              Every part of your event is held by someone who does that one thing
              properly, and all of them report to a single coordinator, so you
              never have to chase four vendors for one answer.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-cream-muted">
              {teamPhoto.caption}
            </p>

            <p className="mt-8 border-l-2 border-gold pl-5 font-body text-sm leading-relaxed text-cream">
              The same people who take your first call are the ones standing in
              the room on the day.
            </p>
          </div>

          <div className="lg:col-span-6">
            <PhotoSlot
              src={teamPhoto.photo}
              alt={teamPhoto.alt}
              monogram="AO"
              className="aspect-[3/4]"
            />
          </div>
        </div>
      </section>

      {/* ── 4. APPROACH ─────────────────────────────────────── */}
      <section className="section">
        <div className="max-w-2xl">
          <p className="eyebrow">How We Work</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-5xl">
            Three steps, start to finish
          </h2>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {approach.map((item) => (
            <div key={item.step} className="border-t border-gold/30 pt-7">
              <span className="font-body text-[11px] tracking-[0.2em] text-gold/60">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-2xl text-cream">
                {item.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-cream-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        heading="Let's talk about your occasion"
        subheading="Share the date and the vision. We'll tell you honestly what it takes."
      />
    </>
  );
}

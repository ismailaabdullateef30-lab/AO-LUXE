/**
 * Logo - renders the EXACT logo file supplied by AO Luxe Events.
 *
 * IMPORTANT: the file lives at /public/images/logo.jpg and is never
 * recreated, redrawn, recoloured or replaced with an SVG. The file on
 * disk is byte-for-byte the one supplied.
 *
 * Two things this component does, neither of which alters the artwork:
 *
 *  1. SCALING - the logo keeps its true 1190 x 935 proportions at
 *     every size. Set the rendered width with Tailwind classes via
 *     `className` (e.g. "w-[104px]").
 *
 *  2. SEATING - the logo file has a solid #0C0C0C background, a shade
 *     darker than the site's #111111. Left alone it shows as a faint
 *     dark rectangle around the mark. `mix-blend-mode: lighten` keeps
 *     whichever is lighter of the logo and the page, so the logo's own
 *     black falls away and the gold sits directly on the page. The
 *     gold is untouched - every gold pixel is far lighter than
 *     #111111, so it always wins the comparison.
 *     Pass `blend={false}` on a light or gold background.
 */

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** The logo file's real pixel dimensions - do not change. */
const LOGO_W = 1190;
const LOGO_H = 935;

type LogoProps = {
  /** Tailwind width classes for the rendered size, e.g. "w-[104px]". */
  className?: string;
  /**
   * Classes applied to the image itself. Any animation belongs HERE,
   * not on the wrapper: a `filter` on a parent creates a stacking
   * context that would cut the image off from the page behind it and
   * break the blend below.
   */
  imageClassName?: string;
  /** Wrap the logo in a link. Pass null for no link. */
  href?: string | null;
  /** Roughly the widest the logo is rendered - helps Next pick a file size. */
  sizeHint?: number;
  priority?: boolean;
  /** Blend the logo's black into the page. Turn off on light backgrounds. */
  blend?: boolean;
};

export default function Logo({
  className = "w-[120px]",
  imageClassName = "",
  href = "/",
  sizeHint = 260,
  priority = false,
  blend = true,
}: LogoProps) {
  const image = (
    <Image
      src={site.logo}
      alt={`${site.name}, ${site.tagline}`}
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      quality={95}
      sizes={`${sizeHint}px`}
      // h-auto preserves the logo's true proportions at every width.
      className={`h-auto w-full ${blend ? "mix-blend-lighten" : ""} ${imageClassName}`}
    />
  );

  return (
    <span className={`block ${className}`}>
      {href ? (
        <Link href={href} aria-label={`${site.name} home`} className="block">
          {image}
        </Link>
      ) : (
        image
      )}
    </span>
  );
}

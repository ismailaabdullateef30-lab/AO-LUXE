"use client";

/**
 * PhotoSlot - a photo frame that never shows a broken image.
 *
 * Give it a path like "/images/team/owner-photo.jpg". If that file
 * exists it is displayed. If it doesn't exist yet, an elegant gold
 * monogram placeholder is shown instead, so the site always looks
 * finished while photos are still being collected.
 *
 * Photos go through next/image, which serves a correctly sized WebP
 * or AVIF to each visitor rather than the full-resolution original.
 *
 * NOTE: this is deliberately NOT used for the AO Luxe logo - the
 * logo is always rendered from the exact supplied file.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PhotoSlotProps = {
  src: string;
  alt: string;
  /** Letters shown in the placeholder, e.g. initials. */
  monogram?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  className?: string;
  /**
   * Roughly how wide this photo renders, so the browser can pick the
   * right file size. Default assumes a half-width column on desktop.
   */
  sizes?: string;
  priority?: boolean;
};

export default function PhotoSlot({
  src,
  alt,
  monogram = "AO",
  className = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: PhotoSlotProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /**
   * The image is rendered on the server, so a missing file fails to
   * load before React has hydrated and the onError handler below
   * never fires. This catches that case: once mounted, an image that
   * has finished loading but has no width did not load at all.
   */
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div
      className={`relative w-full overflow-hidden border border-ink-line bg-ink-soft ${className}`}
    >
      {failed ? (
        // Placeholder shown until a real photo is added at `src`.
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-soft via-ink to-ink-soft">
          <span className="font-display text-4xl tracking-[0.2em] text-gold/70">
            {monogram}
          </span>
          <span className="h-px w-10 bg-gold/40" />
          <span className="px-4 text-center font-body text-[11px] uppercase tracking-[0.18em] text-cream-muted/60">
            Photo coming soon
          </span>
        </div>
      ) : (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          // `text-transparent` hides the alt text in the brief moment
          // before hydration decides whether the file actually exists.
          className="object-cover text-transparent transition-transform duration-700 hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

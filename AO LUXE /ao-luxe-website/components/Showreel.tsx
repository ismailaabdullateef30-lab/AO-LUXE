"use client";

/**
 * Showreel - the event film on the homepage.
 *
 * The video is NOT downloaded when the page loads. Visitors see the
 * poster frame, and the file is only fetched once they press play.
 * That matters: the film is large, and most people arriving on the
 * site are on mobile data.
 *
 * To swap the film, replace /public/videos/showreel.mp4 and
 * /public/images/showreel-poster.jpg. The video must be H.264 MP4 -
 * .MOV files straight off an iPhone are usually HEVC, which Chrome
 * and Firefox refuse to play.
 */

import Image from "next/image";
import { useState } from "react";

type ShowreelProps = {
  src?: string;
  poster?: string;
};

export default function Showreel({
  src = "/videos/showreel.mp4",
  poster = "/images/showreel-poster.jpg",
}: ShowreelProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full overflow-hidden border border-ink-line bg-ink-soft">
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="h-full w-full"
        >
          {/* Shown only if the browser can't play the file at all */}
          <p className="p-6 font-body text-sm text-cream-muted">
            Your browser can&apos;t play this video.{" "}
            <a href={src} className="text-gold underline">
              Download it instead
            </a>
            .
          </p>
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play the AO Luxe Events film"
          className="group relative block w-full"
        >
          <Image
            src={poster}
            alt="A wedding reception planned by AO Luxe Events"
            width={674}
            height={1200}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full"
          />

          {/* Darkening wash, so the gold play button stays readable */}
          <span
            aria-hidden
            className="absolute inset-0 bg-ink/35 transition-colors duration-300 group-hover:bg-ink/20"
          />

          {/* Play button */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-ink/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-gold transition-colors duration-300 group-hover:fill-ink"
            >
              <path d="M8 5.2v13.6L19 12z" />
            </svg>
          </span>

          <span
            aria-hidden
            className="absolute bottom-5 left-0 right-0 text-center font-body text-[11px] uppercase tracking-[0.25em] text-cream"
          >
            Watch the film
          </span>
        </button>
      )}
    </div>
  );
}

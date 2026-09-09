/**
 * ServiceCard - the compact service tile used on the homepage.
 *
 * Content comes from /lib/services.ts, so edit services there
 * rather than changing this file.
 */

import Link from "next/link";
import type { Service } from "@/lib/services";
import { serviceIcons } from "./Icons";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <article className="group flex h-full flex-col border border-ink-line bg-ink-soft p-8 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(184,149,42,0.08)]">
      <div className="h-9 w-9 text-gold transition-transform duration-300 group-hover:scale-110">
        <Icon />
      </div>

      <h3 className="mt-6 font-display text-2xl text-cream">{service.title}</h3>

      <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-cream-muted">
        {service.short}
      </p>

      <Link
        href={`/services#${service.id}`}
        className="mt-6 inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.16em] text-gold transition-colors duration-200 hover:text-gold-light"
      >
        Learn More
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
}

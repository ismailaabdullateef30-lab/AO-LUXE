/**
 * Footer - appears on every page.
 *
 * Contact details and menu links are pulled from /lib/site.ts,
 * so update them there once and they change everywhere.
 */

import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons";
import { navLinks, site, whatsappLink } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo sizeHint={320} className="w-[168px]" />
            <p className="mt-5 font-display text-lg italic text-gold">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream-muted">
              {site.shortDescription}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] text-gold">
              Get In Touch
            </h4>
            <ul className="mt-5 space-y-3 font-body text-sm text-cream">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-gold"
                >
                  WhatsApp · {site.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phoneIntl}`}
                  className="transition-colors duration-200 hover:text-gold"
                >
                  Call · {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors duration-200 hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-gold"
                >
                  {site.contact.instagramHandle}
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with AO Luxe Events on WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-ink-line p-2.5 text-gold transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AO Luxe Events on Instagram"
                className="flex h-10 w-10 items-center justify-center border border-ink-line p-2.5 text-gold transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink"
              >
                <InstagramIcon />
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                aria-label="Email AO Luxe Events"
                className="flex h-10 w-10 items-center justify-center border border-ink-line p-2.5 text-gold transition-all duration-200 hover:border-gold hover:bg-gold hover:text-ink"
              >
                <MailIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-ink-line pt-6">
          <p className="font-body text-xs tracking-wide text-cream-muted">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

/**
 * Navbar - sticky top navigation.
 *
 * - Logo on the left (always the exact supplied file), links on the right.
 * - The link for the page you're currently on is highlighted in gold.
 * - On phones the links collapse into a hamburger menu.
 *
 * To add or rename a menu item, edit `navLinks` in /lib/site.ts.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Deepen the navbar background once the user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-ink-line bg-ink/95 backdrop-blur-sm"
          : "border-transparent bg-ink"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">
        {/*
          The full logo lockup, scaled down. It shrinks a little once
          the visitor scrolls, so the sticky bar takes less of the
          screen without the logo ever changing shape.
        */}
        <Logo
          priority
          sizeHint={240}
          className={`transition-all duration-500 ${
            scrolled ? "w-[74px] sm:w-[86px]" : "w-[86px] sm:w-[104px]"
          }`}
        />

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-[13px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-cream hover:text-gold-light"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/book"
              className="border border-gold bg-gold px-5 py-2.5 font-body text-[12px] uppercase tracking-[0.16em] text-ink transition-all duration-200 hover:bg-gold-light hover:shadow-[0_0_20px_rgba(184,149,42,0.35)]"
            >
              Book Your Event
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-6 bg-gold transition-transform duration-300 ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-gold transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-6 bg-gold transition-transform duration-300 ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        className={`overflow-hidden border-t border-ink-line bg-ink transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-ink-line last:border-0">
              <Link
                href={link.href}
                className={`block py-4 font-body text-sm uppercase tracking-[0.16em] ${
                  isActive(link.href) ? "text-gold" : "text-cream"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-6">
          <Link
            href="/book"
            className="block bg-gold px-5 py-3 text-center font-body text-[12px] uppercase tracking-[0.16em] text-ink"
          >
            Book Your Event
          </Link>
        </div>
      </div>
    </header>
  );
}

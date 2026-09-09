/**
 * Icons - small line icons drawn in the brand gold.
 *
 * These are generic UI icons (service categories and social links).
 * They are NOT the AO Luxe logo and never stand in for it.
 */

type IconProps = { className?: string };

const base = "h-full w-full stroke-current fill-none";

export function PlanningIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.1} className={`${base} ${className}`}>
      <path d="M12 2.5 14 8l5.5 2-5.5 2-2 5.5-2-5.5L4.5 10 10 8z" strokeLinejoin="round" />
      <path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5L15 18l2.6-.9z" strokeLinejoin="round" />
    </svg>
  );
}

export function PartialIcon({ className = "" }: IconProps) {
  /* A clipboard, half ticked - work already started, work still to do. */
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.1} className={`${base} ${className}`}>
      <path
        d="M8 4.5H6.5A1.5 1.5 0 0 0 5 6v13a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19V6a1.5 1.5 0 0 0-1.5-1.5H16"
        strokeLinejoin="round"
      />
      <rect x="8" y="2.5" width="8" height="3.5" rx="1" />
      <path d="m8.5 12 1.6 1.6L13.5 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 17h7" strokeLinecap="round" />
    </svg>
  );
}

export function DayOfIcon({ className = "" }: IconProps) {
  /* A clock - the day itself, run to the minute. */
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.1} className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SourcingIcon({ className = "" }: IconProps) {
  /* A magnifier over a venue - searching, comparing, negotiating. */
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.1} className={`${base} ${className}`}>
      <path d="M3 20h11" strokeLinecap="round" />
      <path d="M4.5 20V9.5L11 5l4 2.8" strokeLinejoin="round" />
      <path d="M7.5 20v-4.5h3V20" strokeLinejoin="round" />
      <circle cx="17" cy="12.5" r="4" />
      <path d="m20 15.6 2.2 2.2" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`h-full w-full fill-current ${className}`}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.83 9.83 0 0 0 4.69 1.19h.01c5.43 0 9.86-4.43 9.86-9.87 0-2.64-1.02-5.12-2.89-6.98A9.8 9.8 0 0 0 12.04 2zm0 18.05a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.18-8.21 8.18z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.3} className={`${base} ${className}`}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" className="fill-current" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.3} className={`${base} ${className}`}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6.5 9 6.5 9-6.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.3} className={`${base} ${className}`}>
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Maps a service's `icon` field to the matching component. */
export const serviceIcons = {
  planning: PlanningIcon,
  partial: PartialIcon,
  dayof: DayOfIcon,
  sourcing: SourcingIcon,
} as const;

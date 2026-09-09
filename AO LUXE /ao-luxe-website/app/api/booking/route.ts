/**
 * POST /api/booking
 *
 * Receives the booking form, checks the details are complete, and
 * emails them to the address set in /lib/site.ts.
 *
 * Returns { ok: true } on success, or { ok: false, error } on failure
 * so the form can show a helpful message.
 */

import { NextResponse } from "next/server";
import { emailTemplate, sendMail, textTemplate } from "@/lib/mail";
import { serviceById } from "@/lib/services";

// Always run fresh - never cache a form submission.
export const dynamic = "force-dynamic";

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  services?: string[];
  eventDate?: string;
  guestCount?: string | number;
  location?: string;
  notes?: string;
  /** Hidden anti-spam field - real people never fill this in. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: BookingPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that request." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept spam bots so they don't retry.
  if (data.company) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const eventType = (data.eventType ?? "").trim();
  const chosen = Array.isArray(data.services) ? data.services : [];

  // Server-side validation - the browser checks are for convenience only.
  const problems: string[] = [];
  if (name.length < 2) problems.push("your full name");
  if (!EMAIL_RE.test(email)) problems.push("a valid email address");
  if (phone.replace(/\D/g, "").length < 10) problems.push("a valid phone number");
  if (!eventType) problems.push("the event type");
  if (chosen.length === 0) problems.push("at least one service");

  if (problems.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Please provide ${problems.join(", ")}.` },
      { status: 400 },
    );
  }

  // Turn service ids into their readable titles for the email.
  const serviceTitles = chosen
    .map((id) => serviceById(id)?.title ?? id)
    .join(", ");

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Event type", eventType],
    ["Services", serviceTitles],
    ["Event date", (data.eventDate ?? "").toString().trim() || "Not given"],
    ["Guests", (data.guestCount ?? "").toString().trim() || "Not given"],
    ["Location", (data.location ?? "").trim() || "Not given"],
    ["Notes", (data.notes ?? "").trim() || "None given"],
  ];

  const subject = `New booking request: ${eventType}, ${name}`;

  const result = await sendMail({
    subject,
    html: emailTemplate("New booking request", rows),
    text: textTemplate("New booking request", rows),
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

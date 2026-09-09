/**
 * POST /api/contact
 *
 * The short message form on the contact page. Same idea as the
 * booking route, with fewer fields.
 */

import { NextResponse } from "next/server";
import { emailTemplate, sendMail, textTemplate } from "@/lib/mail";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: {
    name?: string;
    email?: string;
    message?: string;
    company?: string;
  };

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that request." },
      { status: 400 },
    );
  }

  // Honeypot - see the booking route.
  if (data.company) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  const problems: string[] = [];
  if (name.length < 2) problems.push("your name");
  if (!EMAIL_RE.test(email)) problems.push("a valid email address");
  if (message.length < 5) problems.push("a message");

  if (problems.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Please provide ${problems.join(", ")}.` },
      { status: 400 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Message", message],
  ];

  const result = await sendMail({
    subject: `Website enquiry: ${name}`,
    html: emailTemplate("Website enquiry", rows),
    text: textTemplate("Website enquiry", rows),
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

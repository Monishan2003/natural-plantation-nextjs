import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase/public";
import { contactSchema } from "@/lib/validation";

// Very small in-memory rate limiter (per server instance). Enough to blunt
// casual spam; pair with the honeypot. For scale, move to Upstash/Turnstile.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const { website, phone, organisation, subject, ...rest } = parsed.data;

  // Honeypot tripped — pretend success, write nothing.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabasePublic.from("contact_submissions").insert({
    type: "contact",
    name: rest.name,
    email: rest.email,
    message: rest.message,
    phone: phone || null,
    organisation: organisation || null,
    subject: subject || null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

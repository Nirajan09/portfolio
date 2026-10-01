import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";

const MAX_BODY_CHARS = 10_000;

const fail = (message: string, status: number, init?: ResponseInit) =>
  NextResponse.json({ ok: false, message }, { status, ...init });

export async function POST(request: Request) {
  // 1. Same-origin requests only.
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).host : null;
  } catch {
    originHost = null;
  }
  if (!originHost || originHost !== host) {
    return fail("Request not allowed.", 403);
  }

  // 2. Rate limit per client IP.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return fail("Too many messages. Please try again later.", 429, {
      headers: { "Retry-After": String(limit.retryAfter) },
    });
  }

  // 3. Parse a size-limited JSON body.
  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) return fail("Message is too large.", 413);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return fail("Invalid request.", 400);
  }

  // 4. Honeypot: real visitors never see or fill this field. Pretend success.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as Record<string, unknown>).website === "string" &&
    (body as Record<string, string>).website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  // 5. Server-side validation (never trust the client check).
  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: result.errors },
      { status: 400 },
    );
  }

  // 6. Deliver.
  const sent = await sendContactEmail(result.data);
  if (sent.status === "sent") return NextResponse.json({ ok: true });
  if (sent.status === "not-configured") {
    return fail("The contact form isn't available right now.", 503);
  }
  return fail("Your message couldn't be sent. Please try again.", 502);
}
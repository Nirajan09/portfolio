import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";

const MAX_BODY_CHARS = 10_000;
const MIN_HUMAN_COMPLETION_TIME_MS = 1_500; // Bots submit in < 1.5 seconds

const fail = (message: string, status: number, init?: ResponseInit) =>
  NextResponse.json(
    { ok: false, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        ...(init?.headers ?? {}),
      },
    },
  );

export async function POST(request: Request) {
  // 1. Content-Type check (Blocks simple HTML form CSRF attacks)
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return fail("Invalid content type.", 415);
  }

  // 2. Same-origin & CSRF validation
  const fetchSite = request.headers.get("sec-fetch-site");
  let sameOrigin = fetchSite === "same-origin";
  if (!fetchSite) {
    const origin = request.headers.get("origin");
    const host =
      request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    try {
      sameOrigin = Boolean(origin) && new URL(origin as string).host === host;
    } catch {
      sameOrigin = false;
    }
  }
  if (!sameOrigin) return fail("Request not allowed.", 403);

  // 3. Multi-proxy client IP resolution & Rate limiting
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return fail("Too many messages. Please try again later.", 429, {
      headers: { "Retry-After": String(limit.retryAfter) },
    });
  }

  // 4. Payload size limit (Prevents memory exhaustion / DoS)
  const text = await request.text();
  if (text.length > MAX_BODY_CHARS) {
    return fail("Message payload is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return fail("Invalid request JSON.", 400);
  }

  const rawObj =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  // 5. Bot Trap A: Honeypot field (hidden from real users)
  if (typeof rawObj.website === "string" && rawObj.website.trim() !== "") {
    // Return silent success to trick the bot into not retrying
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  // 6. Bot Trap B: Machine speed check (Humans take >= 1.5s to fill a form)
  if (
    typeof rawObj.timeTakenMs === "number" &&
    rawObj.timeTakenMs < MIN_HUMAN_COMPLETION_TIME_MS
  ) {
    // Silent success
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  // 7. Server-side validation & CRLF sanitization (never trust client)
  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: result.errors,
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // 8. Secure Delivery Layer
  // A. Server-side provider: Resend (if configured)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const sent = await sendContactEmail(result.data);
    if (sent.status === "sent") {
      return NextResponse.json(
        { ok: true, provider: "resend" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    const errorMessage =
      "error" in sent && sent.error
        ? sent.error
        : "Your message couldn't be sent. Please try again.";
    return fail(errorMessage, 502);
  }

  // B. Client-side provider: Web3Forms free tier
  // Web3Forms free tier rejects server-side Node.js IPs with 403 Forbidden.
  // We return the validated access key and sanitized data so the client browser dispatches directly.
  const web3FormsKey =
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (web3FormsKey) {
    return NextResponse.json(
      {
        ok: true,
        provider: "web3forms",
        accessKey: web3FormsKey,
        sanitizedData: result.data,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  return fail("The contact form is temporarily unavailable.", 503);
}
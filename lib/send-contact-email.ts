import "server-only";
import type { ContactInput } from "./contact";

export type SendResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "failed" };

/**
 * Sends the message through Resend's HTTP API. Credentials come from
 * server-only environment variables and never reach the client bundle.
 */
export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { status: "not-configured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Contact email rejected by provider:", response.status);
      return { status: "failed" };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("Contact email request failed:", error);
    return { status: "failed" };
  }
}
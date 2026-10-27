import "server-only";
import type { ContactInput } from "./contact";

export type SendResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "failed" };

/**
 * Sends the message through Web3Forms API (or Resend if configured).
 * Credentials are kept on the server route and verified before sending.
 */
export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (web3FormsKey) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: data.name,
          email: data.email,
          subject: `[Portfolio Contact] ${data.subject.replace(/[\r\n]+/g, " ")}`,
          message: data.message,
          from_name: data.name,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      const resData = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (response.ok && resData?.success) {
        return { status: "sent" };
      }

      console.error("Web3Forms error response:", resData);
      return { status: "failed" };
    } catch (error) {
      console.error("Web3Forms request failed:", error);
      return { status: "failed" };
    }
  }

  // Fallback to Resend if configured
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
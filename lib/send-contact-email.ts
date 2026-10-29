import "server-only";
import type { ContactInput } from "./contact";

export type SendResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "failed"; error?: string };

const sanitizeHeader = (str: string) => str.replace(/[\r\n\t]+/g, " ").trim();
const sanitizeEmail = (str: string) => str.replace(/[\r\n\t\s]+/g, "").trim();

/**
 * Sends the message through Web3Forms API (or Resend if configured).
 * Credentials are kept on the server route and verified before sending.
 */
export async function sendContactEmail(data: ContactInput): Promise<SendResult> {
  const cleanName = sanitizeHeader(data.name);
  const cleanEmail = sanitizeEmail(data.email);
  const cleanSubject = sanitizeHeader(data.subject);

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
          name: cleanName,
          email: cleanEmail,
          subject: `[Portfolio Contact] ${cleanSubject}`,
          message: data.message,
          from_name: cleanName,
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

      const errorMessage =
        resData?.message ||
        (response.status
          ? `Web3Forms returned status ${response.status}`
          : "Web3Forms submission failed");

      console.error("Web3Forms error response:", {
        status: response.status,
        statusText: response.statusText,
        data: resData,
      });

      return { status: "failed", error: errorMessage };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Network error contacting email service";
      console.error("Web3Forms request failed:", error);
      return { status: "failed", error: message };
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
        reply_to: cleanEmail,
        subject: `[Portfolio] ${cleanSubject}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const errData = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      const errorMsg =
        errData?.message || `Resend returned status ${response.status}`;
      console.error("Contact email rejected by Resend:", response.status, errData);
      return { status: "failed", error: errorMsg };
    }
    return { status: "sent" };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to connect to email provider";
    console.error("Contact email request failed:", error);
    return { status: "failed", error: message };
  }
}
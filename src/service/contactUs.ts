import { mailer } from "../config/mailTrransporter.js";
import { BadRequestError } from "../utils/AppError.js";

type ContactUsInput = {
  fullName: string;
  email: string;
  message: string;
};

export async function sendContactUsEmail(input: ContactUsInput) {
  const fullName = String(input.fullName ?? "").trim();
  const email = String(input.email ?? "").trim();
  const message = String(input.message ?? "").trim();

  if (!fullName) throw new BadRequestError("Full name is required");
  if (!email || !email.includes("@")) throw new BadRequestError("Valid email is required");
  if (!message) throw new BadRequestError("Message is required");

  const to = process.env.MAIL_TO || process.env.MAIL_USER;
  if (!to) throw new Error("MAIL_TO (or MAIL_USER) is required");

  const fromEmail = process.env.MAIL_USER;
  const fromName = process.env.MAIL_FROM_NAME || "Contact Form";

  await mailer.sendMail({
    to,
    from: fromEmail ? `"${fromName}" <${fromEmail}>` : undefined,
    replyTo: email,
    subject: `Contact Us: ${fullName}`,
    text: `Full Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    html: `
      <h3>New Contact Us Message</h3>
      <p><b>Full Name:</b> ${escapeHtml(fullName)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Message:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  return { ok: true };
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
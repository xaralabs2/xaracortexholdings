import { Router, type IRouter } from "express";
import { getResend } from "../lib/resend";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const TO_EMAIL = "gabod2000@yahoo.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/contact", async (req, res) => {
  const { fullName, email, company, subject, message } = (req.body ?? {}) as Record<string, unknown>;

  const fullNameStr = typeof fullName === "string" ? fullName.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const companyStr = typeof company === "string" ? company.trim() : "";
  const subjectStr = typeof subject === "string" ? subject.trim() : "";
  const messageStr = typeof message === "string" ? message.trim() : "";

  if (!fullNameStr || !emailStr || !subjectStr || !messageStr) {
    res.status(400).json({ ok: false, error: "Missing required fields." });
    return;
  }

  if (!isValidEmail(emailStr)) {
    res.status(400).json({ ok: false, error: "Invalid email address." });
    return;
  }

  if (fullNameStr.length > 200 || subjectStr.length > 300 || messageStr.length > 5000 || companyStr.length > 200) {
    res.status(400).json({ ok: false, error: "Field length exceeded." });
    return;
  }

  try {
    const { client, fromEmail } = await getResend();

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#0E1A33; max-width:560px;">
        <h2 style="margin:0 0 16px;">New contact form submission</h2>
        <p style="margin:0 0 24px; color:#475569;">Sent from the XARA CORTEX HOLDINGS INC. website.</p>
        <table cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:8px 0; color:#64748b; width:120px;">Name</td><td style="padding:8px 0;"><strong>${escapeHtml(fullNameStr)}</strong></td></tr>
          <tr><td style="padding:8px 0; color:#64748b;">Email</td><td style="padding:8px 0;">${escapeHtml(emailStr)}</td></tr>
          ${companyStr ? `<tr><td style="padding:8px 0; color:#64748b;">Company</td><td style="padding:8px 0;">${escapeHtml(companyStr)}</td></tr>` : ""}
          <tr><td style="padding:8px 0; color:#64748b;">Subject</td><td style="padding:8px 0;">${escapeHtml(subjectStr)}</td></tr>
        </table>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;" />
        <p style="white-space:pre-wrap; line-height:1.6; margin:0; font-size:14px;">${escapeHtml(messageStr)}</p>
      </div>
    `;

    const text = `New contact form submission

Name: ${fullNameStr}
Email: ${emailStr}
${companyStr ? `Company: ${companyStr}\n` : ""}Subject: ${subjectStr}

${messageStr}
`;

    const result = await client.emails.send({
      from: `XARA CORTEX Website <${fromEmail}>`,
      to: [TO_EMAIL],
      replyTo: emailStr,
      subject: `[XARA CORTEX] ${subjectStr}`,
      html,
      text,
    });

    if (result.error) {
      logger.error({ err: result.error }, "Resend send failed");
      res.status(502).json({ ok: false, error: "Email delivery failed." });
      return;
    }

    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Contact form error");
    res.status(500).json({ ok: false, error: "Internal error." });
  }
});

export default router;

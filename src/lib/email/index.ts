import nodemailer from "nodemailer";
import { logEmailPending, logEmailSent, logEmailFailed } from "./logger";

// Email configuration
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || "bookings@snowafricaadventure.com";
const FROM_NAME = process.env.SMTP_FROM_NAME || "Snow Africa Adventure";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "info@snowafricaadventure.com";

// Lazy initialize SMTP transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    // For cPanel, prepend 'mail.' if not already present
    let host = process.env.SMTP_HOST || "";
    if (host && !host.startsWith("mail.") && !host.includes(":")) {
      host = `mail.${host}`;
    }

    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      throw new Error("SMTP configuration is incomplete. Set SMTP_HOST, SMTP_USER, and SMTP_PASS");
    }

    console.log(`[Email] Initializing SMTP transporter: ${host}:${port} (user: ${user})`);

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
      // cPanel shared hosting: SSL cert may not match domain
      // This is needed when cert is for *.web-hosting.com but we connect to mail.yourdomain.com
      tls: {
        rejectUnauthorized: false,
      },
      // Add timeout settings for better error handling
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 30000,
      // Debug mode in development
      debug: process.env.NODE_ENV === "development",
      logger: process.env.NODE_ENV === "development",
    });
  }
  return transporter;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Send an email using SMTP (cPanel/Nodemailer)
 */
export async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  const recipient = Array.isArray(options.to) ? options.to.join(", ") : options.to;

  // Log email as pending
  const logResult = await logEmailPending({
    recipient,
    subject: options.subject,
    type: options.subject.includes("Booking") ? "booking" :
          options.subject.includes("Inquiry") ? "inquiry" :
          options.subject.includes("Admin") ? "admin" : "general",
    metadata: { replyTo: options.replyTo },
  });

  try {
    console.log(`[Email] Sending to: ${recipient}`);
    console.log(`[Email] Subject: ${options.subject}`);
    console.log(`[Email] From: "${FROM_NAME}" <${FROM_EMAIL}>`);

    const transport = getTransporter();

    // Verify connection before sending (only in development)
    if (process.env.NODE_ENV === "development") {
      try {
        await transport.verify();
        console.log("[Email] SMTP connection verified successfully");
      } catch (verifyError) {
        console.error("[Email] SMTP verification failed:", verifyError);
      }
    }

    const info = await transport.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: recipient,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || NOTIFICATION_EMAIL,
    });

    console.log(`[Email] Sent successfully! Message ID: ${info.messageId}`);

    // Update log to sent
    if (logResult.logId) {
      await logEmailSent(logResult.logId, info.messageId);
    }

    return { success: true, id: info.messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Email] Send failed:", errorMessage);
    console.error("[Email] Full error:", error);

    // Update log to failed
    if (logResult.logId) {
      await logEmailFailed(logResult.logId, errorMessage);
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Send notification email to admin
 */
export async function sendAdminNotification(
  subject: string,
  html: string
): Promise<EmailResult> {
  return sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: `[Snow Africa Admin] ${subject}`,
    html,
  });
}

/**
 * Verify SMTP connection is working
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; error?: string; config?: object }> {
  try {
    let host = process.env.SMTP_HOST || "";
    if (host && !host.startsWith("mail.") && !host.includes(":")) {
      host = `mail.${host}`;
    }

    const config = {
      host,
      port: parseInt(process.env.SMTP_PORT || "465"),
      user: process.env.SMTP_USER,
      fromEmail: FROM_EMAIL,
      fromName: FROM_NAME,
      notificationEmail: NOTIFICATION_EMAIL,
    };

    console.log("[Email] Verifying SMTP configuration:", config);

    const transport = getTransporter();
    await transport.verify();

    console.log("[Email] SMTP connection verified successfully!");
    return { success: true, config };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Email] SMTP verification failed:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send a test email to verify the system is working
 */
export async function sendTestEmail(to: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject: `Test Email - ${new Date().toISOString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2d5016;">Snow Africa Adventure - Email Test</h1>
        <p>This is a test email to verify the email system is working correctly.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> ${FROM_NAME} &lt;${FROM_EMAIL}&gt;</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          If you received this email, the SMTP configuration is working correctly.
        </p>
      </div>
    `,
  });
}

// Re-export templates
export * from "./templates";

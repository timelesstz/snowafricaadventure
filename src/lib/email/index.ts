import nodemailer from "nodemailer";

// Email configuration
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || "bookings@snowafricaadventure.com";
const FROM_NAME = process.env.SMTP_FROM_NAME || "Snow Africa Adventure";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "info@snowafricaadventure.com";

// Lazy initialize SMTP transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "465");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      throw new Error("SMTP configuration is incomplete. Set SMTP_HOST, SMTP_USER, and SMTP_PASS");
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
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
  try {
    const transport = getTransporter();

    const info = await transport.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || NOTIFICATION_EMAIL,
    });

    return { success: true, id: info.messageId };
  } catch (error) {
    console.error("Email send exception:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
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

// Re-export templates
export * from "./templates";

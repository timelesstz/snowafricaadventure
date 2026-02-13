import { config } from "dotenv";
config({ path: ".env.local" });

import nodemailer from "nodemailer";

async function testSmtp() {
  console.log("=".repeat(60));
  console.log("Snow Africa Adventure - SMTP Connection Test");
  console.log("=".repeat(60));
  console.log("");

  // Get config from env
  let host = process.env.SMTP_HOST || "";
  if (host && !host.startsWith("mail.") && !host.includes(":")) {
    host = `mail.${host}`;
  }

  const port = parseInt(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;
  const fromName = process.env.SMTP_FROM_NAME || "Snow Africa Adventure";
  const testRecipient = process.argv[2] || process.env.NOTIFICATION_EMAIL || user;

  console.log("Configuration:");
  console.log("-".repeat(40));
  console.log(`  Host: ${host}`);
  console.log(`  Port: ${port}`);
  console.log(`  User: ${user}`);
  console.log(`  From: "${fromName}" <${fromEmail}>`);
  console.log(`  Test Recipient: ${testRecipient}`);
  console.log("");

  if (!host || !user || !pass) {
    console.error("❌ Missing SMTP configuration!");
    console.error("   Please set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local");
    process.exit(1);
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    // cPanel shared hosting: SSL cert often doesn't match custom domain
    // Cert is for *.web-hosting.com but we connect to mail.yourdomain.com
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    debug: true,
    logger: true,
  });

  // Step 1: Verify connection
  console.log("Step 1: Verifying SMTP connection...");
  console.log("-".repeat(40));

  try {
    await transporter.verify();
    console.log("\n✅ SMTP connection verified!\n");
  } catch (error) {
    console.error("\n❌ SMTP verification FAILED!");
    console.error(`   Error: ${error instanceof Error ? error.message : error}`);
    console.log("\nCommon fixes:");
    console.log("  1. Check if host should be 'mail.snowafricaadventure.com'");
    console.log("  2. Verify username/password in cPanel email settings");
    console.log("  3. Try port 587 instead of 465");
    console.log("  4. Check if cPanel email account is active");
    process.exit(1);
  }

  // Step 2: Send test email
  console.log(`Step 2: Sending test email to ${testRecipient}...`);
  console.log("-".repeat(40));

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: testRecipient,
      subject: `SMTP Test - ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2d5016;">Snow Africa Adventure</h1>
          <h2>Email System Test</h2>
          <p>This is a test email to verify SMTP is working correctly.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
          <p><strong>Host:</strong> ${host}:${port}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            If you received this email, your SMTP configuration is working!
          </p>
        </div>
      `,
    });

    console.log("\n✅ Test email sent successfully!");
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    console.log(`\n📬 Check ${testRecipient}'s inbox (and spam folder)!`);
  } catch (error) {
    console.error("\n❌ Failed to send test email!");
    console.error(`   Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }

  console.log("");
  console.log("=".repeat(60));
}

testSmtp();

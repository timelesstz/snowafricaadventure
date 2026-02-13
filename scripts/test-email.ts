import { config } from "dotenv";
config({ path: ".env.local" });

import { sendTestEmail, verifySmtpConnection } from "../src/lib/email/index";

async function testEmail() {
  const testRecipient = process.argv[2] || "admin@snowafricaadventure.com";

  console.log("=".repeat(60));
  console.log("Snow Africa Adventure - Email System Test");
  console.log("=".repeat(60));
  console.log("");

  // Step 1: Verify SMTP connection
  console.log("Step 1: Verifying SMTP connection...");
  console.log("-".repeat(40));

  const verifyResult = await verifySmtpConnection();

  if (!verifyResult.success) {
    console.error("\n❌ SMTP connection FAILED!");
    console.error(`Error: ${verifyResult.error}`);
    console.log("\nPlease check your SMTP settings in .env.local:");
    console.log("  SMTP_HOST=mail.snowafricaadventure.com");
    console.log("  SMTP_PORT=465");
    console.log("  SMTP_USER=<your-email>");
    console.log("  SMTP_PASS=<your-password>");
    process.exit(1);
  }

  console.log("\n✅ SMTP connection verified!");
  console.log("Configuration:", JSON.stringify(verifyResult.config, null, 2));
  console.log("");

  // Step 2: Send test email
  console.log(`Step 2: Sending test email to ${testRecipient}...`);
  console.log("-".repeat(40));

  try {
    const result = await sendTestEmail(testRecipient);

    if (result.success) {
      console.log("\n✅ Test email sent successfully!");
      console.log(`Message ID: ${result.id}`);
      console.log(`\nPlease check ${testRecipient} inbox (and spam folder).`);
    } else {
      console.error("\n❌ Failed to send test email!");
      console.error(`Error: ${result.error}`);
    }

    console.log("");
    console.log("=".repeat(60));
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error("\n❌ Exception while sending email:");
    console.error(error);
    process.exit(1);
  }
}

testEmail();

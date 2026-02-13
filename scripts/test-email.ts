import { config } from "dotenv";
config({ path: ".env.local" });

import { sendEmail } from "../src/lib/email/index";

async function testEmail() {
  console.log("Sending test email to info@snowafricaadventure.com...");
  
  try {
    const result = await sendEmail({
      to: "info@snowafricaadventure.com",
      subject: "Test Email - " + new Date().toISOString(),
      html: "<h1>Test Email</h1><p>This is a test email from Snow Africa Adventure system.</p><p>Sent at: " + new Date().toISOString() + "</p>"
    });
    
    console.log("Result:", JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

testEmail();

import { config } from "dotenv";
config({ path: ".env.local" });

async function testInquiryForm() {
  console.log("Testing Inquiry Form Submission...");
  console.log("=".repeat(50));

  const testData = {
    fullName: "Test User",
    email: "timelesstz@gmail.com",
    phone: "123456789",
    type: "contact",
    additionalInfo: "Testing email integration from form submission",
  };

  console.log("Test data:", JSON.stringify(testData, null, 2));
  console.log("");

  try {
    const response = await fetch("http://localhost:3000/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("Response status:", response.status);
    console.log("Response:", JSON.stringify(result, null, 2));

    if (result.success) {
      console.log("\n✅ Form submission successful!");
      console.log("Check timelesstz@gmail.com for customer confirmation email");
      console.log("Check info@snowafricaadventure.com for admin notification email");
    } else {
      console.error("\n❌ Form submission failed!");
      console.error("Error:", result.message);
    }
  } catch (error) {
    console.error("\n❌ Request failed:");
    console.error(error);
  }
}

testInquiryForm();

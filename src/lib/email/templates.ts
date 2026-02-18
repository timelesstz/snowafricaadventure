/**
 * Email templates for Snow Africa Adventure notifications
 */

// Base email layout
function baseLayout(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snow Africa Adventure</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f1f5f9; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #1e293b; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .header p { margin: 8px 0 0; opacity: 0.8; font-size: 14px; }
    .content { padding: 32px 24px; }
    .footer { background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { margin: 0; font-size: 12px; color: #64748b; }
    .button { display: inline-block; padding: 12px 24px; background-color: #f59e0b; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0; }
    .button:hover { background-color: #d97706; }
    .info-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-weight: 600; color: #64748b; }
    .info-value { color: #1e293b; }
    .highlight { background-color: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 16px 0; }
    .status-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .status-confirmed { background-color: #dcfce7; color: #166534; }
    .status-pending { background-color: #fef9c3; color: #854d0e; }
    .status-inquiry { background-color: #dbeafe; color: #1e40af; }
    h2 { color: #1e293b; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Snow Africa Adventure</h1>
      <p>Kilimanjaro & Tanzania Safari Experts</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Snow Africa Adventure Ltd.</p>
      <p>Arusha, Tanzania | +255 766 657 854</p>
      <p>info@snowafricaadventure.com | www.snowafricaadventure.com</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ============================================
// BOOKING EMAIL TEMPLATES
// ============================================

export interface BookingEmailData {
  bookingId: string;
  leadName: string;
  leadEmail: string;
  routeTitle: string;
  departureDate: string;
  summitDate: string;
  totalClimbers: number;
  totalPrice: number;
  depositAmount: number;
  status: string;
  climbers?: Array<{ name: string; nationality?: string }>;
}

/**
 * Booking inquiry received (sent to customer)
 */
export function bookingInquiryReceived(data: BookingEmailData): string {
  return baseLayout(`
    <h2>Thank You for Your Booking Inquiry!</h2>
    <p>Dear ${data.leadName},</p>
    <p>We have received your booking inquiry for climbing Mount Kilimanjaro. Our team will review your request and get back to you within 24 hours.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Booking Details</h3>
      <table>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeTitle}</td>
        </tr>
        <tr>
          <td class="info-label">Departure Date:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Summit Date:</td>
          <td class="info-value">${data.summitDate}</td>
        </tr>
        <tr>
          <td class="info-label">Group Size:</td>
          <td class="info-value">${data.totalClimbers} climber${data.totalClimbers !== 1 ? "s" : ""}</td>
        </tr>
        <tr>
          <td class="info-label">Total Price:</td>
          <td class="info-value"><strong>$${data.totalPrice.toLocaleString()}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Deposit Required:</td>
          <td class="info-value">$${data.depositAmount.toLocaleString()} (10%)</td>
        </tr>
      </table>
    </div>

    <div class="highlight">
      <strong>What happens next?</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px;">
        <li>Our team will verify availability for your selected date</li>
        <li>We'll send you a detailed itinerary and packing list</li>
        <li>You'll receive payment instructions for your deposit</li>
      </ul>
    </div>

    <p>If you have any questions in the meantime, feel free to reply to this email or contact us directly.</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

/**
 * Booking confirmed (sent to customer)
 */
export function bookingConfirmed(data: BookingEmailData): string {
  const climbersList = data.climbers
    ?.map((c, i) => `<li>${c.name}${c.nationality ? ` (${c.nationality})` : ""}</li>`)
    .join("") || "";

  return baseLayout(`
    <h2>Your Booking is Confirmed! <span class="status-badge status-confirmed">CONFIRMED</span></h2>
    <p>Dear ${data.leadName},</p>
    <p>Great news! Your Kilimanjaro climb has been confirmed. We're excited to have you join us for this incredible adventure!</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Confirmed Booking Details</h3>
      <table>
        <tr>
          <td class="info-label">Booking Reference:</td>
          <td class="info-value"><strong>${data.bookingId.slice(-8).toUpperCase()}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeTitle}</td>
        </tr>
        <tr>
          <td class="info-label">Departure Date:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Summit Date:</td>
          <td class="info-value">${data.summitDate}</td>
        </tr>
        <tr>
          <td class="info-label">Group Size:</td>
          <td class="info-value">${data.totalClimbers} climber${data.totalClimbers !== 1 ? "s" : ""}</td>
        </tr>
      </table>
      ${climbersList ? `<h4>Registered Climbers:</h4><ul>${climbersList}</ul>` : ""}
    </div>

    <div class="highlight">
      <strong>Important Next Steps:</strong>
      <ol style="margin: 8px 0 0; padding-left: 20px;">
        <li>Review your packing list (attached)</li>
        <li>Ensure all climbers have valid travel insurance</li>
        <li>Complete any required vaccinations</li>
        <li>Pay your balance 30 days before departure</li>
      </ol>
    </div>

    <p>We'll be in touch with more details as your departure date approaches. Get ready for the adventure of a lifetime!</p>
    <p>Asante sana (Thank you!),<br>The Snow Africa Adventure Team</p>
  `);
}

/**
 * Booking status update (sent to customer)
 */
export function bookingStatusUpdate(
  data: BookingEmailData,
  previousStatus: string,
  message?: string
): string {
  const statusMessages: Record<string, string> = {
    PENDING: "Your booking is being processed.",
    DEPOSIT_PAID: "We have received your deposit payment. Thank you!",
    CONFIRMED: "Your booking has been confirmed!",
    COMPLETED: "Your adventure has been completed. Thank you for climbing with us!",
    CANCELLED: "Your booking has been cancelled.",
  };

  return baseLayout(`
    <h2>Booking Status Update</h2>
    <p>Dear ${data.leadName},</p>
    <p>${statusMessages[data.status] || `Your booking status has been updated to: ${data.status}`}</p>

    <div class="info-box">
      <table>
        <tr>
          <td class="info-label">Booking Reference:</td>
          <td class="info-value">${data.bookingId.slice(-8).toUpperCase()}</td>
        </tr>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeTitle}</td>
        </tr>
        <tr>
          <td class="info-label">Previous Status:</td>
          <td class="info-value">${previousStatus}</td>
        </tr>
        <tr>
          <td class="info-label">New Status:</td>
          <td class="info-value"><strong>${data.status}</strong></td>
        </tr>
      </table>
    </div>

    ${message ? `<div class="highlight"><strong>Note from our team:</strong><br>${message}</div>` : ""}

    <p>If you have any questions about this update, please don't hesitate to contact us.</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

/**
 * Payment reminder (sent to customer)
 */
export function paymentReminder(
  data: BookingEmailData,
  dueDate: string,
  amountDue: number,
  isDeposit: boolean
): string {
  return baseLayout(`
    <h2>${isDeposit ? "Deposit" : "Balance"} Payment Reminder</h2>
    <p>Dear ${data.leadName},</p>
    <p>This is a friendly reminder that your ${isDeposit ? "deposit" : "balance"} payment for your Kilimanjaro climb is due soon.</p>

    <div class="info-box">
      <table>
        <tr>
          <td class="info-label">Booking Reference:</td>
          <td class="info-value">${data.bookingId.slice(-8).toUpperCase()}</td>
        </tr>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeTitle}</td>
        </tr>
        <tr>
          <td class="info-label">Departure Date:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Amount Due:</td>
          <td class="info-value"><strong>$${amountDue.toLocaleString()}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Due Date:</td>
          <td class="info-value"><strong>${dueDate}</strong></td>
        </tr>
      </table>
    </div>

    <p>To make your payment, please reply to this email and we'll send you the payment details.</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

// ============================================
// INQUIRY EMAIL TEMPLATES
// ============================================

export interface InquiryEmailData {
  inquiryId: string;
  fullName: string;
  email: string;
  phone?: string;
  type: string;
  tripType?: string;
  numAdults?: number;
  numChildren?: number;
  arrivalDate?: string;
  message?: string;
  nationality?: string;
  referralSource?: string;
}

/**
 * Inquiry received (sent to customer) - Beautiful, informative HTML email
 */
export function inquiryReceived(data: InquiryEmailData): string {
  const typeLabels: Record<string, string> = {
    safari: "Safari Adventure",
    trekking: "Kilimanjaro Trekking",
    group: "Group Departure",
    custom: "Custom Trip",
    contact: "General Inquiry",
    general: "General Inquiry",
    "tailor-made": "Tailor-Made Safari",
    zanzibar: "Zanzibar Beach Holiday",
    "Wildlife Safari": "Wildlife Safari",
    Kilimanjaro: "Kilimanjaro Trekking",
    Safari: "Safari Adventure",
    Zanzibar: "Zanzibar Beach Holiday",
    "Day Trip": "Day Trip Experience",
    "Zanzibar Beach": "Zanzibar Beach Holiday",
    "Wildlife Safari + Zanzibar Beach": "Safari & Zanzibar",
    Customized: "Tailor-Made Safari",
  };

  const tripLabel = data.tripType ? typeLabels[data.tripType] || data.tripType : typeLabels[data.type] || data.type;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Inquiry - Snow Africa Adventure</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #78350f 100%); padding: 40px 40px 50px; text-align: center;">
              <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Snow Africa Adventure</h1>
              <p style="margin: 0; font-size: 14px; color: #fbbf24; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">Tanzania Safari & Kilimanjaro Experts</p>
            </td>
          </tr>

          <!-- Success icon -->
          <tr>
            <td align="center" style="padding: 0;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin-top: -40px; display: inline-block; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">
                <table role="presentation" width="80" height="80" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" valign="middle">
                      <span style="font-size: 36px; line-height: 1;">&#10003;</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 700; color: #1e293b; text-align: center;">Thank You, ${data.fullName}!</h2>
              <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6; text-align: center;">
                We've received your inquiry and our team is excited to help you plan your ${tripLabel}. Expect a personalized response within <strong>24 hours</strong>.
              </p>
            </td>
          </tr>

          <!-- Inquiry summary box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border-radius: 12px; border: 1px solid #fbbf24;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 1px;">
                      Your Inquiry Summary
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d;">
                          <span style="font-size: 13px; color: #78350f; font-weight: 600;">Reference ID</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d; text-align: right;">
                          <span style="font-size: 14px; color: #1e293b; font-weight: 700; font-family: monospace;">${data.inquiryId.slice(-8).toUpperCase()}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d;">
                          <span style="font-size: 13px; color: #78350f; font-weight: 600;">Trip Type</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d; text-align: right;">
                          <span style="font-size: 14px; color: #1e293b; font-weight: 600;">${tripLabel}</span>
                        </td>
                      </tr>
                      ${data.arrivalDate ? `
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d;">
                          <span style="font-size: 13px; color: #78350f; font-weight: 600;">Preferred Date</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d; text-align: right;">
                          <span style="font-size: 14px; color: #1e293b; font-weight: 600;">${data.arrivalDate}</span>
                        </td>
                      </tr>
                      ` : ""}
                      ${data.numAdults ? `
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d;">
                          <span style="font-size: 13px; color: #78350f; font-weight: 600;">Travelers</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #fcd34d; text-align: right;">
                          <span style="font-size: 14px; color: #1e293b; font-weight: 600;">${data.numAdults} Adult${data.numAdults > 1 ? "s" : ""}${data.numChildren ? `, ${data.numChildren} Child${data.numChildren > 1 ? "ren" : ""}` : ""}</span>
                        </td>
                      </tr>
                      ` : ""}
                      ${data.nationality ? `
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-size: 13px; color: #78350f; font-weight: 600;">Country</span>
                        </td>
                        <td style="padding: 8px 0; text-align: right;">
                          <span style="font-size: 14px; color: #1e293b; font-weight: 600;">${data.nationality}</span>
                        </td>
                      </tr>
                      ` : ""}
                    </table>
                    ${data.message ? `
                    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #fcd34d;">
                      <p style="margin: 0 0 8px; font-size: 13px; color: #78350f; font-weight: 600;">Your Message:</p>
                      <p style="margin: 0; font-size: 14px; color: #1e293b; line-height: 1.5; font-style: italic;">"${data.message}"</p>
                    </div>
                    ` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 700; color: #1e293b;">What Happens Next?</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; color: #1d4ed8;">1</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 600;">Our experts review your request</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">We'll match you with the perfect itinerary</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; color: #1d4ed8;">2</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 600;">You'll receive a personalized proposal</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">With detailed itinerary, pricing & options</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 40px; vertical-align: top;">
                          <div style="width: 28px; height: 28px; background-color: #dbeafe; border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; color: #1d4ed8;">3</div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; font-size: 15px; color: #334155; font-weight: 600;">We'll refine until it's perfect</p>
                          <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">No commitment until you're 100% happy</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Why choose us -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1e293b; text-align: center;">Why 5,000+ Travelers Choose Us</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="33%" style="padding: 8px; text-align: center;">
                          <p style="margin: 0; font-size: 24px; font-weight: 700; color: #f59e0b;">95%</p>
                          <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Summit Success</p>
                        </td>
                        <td width="33%" style="padding: 8px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                          <p style="margin: 0; font-size: 24px; font-weight: 700; color: #f59e0b;">10+</p>
                          <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Years Experience</p>
                        </td>
                        <td width="33%" style="padding: 8px; text-align: center;">
                          <p style="margin: 0; font-size: 24px; font-weight: 700; color: #f59e0b;">5&#9733;</p>
                          <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">TripAdvisor Rating</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">Have a question? We're here to help!</p>
              <a href="https://wa.me/255766657854" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">Chat on WhatsApp</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #ffffff;">Snow Africa Adventure Ltd.</p>
              <p style="margin: 0 0 4px; font-size: 13px; color: #94a3b8;">Arusha, Tanzania</p>
              <p style="margin: 0 0 16px; font-size: 13px; color: #94a3b8;">+255 766 657 854 | info@snowafricaadventure.com</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                <a href="https://snowafricaadventure.com" style="color: #fbbf24; text-decoration: none;">Website</a> &nbsp;|&nbsp;
                <a href="https://www.instagram.com/snowafricaadventure/" style="color: #fbbf24; text-decoration: none;">Instagram</a> &nbsp;|&nbsp;
                <a href="https://www.facebook.com/snowafricaadventure/" style="color: #fbbf24; text-decoration: none;">Facebook</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Inquiry response (sent to customer by admin)
 */
export function inquiryResponse(
  data: InquiryEmailData,
  responseMessage: string,
  senderName: string
): string {
  return baseLayout(`
    <h2>Response to Your Inquiry</h2>
    <p>Dear ${data.fullName},</p>

    <div style="background:#f8fafc;padding:16px;border-radius:8px;border-left:4px solid #f59e0b;margin:16px 0;">
      ${responseMessage.replace(/\n/g, "<br>")}
    </div>

    <p>If you have any further questions, please don't hesitate to reply to this email.</p>
    <p>Best regards,<br>${senderName}<br>Snow Africa Adventure Team</p>
  `);
}

// ============================================
// ADMIN NOTIFICATION TEMPLATES
// ============================================

/**
 * New booking notification (sent to admin)
 */
export function adminNewBooking(data: BookingEmailData): string {
  return baseLayout(`
    <h2>New Booking Inquiry Received</h2>

    <div class="info-box">
      <h3 style="margin-top: 0;">Customer Details</h3>
      <table>
        <tr>
          <td class="info-label">Name:</td>
          <td class="info-value">${data.leadName}</td>
        </tr>
        <tr>
          <td class="info-label">Email:</td>
          <td class="info-value"><a href="mailto:${data.leadEmail}">${data.leadEmail}</a></td>
        </tr>
      </table>
    </div>

    <div class="info-box">
      <h3 style="margin-top: 0;">Booking Details</h3>
      <table>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeTitle}</td>
        </tr>
        <tr>
          <td class="info-label">Departure:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Summit:</td>
          <td class="info-value">${data.summitDate}</td>
        </tr>
        <tr>
          <td class="info-label">Climbers:</td>
          <td class="info-value">${data.totalClimbers}</td>
        </tr>
        <tr>
          <td class="info-label">Total Price:</td>
          <td class="info-value"><strong>$${data.totalPrice.toLocaleString()}</strong></td>
        </tr>
      </table>
    </div>

    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings/${data.bookingId}" class="button">View Booking in Admin</a>
  `);
}

// ============================================
// PARTNER COMMISSION TEMPLATES
// ============================================

export interface PartnerCommissionEmailData {
  partnerName: string;
  bookingId: string;
  leadName: string;
  routeTitle: string;
  departureDate: string;
  totalClimbers: number;
  bookingAmount: number;
  commissionRate: number;
  commissionAmount: number;
  tripType: string;
  totalPendingCommissions: number;
  totalPendingAmount: number;
}

/**
 * New commission notification (sent to partner)
 */
export function partnerNewCommission(data: PartnerCommissionEmailData): string {
  const tripTypeLabels: Record<string, string> = {
    kilimanjaro: "Kilimanjaro Climb",
    safari: "Safari Package",
    daytrip: "Day Trip",
    zanzibar: "Zanzibar Trip",
  };

  return baseLayout(`
    <h2>New Commission Earned!</h2>
    <p>Dear ${data.partnerName},</p>
    <p>Great news! A new booking has been made through the website, and you've earned a commission.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Commission Details</h3>
      <table>
        <tr>
          <td class="info-label">Trip Type:</td>
          <td class="info-value">${tripTypeLabels[data.tripType] || data.tripType}</td>
        </tr>
        <tr>
          <td class="info-label">Route/Package:</td>
          <td class="info-value">${data.routeTitle}</td>
        </tr>
        <tr>
          <td class="info-label">Departure Date:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Group Size:</td>
          <td class="info-value">${data.totalClimbers} person${data.totalClimbers !== 1 ? "s" : ""}</td>
        </tr>
        <tr>
          <td class="info-label">Booking Value:</td>
          <td class="info-value">$${data.bookingAmount.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="info-label">Commission Rate:</td>
          <td class="info-value">${data.commissionRate}%</td>
        </tr>
        <tr>
          <td class="info-label" style="font-size: 16px;">Commission Earned:</td>
          <td class="info-value" style="font-size: 18px; color: #16a34a;"><strong>$${data.commissionAmount.toLocaleString()}</strong></td>
        </tr>
      </table>
    </div>

    <div class="highlight">
      <strong>Your Current Balance</strong>
      <p style="margin: 8px 0 0;">
        You have <strong>${data.totalPendingCommissions} pending commission${data.totalPendingCommissions !== 1 ? "s" : ""}</strong>
        totaling <strong style="color: #16a34a;">$${data.totalPendingAmount.toLocaleString()}</strong>
      </p>
    </div>

    <p>This commission will be included in your next payout. Thank you for your partnership!</p>
    <p>Best regards,<br>Snow Africa Adventure Team</p>
  `);
}

/**
 * Monthly commission summary (sent to partner)
 */
export function partnerCommissionSummary(data: {
  partnerName: string;
  month: string;
  year: number;
  totalBookings: number;
  totalBookingValue: number;
  totalCommission: number;
  commissions: Array<{
    date: string;
    tripType: string;
    bookingAmount: number;
    commissionAmount: number;
  }>;
}): string {
  const commissionsTable = data.commissions.map(c => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${c.date}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${c.tripType}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">$${c.bookingAmount.toLocaleString()}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #16a34a; font-weight: 600;">$${c.commissionAmount.toLocaleString()}</td>
    </tr>
  `).join("");

  return baseLayout(`
    <h2>Monthly Commission Summary</h2>
    <p>Dear ${data.partnerName},</p>
    <p>Here's your commission summary for ${data.month} ${data.year}.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Summary</h3>
      <table>
        <tr>
          <td class="info-label">Period:</td>
          <td class="info-value">${data.month} ${data.year}</td>
        </tr>
        <tr>
          <td class="info-label">Total Bookings:</td>
          <td class="info-value">${data.totalBookings}</td>
        </tr>
        <tr>
          <td class="info-label">Total Booking Value:</td>
          <td class="info-value">$${data.totalBookingValue.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="info-label" style="font-size: 16px;">Total Commission:</td>
          <td class="info-value" style="font-size: 18px; color: #16a34a;"><strong>$${data.totalCommission.toLocaleString()}</strong></td>
        </tr>
      </table>
    </div>

    ${data.commissions.length > 0 ? `
    <h3>Commission Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f8fafc;">
          <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e2e8f0;">Date</th>
          <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e2e8f0;">Type</th>
          <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e2e8f0;">Booking</th>
          <th style="padding: 8px; text-align: left; border-bottom: 2px solid #e2e8f0;">Commission</th>
        </tr>
      </thead>
      <tbody>
        ${commissionsTable}
      </tbody>
    </table>
    ` : ""}

    <p style="margin-top: 24px;">Thank you for your continued partnership!</p>
    <p>Best regards,<br>Snow Africa Adventure Team</p>
  `);
}

/**
 * New inquiry notification (sent to admin)
 */
export function adminNewInquiry(data: InquiryEmailData): string {
  const typeLabels: Record<string, string> = {
    safari: "Safari",
    trekking: "Kilimanjaro Trekking",
    group: "Group Departure",
    custom: "Custom Trip",
    contact: "General Inquiry",
    general: "General Inquiry",
    "tailor-made": "Tailor-Made Safari",
    zanzibar: "Zanzibar",
    "Wildlife Safari": "Wildlife Safari",
  };

  return baseLayout(`
    <h2>New ${typeLabels[data.type] || data.type} Inquiry</h2>

    <div class="info-box">
      <h3 style="margin-top: 0;">Contact Details</h3>
      <table>
        <tr>
          <td class="info-label">Name:</td>
          <td class="info-value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="info-label">Email:</td>
          <td class="info-value"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        ${data.phone ? `<tr><td class="info-label">Phone:</td><td class="info-value">${data.phone}</td></tr>` : ""}
        ${data.nationality ? `<tr><td class="info-label">Nationality:</td><td class="info-value">${data.nationality}</td></tr>` : ""}
      </table>
    </div>

    <div class="info-box">
      <h3 style="margin-top: 0;">Inquiry Details</h3>
      <table>
        <tr>
          <td class="info-label">Type:</td>
          <td class="info-value">${typeLabels[data.type] || data.type}</td>
        </tr>
        ${data.tripType ? `<tr><td class="info-label">Trip:</td><td class="info-value">${data.tripType}</td></tr>` : ""}
        ${data.arrivalDate ? `<tr><td class="info-label">Preferred Date:</td><td class="info-value">${data.arrivalDate}</td></tr>` : ""}
        ${data.numAdults ? `<tr><td class="info-label">Adults:</td><td class="info-value">${data.numAdults}</td></tr>` : ""}
        ${data.numChildren ? `<tr><td class="info-label">Children:</td><td class="info-value">${data.numChildren}</td></tr>` : ""}
      </table>
      ${data.message ? `<h4>Message:</h4><p style="background:#f8fafc;padding:12px;border-radius:4px;">${data.message}</p>` : ""}
    </div>

    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/inquiries/${data.inquiryId}" class="button">View Inquiry in Admin</a>
  `);
}

// ============================================
// SOCIAL SHARING & INVITE TEMPLATES
// ============================================

export interface EmailShareTemplateData {
  message: string;
  shareUrl: string;
}

/**
 * Email share template (when users share via email)
 */
export function emailShareTemplate(data: EmailShareTemplateData): string {
  return baseLayout(`
    <h2>Someone Shared an Adventure With You!</h2>

    <div style="background:#f8fafc;padding:16px;border-radius:8px;border-left:4px solid #f59e0b;margin:16px 0;">
      ${data.message.replace(/\n/g, "<br>")}
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.shareUrl}" class="button">View Kilimanjaro Departures</a>
    </div>

    <div class="highlight">
      <strong>Why Climb With Snow Africa Adventure?</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px;">
        <li>95%+ Summit Success Rate</li>
        <li>Expert Local Guides (10+ years experience)</li>
        <li>Small Groups (max 10 climbers)</li>
        <li>All-Inclusive Packages</li>
      </ul>
    </div>

    <p>Start planning your Kilimanjaro adventure today!</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

export interface DepartureInviteData {
  inviterName: string;
  inviteeName?: string;
  personalMessage?: string;
  routeName: string;
  arrivalDate: string;
  endDate: string;
  price: number;
  availableSpots: number;
  isFullMoon?: boolean;
  inviteUrl: string;
}

// ============================================
// CLIMBER DETAILS COLLECTION TEMPLATES
// ============================================

export interface ClimberDetailsRequestData {
  type: "lead" | "individual";
  // For lead emails
  leadName: string;
  leadEmail?: string;
  routeName: string;
  departureDate: string;
  bookingRef?: string;
  totalClimbers?: number;
  tokens?: Array<{
    climberIndex: number;
    climberName: string | null;
    code: string;
  }>;
  // For individual emails
  recipientEmail?: string;
  recipientName?: string | null;
  token?: string;
}

export interface ClimberDetailsCompletedData {
  bookingRef: string;
  climberName: string;
  climberIndex: number;
  routeName: string;
  departureDate: string;
  totalClimbers: number;
  completedCount: number;
}

export interface ClimberDetailsReminderData {
  climberName: string | null;
  leadName: string;
  routeName: string;
  departureDate: string;
  token: string;
  daysRemaining: number;
  isUrgent: boolean;
}

/**
 * Departure invite email (when users invite friends to a specific departure)
 */
export function departureInvite(data: DepartureInviteData): string {
  const greeting = data.inviteeName
    ? `Dear ${data.inviteeName},`
    : "Hello!";

  return baseLayout(`
    <h2>You're Invited to Climb Kilimanjaro!</h2>
    <p>${greeting}</p>
    <p><strong>${data.inviterName}</strong> has invited you to join them on an incredible Kilimanjaro adventure with Snow Africa Adventure.</p>

    ${data.personalMessage ? `
    <div style="background:#fef3c7;padding:16px;border-radius:8px;border-left:4px solid #f59e0b;margin:16px 0;">
      <strong>Message from ${data.inviterName}:</strong>
      <p style="margin: 8px 0 0;">"${data.personalMessage}"</p>
    </div>
    ` : ""}

    <div class="info-box">
      <h3 style="margin-top: 0;">${data.isFullMoon ? "🌕 " : ""}${data.routeName}</h3>
      <table>
        <tr>
          <td class="info-label">Dates:</td>
          <td class="info-value">${data.arrivalDate} - ${data.endDate}</td>
        </tr>
        <tr>
          <td class="info-label">Price:</td>
          <td class="info-value"><strong>$${data.price.toLocaleString()}</strong> per person</td>
        </tr>
        <tr>
          <td class="info-label">Spots Left:</td>
          <td class="info-value">${data.availableSpots} ${data.availableSpots <= 3 ? '<span style="color:#dc2626;">(Filling Fast!)</span>' : ""}</td>
        </tr>
        ${data.isFullMoon ? `<tr><td class="info-label">Special:</td><td class="info-value">🌕 Full Moon Summit Experience</td></tr>` : ""}
      </table>
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${data.inviteUrl}" class="button">View This Departure & Book Your Spot</a>
    </div>

    <div class="highlight">
      <strong>Climb Together, Save Together!</strong>
      <p style="margin: 8px 0 0;">Join a scheduled group departure for the best rates and meet fellow adventurers from around the world.</p>
    </div>

    <p>Don't miss this opportunity to conquer Africa's highest peak with friends!</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

// ============================================
// CLIMBER DETAILS COLLECTION FUNCTIONS
// ============================================

/**
 * Climber details request email (sent to lead with all climber links)
 */
export function climberDetailsRequestToLead(data: ClimberDetailsRequestData): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snowafricaadventure.com";
  const manageUrl = `${baseUrl}/manage-climbers/${data.bookingRef}`;

  const climberLinks = data.tokens?.map((t) => {
    const name = t.climberName || `Climber ${t.climberIndex + 1}`;
    const url = `${baseUrl}/complete-details/${t.code}`;
    return `<li style="padding: 8px 0;"><strong>${name}:</strong><br><a href="${url}" style="color:#f59e0b;word-break:break-all;">${url}</a></li>`;
  }).join("") || "";

  return baseLayout(`
    <h2>Collect Your Group's Details</h2>
    <p>Dear ${data.leadName},</p>
    <p>Thank you for your deposit! Your Kilimanjaro adventure booking is confirmed. Now we need to collect details for the other climbers in your group.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Booking Summary</h3>
      <table>
        <tr>
          <td class="info-label">Reference:</td>
          <td class="info-value"><strong>${data.bookingRef}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeName}</td>
        </tr>
        <tr>
          <td class="info-label">Departure:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Group Size:</td>
          <td class="info-value">${data.totalClimbers} climbers</td>
        </tr>
      </table>
    </div>

    <div class="highlight">
      <strong>You have two options:</strong>
      <ol style="margin: 8px 0 0; padding-left: 20px;">
        <li><strong>Share individual links</strong> - Send each climber their personal link to fill in their own details</li>
        <li><strong>Fill in details yourself</strong> - Use the management page to enter details for everyone</li>
      </ol>
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${manageUrl}" class="button">Manage All Climber Details</a>
    </div>

    <h3>Individual Climber Links</h3>
    <p>Share these links with your group (each link is unique):</p>
    <ul style="background:#f8fafc;padding:16px;border-radius:8px;list-style:none;">
      ${climberLinks}
    </ul>

    <p style="color:#64748b;font-size:14px;margin-top:16px;">Links expire in 30 days. We'll send reminders if details aren't completed.</p>

    <p>Questions? Just reply to this email!</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

/**
 * Climber details request email (sent to individual climber)
 */
export function climberDetailsRequestIndividual(data: ClimberDetailsRequestData): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snowafricaadventure.com";
  const formUrl = `${baseUrl}/complete-details/${data.token}`;
  const greeting = data.recipientName ? `Hi ${data.recipientName},` : "Hello!";

  return baseLayout(`
    <h2>Complete Your Kilimanjaro Trek Details</h2>
    <p>${greeting}</p>
    <p><strong>${data.leadName}</strong> has booked you on an incredible Kilimanjaro adventure!</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Trek Details</h3>
      <table>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeName}</td>
        </tr>
        <tr>
          <td class="info-label">Departure:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
      </table>
    </div>

    <p>Please complete your details so we can prepare for your journey:</p>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${formUrl}" class="button">Complete My Details</a>
    </div>

    <p style="color:#64748b;font-size:14px;">This link expires in 30 days.</p>

    <div class="highlight">
      <strong>What we need:</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px;">
        <li>Full name and contact information</li>
        <li>Nationality and passport details</li>
        <li>Dietary requirements</li>
        <li>Any medical conditions we should know about</li>
      </ul>
    </div>

    <p>Questions? Reply to this email or contact us directly.</p>
    <p>We can't wait to see you on the mountain!</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

/**
 * Climber details completed notification (sent to admin)
 */
export function climberDetailsCompleted(data: ClimberDetailsCompletedData): string {
  const remaining = data.totalClimbers - data.completedCount;

  return baseLayout(`
    <h2>Climber Details Completed</h2>
    <p><strong>${data.climberName}</strong> has completed their details for booking <strong>${data.bookingRef}</strong>.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Booking Details</h3>
      <table>
        <tr>
          <td class="info-label">Reference:</td>
          <td class="info-value"><strong>${data.bookingRef}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeName}</td>
        </tr>
        <tr>
          <td class="info-label">Departure:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
        <tr>
          <td class="info-label">Progress:</td>
          <td class="info-value"><strong>${data.completedCount} of ${data.totalClimbers}</strong> climbers complete</td>
        </tr>
      </table>
    </div>

    ${remaining > 0 ? `
    <div class="highlight">
      <strong>Still waiting for:</strong> ${remaining} climber${remaining > 1 ? "s" : ""} to complete their details.
    </div>
    ` : `
    <div style="background:#dcfce7;padding:16px;border-radius:8px;border-left:4px solid #16a34a;margin:16px 0;">
      <strong style="color:#166534;">All climber details are complete!</strong>
    </div>
    `}

    <div style="text-align: center; margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings/${data.bookingRef}" class="button">View Booking</a>
    </div>
  `);
}

/**
 * Climber details reminder email
 */
export function climberDetailsReminder(data: ClimberDetailsReminderData): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snowafricaadventure.com";
  const formUrl = `${baseUrl}/complete-details/${data.token}`;
  const greeting = data.climberName ? `Hi ${data.climberName},` : "Hello!";

  const urgentStyle = data.isUrgent
    ? "background:#fef2f2;border-left:4px solid #dc2626;color:#991b1b;"
    : "background:#fef3c7;border-left:4px solid #f59e0b;color:#92400e;";

  return baseLayout(`
    <h2>${data.isUrgent ? "Urgent: " : ""}Complete Your Trek Details</h2>
    <p>${greeting}</p>
    <p>This is a friendly reminder to complete your details for your upcoming Kilimanjaro trek with <strong>${data.leadName}'s</strong> group.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Trek Details</h3>
      <table>
        <tr>
          <td class="info-label">Route:</td>
          <td class="info-value">${data.routeName}</td>
        </tr>
        <tr>
          <td class="info-label">Departure:</td>
          <td class="info-value">${data.departureDate}</td>
        </tr>
      </table>
    </div>

    <div style="${urgentStyle}padding:16px;border-radius:8px;margin:16px 0;">
      <strong>Your link expires in ${data.daysRemaining} day${data.daysRemaining > 1 ? "s" : ""}!</strong>
      <p style="margin: 8px 0 0;">Please complete your details as soon as possible so we can prepare for your adventure.</p>
    </div>

    <div style="text-align: center; margin: 24px 0;">
      <a href="${formUrl}" class="button">Complete My Details Now</a>
    </div>

    <p>If you have any questions, please reply to this email or contact ${data.leadName} directly.</p>
    <p>See you on the mountain!</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
}

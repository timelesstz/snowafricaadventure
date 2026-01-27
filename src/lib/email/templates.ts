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
          <td class="info-value">$${data.depositAmount.toLocaleString()} (30%)</td>
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
}

/**
 * Inquiry received (sent to customer)
 */
export function inquiryReceived(data: InquiryEmailData): string {
  const typeLabels: Record<string, string> = {
    safari: "Safari",
    trekking: "Kilimanjaro Trekking",
    group: "Group Departure",
    custom: "Custom Trip",
    contact: "General Inquiry",
  };

  return baseLayout(`
    <h2>Thank You for Your Inquiry!</h2>
    <p>Dear ${data.fullName},</p>
    <p>Thank you for reaching out to Snow Africa Adventure! We have received your ${typeLabels[data.type] || data.type} inquiry and our team will get back to you within 24 hours.</p>

    <div class="info-box">
      <h3 style="margin-top: 0;">Your Inquiry Details</h3>
      <table>
        <tr>
          <td class="info-label">Inquiry Type:</td>
          <td class="info-value">${typeLabels[data.type] || data.type}</td>
        </tr>
        ${data.tripType ? `<tr><td class="info-label">Trip:</td><td class="info-value">${data.tripType}</td></tr>` : ""}
        ${data.arrivalDate ? `<tr><td class="info-label">Preferred Date:</td><td class="info-value">${data.arrivalDate}</td></tr>` : ""}
        ${data.numAdults ? `<tr><td class="info-label">Adults:</td><td class="info-value">${data.numAdults}</td></tr>` : ""}
        ${data.numChildren ? `<tr><td class="info-label">Children:</td><td class="info-value">${data.numChildren}</td></tr>` : ""}
      </table>
      ${data.message ? `<h4>Your Message:</h4><p style="background:#f8fafc;padding:12px;border-radius:4px;">${data.message}</p>` : ""}
    </div>

    <p>In the meantime, feel free to explore our website for more information about our trips and services.</p>
    <p>Best regards,<br>The Snow Africa Adventure Team</p>
  `);
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

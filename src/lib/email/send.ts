/**
 * High-level email sending functions
 */

import { sendEmail, sendAdminNotification, EmailResult } from "./index";
import {
  bookingInquiryReceived,
  bookingConfirmed,
  bookingStatusUpdate,
  paymentReminder,
  inquiryReceived,
  inquiryResponse,
  adminNewBooking,
  adminNewInquiry,
  partnerNewCommission,
  climberDetailsRequestToLead,
  climberDetailsRequestIndividual,
  climberDetailsCompleted,
  climberDetailsReminder,
  BookingEmailData,
  InquiryEmailData,
  PartnerCommissionEmailData,
  ClimberDetailsRequestData,
  ClimberDetailsCompletedData,
  ClimberDetailsReminderData,
} from "./templates";

// Partner CC emails for commission notifications
const PARTNER_CC_EMAILS = [
  "business@craftedbytimeless.com",
  "timelesstz@gmail.com",
];

// ============================================
// BOOKING EMAILS
// ============================================

/**
 * Send booking inquiry received email to customer and admin
 */
export async function sendBookingInquiryEmails(
  data: BookingEmailData
): Promise<{ customer: EmailResult; admin: EmailResult }> {
  const [customerResult, adminResult] = await Promise.all([
    sendEmail({
      to: data.leadEmail,
      subject: `Booking Inquiry Received - ${data.routeTitle}`,
      html: bookingInquiryReceived(data),
    }),
    sendAdminNotification(
      `New Booking: ${data.routeTitle} - ${data.leadName}`,
      adminNewBooking(data)
    ),
  ]);

  return { customer: customerResult, admin: adminResult };
}

/**
 * Send booking confirmed email to customer
 */
export async function sendBookingConfirmedEmail(
  data: BookingEmailData
): Promise<EmailResult> {
  return sendEmail({
    to: data.leadEmail,
    subject: `Booking Confirmed! - ${data.routeTitle}`,
    html: bookingConfirmed(data),
  });
}

/**
 * Send booking status update email to customer
 */
export async function sendBookingStatusUpdateEmail(
  data: BookingEmailData,
  previousStatus: string,
  message?: string
): Promise<EmailResult> {
  return sendEmail({
    to: data.leadEmail,
    subject: `Booking Update - ${data.routeTitle}`,
    html: bookingStatusUpdate(data, previousStatus, message),
  });
}

/**
 * Send payment reminder email to customer
 */
export async function sendPaymentReminderEmail(
  data: BookingEmailData,
  dueDate: string,
  amountDue: number,
  isDeposit: boolean
): Promise<EmailResult> {
  return sendEmail({
    to: data.leadEmail,
    subject: `Payment Reminder - ${data.routeTitle}`,
    html: paymentReminder(data, dueDate, amountDue, isDeposit),
  });
}

// ============================================
// INQUIRY EMAILS
// ============================================

/**
 * Send inquiry received email to customer and admin
 */
export async function sendInquiryReceivedEmails(
  data: InquiryEmailData
): Promise<{ customer: EmailResult; admin: EmailResult }> {
  const typeLabels: Record<string, string> = {
    safari: "Safari",
    trekking: "Kilimanjaro",
    group: "Group Departure",
    custom: "Custom Trip",
    contact: "Contact",
  };

  const [customerResult, adminResult] = await Promise.all([
    sendEmail({
      to: data.email,
      subject: `Thank you for your ${typeLabels[data.type] || ""} inquiry`,
      html: inquiryReceived(data),
    }),
    sendAdminNotification(
      `New ${typeLabels[data.type] || ""} Inquiry from ${data.fullName}`,
      adminNewInquiry(data)
    ),
  ]);

  return { customer: customerResult, admin: adminResult };
}

/**
 * Send inquiry response email to customer
 */
export async function sendInquiryResponseEmail(
  data: InquiryEmailData,
  responseMessage: string,
  senderName: string
): Promise<EmailResult> {
  return sendEmail({
    to: data.email,
    subject: `Re: Your ${data.type} inquiry - Snow Africa Adventure`,
    html: inquiryResponse(data, responseMessage, senderName),
  });
}

// ============================================
// PARTNER COMMISSION EMAILS
// ============================================

/**
 * Send new commission notification to partner
 */
export async function sendPartnerCommissionEmail(
  partnerEmail: string,
  data: PartnerCommissionEmailData
): Promise<EmailResult> {
  // Send to partner with CC to backup emails
  const recipients = [partnerEmail, ...PARTNER_CC_EMAILS];

  return sendEmail({
    to: recipients,
    subject: `New Commission Earned: $${data.commissionAmount.toLocaleString()} - ${data.routeTitle}`,
    html: partnerNewCommission(data),
  });
}

// ============================================
// CLIMBER DETAILS EMAILS
// ============================================

/**
 * Send climber details request email (to lead or individual climber)
 */
export async function sendClimberDetailsRequestEmail(
  data: ClimberDetailsRequestData
): Promise<EmailResult> {
  if (data.type === "lead" && data.leadEmail) {
    return sendEmail({
      to: data.leadEmail,
      subject: `Collect Your Group's Details - ${data.routeName}`,
      html: climberDetailsRequestToLead(data),
    });
  } else if (data.type === "individual" && data.recipientEmail) {
    return sendEmail({
      to: data.recipientEmail,
      subject: `Complete Your Kilimanjaro Trek Details - ${data.routeName}`,
      html: climberDetailsRequestIndividual(data),
    });
  }
  return { success: false, error: "Invalid email type or missing recipient" };
}

/**
 * Send climber details completed notification to admin
 */
export async function sendClimberDetailsCompletedEmail(
  data: ClimberDetailsCompletedData
): Promise<EmailResult> {
  return sendAdminNotification(
    `Climber Details Completed - ${data.bookingRef}`,
    climberDetailsCompleted(data)
  );
}

/**
 * Send climber details reminder email
 */
export async function sendClimberDetailsReminderEmail(
  recipientEmail: string,
  data: ClimberDetailsReminderData
): Promise<EmailResult> {
  const subject = data.isUrgent
    ? `Urgent: Complete Your Trek Details - ${data.daysRemaining} days left`
    : `Reminder: Complete Your Kilimanjaro Trek Details`;

  return sendEmail({
    to: recipientEmail,
    subject,
    html: climberDetailsReminder(data),
  });
}

// Re-export for use in other services
export type {
  PartnerCommissionEmailData,
  ClimberDetailsRequestData,
  ClimberDetailsCompletedData,
  ClimberDetailsReminderData,
};

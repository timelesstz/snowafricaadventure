/**
 * Newsletter subscription utility
 */

import { prisma } from "@/lib/prisma";

export interface NewsletterSubscribeParams {
  email: string;
  name?: string;
  source?: string;
  bookingId?: string;
}

/**
 * Subscribe an email to the newsletter
 * Uses upsert to handle duplicate emails gracefully
 */
export async function subscribeToNewsletter({
  email,
  name,
  source,
  bookingId,
}: NewsletterSubscribeParams): Promise<{ success: boolean; isNew: boolean }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      // If already subscribed and active, nothing to do
      if (existing.isActive) {
        return { success: true, isNew: false };
      }

      // Reactivate if previously unsubscribed
      await prisma.newsletterSubscription.update({
        where: { email: normalizedEmail },
        data: {
          isActive: true,
          unsubscribedAt: null,
          // Update name if provided and not already set
          name: name && !existing.name ? name : existing.name,
        },
      });
      return { success: true, isNew: false };
    }

    // Create new subscription
    await prisma.newsletterSubscription.create({
      data: {
        email: normalizedEmail,
        name: name || null,
        source: source || null,
        bookingId: bookingId || null,
        isActive: true,
      },
    });

    return { success: true, isNew: true };
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return { success: false, isNew: false };
  }
}

/**
 * Unsubscribe an email from the newsletter
 */
export async function unsubscribeFromNewsletter(
  email: string
): Promise<{ success: boolean }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();

    await prisma.newsletterSubscription.update({
      where: { email: normalizedEmail },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to unsubscribe from newsletter:", error);
    return { success: false };
  }
}

/**
 * Check if an email is subscribed to the newsletter
 */
export async function isSubscribed(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim();

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email: normalizedEmail },
    });

    return subscription?.isActive ?? false;
  } catch (error) {
    console.error("Failed to check newsletter subscription:", error);
    return false;
  }
}

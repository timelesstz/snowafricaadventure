import { z } from "zod";

/**
 * Inquiry form validation schema
 */
export const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phonePrefix: z.string().optional(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  tripType: z
    .enum([
      "Wildlife Safari",
      "Kilimanjaro",
      "Zanzibar Beach",
      "Wildlife Safari + Kilimanjaro",
      "Wildlife Safari + Zanzibar Beach",
      "Customized",
    ])
    .optional(),
  numAdults: z.coerce.number().min(1).optional(),
  numChildren: z.coerce.number().min(0).optional(),
  arrivalDate: z.coerce.date().optional(),
  additionalInfo: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Group departure booking schema
 */
export const groupBookingSchema = z.object({
  // Lead booker
  leadName: z.string().min(2, "Name must be at least 2 characters"),
  leadEmail: z.string().email("Please enter a valid email address"),
  leadPhone: z.string().optional(),
  leadNationality: z.string().optional(),

  // Group details
  totalClimbers: z.coerce.number().min(1).max(10),
  climberDetails: z
    .array(
      z.object({
        name: z.string().min(2),
        age: z.coerce.number().min(12).max(85).optional(),
        nationality: z.string().optional(),
        dietary: z.string().optional(),
        medical: z.string().optional(),
      })
    )
    .optional(),

  // Departure reference
  departureId: z.string().cuid(),

  // Additional info
  notes: z.string().optional(),
  source: z.enum(["website", "email", "agent", "referral"]).default("website"),
});

export type GroupBookingFormData = z.infer<typeof groupBookingSchema>;

/**
 * Tailor-made safari request schema
 */
export const tailorMadeSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  nationality: z.string().optional(),

  // Trip details
  tripType: z.array(z.string()).min(1, "Please select at least one trip type"),
  destinations: z.array(z.string()).optional(),
  numAdults: z.coerce.number().min(1),
  numChildren: z.coerce.number().min(0).default(0),

  // Dates
  arrivalDate: z.coerce.date(),
  departureDate: z.coerce.date().optional(),
  flexibility: z.enum(["fixed", "flexible", "very_flexible"]).default("flexible"),

  // Preferences
  budget: z.enum(["budget", "mid-range", "luxury"]).optional(),
  accommodationType: z.string().optional(),
  specialInterests: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type TailorMadeFormData = z.infer<typeof tailorMadeSchema>;

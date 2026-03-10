import { z } from "zod";

/**
 * Inquiry form validation schema
 */
export const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Please enter a valid email address").max(320),
  phonePrefix: z.string().max(10).optional(),
  phone: z.string().max(30).optional(),
  nationality: z.string().max(100).optional(),
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
  additionalInfo: z.string().max(5000).optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Please enter a valid email address").max(320),
  phone: z.string().max(30).optional(),
  subject: z.string().min(1, "Subject is required").max(300),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Group departure booking schema
 */
export const groupBookingSchema = z.object({
  // Lead booker
  leadName: z.string().min(2, "Name must be at least 2 characters").max(200),
  leadEmail: z.string().email("Please enter a valid email address").max(320),
  leadPhone: z.string().max(30).optional(),
  leadNationality: z.string().max(100).optional(),

  // Group details
  totalClimbers: z.coerce.number().min(1).max(10),
  climberDetails: z
    .array(
      z.object({
        name: z.string().min(2).max(200),
        age: z.coerce.number().min(12).max(85).optional(),
        nationality: z.string().max(100).optional(),
        dietary: z.string().max(500).optional(),
        medical: z.string().max(1000).optional(),
      })
    )
    .optional(),

  // Departure reference
  departureId: z.string().cuid(),

  // Additional info
  notes: z.string().max(5000).optional(),
  source: z.enum(["website", "email", "agent", "referral"]).default("website"),
});

export type GroupBookingFormData = z.infer<typeof groupBookingSchema>;

/**
 * Tailor-made safari request schema
 */
export const tailorMadeSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Please enter a valid email address").max(320),
  phone: z.string().max(30).optional(),
  nationality: z.string().max(100).optional(),

  // Trip details
  tripType: z.array(z.string().max(100)).min(1, "Please select at least one trip type").max(10),
  destinations: z.array(z.string().max(200)).max(20).optional(),
  numAdults: z.coerce.number().min(1),
  numChildren: z.coerce.number().min(0).default(0),

  // Dates
  arrivalDate: z.coerce.date(),
  departureDate: z.coerce.date().optional(),
  flexibility: z.enum(["fixed", "flexible", "very_flexible"]).default("flexible"),

  // Preferences
  budget: z.enum(["budget", "mid-range", "luxury"]).optional(),
  accommodationType: z.string().max(200).optional(),
  specialInterests: z.string().max(2000).optional(),
  additionalInfo: z.string().max(5000).optional(),
});

export type TailorMadeFormData = z.infer<typeof tailorMadeSchema>;

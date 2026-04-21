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

/**
 * Admin booking creation schema
 * Used by POST /api/admin/bookings when staff enter a booking manually.
 * Kept separate from public groupBookingSchema because admins can set
 * price, deposit, status, and override source.
 */
const adminClimberDetailSchema = z
  .object({
    name: z.string().max(200).optional(),
    email: z.string().email().max(320).optional().or(z.literal("")),
    phone: z.string().max(30).optional(),
    nationality: z.string().max(100).optional(),
    passportNumber: z.string().max(50).optional(),
    dateOfBirth: z.string().max(30).optional(),
    dietaryRequirements: z.string().max(500).optional(),
    medicalConditions: z.string().max(1000).optional(),
    isComplete: z.boolean().optional(),
  })
  .passthrough();

export const adminBookingCreateSchema = z.object({
  departureId: z.string().min(1).max(50),
  leadName: z.string().min(2).max(200),
  leadEmail: z.string().email().max(320),
  leadPhone: z.string().max(30).optional().or(z.literal("")),
  leadNationality: z.string().max(100).optional().or(z.literal("")),
  totalClimbers: z.coerce.number().int().min(1).max(20),
  climberDetails: z.array(adminClimberDetailSchema).max(20).optional(),
  pricePerPerson: z.coerce.number().nonnegative(),
  depositAmount: z.coerce.number().nonnegative().optional(),
  status: z
    .enum([
      "INQUIRY",
      "PENDING",
      "DEPOSIT_PAID",
      "CONFIRMED",
      "CANCELLED",
      "REFUNDED",
      "NO_SHOW",
      "COMPLETED",
    ])
    .optional(),
  notes: z.string().max(5000).optional(),
  source: z.string().max(100).optional(),
  tripType: z.enum(["kilimanjaro", "safari", "daytrip", "zanzibar"]).optional(),
});

export type AdminBookingCreateData = z.infer<typeof adminBookingCreateSchema>;

/**
 * Admin booking update schema (partial — only sent fields are updated).
 * Used by PUT /api/admin/bookings/[id].
 */
export const adminBookingUpdateSchema = z.object({
  leadName: z.string().min(2).max(200).optional(),
  leadEmail: z.string().email().max(320).optional(),
  leadPhone: z.string().max(30).nullable().optional(),
  leadNationality: z.string().max(100).nullable().optional(),
  totalClimbers: z.coerce.number().int().min(1).max(20).optional(),
  climberDetails: z.array(adminClimberDetailSchema).max(20).nullable().optional(),
  pricePerPerson: z.coerce.number().nonnegative().optional(),
  totalPrice: z.coerce.number().nonnegative().optional(),
  depositAmount: z.coerce.number().nonnegative().nullable().optional(),
  depositPaid: z.boolean().optional(),
  balancePaid: z.boolean().optional(),
  status: z
    .enum([
      "INQUIRY",
      "PENDING",
      "DEPOSIT_PAID",
      "CONFIRMED",
      "CANCELLED",
      "REFUNDED",
      "NO_SHOW",
      "COMPLETED",
    ])
    .optional(),
  notes: z.string().max(5000).nullable().optional(),
  source: z.string().max(100).optional(),
});

export type AdminBookingUpdateData = z.infer<typeof adminBookingUpdateSchema>;

/**
 * Admin partner mutation schemas.
 * Enum values mirror PartnerType / PayoutFrequency in prisma/schema.prisma.
 */
const partnerTypeEnum = z.enum(["DEVELOPER", "MARKETING", "AFFILIATE", "AGENT"]);
const payoutFrequencyEnum = z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY", "QUARTERLY"]);

const commissionRateInputSchema = z.object({
  tripType: z.string().min(1).max(50),
  commissionRate: z.coerce.number().min(0).max(100),
  isActive: z.boolean().optional(),
});

export const adminPartnerCreateSchema = z.object({
  name: z.string().min(2).max(200),
  type: partnerTypeEnum,
  contactName: z.string().max(200).nullable().optional().or(z.literal("")),
  contactEmail: z.string().email().max(320).nullable().optional().or(z.literal("")),
  contactPhone: z.string().max(30).nullable().optional().or(z.literal("")),
  agreementDate: z.coerce.date().nullable().optional(),
  agreementExpiry: z.coerce.date().nullable().optional(),
  agreementDocument: z.string().max(2000).nullable().optional(),
  payoutFrequency: payoutFrequencyEnum.optional(),
  payoutMethod: z.string().max(200).nullable().optional(),
  payoutDetails: z.unknown().optional(),
  notes: z.string().max(5000).nullable().optional().or(z.literal("")),
  isActive: z.boolean().optional(),
  commissionRates: z.array(commissionRateInputSchema).max(20).optional(),
});

export const adminPartnerUpdateSchema = adminPartnerCreateSchema.partial();

export type AdminPartnerCreateData = z.infer<typeof adminPartnerCreateSchema>;
export type AdminPartnerUpdateData = z.infer<typeof adminPartnerUpdateSchema>;

/**
 * Admin payout mutation schemas.
 * PayoutStatus enum mirrors prisma schema.
 */
const payoutStatusEnum = z.enum(["PENDING", "APPROVED", "PAID", "CANCELLED"]);

export const adminPayoutCreateSchema = z.object({
  partnerId: z.string().min(1).max(50),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
});

export const adminPayoutUpdateSchema = z.object({
  status: payoutStatusEnum.optional(),
  paymentReference: z.string().max(500).nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
});

export type AdminPayoutCreateData = z.infer<typeof adminPayoutCreateSchema>;
export type AdminPayoutUpdateData = z.infer<typeof adminPayoutUpdateSchema>;

/**
 * Admin departure mutation schemas.
 * DepartureStatus enum mirrors prisma: DRAFT | OPEN | LIMITED | FULL | GUARANTEED | CANCELLED | COMPLETED
 */
const departureStatusEnum = z.enum([
  "DRAFT",
  "OPEN",
  "LIMITED",
  "FULL",
  "GUARANTEED",
  "CANCELLED",
  "COMPLETED",
]);

export const adminDepartureCreateSchema = z.object({
  routeId: z.string().min(1).max(50),
  arrivalDate: z.coerce.date(),
  startDate: z.coerce.date(),
  summitDate: z.coerce.date(),
  endDate: z.coerce.date(),
  price: z.coerce.number().nonnegative(),
  currency: z.string().max(10).optional(),
  earlyBirdPrice: z.coerce.number().nonnegative().nullable().optional(),
  earlyBirdUntil: z.coerce.date().nullable().optional(),
  minParticipants: z.coerce.number().int().min(1).max(100).optional(),
  maxParticipants: z.coerce.number().int().min(1).max(100).optional(),
  isFullMoon: z.boolean().optional(),
  isGuaranteed: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isManuallyFeatured: z.boolean().optional(),
  excludeFromRotation: z.boolean().optional(),
  status: departureStatusEnum.optional(),
  internalNotes: z.string().max(5000).nullable().optional(),
  publicNotes: z.string().max(5000).nullable().optional(),
});

export const adminDepartureUpdateSchema = adminDepartureCreateSchema.partial();

export type AdminDepartureCreateData = z.infer<typeof adminDepartureCreateSchema>;
export type AdminDepartureUpdateData = z.infer<typeof adminDepartureUpdateSchema>;

/**
 * Admin inquiry update schema.
 * Inquiry.status is a free-form String in the database; we whitelist known
 * lifecycle values so typos don't silently break dashboards.
 */
const inquiryStatusEnum = z.enum([
  "new",
  "contacted",
  "in_progress",
  "converted",
  "spam",
  "closed",
]);

export const adminInquiryUpdateSchema = z.object({
  status: inquiryStatusEnum.optional(),
  fullName: z.string().min(1).max(200).optional(),
  email: z.string().email().max(320).optional(),
  phone: z.string().max(30).nullable().optional(),
  phonePrefix: z.string().max(10).nullable().optional(),
  nationality: z.string().max(100).nullable().optional(),
  tripType: z.string().max(200).nullable().optional(),
  numAdults: z.coerce.number().int().min(0).max(50).nullable().optional(),
  numChildren: z.coerce.number().int().min(0).max(50).nullable().optional(),
  arrivalDate: z.coerce.date().nullable().optional(),
  additionalInfo: z.string().max(10000).nullable().optional(),
  relatedTo: z.string().max(200).nullable().optional(),
  referralSource: z.string().max(200).nullable().optional(),
});

export type AdminInquiryUpdateData = z.infer<typeof adminInquiryUpdateSchema>;

/**
 * Admin user management schemas.
 */
const adminRoleEnum = z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"]);

export const adminUserCreateSchema = z.object({
  email: z.string().email().max(320),
  name: z.string().min(1).max(200),
  password: z.string().min(8).max(200),
  role: adminRoleEnum.optional(),
});

export const adminUserUpdateSchema = z.object({
  email: z.string().email().max(320).optional(),
  name: z.string().min(1).max(200).optional(),
  role: adminRoleEnum.optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).max(200).optional(),
});

export type AdminUserCreateData = z.infer<typeof adminUserCreateSchema>;
export type AdminUserUpdateData = z.infer<typeof adminUserUpdateSchema>;

/**
 * Admin redirect create schema.
 */
const redirectTypeEnum = z.enum(["PERMANENT", "TEMPORARY"]);

export const adminRedirectCreateSchema = z.object({
  sourceUrl: z.string().min(1).max(2000),
  destinationUrl: z.string().min(1).max(2000),
  type: redirectTypeEnum.optional(),
  isActive: z.boolean().optional(),
  notFoundUrlId: z.string().max(50).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

export type AdminRedirectCreateData = z.infer<typeof adminRedirectCreateSchema>;

/**
 * Admin media metadata update schema (PATCH /api/admin/media/[id]).
 * Alt text / title / folder only — the file itself is managed by the upload route.
 */
export const adminMediaUpdateSchema = z.object({
  alt: z.string().max(500).nullable().optional(),
  title: z.string().max(500).nullable().optional(),
  folder: z.string().max(100).optional(),
});

export type AdminMediaUpdateData = z.infer<typeof adminMediaUpdateSchema>;

/**
 * Admin site-settings bulk upsert schema.
 * Keys are validated against a safe pattern so clients can't inject arbitrary
 * strings that might collide with internal keys. Values are normalized to
 * strings at write time.
 */
const siteSettingKeyPattern = /^[a-zA-Z0-9._-]{1,100}$/;

export const adminSiteSettingsPostSchema = z.object({
  settings: z
    .record(
      z.string().regex(siteSettingKeyPattern, "Invalid setting key"),
      z.union([z.string().max(10000), z.number(), z.boolean()])
    )
    .refine((obj) => Object.keys(obj).length > 0, "settings cannot be empty")
    .refine((obj) => Object.keys(obj).length <= 200, "too many settings at once"),
});

export type AdminSiteSettingsPostData = z.infer<typeof adminSiteSettingsPostSchema>;

/**
 * Admin commission update schema (PATCH /api/admin/commissions/[id]).
 * CommissionStatus enum from prisma schema.
 */
const commissionStatusEnum = z.enum(["PENDING", "ELIGIBLE", "PAID", "VOIDED"]);

export const adminCommissionUpdateSchema = z.object({
  status: commissionStatusEnum.optional(),
  paymentReference: z.string().max(500).nullable().optional(),
});

export type AdminCommissionUpdateData = z.infer<typeof adminCommissionUpdateSchema>;

/**
 * Admin 404 monitor status update schema.
 */
const notFoundStatusEnum = z.enum(["ACTIVE", "IGNORED", "REDIRECTED"]);

export const adminNotFoundUpdateSchema = z.object({
  status: notFoundStatusEnum.optional(),
});

export type AdminNotFoundUpdateData = z.infer<typeof adminNotFoundUpdateSchema>;

/**
 * Admin email test / diagnostic schema.
 */
export const adminEmailTestSchema = z.object({
  to: z.string().email().max(320).optional(),
  diagnostic: z.boolean().optional(),
});

export type AdminEmailTestData = z.infer<typeof adminEmailTestSchema>;

/**
 * Admin climber-token actions — discriminated union on `action`.
 * Keeps each action's required fields co-located with the action itself so
 * invalid combinations are rejected at the Zod layer.
 */
export const adminClimberTokenActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("generate"),
  }),
  z.object({
    action: z.literal("resend"),
    climberIndex: z.coerce.number().int().min(0).max(50),
    email: z.string().email().max(320).optional(),
  }),
  z.object({
    action: z.literal("send_all"),
    emails: z
      .array(
        z.object({
          climberIndex: z.coerce.number().int().min(0).max(50),
          email: z.string().email().max(320),
        })
      )
      .max(50)
      .optional(),
  }),
  z.object({
    action: z.literal("send_to_lead"),
  }),
]);

export type AdminClimberTokenAction = z.infer<typeof adminClimberTokenActionSchema>;

export const adminClimberTokenDeleteSchema = z.object({
  tokenId: z.string().min(1).max(50),
});

export type AdminClimberTokenDelete = z.infer<typeof adminClimberTokenDeleteSchema>;

/**
 * Admin bulk-departure schemas.
 * Each bulk input represents one departure; the route computes startDate /
 * summitDate / endDate from the route's durationDays. Array size is capped
 * so a malicious or runaway client can't OOM the server.
 */
const bulkDepartureInputSchema = z.object({
  routeId: z.string().min(1).max(50),
  arrivalDate: z.coerce.date(),
  price: z.coerce.number().nonnegative(),
  currency: z.string().max(10).optional(),
  earlyBirdPrice: z.coerce.number().nonnegative().nullable().optional(),
  earlyBirdUntil: z.coerce.date().nullable().optional(),
  minParticipants: z.coerce.number().int().min(1).max(100).optional(),
  maxParticipants: z.coerce.number().int().min(1).max(100).optional(),
  isGuaranteed: z.boolean().optional(),
  internalNotes: z.string().max(5000).nullable().optional(),
  publicNotes: z.string().max(5000).nullable().optional(),
});

export const adminDepartureBulkCreateSchema = z.object({
  departures: z.array(bulkDepartureInputSchema).min(1).max(200),
  autoDetectFullMoon: z.boolean().optional(),
});

export type AdminDepartureBulkCreate = z.infer<typeof adminDepartureBulkCreateSchema>;

export const adminDepartureBulkPreviewSchema = z.object({
  routeId: z.string().min(1).max(50),
  startDateRange: z.coerce.date(),
  endDateRange: z.coerce.date(),
  frequency: z.enum(["weekly", "biweekly", "monthly"]),
  price: z.coerce.number().nonnegative(),
  earlyBirdPrice: z.coerce.number().nonnegative().nullable().optional(),
  minParticipants: z.coerce.number().int().min(1).max(100).optional(),
  maxParticipants: z.coerce.number().int().min(1).max(100).optional(),
  autoDetectFullMoon: z.boolean().optional(),
});

export type AdminDepartureBulkPreview = z.infer<typeof adminDepartureBulkPreviewSchema>;

# /src/components/admin

> Admin dashboard components for content management

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `departures/` | Group departure CRUD (form, bulk wizard, status badges) |
| `bookings/` | Booking management (status badges, payment tracking) |
| `inquiries/` | Inquiry handling (status, email form, actions) |
| `redirects/` | URL redirect management |
| `404-monitor/` | 404 error tracking UI |

## Key Components

| Component | Purpose |
|-----------|---------|
| `AdminSidebar.tsx` | Dashboard navigation sidebar |
| `AdminSessionProvider.tsx` | NextAuth session context wrapper |
| `PermissionGate.tsx` | Role-based UI visibility |
| `RoleBadge.tsx` | User role display badge |
| `MediaUploader.tsx` | R2 file upload with drag-drop |
| `R2BrowserModal.tsx` | Media library browser modal |
| `ImageUploadField.tsx` | Single image upload form field |
| `GalleryUploadField.tsx` | Multi-image gallery upload |
| `ItineraryEditor.tsx` | Day-by-day itinerary builder |
| `SafariItineraryEditor.tsx` | Safari-specific itinerary editor |
| `FaqsEditor.tsx` | FAQ question/answer editor |
| `ListEditor.tsx` | Generic list item editor |
| `NotificationBell.tsx` | Real-time notification dropdown |
| `ConfirmDeleteButton.tsx` | Delete with confirmation modal |

## Commission & Payout Components

| Component | Purpose |
|-----------|---------|
| `CommissionStatusBadge.tsx` | Commission status indicator |
| `CommissionActions.tsx` | Commission approve/reject actions |
| `PayoutStatusBadge.tsx` | Payout status indicator |
| `PayoutActions.tsx` | Payout processing actions |

## Patterns

- **All client components**: Admin UI requires interactivity
- **Role checks**: Use `PermissionGate` to hide features by role
- **Form state**: React Hook Form with Zod validation
- **Optimistic UI**: Update UI before API confirms

<!-- CUSTOM_NOTES_START -->
<!-- CUSTOM_NOTES_END -->

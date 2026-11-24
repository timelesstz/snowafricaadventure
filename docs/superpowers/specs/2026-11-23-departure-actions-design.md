# Departure Switch-Off and Reason-Required Deletion Design

## Goal

Allow authorized staff to switch off a departure or permanently delete an unbooked departure from the admin edit page. Both actions require an internal reason and create a durable audit record.

## Behavior

### Switch off

- Available for departures that are not already `CANCELLED`.
- Requires a trimmed reason of 5–1,000 characters.
- Sets the departure status to `CANCELLED`.
- Clears `isFeatured` and `isManuallyFeatured` so automatic departure rotation is not blocked.
- Hides the departure from new public booking through the existing bookability filters.
- Leaves every booking, payment, commission, and customer notification unchanged. Staff continue to handle existing bookings separately.
- Writes an audit record in the same transaction as the status update.
- Revalidates affected public departure pages after the transaction.

### Delete

- Available only when the departure has no bookings of any status, including historical, cancelled, or refunded bookings.
- Requires a trimmed reason of 5–1,000 characters.
- Returns a conflict response when bookings exist and instructs staff to switch off the departure instead.
- Writes an audit record containing a departure snapshot and permanently deletes the departure in one transaction.
- Revalidates affected public departure pages after the transaction.

### Reactivation and ordinary edits

- Existing reactivation through the departure status field remains available.
- Saving an already-cancelled departure does not require a new reason.
- A direct API attempt to change an active departure to `CANCELLED` without a reason is rejected; the requirement is not enforced only by the UI.

## User Interface

Add a focused client-side danger-zone component to the existing departure edit page.

- **Switch off departure** opens a confirmation dialog with a required multiline reason field.
- **Delete departure** opens a separate confirmation dialog with the same reason requirement and clearer destructive wording.
- When bookings exist, the delete control is disabled and explains that switch-off must be used instead.
- Dialogs show loading, validation, not-found, permission, and server errors without closing or losing the entered reason.
- Successful actions redirect to the departure list and display the existing toast feedback pattern.
- The audit reason is internal only and is never copied to `publicNotes` or exposed on public pages.
- The generic status selector cannot be used to bypass the switch-off reason requirement.

## Data Model

Add one additive Prisma model, `DepartureActionLog`, with:

- `id`: generated identifier.
- `departureId`: the original departure identifier, retained after deletion without a foreign-key cascade.
- `action`: `SWITCH_OFF` or `DELETE`.
- `reason`: trimmed internal reason.
- `actorId` and `actorEmail`: available staff identity fields.
- `routeTitle`, `startDate`, and `status`: minimal departure snapshot for deleted-record audits.
- `createdAt`: action timestamp.
- An index on `departureId` for audit lookup.

No existing rows are deleted or rewritten. The production schema update requires a separate explicit approval before it is applied.

## API and Authorization

- Keep the existing role requirements: `EDITOR` or higher may switch off or delete departures.
- Extend the existing departure `PUT` and `DELETE` handlers rather than adding a parallel action API.
- `PUT` accepts a switch-off request containing `status: CANCELLED` and `reason`. Ordinary edit payloads continue through the existing schema.
- On a new transition to `CANCELLED`, validate the reason, load the current departure, and execute the update plus audit insert in a transaction.
- `DELETE` requires a JSON body containing the reason.
- Return consistent `400` validation, `401`/`403` authorization, `404` missing-departure, and `409` booked-deletion responses.
- Query and mutate by the validated route ID. Never trust client-supplied actor details or departure snapshot data.

## Audit and Atomicity

The switch-off status update and audit insert share a Prisma transaction. The booking check, audit insert, and permanent deletion also share a transaction. Audit data comes from the database record and authenticated session, not the browser.

## Testing and Verification

Add focused tests before implementation for:

- Reason trimming, minimum/maximum length, and missing-reason rejection.
- Switch-off updating status and featured flags while leaving bookings untouched.
- Audit records containing the authenticated actor and reason.
- Direct status-transition cancellation without a reason being rejected.
- Saving an already-cancelled departure without another reason remaining valid.
- Delete rejecting missing reasons and any existing booking.
- Successful unbooked deletion creating its audit record before the row disappears.
- Dialog reason validation, loading, and error behavior.

Run focused tests, the full Vitest suite, ESLint, Next.js type generation plus TypeScript, and the production build. Verify the new dialogs in a browser at mobile and desktop widths. Do not apply the additive schema change to the hosted production database without explicit owner approval.

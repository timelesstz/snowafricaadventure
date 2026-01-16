# Group Departures Management System
## Snow Africa Adventure - Kilimanjaro Join Group Climbs

---

## Overview

A dynamic system for managing Kilimanjaro group departure schedules, bookings, availability, and pricing. This replaces static HTML tables with a database-driven solution that's easy to update and automatically handles availability tracking.

---

## Database Schema

```prisma
// prisma/schema.prisma

// ============================================
// ROUTES (Reference for departures)
// ============================================
model Route {
  id              String   @id @default(cuid())
  slug            String   @unique
  name            String   // "8-Day Lemosho Route"
  shortName       String   // "Lemosho 8D"
  duration        Int      // Days: 6, 7, 8
  basePrice       Decimal  @db.Decimal(10, 2)
  description     String?  @db.Text
  difficulty      String   // "Moderate", "Challenging"
  successRate     Int?     // Percentage
  highlights      String[]
  isActive        Boolean  @default(true)
  departures      GroupDeparture[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// ============================================
// GROUP DEPARTURES (The main table)
// ============================================
model GroupDeparture {
  id              String   @id @default(cuid())
  
  // Route Reference
  route           Route    @relation(fields: [routeId], references: [id])
  routeId         String
  
  // Dates
  arrivalDate     DateTime // Day 0 - arrive in Arusha
  startDate       DateTime // Day 1 - trek begins
  summitDate      DateTime // Summit attempt
  endDate         DateTime // Trek ends, return to Arusha
  
  // Pricing
  price           Decimal  @db.Decimal(10, 2)
  currency        String   @default("USD")
  earlyBirdPrice  Decimal? @db.Decimal(10, 2)
  earlyBirdUntil  DateTime?
  
  // Capacity
  minParticipants Int      @default(2)
  maxParticipants Int      @default(10)
  
  // Special Flags
  isFullMoon      Boolean  @default(false)
  isGuaranteed    Boolean  @default(false)  // Will run regardless
  isFeatured      Boolean  @default(false)  // Show prominently
  
  // Status
  status          DepartureStatus @default(OPEN)
  
  // Bookings
  bookings        Booking[]
  
  // Notes
  internalNotes   String?  @db.Text
  publicNotes     String?  // Shown on website
  
  // Metadata
  year            Int
  month           Int
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([year, month])
  @@index([status])
  @@index([routeId])
  @@index([arrivalDate])
}

enum DepartureStatus {
  DRAFT         // Not visible on website
  OPEN          // Accepting bookings
  LIMITED       // Few spots left (auto-set when <=3 spots)
  FULL          // No spots available
  GUARANTEED    // Minimum met, will definitely run
  CANCELLED     // Trip cancelled
  COMPLETED     // Trip finished
}

// ============================================
// BOOKINGS (Participants per departure)
// ============================================
model Booking {
  id              String   @id @default(cuid())
  
  // Departure Reference
  departure       GroupDeparture @relation(fields: [departureId], references: [id])
  departureId     String
  
  // Lead Booker
  leadName        String
  leadEmail       String
  leadPhone       String?
  leadNationality String?
  
  // Group Details
  totalClimbers   Int      @default(1)
  climberDetails  Json?    // Array of {name, age, nationality, dietary, medical}
  
  // Pricing
  pricePerPerson  Decimal  @db.Decimal(10, 2)
  totalPrice      Decimal  @db.Decimal(10, 2)
  depositAmount   Decimal? @db.Decimal(10, 2)
  depositPaid     Boolean  @default(false)
  depositPaidAt   DateTime?
  balancePaid     Boolean  @default(false)
  balancePaidAt   DateTime?
  
  // Status
  status          BookingStatus @default(INQUIRY)
  
  // Communication
  notes           String?  @db.Text
  source          String?  // "website", "email", "agent", "referral"
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  confirmedAt     DateTime?
  cancelledAt     DateTime?
  
  @@index([departureId])
  @@index([status])
  @@index([leadEmail])
}

enum BookingStatus {
  INQUIRY       // Initial contact
  PENDING       // Awaiting deposit
  DEPOSIT_PAID  // Deposit received, spot held
  CONFIRMED     // Fully paid
  CANCELLED     // Cancelled by customer
  REFUNDED      // Cancelled and refunded
  NO_SHOW       // Didn't show up
  COMPLETED     // Successfully completed trek
}

// ============================================
// PRICING RULES (Dynamic pricing)
// ============================================
model PricingRule {
  id              String   @id @default(cuid())
  
  route           Route?   @relation(fields: [routeId], references: [id])
  routeId         String?  // Null = applies to all routes
  
  name            String   // "Peak Season Surcharge"
  type            PricingRuleType
  
  // Conditions
  startDate       DateTime?
  endDate         DateTime?
  minDaysOut      Int?     // Apply if booking X days before departure
  maxDaysOut      Int?
  
  // Adjustment
  adjustmentType  String   // "fixed" or "percentage"
  adjustmentValue Decimal  @db.Decimal(10, 2)
  
  isActive        Boolean  @default(true)
  priority        Int      @default(0) // Higher = applied first
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum PricingRuleType {
  EARLY_BIRD      // Discount for booking early
  LAST_MINUTE     // Discount to fill spots
  PEAK_SEASON     // Surcharge for busy periods
  GROUP_DISCOUNT  // Discount for multiple climbers
  REPEAT_CUSTOMER // Returning customer discount
  FULL_MOON       // Premium for full moon climbs
}

// ============================================
// SEASONS (For display grouping)
// ============================================
model Season {
  id          String   @id @default(cuid())
  name        String   // "January - March 2026"
  year        Int
  startMonth  Int
  endMonth    Int
  description String?
  isActive    Boolean  @default(true)
}
```

---

## Admin Dashboard Features

### 1. Departures Calendar View

```
┌─────────────────────────────────────────────────────────────────┐
│  DEPARTURES CALENDAR                          [+ New Departure] │
├─────────────────────────────────────────────────────────────────┤
│  ◀ January 2026                              February 2026 ▶   │
├────┬────┬────┬────┬────┬────┬────┬────────────────────────────┤
│ Su │ Mo │ Tu │ We │ Th │ Fr │ Sa │                            │
├────┼────┼────┼────┼────┼────┼────┤  DEPARTURES THIS MONTH:    │
│    │    │    │  1 │  2 │  3 │  4 │                            │
│    │    │    │    │ 🟢 │    │    │  Jan 2: Lemosho 8D (9/10)  │
├────┼────┼────┼────┼────┼────┼────┤  Jan 6: Lemosho 8D (10/10) │
│  5 │  6 │  7 │  8 │  9 │ 10 │ 11 │  Jan 8: Machame 7D (6/9)   │
│    │ 🔴 │    │ 🟡 │ 🟢 │    │    │  Jan 9: Rongai 6D (4/10)   │
├────┼────┼────┼────┼────┼────┼────┤  Jan 12: Machame 7D (0/9)  │
│ 12 │ 13 │ 14 │ 15 │ 16 │ 17 │ 18 │                            │
│ 🟢 │    │    │ 🟡 │    │    │    │  🟢 Open   🟡 Limited      │
├────┼────┼────┼────┼────┼────┼────┤  🔴 Full   🌕 Full Moon    │
│ 19 │ 20 │ 21 │ 22 │ 23 │ 24 │ 25 │                            │
│    │    │    │    │    │    │    │                            │
├────┼────┼────┼────┼────┼────┼────┤                            │
│ 26 │ 27 │ 28 │ 29 │ 30 │ 31 │    │                            │
│    │🌕🟡│    │    │    │    │    │                            │
└────┴────┴────┴────┴────┴────┴────┴────────────────────────────┘
```

### 2. Departures Table (Admin)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  GROUP DEPARTURES 2026                    [Filter ▼] [Export CSV] [+ Bulk Add]       │
├──────────────────────────────────────────────────────────────────────────────────────┤
│  Show: [All Routes ▼] [All Months ▼] [All Status ▼]    Search: [____________]        │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ☐ │ Route          │ Arrival    │ Departure  │ Price  │ Booked │ Status   │ Actions│
│  ──┼────────────────┼────────────┼────────────┼────────┼────────┼──────────┼────────│
│  ☐ │ Lemosho 8D     │ Jan 2      │ Jan 11     │ $2,680 │ 9/10   │ 🟢 Open  │ ⚙️ 👁️ │
│  ☐ │ Lemosho 8D     │ Jan 6      │ Jan 15     │ $2,680 │ 10/10  │ 🔴 Full  │ ⚙️ 👁️ │
│  ☐ │ Machame 7D     │ Jan 8      │ Jan 16     │ $2,440 │ 6/9    │ 🟢 Open  │ ⚙️ 👁️ │
│  ☐ │ Rongai 6D      │ Jan 9      │ Jan 16     │ $2,390 │ 4/10   │ 🟢 Open  │ ⚙️ 👁️ │
│  ☐ │ Machame 7D     │ Jan 12     │ Jan 20     │ $2,440 │ 0/9    │ 🟢 Open  │ ⚙️ 👁️ │
│  ☐ │ Lemosho 8D 🌕  │ Jan 27     │ Feb 5      │ $2,680 │ 3/8    │ 🟡 Lmtd  │ ⚙️ 👁️ │
│                                                                                      │
│  ◀ Previous │ Page 1 of 12 │ Next ▶                         Showing 1-20 of 240     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Single Departure Detail View

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  8-Day Lemosho Route                                              [Edit] [Delete]    │
│  January 27 - February 5, 2026 🌕 FULL MOON CLIMB                                    │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐                   │
│  │  DATES                      │  │  CAPACITY                   │                   │
│  │  Arrival:    Jan 27, 2026   │  │                             │                   │
│  │  Trek Start: Jan 28, 2026   │  │  ████████░░ 8/10 spots     │                   │
│  │  Summit:     Feb 3, 2026    │  │                             │                   │
│  │  End:        Feb 5, 2026    │  │  2 spots remaining          │                   │
│  └─────────────────────────────┘  └─────────────────────────────┘                   │
│                                                                                      │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐                   │
│  │  PRICING                    │  │  STATUS                     │                   │
│  │  Regular:     $2,680        │  │  ● LIMITED AVAILABILITY     │                   │
│  │  Early Bird:  $2,480        │  │                             │                   │
│  │  (until Dec 27)             │  │  [Change Status ▼]          │                   │
│  └─────────────────────────────┘  └─────────────────────────────┘                   │
│                                                                                      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│  BOOKINGS (8 climbers)                                          [+ Add Booking]     │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  │ Lead Name       │ Climbers │ Status       │ Paid        │ Source  │ Actions     │
│  ├─────────────────┼──────────┼──────────────┼─────────────┼─────────┼─────────────│
│  │ John Smith      │ 2        │ ✅ Confirmed │ $5,360      │ Website │ 👁️ ✏️ 📧   │
│  │ Maria Garcia    │ 1        │ ✅ Confirmed │ $2,680      │ Email   │ 👁️ ✏️ 📧   │
│  │ Alex Chen       │ 3        │ 💳 Deposit   │ $2,000/$8k  │ Website │ 👁️ ✏️ 📧   │
│  │ Sarah Johnson   │ 2        │ ⏳ Pending   │ -           │ Agent   │ 👁️ ✏️ 📧   │
│                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### 4. Bulk Add Departures Tool

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  BULK ADD DEPARTURES                                                    [× Close]   │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  Generate multiple departures quickly:                                              │
│                                                                                      │
│  Route:        [8-Day Lemosho Route          ▼]                                     │
│                                                                                      │
│  Date Range:   [Jan 1, 2026] to [Dec 31, 2026]                                      │
│                                                                                      │
│  Frequency:    ○ Weekly on [Mon ▼]                                                  │
│                ○ Bi-weekly                                                          │
│                ● Monthly (first [Saturday ▼] of month)                              │
│                ○ Custom dates (paste list)                                          │
│                                                                                      │
│  Pricing:      [$2,680    ] USD                                                     │
│                                                                                      │
│  Max Spots:    [10  ]                                                               │
│                                                                                      │
│  ☑ Mark full moon departures automatically                                          │
│  ☑ Set status to OPEN                                                               │
│  ☐ Add early bird pricing ($200 off, 60 days before)                               │
│                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │  PREVIEW: 12 departures will be created                                    │     │
│  │                                                                            │     │
│  │  • Jan 3, 2026 - Jan 12, 2026                                             │     │
│  │  • Feb 7, 2026 - Feb 16, 2026 🌕                                          │     │
│  │  • Mar 7, 2026 - Mar 16, 2026                                             │     │
│  │  • Apr 4, 2026 - Apr 13, 2026                                             │     │
│  │  ... and 8 more                                                            │     │
│  └────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                      │
│                                          [Cancel]  [Create 12 Departures]           │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

```typescript
// app/api/departures/route.ts

// GET /api/departures
// Query params: year, month, routeId, status, limit, offset
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  const month = searchParams.get('month')
  const routeId = searchParams.get('routeId')
  const status = searchParams.get('status')

  const departures = await prisma.groupDeparture.findMany({
    where: {
      year: year ? parseInt(year) : undefined,
      month: month ? parseInt(month) : undefined,
      routeId: routeId || undefined,
      status: status ? (status as DepartureStatus) : { not: 'DRAFT' },
    },
    include: {
      route: true,
      _count: {
        select: { bookings: true }
      }
    },
    orderBy: { arrivalDate: 'asc' }
  })

  // Calculate available spots
  const departuresWithAvailability = await Promise.all(
    departures.map(async (dep) => {
      const bookedCount = await prisma.booking.aggregate({
        where: {
          departureId: dep.id,
          status: { in: ['DEPOSIT_PAID', 'CONFIRMED'] }
        },
        _sum: { totalClimbers: true }
      })
      
      return {
        ...dep,
        bookedSpots: bookedCount._sum.totalClimbers || 0,
        availableSpots: dep.maxParticipants - (bookedCount._sum.totalClimbers || 0)
      }
    })
  )

  return Response.json(departuresWithAvailability)
}

// POST /api/departures
export async function POST(request: Request) {
  const body = await request.json()
  
  // Validate admin auth
  // ...
  
  const departure = await prisma.groupDeparture.create({
    data: {
      routeId: body.routeId,
      arrivalDate: new Date(body.arrivalDate),
      startDate: new Date(body.startDate),
      summitDate: new Date(body.summitDate),
      endDate: new Date(body.endDate),
      price: body.price,
      maxParticipants: body.maxParticipants,
      isFullMoon: body.isFullMoon || false,
      year: new Date(body.arrivalDate).getFullYear(),
      month: new Date(body.arrivalDate).getMonth() + 1,
      status: 'OPEN'
    }
  })

  return Response.json(departure)
}
```

```typescript
// app/api/departures/[id]/route.ts

// GET single departure with bookings
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const departure = await prisma.groupDeparture.findUnique({
    where: { id: params.id },
    include: {
      route: true,
      bookings: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!departure) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json(departure)
}

// PATCH update departure
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  
  const departure = await prisma.groupDeparture.update({
    where: { id: params.id },
    data: body
  })

  return Response.json(departure)
}

// DELETE departure
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check for existing bookings first
  const bookings = await prisma.booking.count({
    where: { 
      departureId: params.id,
      status: { in: ['DEPOSIT_PAID', 'CONFIRMED'] }
    }
  })

  if (bookings > 0) {
    return Response.json(
      { error: 'Cannot delete departure with confirmed bookings' },
      { status: 400 }
    )
  }

  await prisma.groupDeparture.delete({
    where: { id: params.id }
  })

  return Response.json({ success: true })
}
```

```typescript
// app/api/departures/bulk/route.ts

// POST /api/departures/bulk - Create multiple departures
export async function POST(request: Request) {
  const body = await request.json()
  
  const {
    routeId,
    startDate,
    endDate,
    frequency, // 'weekly', 'biweekly', 'monthly', 'custom'
    dayOfWeek, // 0-6 for weekly/monthly
    price,
    maxParticipants,
    customDates, // Array of dates for custom
    markFullMoons
  } = body

  // Generate dates based on frequency
  const dates = generateDepartureDates({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    frequency,
    dayOfWeek,
    customDates
  })

  // Get route for duration calculation
  const route = await prisma.route.findUnique({
    where: { id: routeId }
  })

  if (!route) {
    return Response.json({ error: 'Route not found' }, { status: 400 })
  }

  // Full moon dates for the year (pre-calculated)
  const fullMoonDates = getFullMoonDates(
    new Date(startDate).getFullYear(),
    new Date(endDate).getFullYear()
  )

  // Create all departures
  const departures = await prisma.groupDeparture.createMany({
    data: dates.map(arrivalDate => {
      const startDate = addDays(arrivalDate, 1)
      const summitDate = addDays(startDate, route.duration - 2)
      const endDate = addDays(startDate, route.duration - 1)
      
      // Check if summit date is near a full moon (within 2 days)
      const isFullMoon = markFullMoons && fullMoonDates.some(
        fm => Math.abs(differenceInDays(summitDate, fm)) <= 2
      )

      return {
        routeId,
        arrivalDate,
        startDate,
        summitDate,
        endDate,
        price,
        maxParticipants,
        isFullMoon,
        year: arrivalDate.getFullYear(),
        month: arrivalDate.getMonth() + 1,
        status: 'OPEN'
      }
    })
  })

  return Response.json({ 
    created: departures.count,
    message: `Created ${departures.count} departures`
  })
}
```

---

## Frontend Components

### Public Departures Table

```tsx
// components/departures/DeparturesTable.tsx

'use client'

import { useState } from 'react'
import { format } from 'date-fns'

interface Departure {
  id: string
  route: { name: string; slug: string }
  arrivalDate: string
  endDate: string
  price: number
  maxParticipants: number
  bookedSpots: number
  availableSpots: number
  isFullMoon: boolean
  status: string
}

interface Props {
  departures: Departure[]
  year: number
}

export function DeparturesTable({ departures, year }: Props) {
  const [selectedRoute, setSelectedRoute] = useState<string>('all')
  
  const filteredDepartures = departures.filter(d => 
    selectedRoute === 'all' || d.route.slug === selectedRoute
  )

  const getStatusBadge = (dep: Departure) => {
    if (dep.availableSpots === 0) {
      return <span className="badge badge-red">Full</span>
    }
    if (dep.availableSpots <= 3) {
      return <span className="badge badge-yellow">{dep.availableSpots} Spaces</span>
    }
    return <span className="badge badge-green">{dep.availableSpots} Spaces</span>
  }

  return (
    <div className="departures-table">
      {/* Filter */}
      <div className="mb-4">
        <select 
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="select"
        >
          <option value="all">All Routes</option>
          <option value="8-days-lemosho-route">8-Day Lemosho</option>
          <option value="7-days-machame-route">7-Day Machame</option>
          <option value="6-days-rongai-route">6-Day Rongai</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">Route</th>
              <th className="text-left p-3">Arrival Date</th>
              <th className="text-left p-3">Departure Date</th>
              <th className="text-left p-3">Price (USD) PP</th>
              <th className="text-left p-3">Trip Availability</th>
              <th className="text-left p-3">Book Now</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartures.map((dep) => (
              <tr key={dep.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {dep.isFullMoon && <span className="mr-1">🌕</span>}
                  {dep.route.name}
                  {dep.isFullMoon && (
                    <span className="text-xs text-amber-600 block">
                      Full Moon Climb
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {format(new Date(dep.arrivalDate), 'MMM d, yyyy')}
                </td>
                <td className="p-3">
                  {format(new Date(dep.endDate), 'MMM d, yyyy')}
                </td>
                <td className="p-3 font-semibold">
                  ${dep.price.toLocaleString()}
                </td>
                <td className="p-3">
                  {getStatusBadge(dep)}
                </td>
                <td className="p-3">
                  {dep.availableSpots > 0 ? (
                    <a 
                      href={`#form?departure=${dep.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      JOIN/BOOK NOW
                    </a>
                  ) : (
                    <span className="text-gray-400">Sold Out</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredDepartures.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No departures found for the selected filters.
        </div>
      )}
    </div>
  )
}
```

### Departure Cards (Mobile-Friendly)

```tsx
// components/departures/DepartureCard.tsx

export function DepartureCard({ departure }: { departure: Departure }) {
  const availabilityPercent = 
    ((departure.maxParticipants - departure.availableSpots) / departure.maxParticipants) * 100

  return (
    <div className="departure-card bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">
            {departure.isFullMoon && '🌕 '}
            {departure.route.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {format(new Date(departure.arrivalDate), 'MMM d')} - 
            {format(new Date(departure.endDate), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ${departure.price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">per person</p>
        </div>
      </div>

      {/* Availability Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Availability</span>
          <span className="font-medium">
            {departure.availableSpots} of {departure.maxParticipants} spots
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              departure.availableSpots === 0 
                ? 'bg-red-500' 
                : departure.availableSpots <= 3 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
            }`}
            style={{ width: `${availabilityPercent}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      {departure.availableSpots > 0 ? (
        <a 
          href={`#form?departure=${departure.id}`}
          className="btn btn-primary w-full text-center"
        >
          Book This Departure
        </a>
      ) : (
        <button className="btn btn-disabled w-full" disabled>
          Sold Out
        </button>
      )}
    </div>
  )
}
```

---

## Automatic Status Updates

```typescript
// lib/cron/updateDepartureStatuses.ts

export async function updateDepartureStatuses() {
  // Get all open departures
  const departures = await prisma.groupDeparture.findMany({
    where: {
      status: { in: ['OPEN', 'LIMITED', 'GUARANTEED'] },
      arrivalDate: { gte: new Date() }
    },
    include: {
      bookings: {
        where: {
          status: { in: ['DEPOSIT_PAID', 'CONFIRMED'] }
        }
      }
    }
  })

  for (const departure of departures) {
    const bookedCount = departure.bookings.reduce(
      (sum, b) => sum + b.totalClimbers, 
      0
    )
    const availableSpots = departure.maxParticipants - bookedCount
    
    let newStatus = departure.status

    // Full
    if (availableSpots === 0) {
      newStatus = 'FULL'
    }
    // Limited (3 or fewer spots)
    else if (availableSpots <= 3) {
      newStatus = 'LIMITED'
    }
    // Guaranteed (minimum met)
    else if (bookedCount >= departure.minParticipants) {
      newStatus = 'GUARANTEED'
    }
    // Back to open if spots freed up
    else if (departure.status === 'LIMITED' && availableSpots > 3) {
      newStatus = 'OPEN'
    }

    // Update if changed
    if (newStatus !== departure.status) {
      await prisma.groupDeparture.update({
        where: { id: departure.id },
        data: { status: newStatus }
      })
    }
  }

  // Mark completed departures
  await prisma.groupDeparture.updateMany({
    where: {
      endDate: { lt: new Date() },
      status: { notIn: ['COMPLETED', 'CANCELLED'] }
    },
    data: { status: 'COMPLETED' }
  })
}
```

---

## Admin Authentication

Use NextAuth.js or Clerk for admin authentication:

```typescript
// Simple role-based access
// middleware.ts

import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Admin routes
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'admin'
      }
      return true
    }
  }
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
```

---

## Summary

This system gives you:

1. **Easy Management** - Calendar view, table view, bulk operations
2. **Real-Time Availability** - Automatically updates as bookings come in
3. **Smart Status** - Auto-detects limited availability, guaranteed departures
4. **Full Moon Tracking** - Automatically flags full moon climbs
5. **Booking Integration** - Track deposits, payments, climber details
6. **Mobile-Friendly Display** - Cards for mobile, tables for desktop
7. **Pricing Flexibility** - Early bird, peak season, group discounts
8. **Bulk Operations** - Generate a full year of departures in seconds

No more editing HTML tables manually!

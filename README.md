# AhiaGlobal — Next.js 14 App

A full-stack logistics platform UI with **three role-based dashboards** converted from vanilla HTML to a production-ready Next.js 14 application.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Icons | lucide-react 0.383 |
| Fonts | Plus Jakarta Sans + Inter (Google Fonts via `<link>`) |
| State | React Context API per portal |
| Utilities | clsx |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Portal selector (/)
│   ├── layout.tsx                # Root layout + fonts
│   ├── globals.css               # Tailwind + custom animations
│   │
│   ├── admin/                    # Super Admin portal
│   │   ├── layout.tsx            # AdminProvider + ToastProvider + sidebar/header
│   │   ├── page.tsx              # Dashboard (stats, recent deliveries, pending approvals)
│   │   ├── companies/page.tsx    # Companies table with filter pills + ReviewModal
│   │   ├── deliveries/page.tsx   # All deliveries table
│   │   ├── riders/page.tsx       # All riders table
│   │   ├── analytics/page.tsx    # KPI cards + bar chart
│   │   └── settings/page.tsx     # Platform toggles + commission rates
│   │
│   ├── company/                  # Company Manager portal
│   │   ├── layout.tsx            # CompanyProvider + ToastProvider + sidebar/header
│   │   ├── page.tsx              # Overview (stats + recent orders)
│   │   ├── orders/page.tsx       # Orders table + Assign Rider modal
│   │   ├── riders/page.tsx       # Riders table + Add/Edit Rider modal (Local only)
│   │   ├── earnings/page.tsx     # Earnings summary + breakdown table
│   │   └── settings/page.tsx     # Company profile + notification prefs
│   │
│   └── rider/                    # Rider portal
│       ├── layout.tsx            # RiderProvider + ToastProvider + sidebar/header/mobile-nav
│       ├── page.tsx              # Dashboard (earnings card, active order, incoming queue)
│       ├── orders/page.tsx       # My orders with tab filter (All/Active/Delivered/Rejected)
│       ├── earnings/page.tsx     # Weekly/monthly earnings + bar chart + payout info
│       └── profile/page.tsx      # Profile form + bank account + performance summary
│
├── components/
│   ├── ui/
│   │   ├── Badge.tsx             # Status badge with 14 variants
│   │   ├── StatCard.tsx          # Reusable metric card
│   │   ├── Toast.tsx             # Toast notification system (Context + UI)
│   │   └── Toggle.tsx            # On/Off toggle switch
│   ├── admin/
│   │   ├── AdminSidebar.tsx      # Collapsible sidebar with active link detection
│   │   ├── AdminHeader.tsx       # Sticky header with search + date display
│   │   └── ReviewModal.tsx       # 3-tab company review modal (Overview/Documents/Contact)
│   ├── company/
│   │   ├── CompanySidebar.tsx    # Sidebar with Local/Interstate type badge
│   │   └── CompanyHeader.tsx     # Header with Local/Interstate type switcher
│   └── rider/
│       ├── RiderSidebar.tsx      # Sidebar with online status dot
│       ├── RiderHeader.tsx       # Header with Online/Offline toggle
│       └── RiderMobileNav.tsx    # Fixed bottom nav for mobile
│
├── context/
│   ├── AdminContext.tsx          # Companies state, doc verification, status mutations
│   ├── CompanyContext.tsx        # Orders, riders, company type state
│   └── RiderContext.tsx          # Rider orders, online status, earnings state
│
└── lib/
    ├── types.ts                  # TypeScript interfaces (Company, Rider, Order, etc.)
    ├── data.ts                   # Seed data for all three portals
    └── statusLabel.ts            # Order/company status → display label utility
```

---

## Getting Started

```bash
# 1. Extract the archive
tar -xzf ahiaglobal-nextjs.tar.gz
cd ahiaglobal

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# → http://localhost:3000

# 4. Build for production
npm run build
npm start
```

---

## Portals

| URL | Role | Description |
|---|---|---|
| `/` | — | Portal selector |
| `/admin` | Super Admin | Platform overview, company management, deliveries, analytics |
| `/admin/companies` | Super Admin | Companies table with Review/Approve/Reject/Suspend workflow |
| `/company` | Company Manager | Overview, orders with rider assignment, rider fleet CRUD |
| `/company/orders` | Company Manager | Assign riders (Local) or update status (Interstate) |
| `/company/riders` | Company Manager | Add/edit/activate riders — hidden for Interstate type |
| `/rider` | Rider | Active order with pick-up/transit/delivered flow + incoming queue |
| `/rider/orders` | Rider | All orders with tab filter |
| `/rider/earnings` | Rider | Daily chart, payout info, live earnings counter |

---

## Key Features

### Super Admin
- **Company ReviewModal** — 3-tab modal (Overview, Documents, Contact & Legal) with per-document Verify/Flag/Undo actions, progress bar, approve/reject with confirmation guard
- **Filter pills** — All / Active / Pending / Suspended with live counts
- **Suspend / Reinstate** actions with toast feedback
- Platform toggle switches and editable commission rates

### Company Dashboard
- **Local / Interstate mode switcher** — changes order action column (assign rider vs status dropdown), hides rider management for interstate
- **Assign Rider modal** — lists only online + available riders, marks them busy on assignment
- **Add / Edit Rider modal** — full CRUD with form validation
- Rider activate/deactivate toggle

### Rider Dashboard
- **Online/Offline toggle** — animated pill in header, updates sidebar dot + banner + status badge simultaneously
- **Active order card** — route timeline visual, distance/time/earning stats, contextual action buttons (Picked Up → In Transit → Mark Delivered)
- **Live earnings** — counter increments when delivery is confirmed
- **Incoming order queue** — Accept (guarded against double-booking) / Reject
- Mobile bottom navigation bar

---

## Notes

- All state is **client-side only** (React Context). Wire up to your API by replacing context mutations with `fetch` / SWR / React Query calls.
- Google Fonts load via `<link>` at runtime — no build-time fetch required (works behind firewalls).
- The `"use client"` directive is applied only to components that need interactivity; server components are used where possible for faster TTFB.

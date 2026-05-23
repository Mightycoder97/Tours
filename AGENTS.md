<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 🏗️ Project: Machu Picchu Travel Adventures (Tours)

## Overview

Tour booking e-commerce platform for a Machu Picchu travel company. Spanish-language primary, targeting Peruvian/Latin American tourists. Full purchase funnel: Browse → Detail → Cart → Checkout → Payment → Confirmation.

**Reference site for design/functionality parity**: [incarail.com](https://incarail.com/)

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16.2.1 (App Router) | React 19.2.4 |
| Styling | Tailwind CSS v4 | `@theme` directive, `@import "tailwindcss"` |
| Database | Supabase (PostgreSQL) | RLS enabled, DB triggers for availability |
| State | Zustand | Cart with localStorage persistence |
| Payments | Culqi (Peru) + PayPal | Dual gateway for local + international |
| Email | Resend | Booking confirmations |
| Icons | Lucide React | Use exclusively, don't add new icon libs |
| Fonts | Montserrat (body) + DM Serif Display (headings) | Loaded via `next/font/google` |
| Carousel (planned) | Embla Carousel | For hero slider, testimonials, featured tours |

## Design System

### Colors (defined in `globals.css` `@theme`)
```
Primary:       #06C0B8 (teal)
Primary Light: #33ccce
Primary Dark:  #049993
Accent:        #F5F5E9 (cream/off-white)
Background:    #ffffff
Text Main:     #333333
Text Light:    #666666
```

### Fonts
- **Body/UI**: `font-sans` → Montserrat (`--font-montserrat`)
- **Headings**: `font-serif` → DM Serif Display (`--font-dm-serif`)

### Radius Tokens
```
radius-xl:   1rem
radius-2xl:  1.5rem
radius-full: 9999px
```

## Architecture

```
src/
├── app/
│   ├── (public)/          # Public routes (Navbar + Footer layout)
│   │   ├── page.tsx       # Homepage
│   │   ├── tours/         # Tour listing + [slug] detail
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Multi-step checkout
│   │   ├── success/       # Booking confirmation
│   │   ├── blog/          # Blog (placeholder)
│   │   ├── nosotros/      # About us (placeholder)
│   │   ├── rutas/         # Routes (placeholder)
│   │   └── login/         # Admin login
│   ├── admin/             # Admin panel (protected by middleware)
│   │   ├── tours/         # CRUD tours
│   │   ├── bookings/      # View bookings
│   │   ├── categories/    # Manage categories
│   │   ├── destinations/  # Manage destinations
│   │   ├── availability/  # Manage tour availability
│   │   └── settings/      # Site settings
│   └── api/               # API routes
│       ├── bookings/      # Create booking + send email
│       ├── availability/  # Check tour availability
│       └── checkout/      # Culqi + PayPal handlers
├── components/
│   ├── home/              # Homepage sections
│   ├── layout/            # Navbar, Footer, LanguageSwitcher
│   ├── tours/             # Tour cards, filters, sidebar
│   ├── admin/             # Admin-specific components
│   ├── ui/                # Shared UI (StarRating, Pagination, etc.)
│   └── seo/               # JSON-LD, meta components
├── lib/
│   └── supabase/          # Supabase clients (client, server, proxy)
└── store/
    └── useCartStore.ts    # Zustand cart store
```

## Implementation Plan

The full implementation plan is in [implementation_plan.md](./implementation_plan.md).  
Track progress in [task.md](./task.md).

### Phases
1. **Fase 0**: Critical bug fixes (middleware, checkout, filters)
2. **Fase 1**: Visual impact (hero slider, sections, testimonials)
3. **Fase 2**: Content & trust (FAQ, ratings, mega menu, i18n)
4. **Fase 3**: SEO & polish (schema.org, meta tags, sitemap)

## Key Rules for AI Agents

1. **Always read Next.js 16 docs** before using any API — `params` is now `Promise<>`, use Server Actions, check for deprecations.
2. **Use Tailwind v4 syntax** — `@theme` for tokens, `@import "tailwindcss"` (no `@tailwind` directives).
3. **Use `font-sans` for body, `font-serif` for headings** — don't import additional fonts without explicit approval.
4. **Use Lucide React for icons** — don't add Font Awesome, Heroicons, or other icon libraries.
5. **Server Components by default** — only add `'use client'` when state, effects, or event handlers are needed.
6. **Supabase SSR client** for server components (`src/lib/supabase/server.ts`), browser client for client components (`src/lib/supabase/client.ts`).
7. **Don't use `dangerouslySetInnerHTML`** without sanitization.
8. **Mobile-first** — design for 320px first, then scale up.
9. **Test builds** — run `npm run build` to verify no compilation errors after significant changes.
10. **Update task.md** — mark tasks as `[/]` when starting, `[x]` when completed.

## Database Tables

| Table | Purpose |
|-------|---------|
| `categories` | Tour categories (e.g., Adventure, Cultural) |
| `destinations` | Destination locations |
| `tours` | Tour listings with images, inclusions, pricing |
| `tour_availability` | Per-date capacity management with auto-tracking triggers |
| `bookings` | Customer bookings with payment status |
| `passengers` | Individual passenger data per booking |
| `site_settings` | Key-value settings for CMS |

## Known Issues (to fix in Fase 0)

- ⚠️ `src/proxy.ts` should be `src/middleware.ts` — middleware doesn't execute
- ⚠️ Checkout `Array.fill()` shares object references — passenger form corruption
- ⚠️ Checkout only processes `items[0]` — multi-tour bookings lost
- ⚠️ Search params from BookingWidget ignored by ToursPageClient
- ⚠️ Tour filters are purely visual — no handlers or state
- ⚠️ BookingSidebar uses mocked dates instead of availability API
- ⚠️ Cart edit link uses UUID instead of slug
- ⚠️ Child price hardcoded as `adult * 0.7`
- ⚠️ Google Translate used for i18n (fragile)
- ⚠️ Footer links to non-existent pages

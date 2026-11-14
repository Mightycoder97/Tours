# Project: Machu Picchu Travel Adventures & Sonqo Perú Travel CMS

## Architecture
- **Framework & Runtime**: Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4.
- **Database & Identity**: Supabase (PostgreSQL) with Row-Level Security (RLS) and Supabase Auth (`auth.users` with bcrypt-hashed passwords).
- **Multi-Brand Model**: Two brands (`mta` and `sonqo`) defined in `src/lib/brand.ts`. Data partitioned via `tenant VARCHAR(50)` in `tours`, `site_settings`, `bookings`, and `complaints`.
- **Admin Context**: Cookie-based persistent brand state (`admin_brand=mta|sonqo`) controlling active brand context across all `/admin` routes.
- **Public Brand Rendering**: Host header / cookie / env brand resolution, with dynamic logo in `Navbar`, CSS variables in `globals.css` for `data-brand="sonqo"`, and brand-filtered tour and settings queries.
- **Visual Asset Distribution**: Dynamic hero slides and section photos stored in `site_settings` per brand (JSON format) and rendered by `HeroSlider.tsx`; tour media galleries managed in `tours.images TEXT[]`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Encrypted Admin Auth & Route Protection | Supabase Auth with bcrypt hashing in `auth.users`, login redirection with `redirectTo`, and server action auth guards. | M1 | Survey 1 (R1) |
| 2 | Multi-Brand Database Migration | Migration `0007_multi_brand_cms.sql` adding `tenant` to `tours` & `site_settings`, composite unique keys `(tenant, slug)`, `(tenant, key)`, and columns `itinerary JSONB`, `exclusions TEXT[]`, `price_infant NUMERIC(10,2)`. | M1 | Survey 1, 2, 3 (R2, R3) |
| 3 | Admin Multi-Brand Context Switcher | Persistent brand switcher in `AdminSidebar` and admin header (cookie `admin_brand`), scoping `/admin` queries. | M2 | Survey 2 (R2) |
| 4 | Public Brand Parity & Dynamic Branding | Public queries scoped by active brand, dynamic logo in `Navbar.tsx`, and CSS theme variables for `html[data-brand="sonqo"]` in `globals.css`. | M2 | Survey 2 (R2) |
| 5 | Comprehensive Tour/Plan CMS | Full tour CRUD in `/admin/tours`: 3-tier pricing (adult, child, infant), exclusions, day-by-day dynamic itinerary repeater, and tenant binding. | M3 | Survey 3 (R3) |
| 6 | Brand-Aware Tour Availability | Tour availability batch generation and slot management in `/admin/availability` scoped to active brand. | M3 | Survey 3 (R3) |
| 7 | Media Gallery Management for Tours | Multi-image gallery editor in `TourForm.tsx` managing `tours.images TEXT[]` (add, reorder, remove image URLs). | M4 | Survey 3 (R4) |
| 8 | Visual Asset & Banner Distribution CMS | CMS interface in `/admin/settings` (or `/admin/visuals`) to configure Hero Slider banners and section photos per brand, dynamically consumed by `HeroSlider.tsx`. | M4 | Survey 3 (R4) |
| 9 | Automated E2E Verification Suite | Standalone automated test script verifying auth gate, brand isolation, tour CRUD with itinerary/pricing, and photo distribution. | M5 | Survey 3 (R5) |
| 10 | Production Build & Git Delivery | Successful `npm run build`, lint configuration updates for `.agents/`, git commit and `git push` to remote repository. | M5 | Survey 3 (R5) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Core Database Partitioning & Auth Security | Migration `0007_multi_brand_cms.sql`, server action auth guards, login redirect fix, and admin password management. | none | DONE |
| M2 | Multi-Brand Admin Context & Public Brand Parity | Admin brand switcher (`admin_brand` cookie), AdminSidebar integration, scoped admin queries, dynamic Navbar logo, and Sonqo CSS theme in `globals.css`. | M1 | DONE |
| M3 | Comprehensive Tour & Availability CMS Management | Upgraded `TourForm.tsx` & actions (itinerary repeater, exclusions, 3-tier pricing, tenant assignment) and scoped availability management. | M1, M2 | DONE |
| M4 | Visual Asset & Media Gallery Distribution | Dynamic HeroSlider settings per brand, visual assets CMS editor, and tour gallery (`images TEXT[]`) manager. | M1, M2, M3 | DONE |
| M5 | E2E Verification, Build Validation & Push | Automated verification script (`scripts/verify-cms.ts`), `npm run build` validation, git commit, and `git push`. | M1, M2, M3, M4 | IN_PROGRESS |

## Interface Contracts
### `src/lib/admin-brand.ts` ↔ Admin Pages & Actions
- `getAdminActiveBrand(): Promise<BrandId>`: Returns `'mta'` or `'sonqo'` based on `admin_brand` cookie (defaults to `'mta'`).
- `setAdminActiveBrand(brand: BrandId): Promise<void>`: Sets `admin_brand` cookie and revalidates `/admin`.

### `src/lib/supabase/` ↔ Server Actions & API
- All mutating server actions must call `const { data: { user } } = await supabase.auth.getUser(); if (!user) throw new Error('Unauthorized');`.
- Database operations must include `tenant` column in queries and inserts (`.eq('tenant', activeBrand)`).

### `tours` Table Interface
- `id`: UUID (PK)
- `slug`: VARCHAR(255) (Unique per tenant: `UNIQUE(tenant, slug)`)
- `tenant`: VARCHAR(50) NOT NULL DEFAULT 'mta'
- `title`: VARCHAR(255) NOT NULL
- `description`: TEXT
- `price_adult`: DECIMAL(10,2)
- `price_child`: DECIMAL(10,2)
- `price_infant`: DECIMAL(10,2)
- `duration`: VARCHAR(100)
- `tag`: VARCHAR(50)
- `image_url`: TEXT NOT NULL (Primary hero image)
- `images`: TEXT[] DEFAULT '{}' (Gallery images)
- `inclusions`: TEXT[] DEFAULT '{}'
- `exclusions`: TEXT[] DEFAULT '{}'
- `itinerary`: JSONB DEFAULT '[]' (Array of `{ day: number, title: string, description: string }`)
- `category_id`: UUID (FK categories)
- `destination_id`: UUID (FK destinations)
- `is_active`: BOOLEAN DEFAULT TRUE

### `site_settings` Table Interface
- `id`: UUID (PK)
- `tenant`: VARCHAR(50) NOT NULL DEFAULT 'mta'
- `key`: VARCHAR(255) NOT NULL (Unique per tenant: `UNIQUE(tenant, key)`)
- `value`: TEXT (or JSON string for structured assets like `home_hero_slides`)
- `description`: TEXT

## Code Layout
- `supabase/migrations/0007_multi_brand_cms.sql`: Database schema updates for multi-brand and tour/media fields.
- `src/lib/admin-brand.ts`: Admin brand context helpers.
- `src/app/admin/actions.ts`: Admin global actions (brand switching, password updates).
- `src/app/admin/layout.tsx`: Admin layout with brand context and navigation.
- `src/components/admin/AdminSidebar.tsx`: Admin sidebar with brand selector.
- `src/components/admin/TourForm.tsx`: Comprehensive tour editor with itinerary, exclusions, pricing, and gallery.
- `src/app/admin/tours/actions.ts`: Tour CRUD actions with auth and tenant handling.
- `src/app/admin/settings/`: Visual asset and site settings management.
- `src/components/home/HeroSlider.tsx`: Dynamic brand-aware hero slider.
- `src/components/layout/Navbar.tsx`: Brand-aware navbar logo.
- `src/app/globals.css`: Sonqo brand CSS variable tokens.
- `src/lib/validation.ts`: Core URL, image, and string validation utilities.
- `src/lib/gallery.ts`: Media gallery manipulation, reordering, and boundary validation.
- `src/lib/tours.ts`: Tour inclusions/exclusions list sanitization and 3-tier pricing rules.
- `src/lib/visual-assets.ts`: Hero slider schema, slide validation, JSON parser, and fallback banners.
- `tests/e2e/`: 4-tier systematic E2E test suite (95 tests across Tiers 1–4).
- `TEST_INFRA.md`: E2E test infrastructure and 4-tier methodology specification.
- `TEST_READY.md`: E2E test suite completion signal (95/95 passing, clean audit).
- `scripts/verify-cms.ts`: Automated test script for acceptance criteria verification.

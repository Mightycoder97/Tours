# E2E Test Infra: Machu Picchu Travel Adventures & Sonqo Perú Travel CMS

## Test Philosophy
- **Opaque-box, requirement-driven**: Tests validate system behavior through external entry points, server action boundaries, API contracts, and database isolation without binding to internal implementation details.
- **Strict Multi-Brand Independence**: All verification confirms complete isolation between MTA (`mta`) and Sonqo (`sonqo`) tenants across tours, settings, banners, and availability.
- **Methodology**: 4-tier systematic testing incorporating Category-Partition, Boundary Value Analysis (BVA), Pairwise Combinatorial interactions, and Real-World End-to-End Workflows.

## Feature Inventory & Tier Mapping
| # | Feature | Source Requirement | Tier 1 | Tier 2 | Tier 3 |
|---|---------|-------------------|:------:|:------:|:------:|
| 1 | Encrypted Admin Auth & Route Protection | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | Multi-Brand Database & Tenant Isolation | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 3 | Admin Multi-Brand Context Switcher | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 4 | Public Brand Parity & Dynamic Branding | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 5 | Comprehensive Tour/Plan CMS | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 6 | Brand-Aware Tour Availability | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 7 | Media Gallery Management for Tours | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 8 | Visual Asset & Banner Distribution CMS | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |

## Test Architecture
- **Location**: `tests/e2e/` and executable entrypoint `tests/e2e/run-all.ts` (or `scripts/verify-cms.ts`).
- **Execution Command**: `npm run test:e2e` (or `npx tsx tests/e2e/run-all.ts`).
- **Pass/Fail Semantics**: Process exit code 0 indicates 100% passing tests. Non-zero exit code on any assertion failure with detailed failure diagnostics.
- **Test Runner Format**: Self-contained TypeScript test runner with clear Tier categorizations, test suites, individual test names, execution timings, and assertion results.

### Directory Layout
```
tests/e2e/
├── harness/
│   ├── env.ts              # Test environment & Supabase connection helpers
│   ├── auth-helper.ts      # Auth tokens, encrypted credentials & session mock
│   ├── brand-helper.ts     # Brand context & cookie manipulation
│   └── assertions.ts       # Domain-specific test assertion utilities
├── tier1-feature/
│   ├── auth.test.ts        # 5 feature tests for Auth & Route Protection
│   ├── tenant.test.ts      # 5 feature tests for Multi-Brand Isolation
│   ├── switcher.test.ts    # 5 feature tests for Brand Context Switcher
│   ├── public.test.ts      # 5 feature tests for Public Brand Parity
│   ├── tours.test.ts       # 5 feature tests for Tour CRUD (itinerary, pricing)
│   ├── availability.test.ts# 5 feature tests for Tour Availability
│   ├── gallery.test.ts     # 5 feature tests for Media Gallery Management
│   └── visual-assets.test.ts# 5 feature tests for Banner/Visual CMS
├── tier2-boundary/
│   ├── auth-boundary.test.ts       # 5 boundary tests (passwords, sessions, redirects)
│   ├── tenant-boundary.test.ts     # 5 boundary tests (invalid tenant, case-sensitivity)
│   ├── switcher-boundary.test.ts   # 5 boundary tests (corrupted cookies, rapid toggling)
│   ├── public-boundary.test.ts     # 5 boundary tests (missing host headers, fallback)
│   ├── tours-boundary.test.ts      # 5 boundary tests (0-day itinerary, $0 prices, huge text)
│   ├── availability-boundary.test.ts# 5 boundary tests (past dates, 0 capacity, leap days)
│   ├── gallery-boundary.test.ts    # 5 boundary tests (empty gallery, duplicate URLs, max limit)
│   └── visual-assets-boundary.test.ts# 5 boundary tests (malformed JSON, empty slides)
├── tier3-pairwise/
│   └── cross-feature.test.ts       # 10 pairwise cross-feature interaction tests
├── tier4-workload/
│   └── scenarios.test.ts           # 5 real-world end-to-end user application scenarios
└── run-all.ts                      # Standalone master test runner executing all Tiers
```

## Detailed Test Specifications

### Tier 1: Feature Coverage (40 Tests, 5 per Feature)
#### Feature 1: Encrypted Admin Auth & Route Protection
- T1.1.1: Valid login with encrypted/hashed password succeeds and establishes session.
- T1.1.2: Unauthenticated request to `/admin` routes receives redirect to `/login`.
- T1.1.3: Login redirect maintains `redirectTo` destination parameter upon authentication.
- T1.1.4: Server actions enforce authentication check and reject unauthenticated mutations.
- T1.1.5: Logout successfully invalidates session and redirects away from `/admin`.

#### Feature 2: Multi-Brand Database & Tenant Isolation
- T2.1.1: `tours` table enforces `tenant` column default and values (`mta`, `sonqo`).
- T2.1.2: `site_settings` table enforces `tenant` column partition.
- T2.1.3: Same tour slug can exist independently in `mta` and `sonqo` without unique conflict (`UNIQUE(tenant, slug)`).
- T2.1.4: Same site setting key can exist independently in `mta` and `sonqo` (`UNIQUE(tenant, key)`).
- T2.1.5: Querying with tenant filter returns exclusively data belonging to specified tenant.

#### Feature 3: Admin Multi-Brand Context Switcher
- T3.1.1: Setting active brand to `sonqo` stores `admin_brand=sonqo` cookie.
- T3.1.2: Setting active brand to `mta` stores `admin_brand=mta` cookie.
- T3.1.3: Default admin brand is `mta` when no cookie is set.
- T3.1.4: Admin layout / header reflects current active brand context.
- T3.1.5: Switching brand revalidates administrative view data for the selected brand.

#### Feature 4: Public Brand Parity & Dynamic Branding
- T4.1.1: Public site renders MTA branding (logo, primary teal theme) in default context.
- T4.1.2: Public site renders Sonqo branding (`data-brand="sonqo"`, custom palette) when requested.
- T4.1.3: Public tour listings filter strictly by active public brand tenant.
- T4.1.4: Public tour detail page loads tour matching active brand without cross-brand leak.
- T4.1.5: Brand configuration in `src/lib/brand.ts` provides complete metadata for both brands.

#### Feature 5: Comprehensive Tour/Plan CMS
- T5.1.1: Admin can create new tour with 3-tier pricing (`price_adult`, `price_child`, `price_infant`).
- T5.1.2: Admin can edit tour details and update prices for all 3 passenger tiers.
- T5.1.3: Tour supports dynamic day-by-day itinerary stored as structured JSON.
- T5.1.4: Tour supports explicit lists of inclusions and exclusions.
- T5.1.5: Admin can toggle tour active/inactive state and delete a tour.

#### Feature 6: Brand-Aware Tour Availability
- T6.1.1: Availability slots can be created for specific dates with capacity and price overrides.
- T6.1.2: Availability generation is bound to tours belonging to the active brand.
- T6.1.3: Booking a tour updates availability counts accurately.
- T6.1.4: Admin can view availability calendar filtered by active brand tours.
- T6.1.5: Sold out dates prevent further bookings in the public booking sidebar.

#### Feature 7: Media Gallery Management for Tours
- T7.1.1: Tour primary hero image (`image_url`) is configured and persisted.
- T7.1.2: Multiple gallery images can be added to `images TEXT[]`.
- T7.1.3: Gallery images can be reordered in the CMS.
- T7.1.4: Gallery images can be removed individually.
- T7.1.5: Public tour detail page renders the full gallery image set.

#### Feature 8: Visual Asset & Banner Distribution CMS
- T8.1.1: Admin can configure Hero Slider slides (title, subtitle, image, link) for MTA in `site_settings`.
- T8.1.2: Admin can configure Hero Slider slides for Sonqo in `site_settings`.
- T8.1.3: Hero slider CMS updates persist as valid JSON in `site_settings`.
- T8.1.4: `HeroSlider.tsx` dynamically renders slides from active brand settings.
- T8.1.5: Section promotional banners can be updated independently per brand.

---

### Tier 2: Boundary & Corner Cases (40 Tests, 5 per Feature)
#### Feature 1: Encrypted Admin Auth & Route Protection Boundaries
- T1.2.1: Login attempt with empty email or empty password gracefully rejected.
- T1.2.2: Login attempt with invalid password hash / plaintext mismatch rejected.
- T1.2.3: Rapid repeated login failures trigger rate-limiting or controlled rejection without crash.
- T1.2.4: Malformed redirect URL in `redirectTo` (open redirect vector) sanitizes to default `/admin`.
- T1.2.5: Expired JWT / auth token triggers clean redirect to `/login` with session expiration message.

#### Feature 2: Multi-Brand Database Boundaries
- T2.2.1: Attempting to insert tour with invalid/unknown tenant value is rejected.
- T2.2.2: Tenant identifiers are strictly case-normalized (case-insensitive handling).
- T2.2.3: Querying non-existent tenant returns empty set rather than throwing error.
- T2.2.4: Cross-tenant foreign key integrity preserved across shared category/destination tables.
- T2.2.5: Concurrent tour inserts with same slug in different tenants succeed simultaneously.

#### Feature 3: Admin Brand Switcher Boundaries
- T3.2.1: Corrupted or tampered `admin_brand` cookie value gracefully defaults to `'mta'`.
- T3.2.2: Empty string in `admin_brand` cookie falls back to `'mta'`.
- T3.2.3: Rapid toggling between `mta` and `sonqo` does not cause race conditions or state pollution.
- T3.2.4: Sub-paths under `/admin/tours/[id]` preserve active brand state.
- T3.2.5: Switching brand while viewing an edit form warns or gracefully redirects to parent list.

#### Feature 4: Public Brand Parity Boundaries
- T4.2.1: Host header with unmapped domain defaults gracefully to primary brand (`mta`).
- T4.2.2: Missing CSS theme variables for brand fall back to root tokens.
- T4.2.3: Direct navigation to a Sonqo tour slug while on MTA domain returns 404 or redirects cleanly.
- T4.2.4: High concurrency public requests for both brands serve correct respective assets.
- T4.2.5: Special characters in brand search queries do not crash brand filter logic.

#### Feature 5: Tour CMS Boundaries
- T5.2.1: Price adult = 0, negative prices rejected with validation errors.
- T5.2.2: Price infant > price adult rejected or handled with validation warning.
- T5.2.3: Empty itinerary (0 days) and large itinerary (30+ days) handled without JSON truncation.
- T5.2.4: Exclusions list with empty strings or special characters sanitized properly.
- T5.2.5: Maximum length title (255 chars) and extreme description (50k chars) handled gracefully.

#### Feature 6: Tour Availability Boundaries
- T6.2.1: Availability generation for dates in the past is rejected or marked historical.
- T6.2.2: Leap day (February 29) availability handled correctly across year boundaries.
- T6.2.3: Zero capacity slot marks tour immediately unavailable.
- T6.2.4: Overbooking attempt (requesting more seats than capacity) cleanly rejected.
- T6.2.5: Batch availability creation with 365 days generated efficiently without timeout.

#### Feature 7: Media Gallery Boundaries
- T7.2.1: Tour with 0 gallery images (empty array) renders without layout break or null pointer.
- T7.2.2: Duplicate image URLs in gallery deduplicated or preserved cleanly.
- T7.2.3: Extremely long image URL (2048+ chars) or malformed URL rejected by validator.
- T7.2.4: Maximum gallery size (50 images) handled smoothly.
- T7.2.5: Single image gallery reorder operation behaves idempotently.

#### Feature 8: Visual Asset CMS Boundaries
- T8.2.1: Setting `home_hero_slides` to empty array displays default fallback banner.
- T8.2.2: Setting `home_hero_slides` with malformed JSON string gracefully caught with error.
- T8.2.3: Slide missing optional link URL renders as non-clickable slide without crash.
- T8.2.4: Maximum slide count (10+ slides) renders with functional carousel controls.
- T8.2.5: Cross-tenant visual asset overwrite attempt rejected.

---

### Tier 3: Cross-Feature Combinations (10 Pairwise Tests)
- T3.0.1 (F1 + F3): Admin brand switcher retains authenticated session across brand transitions without forcing re-login.
- T3.0.2 (F2 + F5): Tour creation in MTA context persists with `tenant='mta'`; switching to Sonqo context hides the MTA tour and permits creating a same-slug Sonqo tour.
- T3.0.3 (F3 + F5): Admin tours listing filters exclusively by the active brand selected in the switcher.
- T3.0.4 (F3 + F6): Availability batch creation under Sonqo context only attaches availability to Sonqo tours.
- T3.0.5 (F3 + F8): Updating Hero Slides in Admin Visual CMS under Sonqo writes only to `site_settings WHERE tenant='sonqo'`.
- T3.0.6 (F4 + F5): Public tour catalog for MTA displays only MTA tours; public catalog for Sonqo displays only Sonqo tours.
- T3.0.7 (F4 + F8): Public homepage on Sonqo displays Sonqo hero slides; public homepage on MTA displays MTA hero slides.
- T3.0.8 (F5 + F7): Tour creation with full gallery images persists both `image_url` and `images TEXT[]` atomically.
- T3.0.9 (F5 + F6): Modifying tour pricing or active status immediately reflects in availability booking calculations.
- T3.0.10 (F1 + F5 + F8): Unauthenticated direct POST/mutation to Tour CRUD and Settings CMS rejected with 401 Unauthorized.

---

### Tier 4: Real-World Application Scenarios (5 Workloads)
- **Scenario 1: Complete MTA Tour Lifecycle**
  Admin logs in with encrypted credentials -> switches to MTA brand -> creates 4-day Machu Picchu Luxury Tour with 3-tier pricing ($500 adult, $350 child, $100 infant), 4-day detailed itinerary, 6 inclusions, 3 exclusions, hero image and 4 gallery photos -> generates 60 days of availability -> verifies tour appears in public MTA catalog -> verifies public detail page shows full itinerary, gallery, and allows date selection.
- **Scenario 2: Complete Sonqo Tour Lifecycle with Multi-Brand Isolation**
  Admin switches context to Sonqo Perú Travel -> creates exclusive "Ruta Mística Sonqo" tour -> attaches Sonqo-specific gallery and pricing -> verifies tour is visible under Sonqo public routes -> verifies tour is completely invisible under MTA public routes -> verifies database records strict `tenant='sonqo'`.
- **Scenario 3: Visual Identity & Banner Rebranding Campaign**
  Admin navigates to Visual Assets CMS -> configures 3 seasonal hero slides for MTA -> switches context to Sonqo -> configures 2 distinct cultural hero slides for Sonqo -> verifies public MTA homepage serves MTA slides with teal theme -> verifies public Sonqo homepage serves Sonqo slides with Sonqo branding.
- **Scenario 4: Concurrent Multi-Tenant Administration**
  Simulate interleaved administrative operations between MTA and Sonqo sessions: MTA creates tour A; Sonqo creates tour B; MTA updates slide; Sonqo updates availability for tour B; MTA deletes tour A. Assert that at every stage, neither tenant's data was modified or exposed to the other.
- **Scenario 5: Security & Session Integrity Audit**
  Attempt access to `/admin`, `/admin/tours`, `/admin/settings` without cookie -> assert redirect to `/login?redirectTo=...` -> attempt login with wrong password -> assert failure message -> login with valid encrypted password -> assert redirected to original target -> tamper with session cookie -> assert next mutation is blocked -> logout and verify complete revocation.

## Coverage Thresholds
- **Tier 1**: 40 tests (5 per feature × 8 features)
- **Tier 2**: 40 tests (5 per feature × 8 features)
- **Tier 3**: 10 tests (pairwise cross-feature interactions)
- **Tier 4**: 5 realistic multi-step application scenarios
- **Total Suite**: 95 comprehensive automated test assertions.

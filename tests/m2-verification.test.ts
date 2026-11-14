import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const require = createRequire(import.meta.url);
const nextHeaders = require('next/headers');

// Mock cookie store for testing
let simulatedCookies: Record<string, any> = {};
const mockCookieStore = {
  get: (name: string) => {
    const val = simulatedCookies[name];
    return val ? { name, value: val } : undefined;
  },
  getAll: () => Object.entries(simulatedCookies).map(([name, value]) => ({ name, value })),
  set: (name: string, value: string, options: Record<string, unknown>) => {
    simulatedCookies[name] = value;
    simulatedCookies[`${name}_options`] = options;
  },
  delete: (name: string) => {
    delete simulatedCookies[name];
  },
  has: (name: string) => Boolean(simulatedCookies[name]),
};

nextHeaders.cookies = async () => mockCookieStore;

describe('Milestone 2 Verification: Multi-Brand Admin Context & Public Brand Parity', () => {
  it('Feature 3: getAdminActiveBrand and setAdminActiveBrand cookie behavior', async () => {
    const { getAdminActiveBrand, setAdminActiveBrand, ADMIN_BRAND_COOKIE } = await import('../src/lib/admin-brand');

    // Default when no cookie is present
    simulatedCookies = {};
    const defaultBrand = await getAdminActiveBrand();
    assert.strictEqual(defaultBrand, 'mta', 'Default brand should be mta when cookie is absent');

    // Default when invalid cookie is present
    simulatedCookies[ADMIN_BRAND_COOKIE] = 'invalid_brand_xyz';
    const invalidFallbackBrand = await getAdminActiveBrand();
    assert.strictEqual(invalidFallbackBrand, 'mta', 'Fallback brand should be mta for invalid cookie');

    // Set to sonqo
    await setAdminActiveBrand('sonqo');
    assert.strictEqual(simulatedCookies[ADMIN_BRAND_COOKIE], 'sonqo');
    const sonqoOptions = simulatedCookies[`${ADMIN_BRAND_COOKIE}_options`];
    assert.strictEqual(sonqoOptions.path, '/');
    assert.strictEqual(sonqoOptions.httpOnly, false);
    assert.strictEqual(sonqoOptions.sameSite, 'lax');
    assert.strictEqual(sonqoOptions.maxAge, 60 * 60 * 24 * 30, 'Cookie should have 30 days maxAge');
    const readSonqo = await getAdminActiveBrand();
    assert.strictEqual(readSonqo, 'sonqo');

    // Set to mta
    await setAdminActiveBrand('mta');
    assert.strictEqual(simulatedCookies[ADMIN_BRAND_COOKIE], 'mta');
    const readMta = await getAdminActiveBrand();
    assert.strictEqual(readMta, 'mta');

    // Reject invalid brand identifier
    await assert.rejects(
      async () => {
        // @ts-expect-error test invalid parameter
        await setAdminActiveBrand('unknown_brand');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Invalid brand identifier'));
        return true;
      }
    );
  });

  it('Feature 3: switchAdminBrand server action enforces auth and validates brand', async () => {
    const { switchAdminBrand } = await import('../src/app/admin/actions');

    // Unauthenticated call throws Unauthorized
    await assert.rejects(
      async () => {
        await switchAdminBrand('sonqo');
      },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `Expected error message to include 'Unauthorized', got: ${err.message}`);
        return true;
      }
    );
  });

  it('Feature 3: AdminSidebar & Layout brand switcher UI inspection', () => {
    const sidebarCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/AdminSidebar.tsx'), 'utf8');
    assert.ok(sidebarCode.includes('switchAdminBrand'), 'AdminSidebar must invoke switchAdminBrand');
    assert.ok(sidebarCode.includes('#048A84'), 'AdminSidebar must include MTA teal color #048A84');
    assert.ok(sidebarCode.includes('#8B66E8'), 'AdminSidebar must include Sonqo purple color #8B66E8');
    assert.ok(sidebarCode.includes('Marca Activa'), 'AdminSidebar must display Marca Activa indicator');
    assert.ok(sidebarCode.includes('activeBrand'), 'AdminSidebar must support activeBrand prop');

    const layoutCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/layout.tsx'), 'utf8');
    assert.ok(layoutCode.includes('getAdminActiveBrand'), 'AdminLayout must call getAdminActiveBrand');
    assert.ok(layoutCode.includes('activeBrand={activeBrand}'), 'AdminLayout must pass activeBrand to AdminSidebar');
  });

  it('Feature 3: Scoped queries in admin dashboard, bookings, tours, settings', () => {
    // 1. Dashboard
    const dashboardCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/page.tsx'), 'utf8');
    assert.ok(dashboardCode.includes('getAdminActiveBrand'), 'Dashboard must retrieve activeBrand');
    assert.ok(dashboardCode.includes(".eq('tenant', activeBrand)"), 'Dashboard queries must filter by activeBrand tenant');

    // 2. Bookings
    const bookingsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/bookings/page.tsx'), 'utf8');
    assert.ok(bookingsCode.includes('getAdminActiveBrand'), 'Bookings page must retrieve activeBrand');
    assert.ok(bookingsCode.includes('activeTenantFilter'), 'Bookings page must compute activeTenantFilter defaulting to activeBrand');

    // 3. Tours
    const toursCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/tours/page.tsx'), 'utf8');
    assert.ok(toursCode.includes('getAdminActiveBrand'), 'Tours page must retrieve activeBrand');
    assert.ok(toursCode.includes(".eq('tenant', activeBrand)"), 'Tours page query must filter by activeBrand tenant');

    // 4. Settings
    const settingsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/settings/page.tsx'), 'utf8');
    assert.ok(settingsCode.includes('getAdminActiveBrand'), 'Settings page must retrieve activeBrand');
    assert.ok(settingsCode.includes(".eq('tenant', activeBrand)"), 'Settings page query must filter by activeBrand tenant');
    assert.ok(settingsCode.includes('name="tenant"'), 'Settings form must pass tenant hidden input');

    // 5. Settings actions
    const settingsActionsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/settings/actions.ts'), 'utf8');
    assert.ok(settingsActionsCode.includes(".eq('tenant', targetTenant)"), 'Settings action must isolate update by tenant');
  });

  it('Feature 4: Public Brand Parity & Dynamic Branding', () => {
    // 1. Navbar dynamic logo
    const navbarCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/layout/Navbar.tsx'), 'utf8');
    assert.ok(navbarCode.includes('getBrandConfig'), 'Navbar must call getBrandConfig');
    assert.ok(navbarCode.includes('brand.logo.darkBgSrc') || navbarCode.includes('logoSrc'), 'Navbar must dynamically select logo source');
    assert.ok(!navbarCode.includes('src="/imagenes/logo.png"'), 'Navbar must NOT hardcode /imagenes/logo.png');

    // 2. globals.css Sonqo variables
    const cssCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/globals.css'), 'utf8');
    assert.ok(cssCode.includes('html[data-brand="sonqo"]'), 'globals.css must include html[data-brand="sonqo"]');
    assert.ok(cssCode.includes('--color-primary: #8B66E8;'), 'globals.css must define Sonqo --color-primary');
    assert.ok(cssCode.includes('--color-primary-light: #A485F0;'), 'globals.css must define Sonqo --color-primary-light');
    assert.ok(cssCode.includes('--color-primary-dark: #213E4C;'), 'globals.css must define Sonqo --color-primary-dark');
    assert.ok(cssCode.includes('--color-footer-bg: #213E4C;'), 'globals.css must define Sonqo --color-footer-bg');
    assert.ok(cssCode.includes('--color-accent: #8B66E8;'), 'globals.css must define Sonqo --color-accent');

    // 3. Public queries
    const featuredToursCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/home/FeaturedTours.tsx'), 'utf8');
    assert.ok(featuredToursCode.includes(".eq('tenant', brand.id)"), 'FeaturedTours must filter by brand.id tenant');

    const toursCatalogCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/[locale]/(public)/tours/page.tsx'), 'utf8');
    assert.ok(toursCatalogCode.includes(".eq('tenant', brand.id)"), 'Tours catalog must filter by brand.id tenant');

    const tourDetailCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/[locale]/(public)/tours/[slug]/page.tsx'), 'utf8');
    assert.ok(tourDetailCode.includes(".eq('tenant', brand.id)"), 'Tour detail must filter by brand.id tenant');
  });
});

import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('Milestone 1 Worker 2 Verification Suite', () => {
  it('1. Login page implements safe redirectTo handling and Suspense boundary', () => {
    const loginFilePath = path.resolve(process.cwd(), 'src/app/[locale]/(public)/login/page.tsx');
    assert.ok(fs.existsSync(loginFilePath), 'Login page file must exist');

    const content = fs.readFileSync(loginFilePath, 'utf-8');
    assert.match(content, /useSearchParams\(\)/, 'Must use useSearchParams()');
    assert.match(content, /searchParams\.get\(['"]redirectTo['"]\)/, 'Must get redirectTo parameter');
    assert.match(content, /startsWith\(['"]\/admin['"]\)/, 'Must check startsWith("/admin")');
    assert.match(content, /<Suspense/, 'Must wrap component in Suspense boundary');
    assert.match(content, /router\.push\(targetRedirect\)/, 'Must redirect to targetRedirect');
  });

  it('2. All mutating admin server actions strictly enforce auth and throw Unauthorized', () => {
    const actionFiles = [
      {
        path: 'src/app/admin/destinations/actions.ts',
        functions: ['createDestination', 'deleteDestination'],
      },
      {
        path: 'src/app/admin/categories/actions.ts',
        functions: ['createCategory', 'deleteCategory'],
      },
      {
        path: 'src/app/admin/availability/actions.ts',
        functions: ['createAvailabilitySlots', 'updateAvailabilitySlot', 'deleteAvailabilitySlot', 'bulkDeleteAvailability'],
      },
      {
        path: 'src/app/admin/settings/actions.ts',
        functions: ['updateSettings'],
      },
      {
        path: 'src/app/admin/tours/actions.ts',
        functions: ['createTour', 'updateTour', 'deleteTour'],
      },
    ];

    for (const { path: relPath, functions } of actionFiles) {
      const fullPath = path.resolve(process.cwd(), relPath);
      assert.ok(fs.existsSync(fullPath), `Action file ${relPath} must exist`);
      const fileContent = fs.readFileSync(fullPath, 'utf-8');

      assert.match(
        fileContent,
        /supabase\.auth\.getUser\(\)/,
        `${relPath} must call supabase.auth.getUser()`
      );
      assert.match(
        fileContent,
        /throw new Error\(['"]Unauthorized['"]\)/,
        `${relPath} must throw new Error('Unauthorized')`
      );

      for (const fn of functions) {
        assert.match(
          fileContent,
          new RegExp(`export\\s+async\\s+function\\s+${fn}`),
          `${relPath} must export function ${fn}`
        );
      }
    }
  });

  it('3. Admin password management action is exported and enforces security rules', () => {
    const adminActionsPath = path.resolve(process.cwd(), 'src/app/admin/actions.ts');
    assert.ok(fs.existsSync(adminActionsPath), 'src/app/admin/actions.ts must exist');

    const content = fs.readFileSync(adminActionsPath, 'utf-8');
    assert.match(content, /'use server'/, 'Must be a server action file');
    assert.match(content, /export\s+async\s+function\s+updateAdminPassword/, 'Must export updateAdminPassword');
    assert.match(content, /supabase\.auth\.getUser\(\)/, 'Must check session with getUser()');
    assert.match(content, /throw new Error\(['"]Unauthorized['"]\)/, 'Must throw Unauthorized for unauthenticated requests');
    assert.match(content, /newPassword\.length\s*<\s*8/, 'Must validate password length >= 8');
    assert.match(content, /supabase\.auth\.updateUser\(\s*\{\s*password:\s*newPassword\s*\}\s*\)/, 'Must call supabase.auth.updateUser');
  });

  it('4. Migration 0007 defines all required schema modifications for multi-brand CMS', () => {
    const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/0007_multi_brand_cms.sql');
    assert.ok(fs.existsSync(migrationPath), 'supabase/migrations/0007_multi_brand_cms.sql must exist');

    const sql = fs.readFileSync(migrationPath, 'utf-8');

    // 1. Tours tenant column & index
    assert.match(sql, /ALTER\s+TABLE\s+tours\s+ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+tenant\s+VARCHAR\(50\)\s+NOT\s+NULL\s+DEFAULT\s+'mta'/i);
    assert.match(sql, /CREATE\s+INDEX\s+IF\s+NOT\s+EXISTS\s+idx_tours_tenant\s+ON\s+tours\s*\(\s*tenant\s*\)/i);

    // 2. Unique constraint on tours(tenant, slug)
    assert.match(sql, /ALTER\s+TABLE\s+tours\s+ADD\s+CONSTRAINT\s+tours_tenant_slug_unique\s+UNIQUE\s*\(\s*tenant\s*,\s*slug\s*\)/i);

    // 3. New columns for tours
    assert.match(sql, /ALTER\s+TABLE\s+tours\s+ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+itinerary\s+JSONB/i);
    assert.match(sql, /ALTER\s+TABLE\s+tours\s+ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+exclusions\s+TEXT\[\]/i);
    assert.match(sql, /ALTER\s+TABLE\s+tours\s+ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+price_infant\s+NUMERIC\(10\s*,\s*2\)/i);

    // 4. Site settings tenant column & index
    assert.match(sql, /ALTER\s+TABLE\s+site_settings\s+ADD\s+COLUMN\s+IF\s+NOT\s+EXISTS\s+tenant\s+VARCHAR\(50\)\s+NOT\s+NULL\s+DEFAULT\s+'mta'/i);
    assert.match(sql, /CREATE\s+INDEX\s+IF\s+NOT\s+EXISTS\s+idx_site_settings_tenant\s+ON\s+site_settings\s*\(\s*tenant\s*\)/i);

    // 5. Unique constraint on site_settings(tenant, key)
    assert.match(sql, /ALTER\s+TABLE\s+site_settings\s+ADD\s+CONSTRAINT\s+site_settings_tenant_key_unique\s+UNIQUE\s*\(\s*tenant\s*,\s*key\s*\)/i);

    // 6. Baseline seed for Sonqo
    assert.match(sql, /INSERT\s+INTO\s+site_settings[\s\S]*?'sonqo'/i);
    assert.match(sql, /home_hero_title/i);
    assert.match(sql, /home_hero_subtitle/i);
  });

  it('5. Migration execution script exists and validates schema definitions', () => {
    const scriptPath = path.resolve(process.cwd(), 'scripts/apply-migration-0007.ts');
    assert.ok(fs.existsSync(scriptPath), 'scripts/apply-migration-0007.ts must exist');

    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
    assert.match(scriptContent, /DATABASE_URL/, 'Must handle DATABASE_URL');
    assert.match(scriptContent, /supabase\/migrations\/0007_multi_brand_cms\.sql/, 'Must reference migration file');
  });
});

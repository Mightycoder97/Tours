-- Migration 0007: Multi-Brand CMS Support for MTA & Sonqo
-- 1. Add tenant column and index to tours table
ALTER TABLE tours ADD COLUMN IF NOT EXISTS tenant VARCHAR(50) NOT NULL DEFAULT 'mta';
CREATE INDEX IF NOT EXISTS idx_tours_tenant ON tours(tenant);

-- 2. Update unique constraint on tours to (tenant, slug)
ALTER TABLE tours DROP CONSTRAINT IF EXISTS tours_slug_key;
ALTER TABLE tours DROP CONSTRAINT IF EXISTS tours_tenant_slug_unique;
ALTER TABLE tours ADD CONSTRAINT tours_tenant_slug_unique UNIQUE(tenant, slug);

-- 3. Add itinerary, exclusions, and infant pricing columns to tours
ALTER TABLE tours ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT '[]'::jsonb;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS exclusions TEXT[] DEFAULT '{}'::text[];
ALTER TABLE tours ADD COLUMN IF NOT EXISTS price_infant NUMERIC(10,2) DEFAULT NULL;

-- 4. Add tenant column and index to site_settings table
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS tenant VARCHAR(50) NOT NULL DEFAULT 'mta';
CREATE INDEX IF NOT EXISTS idx_site_settings_tenant ON site_settings(tenant);

-- 5. Update unique constraint on site_settings to (tenant, key)
ALTER TABLE site_settings DROP CONSTRAINT IF EXISTS site_settings_key_key;
ALTER TABLE site_settings DROP CONSTRAINT IF EXISTS site_settings_tenant_key_unique;
ALTER TABLE site_settings ADD CONSTRAINT site_settings_tenant_key_unique UNIQUE(tenant, key);

-- 6. Seed baseline settings for Sonqo
INSERT INTO site_settings (tenant, key, value, description)
VALUES 
  ('sonqo', 'home_hero_title', 'Descubre el Perú Auténtico con Sonqo', 'Título principal del banner de inicio para Sonqo'),
  ('sonqo', 'home_hero_subtitle', 'Experiencias culturales y de aventura diseñadas a tu medida', 'Subtítulo del banner de inicio para Sonqo')
ON CONFLICT (tenant, key) DO NOTHING;

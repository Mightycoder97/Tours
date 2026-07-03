-- 0004_tour_fields.sql
-- Adds additional fields to the tours table

ALTER TABLE tours ADD COLUMN IF NOT EXISTS location VARCHAR(255);
ALTER TABLE tours ADD COLUMN IF NOT EXISTS discount_percentage INTEGER DEFAULT 0;

-- Allow null price_adult (some tours like city-tour-lima have no listed price)
ALTER TABLE tours ALTER COLUMN price_adult DROP NOT NULL;

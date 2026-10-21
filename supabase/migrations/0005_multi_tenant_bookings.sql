-- Add tenant (brand) column to bookings table for multi-brand support
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS tenant VARCHAR(50) NOT NULL DEFAULT 'mta';

CREATE INDEX IF NOT EXISTS idx_bookings_tenant ON bookings(tenant);

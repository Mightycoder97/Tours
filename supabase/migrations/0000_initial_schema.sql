-- Enable the pgcrypto extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum for booking status
CREATE TYPE booking_status AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'FAILED');

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Destinations Table
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tours Table
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price_adult DECIMAL(10, 2) NOT NULL,
  price_child DECIMAL(10, 2),
  duration VARCHAR(100),
  tag VARCHAR(50),
  rating DECIMAL(3, 2) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings Table (Guest Checkout)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code VARCHAR(15) UNIQUE NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE RESTRICT,
  selected_date DATE NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER DEFAULT 0,
  total_usd DECIMAL(10, 2) NOT NULL,
  
  -- Main passenger / Contact person
  passenger_name VARCHAR(255) NOT NULL,
  passenger_email VARCHAR(255) NOT NULL,
  passenger_phone VARCHAR(50),
  
  -- Payment Info
  payment_method VARCHAR(50), -- 'culqi' or 'paypal'
  payment_status booking_status DEFAULT 'PENDING',
  payment_ref VARCHAR(255),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Passengers Table (Detailed guests)
CREATE TABLE passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  doc_type VARCHAR(50) NOT NULL, -- DNI, PASSPORT, etc.
  doc_number VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  is_child BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;

-- Public can read active tours, categories, destinations
CREATE POLICY "Public can read active categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read active destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public can read active tours" ON tours FOR SELECT USING (is_active = true);

-- Public can insert bookings and passengers (for guest checkout)
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read own booking by code" ON bookings FOR SELECT USING (true); -- Usually restricted by the API returning it, but open for simplicity in MVP. Might secure it using Anon Key.
CREATE POLICY "Public can insert passengers" ON passengers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read own passengers" ON passengers FOR SELECT USING (true);

-- Admin can manage all (assuming Admin has authenticated via Supabase Auth)
CREATE POLICY "Admin can manage all categories" ON categories TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can manage all destinations" ON destinations TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can manage all tours" ON tours TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can manage all bookings" ON bookings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can manage all passengers" ON passengers TO authenticated USING (true) WITH CHECK (true);

-- Tour Availability Table
-- Stores per-tour, per-date availability with capacity management
CREATE TABLE tour_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  max_capacity INTEGER NOT NULL DEFAULT 20,
  booked_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tour_id, available_date)
);

-- Index for fast lookups by tour and date
CREATE INDEX idx_tour_availability_tour_date ON tour_availability(tour_id, available_date);

-- Enable RLS
ALTER TABLE tour_availability ENABLE ROW LEVEL SECURITY;

-- Public can read active availability
CREATE POLICY "Public can read active availability" ON tour_availability
  FOR SELECT USING (is_active = true);

-- Authenticated admin can manage all availability
CREATE POLICY "Admin can manage all availability" ON tour_availability
  TO authenticated USING (true) WITH CHECK (true);

-- Function to auto-increment booked_count when a booking is created
CREATE OR REPLACE FUNCTION increment_booked_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tour_availability
  SET booked_count = booked_count + (NEW.adults + COALESCE(NEW.children, 0))
  WHERE tour_id = NEW.tour_id
    AND available_date = NEW.selected_date;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on bookings insert
CREATE TRIGGER trg_increment_booked_count
AFTER INSERT ON bookings
FOR EACH ROW
EXECUTE FUNCTION increment_booked_count();

-- Function to decrement booked_count when a booking is cancelled
CREATE OR REPLACE FUNCTION decrement_booked_count_on_cancel()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.payment_status != 'CANCELLED' AND NEW.payment_status = 'CANCELLED' THEN
    UPDATE tour_availability
    SET booked_count = GREATEST(0, booked_count - (NEW.adults + COALESCE(NEW.children, 0)))
    WHERE tour_id = NEW.tour_id
      AND available_date = NEW.selected_date;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on bookings status update (cancellation)
CREATE TRIGGER trg_decrement_booked_on_cancel
AFTER UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION decrement_booked_count_on_cancel();

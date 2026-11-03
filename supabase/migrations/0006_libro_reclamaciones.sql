-- Create complaints table for Virtual Libro de Reclamaciones (INDECOPI compliance - Ley N° 29571 & D.S. N° 011-2011-PCM)
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_code VARCHAR(30) UNIQUE NOT NULL,
  tenant VARCHAR(50) NOT NULL DEFAULT 'mta',

  -- Provider data snapshot at the time of registration
  provider_legal_name VARCHAR(255) NOT NULL,
  provider_ruc VARCHAR(20) NOT NULL,
  provider_address TEXT NOT NULL,

  -- Consumer data
  consumer_name VARCHAR(255) NOT NULL,
  consumer_doc_type VARCHAR(30) NOT NULL, -- 'DNI', 'CE', 'PASSPORT', 'RUC'
  consumer_doc_number VARCHAR(50) NOT NULL,
  consumer_address TEXT NOT NULL,
  consumer_phone VARCHAR(50) NOT NULL,
  consumer_email VARCHAR(255) NOT NULL,
  is_minor BOOLEAN DEFAULT FALSE,
  guardian_name VARCHAR(255),

  -- Contracted good / service
  good_type VARCHAR(20) NOT NULL DEFAULT 'SERVICIO', -- 'PRODUCTO' | 'SERVICIO'
  claimed_amount DECIMAL(10, 2),
  claimed_currency VARCHAR(10) DEFAULT 'USD',
  good_description TEXT NOT NULL,
  booking_code VARCHAR(50),

  -- Complaint / Claim details
  requirement_type VARCHAR(20) NOT NULL, -- 'RECLAMO' | 'QUEJA'
  detail TEXT NOT NULL,
  consumer_request TEXT NOT NULL,

  -- Signatures & Company Response
  consumer_signature VARCHAR(255) NOT NULL,
  company_response TEXT,
  response_deadline DATE NOT NULL,
  responded_at TIMESTAMPTZ,
  status VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE', -- 'PENDIENTE' | 'ATENDIDO'

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_complaints_code ON complaints(complaint_code);
CREATE INDEX IF NOT EXISTS idx_complaints_tenant ON complaints(tenant);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at DESC);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON TABLE complaints TO anon, authenticated, service_role;
GRANT SELECT, UPDATE, DELETE ON TABLE complaints TO authenticated, service_role;

-- Public can insert complaints (consumers submitting the virtual Libro de Reclamaciones)
DROP POLICY IF EXISTS "Public can insert complaints" ON complaints;
CREATE POLICY "Public can insert complaints" ON complaints
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Authenticated admin users can view and update complaints
DROP POLICY IF EXISTS "Admin can manage all complaints" ON complaints;
CREATE POLICY "Admin can manage all complaints" ON complaints
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


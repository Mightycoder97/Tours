-- Table for storing dynamic site settings like hero text, contact info, etc.
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read site settings
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);

-- Admin can manage site settings
CREATE POLICY "Admin can manage site settings" ON site_settings TO authenticated USING (true) WITH CHECK (true);

-- Insert initial values for the homepage
INSERT INTO site_settings (key, value, description) VALUES
('home_hero_title', 'Encuentra la aventura <br/><span class="text-accent italic">ideal para ti</span>', 'Título principal (HTML permitido para estilos)'),
('home_hero_subtitle', 'Explora nuestros paquetes turísticos cuidadosamente diseñados para ofrecerte una experiencia inolvidable.', 'Subtítulo del Hero en el inicio');

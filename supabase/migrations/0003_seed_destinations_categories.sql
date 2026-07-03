-- 0003_seed_destinations_categories.sql
-- Seeds base destinations and categories

INSERT INTO destinations (name, slug) VALUES
  ('Lima',     'lima'),
  ('Cusco',    'cusco'),
  ('Arequipa', 'arequipa'),
  ('Puno',     'puno')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug) VALUES
  ('City Tour',             'city-tour'),
  ('Aventura',              'aventura'),
  ('Naturaleza',            'naturaleza'),
  ('Cultura',               'cultura'),
  ('Trekking',              'trekking'),
  ('Gastronomía',           'gastronomia'),
  ('Místico',               'mistico'),
  ('Multi-Día',             'multi-dia')
ON CONFLICT (slug) DO NOTHING;

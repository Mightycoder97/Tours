/**
 * High-Fidelity Test Environment & Database Harness
 * Emulates Supabase PostgreSQL with Multi-Brand Tenancy, Constraints, and Seed Data
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env

import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);
const nextHeaders = req('next/headers');

const simulatedCookies: Record<string, string> = {};
const simulatedOptions: Record<string, any> = {};

export const mockCookieStore = {
  get: (name: string) => (simulatedCookies[name] !== undefined ? { name, value: simulatedCookies[name] } : undefined),
  getAll: () => Object.entries(simulatedCookies).map(([name, value]) => ({ name, value })),
  set: (name: string, value: string, options?: any) => {
    simulatedCookies[name] = value;
    simulatedOptions[name] = options;
  },
  delete: (name: string) => {
    delete simulatedCookies[name];
    delete simulatedOptions[name];
  },
  has: (name: string) => simulatedCookies[name] !== undefined,
  clear: () => {
    for (const k of Object.keys(simulatedCookies)) delete simulatedCookies[k];
    for (const k of Object.keys(simulatedOptions)) delete simulatedOptions[k];
  },
  load: (dict: Record<string, string>) => {
    for (const k of Object.keys(simulatedCookies)) delete simulatedCookies[k];
    for (const [k, v] of Object.entries(dict)) {
      simulatedCookies[k] = v;
    }
  },
  getOptions: (name: string) => simulatedOptions[name],
};

nextHeaders.cookies = async () => mockCookieStore;

export type TenantId = 'mta' | 'sonqo';

export interface TourRecord {
  id: string;
  slug: string;
  tenant: TenantId;
  title: string;
  description: string;
  price_adult: number;
  price_child: number | null;
  price_infant: number | null;
  duration: string;
  tag: string;
  image_url: string;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{ day: number; title: string; description: string }>;
  category_id: string | null;
  destination_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRecord {
  id: string;
  tenant: TenantId;
  key: string;
  value: string;
  description: string;
  updated_at: string;
}

export interface TourAvailabilityRecord {
  id: string;
  tour_id: string;
  tenant: TenantId;
  date: string; // YYYY-MM-DD
  capacity: number;
  booked_count: number;
  price_override: number | null;
  is_blocked: boolean;
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
}

export interface DestinationRecord {
  id: string;
  name: string;
  slug: string;
}

export interface AuthUserRecord {
  id: string;
  email: string;
  password_hash: string;
  salt: string;
  created_at: string;
}

export class MockDatabase {
  public tours: Map<string, TourRecord> = new Map();
  public siteSettings: Map<string, SiteSettingRecord> = new Map();
  public tourAvailability: Map<string, TourAvailabilityRecord> = new Map();
  public categories: Map<string, CategoryRecord> = new Map();
  public destinations: Map<string, DestinationRecord> = new Map();
  public authUsers: Map<string, AuthUserRecord> = new Map();

  constructor() {
    this.seed();
  }

  public reset(): void {
    this.tours.clear();
    this.siteSettings.clear();
    this.tourAvailability.clear();
    this.categories.clear();
    this.destinations.clear();
    this.authUsers.clear();
    this.seed();
  }

  public seed(): void {
    // 1. Categories
    const catAdventure: CategoryRecord = {
      id: 'cat-adventure-001',
      name: 'Aventura y Trekking',
      slug: 'aventura-trekking',
    };
    const catCultural: CategoryRecord = {
      id: 'cat-cultural-002',
      name: 'Cultural y Tradicional',
      slug: 'cultural-tradicional',
    };
    this.categories.set(catAdventure.id, catAdventure);
    this.categories.set(catCultural.id, catCultural);

    // 2. Destinations
    const destCusco: DestinationRecord = {
      id: 'dest-cusco-001',
      name: 'Cusco Histórico',
      slug: 'cusco',
    };
    const destMachuPicchu: DestinationRecord = {
      id: 'dest-mp-002',
      name: 'Machu Picchu Ciudadela',
      slug: 'machu-picchu',
    };
    this.destinations.set(destCusco.id, destCusco);
    this.destinations.set(destMachuPicchu.id, destMachuPicchu);

    // 3. Admin Users with Encrypted Passwords
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync('AdminPassword123!', salt, 10000, 32, 'sha256').toString('hex');
    const encryptedFormat = `${salt}:${hash}`;

    const adminUser: AuthUserRecord = {
      id: 'user-admin-001',
      email: 'admin@machupicchutravel.com',
      password_hash: encryptedFormat,
      salt,
      created_at: new Date('2026-01-01').toISOString(),
    };
    this.authUsers.set(adminUser.id, adminUser);

    // 4. Initial Tours (One for MTA, One for Sonqo with same slug demonstrating multi-tenant partition)
    const mtaTour: TourRecord = {
      id: 'tour-mta-001',
      slug: 'camino-inca-clasico',
      tenant: 'mta',
      title: 'Camino Inca Clásico 4 Días - MTA',
      description: 'La legendaria expedición por los Andes hacia Machu Picchu operada por MTA.',
      price_adult: 650.0,
      price_child: 450.0,
      price_infant: 150.0,
      duration: '4 Días / 3 Noches',
      tag: 'Más Popular',
      image_url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
      images: [
        'https://images.unsplash.com/photo-1526392060635-9d6019884377',
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
      ],
      inclusions: ['Guía profesional bilingüe', 'Entradas oficiales', 'Tren turístico', 'Camping'],
      exclusions: ['Propinas', 'Seguro de viaje', 'Bolsa de dormir'],
      itinerary: [
        { day: 1, title: 'Cusco a Wayllabamba', description: 'Inicio de la caminata en Km 82.' },
        { day: 2, title: 'Paso Warmiwañusqa', description: 'Ascenso al punto más alto a 4215 msnm.' },
        { day: 3, title: 'Wiñay Wayna', description: 'Paso por ruinas incas y ceja de selva.' },
        { day: 4, title: 'Inti Punku y Machu Picchu', description: 'Llegada triunfal al amanecer.' },
      ],
      category_id: catAdventure.id,
      destination_id: destMachuPicchu.id,
      is_active: true,
      created_at: new Date('2026-02-01').toISOString(),
      updated_at: new Date('2026-02-01').toISOString(),
    };
    this.tours.set(mtaTour.id, mtaTour);

    const sonqoTour: TourRecord = {
      id: 'tour-sonqo-001',
      slug: 'camino-inca-clasico',
      tenant: 'sonqo',
      title: 'Camino Inca Ancestral 4 Días - Sonqo Perú',
      description: 'Experiencia mística y conexión ancestral con la Pachamama operada por Sonqo.',
      price_adult: 680.0,
      price_child: 480.0,
      price_infant: 180.0,
      duration: '4 Días / 3 Noches',
      tag: 'Espiritual',
      image_url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
      images: [
        'https://images.unsplash.com/photo-1587595431973-160d0d94add1',
        'https://images.unsplash.com/photo-1526392060635-9d6019884377',
      ],
      inclusions: ['Guía chamánico andino', 'Ceremonia de pago a la tierra', 'Alimentación orgánica'],
      exclusions: ['Gastos personales', 'Bastones de trekking'],
      itinerary: [
        { day: 1, title: 'Encuentro Sagrado en Km 82', description: 'Ceremonia de ofrenda y caminata suave.' },
        { day: 2, title: 'Conexión en el Abra Warmiwañusqa', description: 'Meditación andina en la cumbre.' },
        { day: 3, title: 'Santuario de Wiñay Wayna', description: 'Conexión con los espíritus de la montaña.' },
        { day: 4, title: 'Amanecer en Machu Picchu', description: 'Ingreso al templo solar sagrado.' },
      ],
      category_id: catCultural.id,
      destination_id: destMachuPicchu.id,
      is_active: true,
      created_at: new Date('2026-02-05').toISOString(),
      updated_at: new Date('2026-02-05').toISOString(),
    };
    this.tours.set(sonqoTour.id, sonqoTour);

    // 5. Initial Site Settings per brand
    const mtaSlides: SiteSettingRecord = {
      id: 'set-mta-slides-001',
      tenant: 'mta',
      key: 'home_hero_slides',
      value: JSON.stringify([
        {
          title: 'Descubre la Magia de Machu Picchu',
          subtitle: 'Aventuras inolvidables en los Andes peruanos con guías expertos',
          image: '/imagenes/hero-slider/mta-slide-1.jpg',
          link: '/tours/camino-inca-clasico',
        },
        {
          title: 'Trekking a Choquequirao',
          subtitle: 'La otra joya inca oculta entre cañones majestuosos',
          image: '/imagenes/hero-slider/mta-slide-2.jpg',
          link: '/tours',
        },
      ]),
      description: 'Hero slider banners para la página principal de MTA',
      updated_at: new Date('2026-02-10').toISOString(),
    };
    this.siteSettings.set(mtaSlides.id, mtaSlides);

    const sonqoSlides: SiteSettingRecord = {
      id: 'set-sonqo-slides-001',
      tenant: 'sonqo',
      key: 'home_hero_slides',
      value: JSON.stringify([
        {
          title: 'Conéctate con el Corazón de los Andes',
          subtitle: 'Turismo místico y vivencial con Sonqo Perú Travel',
          image: '/imagenes/hero-slider/sonqo-slide-1.jpg',
          link: '/tours/camino-inca-clasico',
        },
      ]),
      description: 'Hero slider banners para la página principal de Sonqo Perú',
      updated_at: new Date('2026-02-10').toISOString(),
    };
    this.siteSettings.set(sonqoSlides.id, sonqoSlides);

    // 6. Tour Availability
    const availMta: TourAvailabilityRecord = {
      id: 'avail-mta-001',
      tour_id: mtaTour.id,
      tenant: 'mta',
      date: '2026-06-15',
      capacity: 16,
      booked_count: 4,
      price_override: null,
      is_blocked: false,
    };
    this.tourAvailability.set(availMta.id, availMta);

    const availSonqo: TourAvailabilityRecord = {
      id: 'avail-sonqo-001',
      tour_id: sonqoTour.id,
      tenant: 'sonqo',
      date: '2026-06-15',
      capacity: 10,
      booked_count: 2,
      price_override: null,
      is_blocked: false,
    };
    this.tourAvailability.set(availSonqo.id, availSonqo);
  }

  // Normalized Tenant Helper
  public normalizeTenant(tenant: string | null | undefined): TenantId {
    if (!tenant) return 'mta';
    const norm = tenant.toLowerCase().trim();
    if (norm === 'mta' || norm === 'sonqo') {
      return norm as TenantId;
    }
    throw new Error(`Database Constraint Violation: Invalid tenant '${tenant}'. Must be 'mta' or 'sonqo'.`);
  }

  // Supabase Query Builder Emulation
  public from(tableName: string) {
    return new QueryBuilder(this, tableName);
  }
}

// Fluent Query Builder
export class QueryBuilder {
  private filters: Array<(row: any) => boolean> = [];
  private orderField?: string;
  private isAscending = true;
  private limitCount?: number;

  constructor(private db: MockDatabase, private tableName: string) {}

  public select(columns?: string): this {
    return this;
  }

  public eq(column: string, value: any): this {
    this.filters.push((row: any) => {
      if (column === 'tenant') {
        const valStr = String(value).toLowerCase();
        return String(row.tenant).toLowerCase() === valStr;
      }
      return row[column] === value;
    });
    return this;
  }

  public neq(column: string, value: any): this {
    this.filters.push((row: any) => row[column] !== value);
    return this;
  }

  public in(column: string, values: any[]): this {
    this.filters.push((row: any) => values.includes(row[column]));
    return this;
  }

  public gte(column: string, value: any): this {
    this.filters.push((row: any) => row[column] >= value);
    return this;
  }

  public lte(column: string, value: any): this {
    this.filters.push((row: any) => row[column] <= value);
    return this;
  }

  public order(column: string, { ascending = true }: { ascending?: boolean } = {}): this {
    this.orderField = column;
    this.isAscending = ascending;
    return this;
  }

  public limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  private getTableMap(): Map<string, any> {
    switch (this.tableName) {
      case 'tours':
        return this.db.tours;
      case 'site_settings':
        return this.db.siteSettings;
      case 'tour_availability':
        return this.db.tourAvailability;
      case 'categories':
        return this.db.categories;
      case 'destinations':
        return this.db.destinations;
      case 'auth_users':
        return this.db.authUsers;
      default:
        throw new Error(`Table '${this.tableName}' does not exist in test database.`);
    }
  }

  public async insert(data: any | any[]): Promise<{ data: any[] | null; error: Error | null }> {
    try {
      const rows = Array.isArray(data) ? data : [data];
      const table = this.getTableMap();
      const inserted: any[] = [];

      for (const rawRow of rows) {
        const row = { ...rawRow };
        if (!row.id) {
          row.id = crypto.randomUUID();
        }

        // 1. Tenant validation and defaults
        if (this.tableName === 'tours' || this.tableName === 'site_settings' || this.tableName === 'tour_availability') {
          row.tenant = this.db.normalizeTenant(row.tenant);
        }

        // 2. Constraints enforcement
        if (this.tableName === 'tours') {
          // Unique (tenant, slug)
          for (const existing of this.db.tours.values()) {
            if (existing.tenant === row.tenant && existing.slug === row.slug) {
              throw new Error(`duplicate key value violates unique constraint "tours_tenant_slug_unique" (tenant=${row.tenant}, slug=${row.slug})`);
            }
          }
          if (row.category_id && !this.db.categories.has(row.category_id)) {
            throw new Error(`insert or update on table "tours" violates foreign key constraint "tours_category_id_fkey"`);
          }
          if (row.destination_id && !this.db.destinations.has(row.destination_id)) {
            throw new Error(`insert or update on table "tours" violates foreign key constraint "tours_destination_id_fkey"`);
          }
          row.images = Array.isArray(row.images) ? row.images : [];
          row.inclusions = Array.isArray(row.inclusions) ? row.inclusions : [];
          row.exclusions = Array.isArray(row.exclusions) ? row.exclusions : [];
          row.itinerary = Array.isArray(row.itinerary) ? row.itinerary : [];
          row.is_active = row.is_active !== undefined ? Boolean(row.is_active) : true;
          row.created_at = row.created_at || new Date().toISOString();
          row.updated_at = new Date().toISOString();
        }

        if (this.tableName === 'site_settings') {
          // Unique (tenant, key)
          for (const existing of this.db.siteSettings.values()) {
            if (existing.tenant === row.tenant && existing.key === row.key) {
              throw new Error(`duplicate key value violates unique constraint "site_settings_tenant_key_unique" (tenant=${row.tenant}, key=${row.key})`);
            }
          }
          row.updated_at = new Date().toISOString();
        }

        if (this.tableName === 'tour_availability') {
          if (row.capacity < 0) {
            throw new Error(`check constraint "tour_availability_capacity_check" violated: capacity must be >= 0`);
          }
          row.booked_count = row.booked_count || 0;
          if (row.capacity !== undefined && row.booked_count > row.capacity) {
            throw new Error(`check constraint "tour_availability_capacity_check" violated: booked_count exceeds capacity`);
          }
          row.is_blocked = Boolean(row.is_blocked);
        }

        table.set(row.id, row);
        inserted.push(row);
      }

      return { data: inserted, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  public async update(updates: any): Promise<{ data: any[] | null; error: Error | null }> {
    try {
      const table = this.getTableMap();
      const matched = await this.executeFilter();
      const updatedList: any[] = [];

      for (const row of matched) {
        const next = { ...row, ...updates, updated_at: new Date().toISOString() };
        if (this.tableName === 'tours' && updates.tenant) {
          next.tenant = this.db.normalizeTenant(updates.tenant);
        }
        if (this.tableName === 'site_settings' && updates.tenant) {
          next.tenant = this.db.normalizeTenant(updates.tenant);
        }
        if (this.tableName === 'tour_availability') {
          if (next.capacity !== undefined && next.capacity < 0) {
            throw new Error(`check constraint "tour_availability_capacity_check" violated: capacity must be >= 0`);
          }
          if (next.capacity !== undefined && next.booked_count !== undefined && next.booked_count > next.capacity) {
            throw new Error(`check constraint "tour_availability_capacity_check" violated: booked_count exceeds capacity`);
          }
        }
        table.set(row.id, next);
        updatedList.push(next);
      }

      return { data: updatedList, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  public async delete(): Promise<{ data: any[] | null; error: Error | null }> {
    try {
      const table = this.getTableMap();
      const matched = await this.executeFilter();
      for (const row of matched) {
        table.delete(row.id);
      }
      return { data: matched, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  private async executeFilter(): Promise<any[]> {
    const table = this.getTableMap();
    let rows = Array.from(table.values());

    for (const filter of this.filters) {
      rows = rows.filter(filter);
    }

    if (this.orderField) {
      const field = this.orderField;
      const asc = this.isAscending;
      rows.sort((a, b) => {
        if (a[field] < b[field]) return asc ? -1 : 1;
        if (a[field] > b[field]) return asc ? 1 : -1;
        return 0;
      });
    }

    if (this.limitCount !== undefined) {
      rows = rows.slice(0, this.limitCount);
    }

    return rows;
  }

  public async then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: { data: any[] | null; error: Error | null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    try {
      const rows = await this.executeFilter();
      const result = { data: rows, error: null };
      return onfulfilled ? onfulfilled(result) : (result as any);
    } catch (err: any) {
      const result = { data: null, error: err };
      return onfulfilled ? onfulfilled(result) : (result as any);
    }
  }

  public async single(): Promise<{ data: any | null; error: Error | null }> {
    const { data, error } = await this.then(r => r);
    if (error) return { data: null, error };
    if (!data || data.length === 0) {
      return { data: null, error: new Error('PGRST116: The result contains 0 rows') };
    }
    if (data.length > 1) {
      return { data: null, error: new Error('PGRST116: The result contains more than 1 row') };
    }
    return { data: data[0], error: null };
  }

  public async maybeSingle(): Promise<{ data: any | null; error: Error | null }> {
    const { data, error } = await this.then(r => r);
    if (error) return { data: null, error };
    if (!data || data.length === 0) {
      return { data: null, error: null };
    }
    return { data: data[0], error: null };
  }
}

// Global Singleton for Test Runs
let testDatabaseInstance: MockDatabase | null = null;

export function getTestDb(): MockDatabase {
  if (!testDatabaseInstance) {
    testDatabaseInstance = new MockDatabase();
  }
  return testDatabaseInstance;
}

export function resetTestDb(): MockDatabase {
  const db = getTestDb();
  db.reset();
  mockCookieStore.clear();
  return db;
}

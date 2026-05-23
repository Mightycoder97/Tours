import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key'

/**
 * Public Supabase client for server components.
 * USE THIS for: reading public data (tours, categories, destinations, site_settings)
 * DO NOT USE for: authenticated operations (use `createClient()` from '@/lib/supabase/server' instead)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Flag to detect if we're running without real Supabase credentials
export const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;

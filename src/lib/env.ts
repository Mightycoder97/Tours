/**
 * Validates that all required environment variables are present.
 * Called at module load time to catch missing config early.
 */
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const;

const optionalEnvVarsWithWarnings = [
  { key: 'RESEND_API_KEY', warning: 'Email confirmations will not be sent' },
  { key: 'CULQI_SECRET_KEY', warning: 'Culqi card payments will not work' },
  { key: 'NEXT_PUBLIC_CULQI_PUBLIC_KEY', warning: 'Culqi frontend will not work' },
  { key: 'RESEND_FROM_EMAIL', warning: 'Using default sender email (may fail in production)' },
] as const;

if (typeof window === 'undefined') {
  // Only validate on server side
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `[env] Missing required environment variables:\n${missing.map(k => `  - ${k}`).join('\n')}\n` +
      'Check your .env.local file.'
    );
  }

  optionalEnvVarsWithWarnings.forEach(({ key, warning }) => {
    if (!process.env[key]) {
      console.warn(`[env] WARNING: ${key} is not set — ${warning}`);
    }
  });
}

export {};

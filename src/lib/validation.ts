/**
 * src/lib/validation.ts
 * Core input validation and sanitization utilities.
 */

/**
 * Validates an image URL against length limits, scheme formatting, and security policies.
 * Throws an Error with descriptive messaging if validation fails.
 */
export function assertValidImageUrl(url: string): void {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    throw new Error('Image URL must be a non-empty string');
  }
  if (url.length > 2048) {
    throw new Error(`Image URL exceeds maximum length of 2048 characters (received ${url.length})`);
  }
  if (url.startsWith('/')) {
    if (url.includes(' ') || url.includes('<') || url.includes('>')) {
      throw new Error(`Malformed URL syntax: "${url}"`);
    }
    return;
  }
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error(`Invalid URL protocol "${parsed.protocol}". Expected http: or https:`);
    }
  } catch (err: any) {
    if (err.message && err.message.includes('Invalid URL protocol')) {
      throw err;
    }
    throw new Error(`Malformed URL syntax: "${url}"`);
  }
}

export const validateImageUrl = assertValidImageUrl;

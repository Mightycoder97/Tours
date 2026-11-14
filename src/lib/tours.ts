/**
 * src/lib/tours.ts
 * Tour domain data processing, list sanitization, and pricing rules.
 */

/**
 * Sanitizes an inclusions or exclusions list from multiline textarea or string array.
 * Trims leading/trailing whitespace and filters out empty lines.
 */
export function sanitizeExclusionsList(rawInput: unknown): string[] {
  if (typeof rawInput === 'string') {
    return rawInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  if (!Array.isArray(rawInput)) {
    throw new Error('Exclusions input must be an array of strings or multiline string');
  }
  return rawInput
    .map(s => (typeof s === 'string' ? s.trim() : ''))
    .filter(s => s.length > 0);
}

export function sanitizeInclusionsList(rawInput: unknown): string[] {
  return sanitizeExclusionsList(rawInput);
}

export interface TourPricingInput {
  price_adult?: number | null;
  price_child?: number | null;
  price_infant?: number | null;
}

export function assertValidPricing(pricing: TourPricingInput): void {
  if (pricing.price_adult === undefined || pricing.price_adult === null) {
    throw new Error('Adult price must be defined');
  }
  if (typeof pricing.price_adult !== 'number' || Number.isNaN(pricing.price_adult) || pricing.price_adult <= 0) {
    throw new Error(`Adult price must be a valid number strictly greater than 0: ${pricing.price_adult}`);
  }
  if (pricing.price_child !== undefined && pricing.price_child !== null) {
    if (typeof pricing.price_child !== 'number' || Number.isNaN(pricing.price_child) || pricing.price_child < 0) {
      throw new Error(`Child price cannot be negative: ${pricing.price_child}`);
    }
    if (pricing.price_child > pricing.price_adult) {
      throw new Error(`Child price ($${pricing.price_child}) should not exceed adult price ($${pricing.price_adult})`);
    }
  }
  if (pricing.price_infant !== undefined && pricing.price_infant !== null) {
    if (typeof pricing.price_infant !== 'number' || Number.isNaN(pricing.price_infant) || pricing.price_infant < 0) {
      throw new Error(`Infant price cannot be negative: ${pricing.price_infant}`);
    }
    if (pricing.price_infant > pricing.price_adult) {
      throw new Error(`Infant price ($${pricing.price_infant}) should not exceed adult price ($${pricing.price_adult})`);
    }
  }
}

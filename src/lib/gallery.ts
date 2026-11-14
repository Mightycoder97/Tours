/**
 * src/lib/gallery.ts
 * Tour media gallery manipulation and validation utilities.
 */

import { assertValidImageUrl } from './validation';

/**
 * Immutably reorders an array of gallery image URLs.
 * Moves the item from `fromIndex` to `toIndex`.
 * Returns an unchanged shallow copy if indices are out of bounds.
 */
export function reorderGalleryImages(images: string[], fromIndex: number, toIndex: number): string[] {
  if (!Array.isArray(images)) {
    throw new Error('Images must be an array');
  }
  const result = [...images];
  if (fromIndex < 0 || fromIndex >= result.length || toIndex < 0 || toIndex >= result.length) {
    return result;
  }
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * Validates that an object is a valid gallery array with non-empty string URLs.
 */
export function assertValidGallery(images: unknown): asserts images is string[] {
  if (!Array.isArray(images)) {
    throw new Error('Gallery images must be an array');
  }
  for (const img of images) {
    if (typeof img !== 'string' || img.trim() === '') {
      throw new Error('Every gallery item must be a non-empty string URL');
    }
  }
}

export { assertValidImageUrl };

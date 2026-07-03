'use client';
import { useImageProtection } from '@/lib/image-protection';

/**
 * ImageProtectionProvider
 * Client component that activates global image protection on mount.
 * Add this to the root layout's body element.
 */
export default function ImageProtectionProvider() {
  useImageProtection();
  return null;
}

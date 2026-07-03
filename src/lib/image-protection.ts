'use client';
import { useEffect } from 'react';

/**
 * useImageProtection
 * Blocks common photo-stealing techniques:
 * - Right-click context menu on images / protected gallery areas
 * - Ctrl+S (save page) and Ctrl+U (view source)
 * - Drag-and-drop of images (images already have draggable={false})
 */
export function useImageProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'IMG' ||
        target.closest('.protected-gallery') ||
        target.closest('[data-protected]')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's' || e.key === 'u' || e.key === 'p') {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

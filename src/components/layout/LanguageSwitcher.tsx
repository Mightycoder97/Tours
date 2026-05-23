'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const languageMeta: Record<string, { label: string; flag: string }> = {
  es: { label: 'Español', flag: '🇵🇪' },
  en: { label: 'English', flag: '🇺🇸' },
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: code });
  };

  const current = languageMeta[locale] || languageMeta['es'];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium hover:text-primary-light transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span>{current.flag} {locale.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[140px] z-50">
          {routing.locales.map((code) => {
            const meta = languageMeta[code] || { label: code, flag: '' };
            return (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  locale === code
                    ? 'text-primary font-bold bg-primary/5'
                    : 'text-text-main hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{meta.flag}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

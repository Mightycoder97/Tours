'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const phoneNumber = '51987654321'; // Peru phone number
  const t = useTranslations('whatsapp');
  const message = encodeURIComponent(t('defaultMessage'));
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all group"
      aria-label={t('ariaLabel')}
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-white text-text-main text-sm font-medium px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {t('tooltip')}
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
    </a>
  );
}

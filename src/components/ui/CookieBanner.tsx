'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { Cookie, X, Check } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'mpta_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-footer-bg border border-white/10 rounded-2xl shadow-2xl p-5 text-white"
    >
      <div className="flex items-start gap-3 mb-4">
        <Cookie className="w-6 h-6 text-primary-light shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm mb-1">Usamos cookies esenciales</p>
          <p className="text-xs text-white/70 leading-relaxed">
            Solo usamos cookies necesarias para el carrito, la sesión y tu preferencia de idioma.{' '}
            <Link href="/politicas#cookies" className="text-primary-light hover:underline">
              Más información
            </Link>
          </p>
        </div>
        <button onClick={reject} aria-label="Cerrar" className="ml-auto text-white/50 hover:text-white transition-colors shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={reject}
          className="flex-1 py-2 px-3 rounded-full border border-white/20 text-xs font-medium hover:bg-white/10 transition-colors"
        >
          Solo esenciales
        </button>
        <button
          onClick={accept}
          className="flex-1 py-2 px-3 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
        >
          <Check className="w-3.5 h-3.5" /> Aceptar
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import { X, ShieldAlert, PhoneCall, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getBrandConfig } from '@/lib/brand';

export interface ProtegemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProtegemeModal({ isOpen, onClose }: ProtegemeModalProps) {
  const brand = getBrandConfig();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);

    // Scroll Lock
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="protegeme-modal-title"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-gray-200">
        {/* Header bar */}
        <div className="sticky top-0 z-10 bg-primary-dark text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-primary/20">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-light">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <h2 id="protegeme-modal-title" className="font-serif text-lg sm:text-xl font-bold leading-tight">
                Compromiso de Protección contra la ESNNA
              </h2>
              <p className="text-[11px] sm:text-xs text-primary-light/90">
                R.M. N° 108-2020-MINCETUR · Ley N° 29408 · Código de Conducta
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Cerrar ventana modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body (scrollable) */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6 text-text-main text-sm">
          {/* Official Badges Showcase */}
          <div className="bg-surface border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* MINCETUR Registered Agency Badge */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center w-[130px] shrink-0">
              <Image
                src="/imagenes/logos/1.png"
                alt="Agencia de Viajes y Turismo Registrada - MINCETUR"
                width={110}
                height={150}
                className="object-contain max-h-[120px] w-auto"
                priority
              />
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight mt-1.5 leading-tight">
                Agencia Registrada
              </span>
              <span className="text-[9px] text-gray-500">MINCETUR</span>
            </div>

            {/* Protégeme Badge */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center w-[200px] sm:w-[220px] shrink-0">
              <Image
                src="/imagenes/logos/2.png"
                alt="Protégeme - Turismo Responsable para prevenir la explotación sexual de niñas, niños y adolescentes"
                width={200}
                height={140}
                className="object-contain max-h-[120px] w-auto"
                priority
              />
              <span className="text-[10px] font-bold text-primary-dark uppercase tracking-tight mt-1.5 leading-tight">
                Protégeme ESNNA
              </span>
              <span className="text-[9px] text-gray-500">R.M. N° 108-2020-MINCETUR</span>
            </div>
          </div>

          {/* Verbatim Bilingual Notice (R.M. 108-2020-MINCETUR) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary-dark font-serif font-bold text-base border-b border-gray-200 pb-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span>Declaración Oficial Obligatoria (Bilingüe Español / Inglés)</span>
            </div>

            {/* Spanish Verbatim */}
            <div className="bg-red-50/70 border-l-4 border-red-600 rounded-r-xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-800">
                  Español (Texto Oficial R.M. N° 108-2020-MINCETUR)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-800 font-semibold">
                  Ley N° 29408
                </span>
              </div>
              <p className="font-bold text-xs sm:text-sm text-red-950 uppercase tracking-wide leading-relaxed">
                &ldquo;EN ESTA AGENCIA NO PROMOVEMOS NI PERMITIMOS LA EXPLOTACIÓN SEXUAL DE NIÑAS, NIÑOS Y ADOLESCENTES, NI CUALQUIER OTRO ILÍCITO PENAL DEL CUAL TOMEMOS CONOCIMIENTO EN EL DESARROLLO DE NUESTRA ACTIVIDAD, CONFORME A LO DISPUESTO EN LA LEY N° 29408.&rdquo;
              </p>
            </div>

            {/* English Verbatim */}
            <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                  English (Official Verbatim Text)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  Law N° 29408
                </span>
              </div>
              <p className="font-bold text-xs sm:text-sm text-blue-950 uppercase tracking-wide leading-relaxed">
                &ldquo;IN THIS TRAVEL AGENCY, WE DO NOT PROMOTE OR PERMIT THE SEXUAL EXPLOITATION OF GIRLS, CHILDREN AND TEENAGERS, NOR ANY OTHER CRIME OF WHICH WE TAKE KNOWLEDGE IN DEVELOPMENT OF OUR ACTIVITY, ACCORDING TO LAW N° 29408.&rdquo;
              </p>
            </div>
          </div>

          {/* Statutory Legal Framework */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Marco Legal y Bases Estatutarias</span>
            </div>
            <ul className="text-xs text-text-light space-y-1.5 list-disc pl-5">
              <li>
                <strong className="text-text-main">Ley N° 29408</strong> — Ley General de Turismo (Arts. 43 y 44: Deber ineludible de los prestadores de servicios turísticos de prevenir, rechazar y denunciar la ESNNA).
              </li>
              <li>
                <strong className="text-text-main">D.S. N° 003-2010-MINCETUR</strong> — Reglamento de la Ley General de Turismo.
              </li>
              <li>
                <strong className="text-text-main">Ley N° 30963</strong> — Modificación del Código Penal respecto a las sanciones de explotación sexual infantil, pornografía infantil y trata de personas (penas privativas de la libertad de hasta 25 años o cadena perpetua).
              </li>
              <li>
                <strong className="text-text-main">Ley N° 30802</strong> — Condiciones para el ingreso y traslado de menores de edad a hospedajes y transportes turísticos (documento de identidad original físico y autorización notarial).
              </li>
              <li>
                <strong className="text-text-main">R.M. N° 108-2020-MINCETUR</strong> — Aprueba el modelo oficial de afiche y las especificaciones técnicas contra la ESNNA en el sector turismo.
              </li>
              <li>
                <strong className="text-text-main">D.S. N° 005-2020-MINCETUR</strong> — Reglamento de Agencias de Viajes y Turismo (Arts. 17 y 22: Exhibición de distintivos oficiales y datos de identificación).
              </li>
            </ul>
          </div>

          {/* 24-Hour Emergency Hotlines */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary-dark font-serif font-bold text-base">
              <PhoneCall className="w-5 h-5 text-primary" />
              <span>Líneas Telefónicas Gratuitas de Denuncia y Auxilio 24 Horas</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Linea 100 */}
              <a
                href="tel:100"
                className="group p-3.5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-bold text-sm">
                  100
                </div>
                <div>
                  <div className="font-bold text-text-main group-hover:text-primary transition-colors text-sm">
                    Línea 100 (MIMP)
                  </div>
                  <p className="text-[11px] text-text-light leading-snug mt-0.5">
                    Ministerio de la Mujer y Poblaciones Vulnerables. Gratuito, confidencial y 24/7 desde cualquier teléfono.
                  </p>
                </div>
              </a>

              {/* Linea 1818 */}
              <a
                href="tel:1818"
                className="group p-3.5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-sm">
                  1818
                </div>
                <div>
                  <div className="font-bold text-text-main group-hover:text-primary transition-colors text-sm">
                    Línea 1818 (MININTER)
                  </div>
                  <p className="text-[11px] text-text-light leading-snug mt-0.5">
                    Central Única de Denuncias del Ministerio del Interior. Denuncia de trata de personas y ESNNA.
                  </p>
                </div>
              </a>

              {/* Central 105 */}
              <a
                href="tel:105"
                className="group p-3.5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-sm">
                  105
                </div>
                <div>
                  <div className="font-bold text-text-main group-hover:text-primary transition-colors text-sm">
                    Central 105 (PNP)
                  </div>
                  <p className="text-[11px] text-text-light leading-snug mt-0.5">
                    Policía Nacional del Perú. Central de Emergencias para auxilio, flagrancia y rescate inmediato.
                  </p>
                </div>
              </a>

              {/* POLTUR Cusco */}
              <a
                href="tel:+5184249769"
                className="group p-3.5 rounded-xl border border-gray-200 bg-white hover:border-primary hover:bg-primary/5 transition-all flex items-start gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs text-center leading-none">
                  POLTUR
                </div>
                <div>
                  <div className="font-bold text-text-main group-hover:text-primary transition-colors text-sm">
                    POLTUR Cusco: (084) 249769
                  </div>
                  <p className="text-[11px] text-text-light leading-snug mt-0.5">
                    Policía de Turismo Cusco (Plaza Túpac Amaru / Av. El Sol). Protección integral al turista.
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Commercial identification footer inside modal */}
          <div className="pt-4 border-t border-gray-200 text-xs text-text-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50 -mx-5 sm:-mx-8 -mb-6 px-5 sm:px-8 py-4">
            <div>
              <p className="font-semibold text-text-main">{brand.legalName} · RUC: {brand.ruc}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {brand.contact.address} · {brand.contact.email} · {brand.contact.phone}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/protegeme"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-colors shadow-xs"
              >
                <span>Página Completa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive Client Trigger that renders children or default Protégeme button
 * and opens ProtegemeModal when clicked.
 */
export function ProtegemeModalTrigger({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className || 'inline-block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-xl'}
        aria-label="Abrir afiche y aviso oficial de prevención contra la ESNNA"
      >
        {children}
      </button>
      <ProtegemeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

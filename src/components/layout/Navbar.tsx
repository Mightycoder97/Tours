'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu, X, ShoppingCart, Mountain, Compass, ChevronDown,
  Utensils, Footprints, Users, Landmark, TreePine, Waves,
  Camera, Star, MapPin, Clock, Tent,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

// ── Destinos reales de la empresa ─────────────────────────────────────────────
const DESTINOS = [
  {
    slug: 'lima',
    label: 'Lima',
    desc: 'Capital gastronómica',
    icon: Utensils,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    href: '/tours?destino=lima',
  },
  {
    slug: 'cusco',
    label: 'Cusco',
    desc: 'Ciudad Imperial Inca',
    icon: Landmark,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    href: '/tours?destino=cusco',
  },
  {
    slug: 'arequipa',
    label: 'Arequipa',
    desc: 'La Ciudad Blanca',
    icon: Mountain,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    href: '/tours?destino=arequipa',
  },
  {
    slug: 'puno',
    label: 'Puno',
    desc: 'Lago Titicaca',
    icon: Waves,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    href: '/tours?destino=puno',
  },
];

// ── Categorías de tours más populares ─────────────────────────────────────────
const CATEGORIAS = [
  { label: 'City Tours', icon: Camera, href: '/tours?categoria=city-tour' },
  { label: 'Aventura', icon: Tent, href: '/tours?categoria=aventura' },
  { label: 'Trekking', icon: Footprints, href: '/tours?categoria=trekking' },
  { label: 'Naturaleza', icon: TreePine, href: '/tours?categoria=naturaleza' },
  { label: 'Cultura & Historia', icon: Landmark, href: '/tours?categoria=cultura' },
  { label: 'Gastronomía', icon: Utensils, href: '/tours?categoria=gastronomia' },
  { label: 'Multi-Día', icon: Clock, href: '/tours?categoria=multi-dia' },
  { label: 'Místico', icon: Star, href: '/tours?categoria=mistico' },
];

// ── Tours destacados ───────────────────────────────────────────────────────────
const TOURS_DESTACADOS = [
  { label: 'Machu Picchu Full Day', href: '/tours/machu-picchu-full-day', badge: '⭐ Más popular' },
  { label: 'Montaña de Colores', href: '/tours/montana-de-colores-vinicunca', badge: '' },
  { label: 'Cañón del Colca 2D', href: '/tours/canon-del-colca-2-dias-1-noche', badge: '' },
  { label: 'Islas Uros & Taquile', href: '/tours/puno-full-day-uros-taquile', badge: '' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cartItems = useCartStore((state) => state.items);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }, []);

  const handleMouseEnter = useCallback((menu: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const toggleMobileAccordion = useCallback((key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  }, []);

  const navLinkClass = `text-sm font-semibold hover:text-primary-light transition-colors py-2 flex items-center gap-1`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-dark text-white shadow-lg py-2'
          : 'bg-white/95 backdrop-blur-md text-primary border-b border-gray-100 py-3'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 transition-all duration-300 ${!isScrolled ? 'brightness-0' : ''}`}>
              <Image
                src="/imagenes/logo.webp"
                alt={t('ariaLabels.logo')}
                fill
                sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">

            {/* Tours & Paquetes — Mega Menu */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter('tours')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`${navLinkClass} bg-transparent border-0`}>
                {t('toursAndPackages')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'tours' ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white text-text-main rounded-2xl shadow-2xl p-6 z-50 mt-4 border border-gray-100 transition-all duration-200 ${
                  activeMenu === 'tours' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100" />

                <div className="grid grid-cols-3 gap-6">
                  {/* Col 1: Destinos */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Por Destino</h3>
                    </div>
                    <ul className="space-y-1">
                      {DESTINOS.map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={d.href}
                            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className={`w-8 h-8 rounded-lg ${d.bg} flex items-center justify-center shrink-0`}>
                              <d.icon className={`w-4 h-4 ${d.color}`} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-gray-700 group-hover:text-primary leading-tight">{d.label}</p>
                              <p className="text-xs text-gray-400">{d.desc}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 2: Categorías */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                      <Compass className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Por Tipo</h3>
                    </div>
                    <ul className="space-y-0.5">
                      {CATEGORIAS.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors group text-sm"
                          >
                            <c.icon className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0" />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3: Destacados + CTA */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                      <Star className="w-4 h-4 text-primary" />
                      <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">Destacados</h3>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {TOURS_DESTACADOS.map((tour) => (
                        <li key={tour.href}>
                          <Link
                            href={tour.href}
                            className="flex items-center gap-2 px-2 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors text-sm group"
                          >
                            <ChevronDown className="w-3 h-3 -rotate-90 text-gray-300 group-hover:text-primary shrink-0" />
                            <span>{tour.label}</span>
                            {tour.badge && (
                              <span className="ml-auto text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap">{tour.badge}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/tours"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 rounded-xl hover:bg-primary-dark transition-colors text-sm"
                    >
                      <Compass className="w-4 h-4" />
                      Ver todos los tours
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Destinos — simple dropdown */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter('destinos')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`${navLinkClass} bg-transparent border-0`}>
                {t('destinations')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'destinos' ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[220px] bg-white text-text-main rounded-xl shadow-2xl py-2 z-50 mt-4 border border-gray-100 transition-all duration-200 ${
                  activeMenu === 'destinos' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100" />
                {DESTINOS.map((d) => (
                  <Link
                    key={d.slug}
                    href={d.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-7 h-7 rounded-lg ${d.bg} flex items-center justify-center shrink-0`}>
                      <d.icon className={`w-3.5 h-3.5 ${d.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-700 group-hover:text-primary">{d.label}</p>
                      <p className="text-xs text-gray-400">{d.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/nosotros" className={navLinkClass} aria-current={pathname === '/nosotros' ? 'page' : undefined}>
              {t('aboutUs')}
            </Link>
            <Link href="/blog" className={navLinkClass} aria-current={pathname === '/blog' ? 'page' : undefined}>
              {t('blog')}
            </Link>
            <Link href="/contacto" className={navLinkClass} aria-current={pathname === '/contacto' ? 'page' : undefined}>
              {t('contactUs')}
            </Link>
          </nav>

          {/* ── Desktop Right Actions ──────────────────────────────────── */}
          <div className="hidden lg:flex items-center space-x-5">
            <LanguageSwitcher />
            <Link href="/cart" className="relative cursor-pointer hover:text-primary-light transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              href="/tours"
              className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
                isScrolled
                  ? 'bg-white text-primary-dark hover:bg-gray-100'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {t('planYourTrip')}
            </Link>
          </div>

          {/* ── Mobile Toggle ──────────────────────────────────────────── */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link href="/cart" className="relative cursor-pointer p-2">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
                isScrolled ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-primary/5'
              }`}
              aria-label={isMobileMenuOpen ? t('ariaLabels.closeMenu') : t('ariaLabels.openMenu')}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-primary z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 80px)' }}
      >
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 p-3 text-white hover:bg-white/10 rounded-lg"
          style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
          aria-label={t('ariaLabels.closeMenu')}
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="flex flex-col h-full overflow-y-auto px-6 py-4">
          <div className="flex flex-col space-y-1">

            {/* Tours Accordion */}
            <div>
              <button
                onClick={() => toggleMobileAccordion('tours')}
                className="w-full flex items-center justify-between text-xl font-serif text-white py-4 border-b border-white/20 px-3"
                aria-expanded={mobileAccordion === 'tours'}
              >
                <span>{t('toursAndPackages')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAccordion === 'tours' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${mobileAccordion === 'tours' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="pl-4 py-3 space-y-1">
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold px-3 mb-1">Por Destino</p>
                    {DESTINOS.map((d) => (
                      <Link
                        key={d.slug}
                        href={d.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-white/90 hover:text-white py-2.5 px-3 rounded-lg active:bg-white/10 transition-colors"
                      >
                        <d.icon className="w-4 h-4 shrink-0 text-white/60" />
                        <span className="text-base">{d.label}</span>
                      </Link>
                    ))}
                    <Link
                      href="/tours"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 text-primary-light font-semibold py-2.5 px-3 rounded-lg mt-2"
                    >
                      <Compass className="w-4 h-4 shrink-0" />
                      <span className="text-base">Ver todos los tours</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Destinos Accordion */}
            <div>
              <button
                onClick={() => toggleMobileAccordion('destinos')}
                className="w-full flex items-center justify-between text-xl font-serif text-white py-4 border-b border-white/20 px-3"
                aria-expanded={mobileAccordion === 'destinos'}
              >
                <span>{t('destinations')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAccordion === 'destinos' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ${mobileAccordion === 'destinos' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="pl-4 py-3 space-y-1">
                    {DESTINOS.map((d) => (
                      <Link
                        key={d.slug}
                        href={d.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-white/90 hover:text-white py-2.5 px-3 rounded-lg active:bg-white/10 transition-colors"
                      >
                        <d.icon className="w-4 h-4 shrink-0 text-white/60" />
                        <div>
                          <p className="text-base font-semibold">{d.label}</p>
                          <p className="text-xs text-white/50">{d.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/nosotros" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-white/20 px-3">{t('aboutUs')}</Link>
            <Link href="/blog" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-white/20 px-3">{t('blog')}</Link>
            <Link href="/contacto" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-white/20 px-3">{t('contactUs')}</Link>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <Link href="/tours" onClick={closeMobileMenu} className="bg-white text-primary-dark w-full py-4 rounded-full text-center font-bold text-lg">
              {t('planYourTrip')}
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center text-white">
            <LanguageSwitcher />
          </div>

          <div className="mt-auto pt-8 pb-6 text-center text-white/50 text-sm space-y-1">
            <p>📞 {t('contact.phone')}</p>
            <p>✉️ {t('contact.email')}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, ShoppingCart, Mountain, Compass, Map, ChevronDown, Utensils, Footprints, Users, Landmark, TreePine, Sun } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const toursDropdownIcons = {
  left: {
    icon: Mountain,
    items: [
      { key: 'machuPicchuFullDay' as const, href: '/tours', icon: Landmark },
      { key: 'sacredValley' as const, href: '/tours', icon: Sun },
      { key: 'rainbowMountain' as const, href: '/tours', icon: Mountain },
    ],
  },
  right: {
    icon: Compass,
    items: [
      { key: 'gastronomicTours' as const, href: '/tours', icon: Utensils },
      { key: 'classicIncaTrail' as const, href: '/tours', icon: Footprints },
      { key: 'communityTourism' as const, href: '/tours', icon: Users },
    ],
  },
};

const destinosDropdownIcons = [
  { key: 'cusco' as const, href: '/rutas', icon: Landmark },
  { key: 'sacredValley' as const, href: '/rutas', icon: Sun },
  { key: 'machuPicchu' as const, href: '/rutas', icon: Mountain },
  { key: 'humantayLake' as const, href: '/rutas', icon: TreePine },
  { key: 'rainbowMountain' as const, href: '/rutas', icon: Map },
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  }, []);

  const toggleMobileAccordion = useCallback((key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary-dark text-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-md text-primary border-b border-gray-100 py-3'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className={`relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-all duration-300 ${!isScrolled ? 'brightness-0' : ''}`}>
              <Image 
                src="/imagenes/logo.webp" 
                alt={t('ariaLabels.logo')} 
                fill
                sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Tours Dropdown */}
            <div 
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter('tours')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/tours" aria-current={pathname === '/tours' ? 'page' : undefined} className="text-sm font-medium hover:text-primary-light transition-colors py-2 flex items-center gap-1">
                {t('toursAndPackages')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'tours' ? 'rotate-180' : ''}`} />
              </Link>
              {/* Mega Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white text-text-main rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8 z-50 mt-4 border border-gray-100 transition-all duration-200 ${
                  activeMenu === 'tours' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                
                {/* Left Column */}
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <toursDropdownIcons.left.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg text-primary">{t('topDestinations')}</h3>
                  </div>
                  <ul className="space-y-3">
                    {toursDropdownIcons.left.items.map((item) => (
                      <li key={item.key}>
                        <Link href={item.href} className="flex items-center gap-2.5 text-gray-600 hover:text-primary transition-colors group">
                          <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                          <span>{t(`dropdown.${item.key}`)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column */}
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <toursDropdownIcons.right.icon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg text-primary">{t('experiences')}</h3>
                  </div>
                  <ul className="space-y-3">
                    {toursDropdownIcons.right.items.map((item) => (
                      <li key={item.key}>
                        <Link href={item.href} className="flex items-center gap-2.5 text-gray-600 hover:text-primary transition-colors group">
                          <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                          <span>{t(`dropdown.${item.key}`)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Row */}
                <div className="col-span-2 pt-4 border-t">
                  <Link href="/tours" className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
                    <Compass className="w-4 h-4" />
                    {t('viewAllTours')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Destinos Dropdown */}
            <div 
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter('destinos')}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/rutas" aria-current={pathname === '/rutas' ? 'page' : undefined} className="text-sm font-medium hover:text-primary-light transition-colors py-2 flex items-center gap-1">
                {t('destinations')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'destinos' ? 'rotate-180' : ''}`} />
              </Link>
              {/* Destinos Dropdown Panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-[260px] bg-white text-text-main rounded-xl shadow-2xl p-4 z-50 mt-4 border border-gray-100 transition-all duration-200 ${
                  activeMenu === 'destinos' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                <ul className="space-y-1">
                  {destinosDropdownIcons.map((item) => (
                    <li key={item.key}>
                      <Link href={item.href} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors group">
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm">{t(`destinationItems.${item.key}`)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/nosotros" aria-current={pathname === '/nosotros' ? 'page' : undefined} className="text-sm font-medium hover:text-primary-light transition-colors py-2 block">
              {t('aboutUs')}
            </Link>
            <Link href="/blog" aria-current={pathname === '/blog' ? 'page' : undefined} className="text-sm font-medium hover:text-primary-light transition-colors py-2 block">
              {t('blog')}
            </Link>
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <LanguageSwitcher />
            
            <Link href="/cart" className="relative cursor-pointer hover:text-primary-light transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link href="/tours" className="bg-white text-primary-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-cream border border-gray-200 transition-colors">
              {t('planYourTrip')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
             <Link href="/cart" className="relative cursor-pointer p-2">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
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

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-primary z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 80px)' }}
      >
        {/* Close button inside the menu */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 p-3 text-white hover:bg-white/10 rounded-lg"
          style={{ marginTop: 'env(safe-area-inset-top, 0px)' }}
          aria-label={t('ariaLabels.closeMenu')}
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="flex flex-col h-full overflow-y-auto px-6 py-6">
          <div className="flex flex-col space-y-1">
            {/* Tours Accordion */}
            <div>
              <button
                onClick={() => toggleMobileAccordion('tours')}
                className="w-full flex items-center justify-between text-xl font-serif text-white py-4 border-b border-primary-light px-3 transition-colors"
                aria-expanded={mobileAccordion === 'tours'}
              >
                <span>{t('toursAndPackages')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAccordion === 'tours' ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  mobileAccordion === 'tours' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-6 py-2 space-y-1">
                    {[...toursDropdownIcons.left.items, ...toursDropdownIcons.right.items].map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-white/80 hover:text-white py-2.5 px-3 rounded-lg active:bg-white/10 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-accent-light shrink-0" />
                        <span className="text-base">{t(`dropdown.${item.key}`)}</span>
                      </Link>
                    ))}
                    <Link
                      href="/tours"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 text-accent font-semibold py-2.5 px-3 rounded-lg active:bg-white/10 transition-colors"
                    >
                      <Compass className="w-4 h-4 shrink-0" />
                      <span className="text-base">{t('viewAllTours')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Destinos Accordion */}
            <div>
              <button
                onClick={() => toggleMobileAccordion('destinos')}
                className="w-full flex items-center justify-between text-xl font-serif text-white py-4 border-b border-primary-light px-3 transition-colors"
                aria-expanded={mobileAccordion === 'destinos'}
              >
                <span>{t('destinations')}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileAccordion === 'destinos' ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  mobileAccordion === 'destinos' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-6 py-2 space-y-1">
                    {destinosDropdownIcons.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-white/80 hover:text-white py-2.5 px-3 rounded-lg active:bg-white/10 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-accent-light shrink-0" />
                        <span className="text-base">{t(`destinationItems.${item.key}`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/nosotros" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-primary-light active:bg-white/10 rounded-lg px-3 transition-colors">
              {t('aboutUs')}
            </Link>
            <Link href="/blog" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-primary-light active:bg-white/10 rounded-lg px-3 transition-colors">
              {t('blog')}
            </Link>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <Link href="/tours" onClick={closeMobileMenu} className="bg-white text-primary-dark w-full py-4 rounded-full text-center font-bold text-lg active:scale-95 transition-transform">
              {t('planYourTrip')}
            </Link>
          </div>

          {/* Language Switcher in Mobile Menu */}
          <div className="mt-8 flex items-center justify-center text-white">
            <LanguageSwitcher />
          </div>

          {/* Contact info in mobile menu */}
          <div className="mt-auto pt-8 pb-6 text-center text-white/60 text-sm space-y-1">
            <p>📞 {t('contact.phone')}</p>
            <p>✉️ {t('contact.email')}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

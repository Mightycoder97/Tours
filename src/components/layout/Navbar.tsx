'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  const cartItems = useCartStore((state) => state.items);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
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

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary text-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-md text-primary border-b border-gray-100 py-3'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className={`relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-all duration-300 ${!isScrolled ? 'brightness-0' : ''}`}>
              <Image 
                src="/imagenes/logo.webp" 
                alt="Machu Picchu Travel Adventure Logo" 
                fill
                sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveMenu('tours')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link href="/tours" className="text-sm font-medium hover:text-accent transition-colors py-2 block">
                Tours & Paquetes
              </Link>
              {/* Mega Menu */}
              {activeMenu === 'tours' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white text-text-main rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8 opacity-100 z-50 mt-4 border border-gray-100">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-4 border-b pb-2">Destinos TOP</h3>
                    <ul className="space-y-3">
                      <li><Link href="/tours" className="hover:text-primary transition-colors hover:font-medium">Machu Picchu Full Day</Link></li>
                      <li><Link href="/tours" className="hover:text-primary transition-colors hover:font-medium">Valle Sagrado de los Incas</Link></li>
                      <li><Link href="/tours" className="hover:text-primary transition-colors hover:font-medium">Montaña de 7 Colores</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-primary mb-4 border-b pb-2">Experiencias</h3>
                    <ul className="space-y-3">
                      <li><Link href="/tours" className="hover:text-primary transition-colors hover:font-medium">Tours Gastronómicos</Link></li>
                      <li><Link href="/tours" className="hover:text-primary transition-colors hover:font-medium">Camino Inca Clásico</Link></li>
                      <li><Link href="/tours" className="hover:text-primary transition-colors hover:font-medium">Turismo Comunitario</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/rutas" className="text-sm font-medium hover:text-accent transition-colors py-2 block">
              Destinos
            </Link>
            <Link href="/nosotros" className="text-sm font-medium hover:text-accent transition-colors py-2 block">
              Nosotros
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-accent transition-colors py-2 block">
              Blog
            </Link>
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <LanguageSwitcher />
            
            <Link href="/cart" className="relative cursor-pointer hover:text-accent transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link href="/tours" className="bg-accent text-primary px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-colors">
              Planifica tu Viaje
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
             <Link href="/cart" className="relative cursor-pointer p-2">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-primary text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
                isScrolled ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-primary/5'
              }`}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
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
          aria-label="Cerrar menú"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="flex flex-col h-full overflow-y-auto px-6 py-6">
          <div className="flex flex-col space-y-1">
            <Link href="/tours" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-primary-light active:bg-white/10 rounded-lg px-3 transition-colors">
              Tours & Paquetes
            </Link>
            <Link href="/rutas" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-primary-light active:bg-white/10 rounded-lg px-3 transition-colors">
              Destinos
            </Link>
            <Link href="/nosotros" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-primary-light active:bg-white/10 rounded-lg px-3 transition-colors">
              Nosotros
            </Link>
            <Link href="/blog" onClick={closeMobileMenu} className="text-xl font-serif text-white py-4 border-b border-primary-light active:bg-white/10 rounded-lg px-3 transition-colors">
              Blog
            </Link>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <Link href="/tours" onClick={closeMobileMenu} className="bg-accent text-primary w-full py-4 rounded-full text-center font-bold text-lg active:scale-95 transition-transform">
              Planifica tu Viaje
            </Link>
          </div>

          {/* Language Switcher in Mobile Menu */}
          <div className="mt-8 flex items-center justify-center text-white">
            <LanguageSwitcher />
          </div>

          {/* Contact info in mobile menu */}
          <div className="mt-auto pt-8 pb-6 text-center text-white/60 text-sm space-y-1">
            <p>📞 +51 987 654 321</p>
            <p>✉️ info@machupicchutravel.com</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

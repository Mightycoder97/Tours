'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  Ticket,
  Users,
  MapPin,
  Tags,
  Settings,
  CalendarDays,
  Menu,
  X,
  Check,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { BrandId } from '@/lib/brand';
import { switchAdminBrand } from '@/app/admin/actions';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Reservas', icon: Users },
  { href: '/admin/tours', label: 'Catálogo de Tours', icon: Ticket },
  { href: '/admin/availability', label: 'Disponibilidad', icon: CalendarDays },
  { href: '/admin/categories', label: 'Categorías', icon: Tags },
  { href: '/admin/destinations', label: 'Destinos', icon: MapPin },
  { href: '/admin/settings', label: 'Configuración', icon: Settings },
];

interface AdminSidebarProps {
  userEmail: string;
  activeBrand?: BrandId;
}

export default function AdminSidebar({ userEmail, activeBrand = 'mta' }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<BrandId>(activeBrand);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleBrandSwitch = (brand: BrandId) => {
    if (brand === currentBrand || isPending) return;
    setCurrentBrand(brand);
    startTransition(async () => {
      await switchAdminBrand(brand);
      router.refresh();
    });
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-primary-dark text-white flex items-center justify-between px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-lg font-bold text-white">Admin Portal</h2>
          
          {/* Quick Mobile Brand Switcher */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/15">
            <button
              type="button"
              onClick={() => handleBrandSwitch('mta')}
              disabled={isPending}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                currentBrand === 'mta'
                  ? 'bg-[#048A84] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Cambiar a Machu Picchu Travel"
            >
              MTA
            </button>
            <button
              type="button"
              onClick={() => handleBrandSwitch('sonqo')}
              disabled={isPending}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                currentBrand === 'sonqo'
                  ? 'bg-[#8B66E8] text-white shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Cambiar a Sonqo Perú Travel"
            >
              Sonqo
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary transition-colors"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-40 h-full w-64 bg-primary-dark text-white flex flex-col shadow-xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-white">Admin Portal</h2>
            {isPending && <RefreshCw className="w-4 h-4 text-accent animate-spin" />}
          </div>
          <p className="text-xs text-white/50 truncate mt-0.5">{userEmail}</p>
        </div>

        {/* Multi-Brand Switcher Widget */}
        <div className="px-4 py-2">
          <div className="bg-black/25 rounded-xl p-3 border border-white/10 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-wider uppercase text-white/60 font-bold flex items-center gap-1">
                <Building2 className="w-3 h-3 text-white/50" /> Marca Activa
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                  currentBrand === 'sonqo'
                    ? 'bg-[#8B66E8] text-white shadow-sm'
                    : 'bg-[#048A84] text-white shadow-sm'
                }`}
              >
                {currentBrand === 'sonqo' ? 'Sonqo Perú' : 'MTA Perú'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {/* Option 1: MTA */}
              <button
                type="button"
                onClick={() => handleBrandSwitch('mta')}
                disabled={isPending}
                className={`flex flex-col p-2 rounded-lg text-left transition-all border ${
                  currentBrand === 'mta'
                    ? 'bg-[#048A84]/40 border-[#06C0B8] shadow ring-1 ring-[#06C0B8]/60 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
                aria-pressed={currentBrand === 'mta'}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">MTA</span>
                  {currentBrand === 'mta' && <Check className="w-3.5 h-3.5 text-[#06C0B8]" />}
                </div>
                <span className="text-[10px] text-white/60 truncate mt-0.5">Machu Picchu</span>
              </button>

              {/* Option 2: Sonqo */}
              <button
                type="button"
                onClick={() => handleBrandSwitch('sonqo')}
                disabled={isPending}
                className={`flex flex-col p-2 rounded-lg text-left transition-all border ${
                  currentBrand === 'sonqo'
                    ? 'bg-[#8B66E8]/40 border-[#A485F0] shadow ring-1 ring-[#A485F0]/60 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                }`}
                aria-pressed={currentBrand === 'sonqo'}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">Sonqo</span>
                  {currentBrand === 'sonqo' && <Check className="w-3.5 h-3.5 text-[#A485F0]" />}
                </div>
                <span className="text-[10px] text-white/60 truncate mt-0.5">Sonqo Perú</span>
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-white/5 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 mr-3" /> Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

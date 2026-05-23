'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Ticket, Users, MapPin, Tags, Settings, CalendarDays, Menu, X } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Reservas', icon: Users },
  { href: '/admin/tours', label: 'Catálogo de Tours', icon: Ticket },
  { href: '/admin/availability', label: 'Disponibilidad', icon: CalendarDays },
  { href: '/admin/categories', label: 'Categorías', icon: Tags },
  { href: '/admin/destinations', label: 'Destinos', icon: MapPin },
  { href: '/admin/settings', label: 'Configuración', icon: Settings },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-primary text-white flex items-center justify-between px-4 py-3 shadow-lg">
        <h2 className="font-serif text-lg font-bold text-accent">Admin Portal</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary-light transition-colors"
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
        fixed md:relative z-40 h-full w-64 bg-primary text-white flex flex-col shadow-xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold text-accent">Admin Portal</h2>
          <p className="text-xs text-white/50 truncate mt-1">{userEmail}</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-light text-white'
                    : 'text-white/90 hover:text-white hover:bg-primary-light'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
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

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, LogOut, Ticket, Users, MapPin, Tags, Settings, CalendarDays } from 'lucide-react';


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-background-alt overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold text-accent">Admin Portal</h2>
          <p className="text-xs text-white/50 truncate mt-1">{user.email}</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link href="/admin/bookings" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <Users className="w-5 h-5 mr-3" /> Reservas (Bookings)
          </Link>
          <Link href="/admin/tours" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <Ticket className="w-5 h-5 mr-3" /> Catálogo de Tours
          </Link>
          <Link href="/admin/availability" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <CalendarDays className="w-5 h-5 mr-3" /> Disponibilidad
          </Link>
          <Link href="/admin/categories" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <Tags className="w-5 h-5 mr-3" /> Categorías
          </Link>
          <Link href="/admin/destinations" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <MapPin className="w-5 h-5 mr-3" /> Destinos
          </Link>
          <Link href="/admin/settings" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary-light transition-colors text-white/90 hover:text-white">
            <Settings className="w-5 h-5 mr-3" /> Configuración
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <form action="/api/auth/signout" method="POST">
             <button type="submit" className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-300 hover:text-red-200 hover:bg-white/5 rounded-lg transition-colors">
               <LogOut className="w-4 h-4 mr-3" /> Cerrar Sesión
             </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}

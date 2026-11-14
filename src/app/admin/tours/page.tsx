import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { getAdminActiveBrand } from '@/lib/admin-brand';
import { BRANDS } from '@/lib/brand';
import { Building2 } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  image_url: string;
  price_adult: number;
  duration: string;
  is_active: boolean;
  created_at: string;
  slug: string;
  tenant?: string;
}

export const revalidate = 0;

export default async function AdminToursPage() {
  const activeBrand = await getAdminActiveBrand();
  const brandConfig = BRANDS[activeBrand] || BRANDS.mta;
  const supabase = await createClient();
  
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('tenant', activeBrand)
    .order('created_at', { ascending: false });

  const safeTours = tours || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-bold text-primary">Catálogo de Tours</h1>
            {/* Active brand context badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                activeBrand === 'sonqo'
                  ? 'bg-[#8B66E8]/15 text-[#8B66E8] border border-[#8B66E8]/30'
                  : 'bg-teal-100 text-teal-800 border border-teal-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {brandConfig.name}
            </span>
          </div>
          <p className="text-sm text-text-light mt-1">
            Administra los tours publicados bajo el contexto de {brandConfig.shortName}.
          </p>
        </div>

        <Link
          href="/admin/tours/new"
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-light transition-colors w-fit shadow-sm"
        >
          + Nuevo Tour
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-text-light uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Título</th>
              <th className="px-6 py-4 font-bold">Precio (Adulto)</th>
              <th className="px-6 py-4 font-bold">Duración</th>
              <th className="px-6 py-4 font-bold">Disponibilidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {safeTours.map((t: Tour) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors cursor-pointer group relative">
                <td className="px-6 py-4 font-medium text-text-main flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-gray-100">
                    {t.image_url && (
                      <Image src={t.image_url} alt={t.title} fill className="object-cover" sizes="48px" />
                    )}
                  </div>
                  <Link href={`/admin/tours/${t.id}`} className="absolute inset-0" aria-label={`Editar ${t.title}`} />
                  <span>{t.title}</span>
                </td>
                <td className="px-6 py-4 font-bold">
                   USD {t.price_adult}
                </td>
                <td className="px-6 py-4 text-text-light">
                   {t.duration}
                </td>
                <td className="px-6 py-4">
                   {t.is_active ? (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 relative z-10">
                       Activo
                     </span>
                   ) : (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 relative z-10">
                       Inactivo
                     </span>
                   )}
                </td>
              </tr>
            ))}
            {safeTours.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-light">
                  No hay tours registrados para {brandConfig.shortName}. Utiliza el botón &quot;+ Nuevo Tour&quot; para agregar uno.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

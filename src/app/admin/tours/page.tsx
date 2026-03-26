import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminToursPage() {
  const supabase = await createClient();
  
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .order('created_at', { ascending: false });

  const safeTours = tours || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-primary">Catálogo de Tours</h1>
        <Link href="/admin/tours/new" className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-light transition-colors">
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
            {safeTours.map((t: any) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors cursor-pointer group relative">
                <td className="px-6 py-4 font-medium text-text-main flex items-center space-x-4">
                  <img src={t.image_url} className="w-12 h-12 object-cover rounded-md" />
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

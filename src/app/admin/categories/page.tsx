import { createClient } from '@/lib/supabase/server';
import { createCategory, deleteCategory } from './actions';
import { Tags, Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('categories').select('*').order('name');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Tags className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Categorías</h1>
          <p className="text-sm text-text-light mt-1">Administra las categorías de los tours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulario para agregar */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 className="font-bold text-lg mb-4">Nueva Categoría</h3>
          <form action={async (formData) => {
            'use server';
            await createCategory(formData);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Nombre</label>
              <input name="name" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Ej: Aventura" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Slug</label>
              <input name="slug" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Ej: aventura" />
            </div>
            <button type="submit" className="w-full py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors">
              Agregar
            </button>
          </form>
        </div>

        {/* Lista de categorias */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-sm text-text-light uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-bold">Nombre</th>
                <th className="px-6 py-4 font-bold">Slug</th>
                <th className="px-6 py-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {(categories || []).map((cat: any) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-text-main">{cat.name}</td>
                  <td className="px-6 py-4 text-text-light">{cat.slug}</td>
                  <td className="px-6 py-4 text-right">
                    <form action={async () => {
                      'use server';
                      await deleteCategory(cat.id);
                    }}>
                      <button type="submit" className="text-red-500 hover:text-red-700 transition-colors bg-red-50 p-2 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {(!categories || categories.length === 0) && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-text-light">
                    No hay categorías registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTour, updateTour, deleteTour } from '@/app/admin/tours/actions';

export default function TourForm({ 
  tour = null, 
  categories = [], 
  destinations = [] 
}: { 
  tour?: any, 
  categories: any[], 
  destinations: any[] 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!tour;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    let res;
    if (isEditing) {
      res = await updateTour(tour.id, formData);
    } else {
      res = await createTour(formData);
    }

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('¿Estás seguro de eliminar este tour?')) return;
    setLoading(true);
    const res = await deleteTour(tour.id);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Título</label>
            <input name="title" required defaultValue={tour?.title || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">URL Slug (Ej: machu-picchu-full-day)</label>
            <input name="slug" required defaultValue={tour?.slug || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Precio Adulto (USD)</label>
            <input type="number" step="0.01" name="price_adult" required defaultValue={tour?.price_adult || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Precio Niño (USD) (Opcional)</label>
            <input type="number" step="0.01" name="price_child" defaultValue={tour?.price_child || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Duración (Ej: "1 Día")</label>
            <input name="duration" defaultValue={tour?.duration || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Categoría</label>
            <select name="category_id" defaultValue={tour?.category_id || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
              <option value="">Seleccione una categoría...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Destino</label>
            <select name="destination_id" defaultValue={tour?.destination_id || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
              <option value="">Seleccione un destino...</option>
              {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1">Descripción</label>
          <textarea name="description" rows={4} defaultValue={tour?.description || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1">Incluye (Una línea por ítem)</label>
          <textarea name="inclusions" rows={4} defaultValue={(tour?.inclusions || []).join('\n')} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Transporte&#10;Guía Turístico&#10;Entradas" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
             <label className="block text-sm font-medium text-text-main mb-1">URL Imagen Principal</label>
             <input name="image_url" required defaultValue={tour?.image_url || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
             <label className="block text-sm font-medium text-text-main mb-1">Etiqueta/Tag (Ej: "Más Popular")</label>
             <input name="tag" defaultValue={tour?.tag || ''} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input type="checkbox" name="is_active" id="is_active" defaultChecked={tour ? tour.is_active : true} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" />
          <label htmlFor="is_active" className="text-sm font-medium text-text-main">Tour Activo y visible</label>
        </div>

        <div className="flex justify-end space-x-4 border-t border-gray-100 pt-6 mt-6">
          {isEditing && (
            <button type="button" onClick={handleDelete} disabled={loading} className="px-6 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50">
              Eliminar Tour
            </button>
          )}
          <button type="button" onClick={() => window.history.back()} className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50">
            {loading ? 'Guardando...' : 'Guardar Tour'}
          </button>
        </div>
      </form>
    </div>
  );
}

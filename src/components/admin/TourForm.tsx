'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTour, updateTour, deleteTour } from '@/app/admin/tours/actions';
import { Plus, Trash2, ArrowUp, ArrowDown, Calendar, Building2, Images, Image as ImageIcon } from 'lucide-react';
import { BRANDS, BrandId } from '@/lib/brand';
import { reorderGalleryImages } from '@/lib/gallery';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export default function TourForm({ 
  tour = null, 
  categories = [], 
  destinations = [],
  activeBrand = 'mta'
}: { 
  tour?: any, 
  categories: any[], 
  destinations: any[],
  activeBrand?: BrandId
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!tour;
  const initialTenant: BrandId = (tour?.tenant === 'sonqo' || tour?.tenant === 'mta')
    ? tour.tenant
    : (activeBrand || 'mta');

  // Itinerary repeater state
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(() => {
    if (Array.isArray(tour?.itinerary)) {
      return tour.itinerary.map((d: any, idx: number) => ({
        day: typeof d.day === 'number' ? d.day : idx + 1,
        title: d.title || '',
        description: d.description || '',
      }));
    }
    return [];
  });

  const addItineraryDay = () => {
    setItinerary(prev => [
      ...prev,
      {
        day: prev.length + 1,
        title: '',
        description: '',
      }
    ]);
  };

  const updateItineraryDay = (index: number, field: 'title' | 'description', value: string) => {
    setItinerary(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const removeItineraryDay = (index: number) => {
    setItinerary(prev => {
      const filtered = prev.filter((_, i) => i !== index);
      // Re-index day numbers sequentially
      return filtered.map((item, idx) => ({ ...item, day: idx + 1 }));
    });
  };

  const moveItineraryDay = (index: number, direction: 'up' | 'down') => {
    setItinerary(prev => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      // Re-index day numbers
      return next.map((item, idx) => ({ ...item, day: idx + 1 }));
    });
  };

  // Media Gallery state (tours.images TEXT[])
  const [images, setImages] = useState<string[]>(() => {
    if (Array.isArray(tour?.images)) {
      return tour.images.filter((img: any) => typeof img === 'string' && img.trim() !== '');
    }
    return [];
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [galleryInputError, setGalleryInputError] = useState<string | null>(null);

  const addGalleryImage = () => {
    const trimmed = newImageUrl.trim();
    if (!trimmed) {
      setGalleryInputError('Por favor ingresa una URL válida.');
      return;
    }
    if (trimmed.length > 2048) {
      setGalleryInputError('La URL excede el límite de 2048 caracteres.');
      return;
    }
    setImages(prev => [...prev, trimmed]);
    setNewImageUrl('');
    setGalleryInputError(null);
  };

  const removeGalleryImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveGalleryImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    setImages(prev => reorderGalleryImages(prev, index, targetIndex));
  };

  const updateGalleryImage = (index: number, value: string) => {
    setImages(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    // Explicitly set serialized itinerary JSON
    formData.set('itinerary', JSON.stringify(itinerary));
    // Explicitly set serialized gallery images JSON
    formData.set('images', JSON.stringify(images));

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
      
      <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
        {/* Hidden itinerary and gallery images JSON representations */}
        <input type="hidden" name="itinerary" value={JSON.stringify(itinerary)} />
        <input type="hidden" name="images" value={JSON.stringify(images)} />

        {/* Section: General Info & Brand Context */}
        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> Información General y Marca
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-main mb-1">Título del Tour</label>
              <input 
                name="title" 
                required 
                defaultValue={tour?.title || ''} 
                placeholder="Ej: Machu Picchu Mágico Full Day"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Marca / Tenant</label>
              <select 
                name="tenant" 
                defaultValue={initialTenant}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-medium"
              >
                <option value="mta">Machu Picchu Travel Adventures (MTA)</option>
                <option value="sonqo">Sonqo Perú Travel</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">URL Slug (Ej: machu-picchu-full-day)</label>
              <input 
                name="slug" 
                required 
                defaultValue={tour?.slug || ''} 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Duración (Ej: "1 Día", "2 Días / 1 Noche")</label>
              <input 
                name="duration" 
                defaultValue={tour?.duration || ''} 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Categoría</label>
              <select 
                name="category_id" 
                defaultValue={tour?.category_id || ''} 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Seleccione una categoría...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Destino</label>
              <select 
                name="destination_id" 
                defaultValue={tour?.destination_id || ''} 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Seleccione un destino...</option>
                {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section: 3-Tier Passenger Pricing */}
        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-lg font-serif font-bold text-primary mb-2">Precios por Tipo de Pasajero (USD)</h2>
          <p className="text-xs text-text-light mb-4">
            Configura los precios para Adulto, Niño (3-11 años) e Infante/Bebé (0-2 años).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Precio Adulto (USD) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                step="0.01" 
                name="price_adult" 
                required 
                defaultValue={tour?.price_adult ?? ''} 
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Precio Niño (USD) <span className="text-text-light font-normal">(Opcional)</span>
              </label>
              <input 
                type="number" 
                step="0.01" 
                name="price_child" 
                defaultValue={tour?.price_child ?? ''} 
                placeholder="Opcional"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-semibold" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">
                Precio Infante (USD) <span className="text-text-light font-normal">(Opcional, 0 si gratis)</span>
              </label>
              <input 
                type="number" 
                step="0.01" 
                name="price_infant" 
                defaultValue={tour?.price_infant ?? ''} 
                placeholder="Opcional (Ej: 0.00)"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-semibold" 
              />
            </div>
          </div>
        </div>

        {/* Section: Description */}
        <div>
          <label className="block text-sm font-medium text-text-main mb-1">Descripción Detallada</label>
          <textarea 
            name="description" 
            rows={4} 
            defaultValue={tour?.description || ''} 
            placeholder="Descripción general del tour..."
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" 
          />
        </div>

        {/* Section: Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              Qué Incluye (Una línea por ítem)
            </label>
            <textarea 
              name="inclusions" 
              rows={5} 
              defaultValue={(tour?.inclusions || []).join('\n')} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm" 
              placeholder="Transporte turístico&#10;Guía oficial de turismo&#10;Boletos de ingreso&#10;Almuerzo buffet" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">
              No Incluye / Exclusiones (Una línea por ítem)
            </label>
            <textarea 
              name="exclusions" 
              rows={5} 
              defaultValue={(tour?.exclusions || []).join('\n')} 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm" 
              placeholder="Vuelos internacionales o nacionales&#10;Seguro de viaje obligatorio&#10;Propinas no especificadas&#10;Gastos personales" 
            />
          </div>
        </div>

        {/* Section: Day-by-Day Dynamic Itinerary Repeater */}
        <div className="border-b border-gray-100 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Itinerario Día por Día
              </h2>
              <p className="text-xs text-text-light mt-0.5">
                Organiza las actividades detalladas por día. Puedes agregar días, editarlos y reordenarlos.
              </p>
            </div>
            <button
              type="button"
              onClick={addItineraryDay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-bold transition-colors w-fit"
            >
              <Plus className="w-4 h-4" /> Agregar Día
            </button>
          </div>

          {itinerary.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-text-main">No hay días de itinerario agregados</p>
              <p className="text-xs text-text-light mt-1 mb-3">
                Si no agregas días específicos, el tour utilizará el contenido por defecto del catálogo.
              </p>
              <button
                type="button"
                onClick={addItineraryDay}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-light transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar Primer Día
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3 relative group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                        D{item.day}
                      </span>
                      <span className="text-sm font-bold text-text-main">Día {item.day}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItineraryDay(index, 'up')}
                        disabled={index === 0}
                        title="Subir día"
                        className="p-1 rounded text-gray-500 hover:text-primary hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItineraryDay(index, 'down')}
                        disabled={index === itinerary.length - 1}
                        title="Bajar día"
                        className="p-1 rounded text-gray-500 hover:text-primary hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItineraryDay(index)}
                        title="Eliminar día"
                        className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Título del Día</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                      placeholder="Ej: Llegada a Cusco y City Tour"
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-light mb-1">Descripción de Actividades</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                      placeholder="Detalle de actividades, horarios, traslados y visitas..."
                      className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Media & Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
          <div>
             <label className="block text-sm font-medium text-text-main mb-1">URL Imagen Principal</label>
             <input 
               name="image_url" 
               required 
               defaultValue={tour?.image_url || ''} 
               placeholder="https://... o /tours/..."
               className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" 
             />
          </div>
          <div>
             <label className="block text-sm font-medium text-text-main mb-1">Etiqueta/Tag (Ej: "Más Popular", "Aventura")</label>
             <input 
               name="tag" 
               defaultValue={tour?.tag || ''} 
               className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" 
             />
          </div>
        </div>

        {/* Section: Media Gallery Management (tours.images TEXT[]) */}
        <div className="border-b border-gray-100 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                <Images className="w-5 h-5 text-primary" /> Galería de Fotos del Tour
              </h2>
              <p className="text-xs text-text-light mt-0.5">
                Agrega, previsualiza y reordena fotos secundarias para el carrusel y lightbox de la página pública ({images.length} {images.length === 1 ? 'foto' : 'fotos'}).
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-text-light rounded-full w-fit">
              {images.length} en galería
            </span>
          </div>

          {/* Add Image URL Bar */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-4 space-y-2">
            <label className="block text-xs font-semibold text-text-main">
              Agregar Nueva Imagen a la Galería
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => {
                  setNewImageUrl(e.target.value);
                  if (galleryInputError) setGalleryInputError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addGalleryImage();
                  }
                }}
                placeholder="https://images.unsplash.com/... o /tours/..."
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-light transition-colors whitespace-nowrap shadow-xs"
              >
                <Plus className="w-4 h-4" /> Agregar Foto
              </button>
            </div>
            {galleryInputError && (
              <p className="text-xs text-red-600 mt-1">{galleryInputError}</p>
            )}
            <p className="text-[11px] text-text-light">
              Tip: Puedes ingresar URLs externas (HTTPS) o rutas locales a fotos en el servidor como <code className="bg-gray-200/60 px-1 py-0.5 rounded">/tours/...</code>.
            </p>
          </div>

          {/* Gallery Items Grid */}
          {images.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-text-main">No hay fotos secundarias en la galería</p>
              <p className="text-xs text-text-light mt-1 mb-3">
                Si no agregas fotos a la galería, la página del tour solo mostrará la imagen principal.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {images.map((imgUrl, index) => (
                <div
                  key={index}
                  className="p-3 bg-white border border-gray-200 rounded-xl flex flex-col sm:flex-row items-center gap-3 shadow-xs hover:border-gray-300 transition-colors"
                >
                  {/* Thumbnail preview */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                    <img
                      src={imgUrl}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                      }}
                    />
                    <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      #{index + 1}
                    </span>
                  </div>

                  {/* URL input for inline adjustment */}
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-text-main">
                        Foto #{index + 1}
                      </span>
                      <span className="text-[11px] text-text-light truncate max-w-[200px]">
                        {imgUrl.startsWith('http') ? 'URL Externa' : 'Ruta Local'}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={imgUrl}
                      onChange={(e) => updateGalleryImage(index, e.target.value)}
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-text-main focus:outline-none focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Reorder and Delete Controls */}
                  <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => moveGalleryImage(index, 'up')}
                      disabled={index === 0}
                      title="Mover foto arriba"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveGalleryImage(index, 'down')}
                      disabled={index === images.length - 1}
                      title="Mover foto abajo"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      title="Eliminar foto de la galería"
                      className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input 
            type="checkbox" 
            name="is_active" 
            id="is_active" 
            defaultChecked={tour ? tour.is_active : true} 
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" 
          />
          <label htmlFor="is_active" className="text-sm font-medium text-text-main">Tour Activo y visible en la web</label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 border-t border-gray-100 pt-6 mt-6">
          {isEditing && (
            <button 
              type="button" 
              onClick={handleDelete} 
              disabled={loading} 
              className="px-6 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
            >
              Eliminar Tour
            </button>
          )}
          <button 
            type="button" 
            onClick={() => window.history.back()} 
            className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Guardando...' : 'Guardar Tour'}
          </button>
        </div>
      </form>
    </div>
  );
}
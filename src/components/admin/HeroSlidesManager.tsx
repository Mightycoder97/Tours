'use client';

import { useState } from 'react';
import { HeroSlide, DEFAULT_HERO_SLIDES } from '@/lib/visual-assets';
import { BrandId, BRANDS } from '@/lib/brand';
import { updateHeroSlides } from '@/app/admin/settings/actions';
import { 
  Sliders, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Eye, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HeroSlidesManagerProps {
  activeBrand: BrandId;
  initialSlides: HeroSlide[];
}

export default function HeroSlidesManager({ activeBrand, initialSlides }: HeroSlidesManagerProps) {
  const brandConfig = BRANDS[activeBrand] || BRANDS.mta;

  const [slides, setSlides] = useState<HeroSlide[]>(() => {
    if (Array.isArray(initialSlides) && initialSlides.length > 0) {
      return initialSlides;
    }
    return DEFAULT_HERO_SLIDES[activeBrand] || DEFAULT_HERO_SLIDES.mta;
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New slide draft state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newLink, setNewLink] = useState('/tours');
  const [newCta, setNewCta] = useState('Ver Tours');
  const [isAddingOpen, setIsAddingOpen] = useState(false);

  const addSlide = () => {
    if (!newTitle.trim()) {
      setErrorMessage('El título del banner es obligatorio.');
      return;
    }
    if (!newImage.trim()) {
      setErrorMessage('La URL o ruta de la imagen es obligatoria.');
      return;
    }

    const newSlide: HeroSlide = {
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      image: newImage.trim(),
      link: newLink.trim() || undefined,
      cta: newCta.trim() || undefined,
    };

    setSlides(prev => [...prev, newSlide]);
    setNewTitle('');
    setNewSubtitle('');
    setNewImage('');
    setNewLink('/tours');
    setNewCta('Ver Tours');
    setIsAddingOpen(false);
    setErrorMessage(null);
  };

  const removeSlide = (index: number) => {
    setSlides(prev => prev.filter((_, idx) => idx !== index));
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    setSlides(prev => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const updateSlideField = (index: number, field: keyof HeroSlide, value: string) => {
    setSlides(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
  };

  const resetToDefaults = () => {
    if (!confirm(`¿Restablecer los banners por defecto para ${brandConfig.name}?`)) return;
    const defaults = DEFAULT_HERO_SLIDES[activeBrand] || DEFAULT_HERO_SLIDES.mta;
    setSlides(defaults);
    setSuccessMessage(`Banners restablecidos al diseño por defecto de ${brandConfig.shortName}. Recuerda hacer clic en "Guardar Banners".`);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validate that all slides have non-empty title and image
    for (let i = 0; i < slides.length; i++) {
      if (!slides[i].title || !slides[i].title.trim()) {
        setErrorMessage(`El banner #${i + 1} no tiene título.`);
        setSaving(false);
        return;
      }
      if (!slides[i].image || !slides[i].image.trim()) {
        setErrorMessage(`El banner #${i + 1} no tiene URL de imagen.`);
        setSaving(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.set('tenant', activeBrand);
      formData.set('home_hero_slides', JSON.stringify(slides));

      const res = await updateHeroSlides(formData);
      if (res?.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage(`¡Banners de ${brandConfig.name} guardados y actualizados con éxito en la portada!`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error inesperado al guardar los banners.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold text-primary">
              Banners Principales (Hero Slider)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-light mt-1">
            Personaliza los banners rotativos, títulos, imágenes y enlaces promocionales para{' '}
            <strong className="text-text-main font-semibold">{brandConfig.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetToDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-text-light hover:text-text-main bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Restablecer banners sugeridos"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Predeterminados
          </button>
          <button
            type="button"
            onClick={() => setIsAddingOpen(!isAddingOpen)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-xs sm:text-sm font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> {isAddingOpen ? 'Cerrar Formulario' : 'Nuevo Banner'}
          </button>
        </div>
      </div>

      {/* Notification Alerts */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500 rounded-r-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-800 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Add New Slide Form Panel */}
      {isAddingOpen && (
        <div className="p-5 bg-teal-50/50 border border-teal-200/60 rounded-xl space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Agregar Nuevo Banner al Carrusel
            </h3>
            <span className="text-xs text-text-light">Marca: {brandConfig.shortName}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-main mb-1">
                Título Principal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ej: Machu Picchu Mágico & Valle Sagrado"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1">
                Subtítulo / Bajada Descriptiva
              </label>
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="Ej: Vive una experiencia inolvidable con guías locales"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-text-main mb-1">
                URL o Ruta de la Imagen <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="https://images.unsplash.com/... o /imagenes/hero-machupicchu-1.png"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-main mb-1">
                Texto del Botón CTA
              </label>
              <input
                type="text"
                value={newCta}
                onChange={(e) => setNewCta(e.target.value)}
                placeholder="Ej: Ver Tours o Reservar"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-main mb-1">
              Enlace de Destino (Link)
            </label>
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="/tours o /tours/camino-inca-clasico"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingOpen(false)}
              className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={addSlide}
              className="px-4 py-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-light rounded-lg transition-colors shadow-xs"
            >
              Confirmar y Agregar
            </button>
          </div>
        </div>
      )}

      {/* Slides List */}
      <div className="space-y-4">
        {slides.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-text-main">No hay banners activos</h3>
            <p className="text-xs text-text-light mt-1 mb-4">
              Agrega banners promocionales o haz clic en "Predeterminados" para cargar el diseño base de la marca.
            </p>
            <button
              type="button"
              onClick={resetToDefaults}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-light transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Cargar Banners por Defecto
            </button>
          </div>
        ) : (
          slides.map((slide, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-gray-300 transition-all space-y-4"
            >
              {/* Slide Card Header with Controls */}
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-text-main">
                    Banner #{index + 1}: {slide.title || 'Sin Título'}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSlide(index, 'up')}
                    disabled={index === 0}
                    title="Mover arriba"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSlide(index, 'down')}
                    disabled={index === slides.length - 1}
                    title="Mover abajo"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    title="Eliminar banner"
                    className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors ml-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Fields & Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                {/* Form Inputs (2 cols) */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-text-light mb-1">
                        Título Principal
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlideField(index, 'title', e.target.value)}
                        placeholder="Título del banner"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-light mb-1">
                        Subtítulo
                      </label>
                      <input
                        type="text"
                        value={slide.subtitle || ''}
                        onChange={(e) => updateSlideField(index, 'subtitle', e.target.value)}
                        placeholder="Subtítulo opcional"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-text-light mb-1">
                      URL de Imagen
                    </label>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => updateSlideField(index, 'image', e.target.value)}
                      placeholder="https://... o /imagenes/..."
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:border-primary focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-text-light mb-1">
                        Enlace de Destino (Link)
                      </label>
                      <input
                        type="text"
                        value={slide.link || ''}
                        onChange={(e) => updateSlideField(index, 'link', e.target.value)}
                        placeholder="/tours"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-light mb-1">
                        Texto del Botón CTA
                      </label>
                      <input
                        type="text"
                        value={slide.cta || ''}
                        onChange={(e) => updateSlideField(index, 'cta', e.target.value)}
                        placeholder="Ver Tours"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Mini Preview Box (1 col) */}
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-900 h-40 flex flex-col justify-end p-3 text-white shadow-inner group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-black/40 px-1.5 py-0.5 rounded">
                      Vista Previa
                    </span>
                    <h4 className="text-xs font-serif font-bold line-clamp-1 drop-shadow-sm">
                      {slide.title || 'Título del Banner'}
                    </h4>
                    {slide.subtitle && (
                      <p className="text-[10px] text-white/80 line-clamp-1">
                        {slide.subtitle}
                      </p>
                    )}
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">
                        {slide.cta || 'Ver Tours'}
                      </span>
                      <span className="text-[10px] text-white/70 font-mono">
                        {slide.link || '/tours'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Button Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-5">
        <p className="text-xs text-text-light">
          Los cambios se aplicarán inmediatamente en la página de inicio para el tenant{' '}
          <strong className="text-text-main">{brandConfig.shortName}</strong>.
        </p>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-light transition-all shadow-sm hover:shadow disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando Banners...' : `Guardar Banners (${brandConfig.shortName})`}
        </button>
      </div>
    </div>
  );
}

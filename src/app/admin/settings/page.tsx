import { createClient } from '@/lib/supabase/server';
import { updateSettings } from './actions';
import { Settings, Save, Building2 } from 'lucide-react';
import { getAdminActiveBrand } from '@/lib/admin-brand';
import { BRANDS } from '@/lib/brand';
import { parseHeroSlidesJson, getFallbackHeroSlides, HeroSlide } from '@/lib/visual-assets';
import HeroSlidesManager from '@/components/admin/HeroSlidesManager';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const activeBrand = await getAdminActiveBrand();
  const brandConfig = BRANDS[activeBrand] || BRANDS.mta;
  const supabase = await createClient();

  const { data: settings, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('tenant', activeBrand)
    .order('key');

  const settingsError = error ? 'Asegúrate de haber ejecutado la migración SQL para site_settings en tu base de datos.' : null;

  // Extract and parse hero slides for dedicated manager
  const heroSettingRow = settings?.find((s) => s.key === 'home_hero_slides');
  let initialHeroSlides: HeroSlide[] = getFallbackHeroSlides(activeBrand);
  if (heroSettingRow?.value) {
    try {
      const parsed = parseHeroSlidesJson(heroSettingRow.value);
      if (parsed.length > 0) {
        initialHeroSlides = parsed;
      }
    } catch (e) {
      console.error('Error parsing hero slides in AdminSettingsPage:', e);
    }
  }

  // Filter other settings for the generic text options form
  const otherSettings = settings?.filter((s) => s.key !== 'home_hero_slides') || [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Configuración Visual y del Sitio</h1>
            <p className="text-sm text-text-light mt-1">
              Administra banners principales, recursos visuales y parámetros globales de {brandConfig.name}.
            </p>
          </div>
        </div>

        {/* Active brand context badge */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm w-fit">
          <Building2 className="w-4 h-4 text-text-light" />
          <span className="text-xs text-text-light font-medium">Contexto:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              activeBrand === 'sonqo'
                ? 'bg-[#8B66E8]/15 text-[#8B66E8] border border-[#8B66E8]/30'
                : 'bg-teal-100 text-teal-800 border border-teal-200'
            }`}
          >
            {brandConfig.name} ({activeBrand.toUpperCase()})
          </span>
        </div>
      </div>

      {settingsError && (
        <div className="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded-md">
          <p className="font-bold">Aviso:</p>
          <p>{settingsError}</p>
        </div>
      )}

      {/* Feature 8: Dedicated Hero Slides Banner CMS */}
      <section>
        <HeroSlidesManager 
          activeBrand={activeBrand} 
          initialSlides={initialHeroSlides} 
        />
      </section>

      {/* Other General Site Settings */}
      {otherSettings.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-serif font-bold text-primary">
              Textos Generales y Metadatos ({brandConfig.shortName})
            </h2>
            <p className="text-xs text-text-light mt-1">
              Opciones de configuración complementarias guardadas en la base de datos para esta marca.
            </p>
          </div>

          <form action={updateSettings} className="space-y-6">
            <input type="hidden" name="tenant" value={activeBrand} />

            <div className="grid grid-cols-1 gap-6">
              {otherSettings.map((setting) => (
                <div key={setting.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <label className="block text-sm font-bold text-text-main mb-1 uppercase tracking-wide">
                    {setting.key.replace(/_/g, ' ')}
                  </label>
                  <p className="text-xs text-text-light mb-2">{setting.description}</p>
                  {setting.value && (setting.value.length > 100 || setting.value.includes('<') || setting.value.startsWith('{') || setting.value.startsWith('[')) ? (
                    <textarea 
                      name={`setting_${setting.key}`} 
                      defaultValue={setting.value} 
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm" 
                    />
                  ) : (
                    <input 
                      name={`setting_${setting.key}`} 
                      defaultValue={setting.value || ''} 
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm" 
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                className="flex items-center px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-colors shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Configuración General
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { updateSettings } from './actions';
import { Settings, Save } from 'lucide-react';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings, error } = await supabase.from('site_settings').select('*').order('key');

  const settingsError = error ? 'Asegúrate de haber ejecutado la migración SQL para site_settings en tu base de datos.' : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Configuración del Sitio</h1>
          <p className="text-sm text-text-light mt-1">Modifica los textos estáticos y opciones generales de la página.</p>
        </div>
      </div>

      {settingsError && (
        <div className="p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded-md">
          <p className="font-bold">Aviso:</p>
          <p>{settingsError}</p>
        </div>
      )}

      {!settingsError && settings && settings.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form action={updateSettings} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {settings.map((setting) => (
                <div key={setting.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <label className="block text-sm font-bold text-text-main mb-1 uppercase tracking-wide">
                    {setting.key.replace(/_/g, ' ')}
                  </label>
                  <p className="text-xs text-text-light mb-2">{setting.description}</p>
                  {setting.value.length > 100 || setting.value.includes('<') ? (
                    <textarea 
                      name={`setting_${setting.key}`} 
                      defaultValue={setting.value} 
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm" 
                    />
                  ) : (
                    <input 
                      name={`setting_${setting.key}`} 
                      defaultValue={setting.value} 
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-mono text-sm" 
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors">
                <Save className="w-5 h-5 mr-2" />
                Guardar Configuración
              </button>
            </div>
          </form>
        </div>
      ) : (
        !settingsError && (
          <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-text-light">
            No hay configuraciones disponibles.
          </div>
        )
      )}
    </div>
  );
}

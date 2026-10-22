'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AdvisorContact() {
  const t = useTranslations('pages.experiences');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = '51955723329';
    const textMessage = `¡Hola Machupicchu Travel Adventure! Deseo solicitar asesoría personalizada.\n\n` +
      `👤 Nombre: ${name || 'No provisto'}\n` +
      `✉️ Correo: ${email || 'No provisto'}\n` +
      `📍 Destino de interés: ${interest || 'Varios / No especificado'}\n` +
      `📅 Fecha estimada: ${date || 'Por definir'}\n\n` +
      `¿Me podrían brindar información de tarifas y disponibilidad? ¡Gracias!`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-accent rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm max-w-lg mx-auto">
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-dark mb-2 text-center">{t('formTitle')}</h3>
      <p className="text-text-light text-xs sm:text-sm text-center mb-6 font-light">{t('formSubtitle')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formName')}</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formEmail')}</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan@correo.com"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formDate')}</label>
            <input
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Ej: Julio 2026"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="interest" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formInterest')}</label>
          <select
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main cursor-pointer"
          >
            <option value="">Cualquier destino</option>
            <option value="Machu Picchu Full Day">Machu Picchu Full Day</option>
            <option value="Valle Sagrado de los Incas">Valle Sagrado de los Incas</option>
            <option value="Montaña de Colores">Montaña de Colores</option>
            <option value="Camino Inca">Camino Inca</option>
            <option value="Salar de Uyuni / Huacachina">Huacachina o Salar de Uyuni</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 text-sm sm:text-base border-none"
        >
          <MessageCircle className="w-5 h-5" />
          {t('formSubmit')}
        </button>
      </form>
    </div>
  );
}

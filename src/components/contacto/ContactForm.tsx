'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('pages.contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = '51955723329';
    const textMessage = `¡Hola Machupicchu Travel Adventure! Deseo enviar un mensaje desde la web.\n\n` +
      `👤 Nombre: ${name}\n` +
      `✉️ Correo: ${email}\n` +
      `📞 Teléfono: ${phone || 'No provisto'}\n` +
      `💬 Mensaje: ${message}`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
      <h3 className="font-serif text-2xl font-bold text-text-main mb-6">{t('formTitle')}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact_name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formName')}</label>
          <input
            id="contact_name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact_email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formEmail')}</label>
            <input
              id="contact_email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan@correo.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main"
            />
          </div>
          <div>
            <label htmlFor="contact_phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formPhone')}</label>
            <input
              id="contact_phone"
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: +51 955723329"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="contact_message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('formMessage')}</label>
          <textarea
            id="contact_message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm font-semibold text-text-main resize-none"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#ff7a00] hover:bg-[#e06b00] text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 text-sm sm:text-base border-none"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{t('formSubmit')}</span>
        </button>
      </form>
    </div>
  );
}

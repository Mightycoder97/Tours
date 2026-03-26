'use client';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('ES');

  useEffect(() => {
    // Inject Google Translate script only once
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'es', includedLanguages: 'es,en', autoDisplay: false },
          'google_translate_element'
        );
      };

      // Hide the annoying Google Translate top bar that forces itself
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        #google_translate_element { display: none !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf { display: none !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const toggleLanguage = () => {
    const targetLang = lang === 'ES' ? 'en' : 'es';
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    
    if (select) {
      select.value = targetLang;
      select.dispatchEvent(new Event('change'));
      setLang(targetLang === 'en' ? 'EN' : 'ES');
    }
  };

  return (
    <>
      <div id="google_translate_element"></div>
      <div 
        onClick={toggleLanguage}
        className="flex items-center space-x-2 cursor-pointer hover:text-accent transition-colors select-none"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{lang}</span>
      </div>
    </>
  );
}

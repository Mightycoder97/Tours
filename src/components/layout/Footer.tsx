import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31 0 2.56.37 3.63 1.02.08-.24.18-.47.31-.69A6.745 6.745 0 0 0 22.185.03c.04.59.03 1.18-.04 1.77-.52-.08-1.03-.27-1.51-.55a4.776 4.776 0 0 1-2.07-2.61c-.02 1.25-.33 2.47-.92 3.56-.63 1.17-1.55 2.15-2.67 2.84-.04.02-.08.05-.12.07v10.36c0 1.78-.65 3.48-1.84 4.79a7.354 7.354 0 0 1-5.38 2.52c-2.03 0-3.97-.83-5.38-2.3a7.514 7.514 0 0 1-1.84-5.02c0-2.88 2.07-5.38 4.96-5.83.15-.02.3-.04.45-.05v2.53a4.78 4.78 0 0 0-2.87 3.35 4.98 4.98 0 0 0 1.22 4.39 4.88 4.88 0 0 0 3.62 1.63c2.7 0 4.89-2.19 4.89-4.89V0h2.53z" />
    </svg>
  );
}

function TripAdvisorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3.167c-1.897 0-3.57 1.1-4.373 2.736a5.163 5.163 0 0 1 8.746 0c-.803-1.637-2.476-2.736-4.373-2.736zM3.46 11.233a3.543 3.543 0 0 1 3.54-3.543c1.954 0 3.54 1.587 3.54 3.543 0 1.954-1.586 3.54-3.54 3.54a3.543 3.543 0 0 1-3.54-3.54zm3.54 1.706a1.706 1.706 0 1 0 0-3.412 1.706 1.706 0 0 0 0 3.412zm6.98-1.706c0-1.956 1.586-3.543 3.54-3.543a3.543 3.543 0 0 1 3.54 3.543c0 1.954-1.586 3.54-3.54 3.54-1.954 0-3.54-1.586-3.54-3.54zm3.54 1.706a1.706 1.706 0 1 0 0-3.412 1.706 1.706 0 0 0 0 3.412zM12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.153 18.067c-.23.23-.46.368-.69.46a7.354 7.354 0 0 1-2.906.574c-1.334 0-2.436-.345-3.328-1.012-.892.667-1.994 1.012-3.328 1.012a7.354 7.354 0 0 1-2.906-.574c-.23-.092-.46-.23-.69-.46-.368-.368-.368-.782 0-1.15a13.344 13.344 0 0 1 2.392-1.932 5.23 5.23 0 0 1-.368-1.886c0-2.898 2.346-5.244 5.244-5.244s5.244 2.346 5.244 5.244c0 .667-.115 1.31-.368 1.886a13.344 13.344 0 0 1 2.392 1.932c.368.368.368.782 0 1.15z" />
    </svg>
  );
}

export default async function Footer() {
  const t = await getTranslations('footer');
  const rucValue = '20564458385';

  return (
    <footer className="bg-footer-bg text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          
          {/* Column 1: Brand & Contacts */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <h3 className="font-serif text-2xl text-primary mb-4 leading-tight">{t('brand.name')}</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              {t('brand.description')}
            </p>
            
            {/* Direct Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2.5 text-gray-300">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+51955723329" className="hover:text-primary transition-colors font-medium">{t('contact.phone')}</a>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:reservasmtaperu@gmail.com" className="hover:text-primary transition-colors font-medium break-all">{t('contact.email')}</a>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400 text-xs">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{t('contact.hours')}</span>
              </div>
            </div>

            {/* Social media Links */}
            <div className="flex gap-2.5">
              <a href="https://www.facebook.com/MachupicchuTravelAdventure/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white" aria-label={t('social.facebook')}>
                <FacebookIcon className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.instagram.com/machupicchutraveladventure/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white" aria-label={t('social.instagram')}>
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.tiktok.com/@machupicchutraveladventu?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white" aria-label={t('social.tiktok')}>
                <TiktokIcon className="w-4.5 h-4.5" />
              </a>
              <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors text-gray-300 hover:text-white" aria-label="TripAdvisor">
                <TripAdvisorIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Servicios */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">{t('servicios.title')}</h4>
            <ul className="space-y-2.5 font-light text-gray-400 text-xs sm:text-sm">
              <li><Link href="/tours" className="hover:text-primary transition-colors">{t('servicios.paquetes')}</Link></li>
              <li><Link href="/tours?q=Machu+Picchu" className="hover:text-primary transition-colors">{t('servicios.machuPicchu')}</Link></li>
              <li><Link href="/tours?q=Huacachina" className="hover:text-primary transition-colors">{t('servicios.huacachina')}</Link></li>
              <li><Link href="/tours?q=Salar" className="hover:text-primary transition-colors">{t('servicios.salarUyuni')}</Link></li>
              <li><Link href="/tours?q=Colores" className="hover:text-primary transition-colors">{t('servicios.montanaColores')}</Link></li>
              <li><Link href="/tours?q=Valle" className="hover:text-primary transition-colors">{t('servicios.valleSagrado')}</Link></li>
              <li><Link href="/tours?q=Ballestas" className="hover:text-primary transition-colors">{t('servicios.islasBallestas')}</Link></li>
              <li><Link href="/tours?q=Titicaca" className="hover:text-primary transition-colors">{t('servicios.lagoTiticaca')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Información Útil */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">{t('util.title')}</h4>
            <ul className="space-y-2.5 font-light text-gray-400 text-xs sm:text-sm">
              <li><Link href="/tours" className="hover:text-primary transition-colors">{t('util.paquetes')}</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">{t('util.blogMachuPicchu')}</Link></li>
              <li><Link href="/tours" className="hover:text-primary transition-colors">{t('util.destinosRecomendados')}</Link></li>
              <li><Link href="/contacto" className="hover:text-primary transition-colors">{t('util.planificarViaje')}</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">{t('util.blog')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Legales */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">{t('legales.title')}</h4>
            <ul className="space-y-2.5 font-light text-gray-400 text-xs sm:text-sm">
              <li><Link href="/nosotros" className="hover:text-primary transition-colors">{t('legales.terminos')}</Link></li>
              <li><Link href="/nosotros" className="hover:text-primary transition-colors">{t('legales.privacidad')}</Link></li>
              <li><Link href="/nosotros" className="hover:text-primary transition-colors">{t('legales.cookies')}</Link></li>
              <li><Link href="/nosotros" className="hover:text-primary transition-colors">{t('legales.compromiso')}</Link></li>
            </ul>
          </div>

          {/* Column 5: Centro de Ayuda */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">{t('ayuda.title')}</h4>
            <ul className="space-y-2.5 font-light text-gray-400 text-xs sm:text-sm mb-4">
              <li><Link href="/contacto" className="hover:text-primary transition-colors">{t('ayuda.cambios')}</Link></li>
              <li><Link href="/contacto" className="hover:text-primary transition-colors">{t('ayuda.faq')}</Link></li>
              <li><Link href="/contacto" className="hover:text-primary transition-colors">{t('ayuda.centroAyuda')}</Link></li>
            </ul>
            
            {/* Libro de reclamaciones digital */}
            <div className="mt-4 pt-3 border-t border-gray-800">
              <Link href="/contacto" className="group flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-lg hover:border-primary transition-colors text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-gray-300 group-hover:text-primary transition-colors">{t('ayuda.libroReclamaciones')}</span>
              </Link>
            </div>
          </div>

          {/* Column 6: Info Corporativa & Aliados */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4 border-b border-gray-800 pb-2">{t('corporativo.title')}</h4>
            <ul className="space-y-2.5 font-light text-gray-400 text-xs sm:text-sm mb-5">
              <li><Link href="/nosotros" className="hover:text-primary transition-colors">{t('corporativo.ayudaSocial')}</Link></li>
              <li className="text-gray-300 font-semibold">{t('corporativo.rucLabel', { ruc: rucValue })}</li>
            </ul>

            <h5 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-2">{t('corporativo.aliados')}</h5>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-500 font-medium">
              <div className="bg-white/5 px-1.5 py-1 rounded border border-white/5 text-center">Peru Rail</div>
              <div className="bg-white/5 px-1.5 py-1 rounded border border-white/5 text-center">Inca Rail</div>
              <div className="bg-white/5 px-1.5 py-1 rounded border border-white/5 text-center">Latam</div>
              <div className="bg-white/5 px-1.5 py-1 rounded border border-white/5 text-center">Mincul</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
            <p className="text-gray-500 text-xs text-center md:text-left">
              {t('bottom.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-gray-500 text-xs font-semibold">{t('bottom.paymentMethods')}</span>
              <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-bold text-gray-400">
                <span className="bg-white/5 rounded px-2 py-1 border border-white/10">VISA</span>
                <span className="bg-white/5 rounded px-2 py-1 border border-white/10">MASTERCARD</span>
                <span className="bg-white/5 rounded px-2 py-1 border border-white/10">PAYPAL</span>
                <span className="bg-white/5 rounded px-2 py-1 border border-white/10">IZIPAY</span>
                <span className="bg-white/5 rounded px-2 py-1 border border-white/10">WESTERN UNION</span>
                <span className="bg-white/5 rounded px-2 py-1 border border-white/10">MONEYGRAM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

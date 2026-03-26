import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Contact */}
          <div>
            <h2 className="font-serif text-2xl tracking-widest font-bold mb-2">
              MACHUPICCHU<br/><span className="text-sm font-sans font-light tracking-wide text-accent">TRAVEL ADVENTURE</span>
            </h2>
            <p className="text-gray-300 text-sm mb-6 mt-4">
              Conectamos tu viaje con la magia del Perú. Creando experiencias únicas que transforman cada viaje en un recuerdo inolvidable.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 Cusco, Perú</p>
              <p>📞 +51 987 654 321</p>
              <p>✉️ info@machupicchutravel.com</p>
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-white border-b border-primary-light pb-2 inline-block">Destinos Principales</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/tours" className="hover:text-accent transition-colors">Machu Picchu</Link></li>
              <li><Link href="/tours" className="hover:text-accent transition-colors">Valle Sagrado de los Incas</Link></li>
              <li><Link href="/tours" className="hover:text-accent transition-colors">Montaña de 7 Colores</Link></li>
              <li><Link href="/tours" className="hover:text-accent transition-colors">Laguna Humantay</Link></li>
              <li><Link href="/tours" className="hover:text-accent transition-colors">City Tour Cusco</Link></li>
            </ul>
          </div>

          {/* Enlaces Útiles */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-white border-b border-primary-light pb-2 inline-block">Información Útil</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/nosotros" className="hover:text-accent transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="/condiciones" className="hover:text-accent transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/politicas" className="hover:text-accent transition-colors">Políticas de Privacidad</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Contáctanos</Link></li>
            </ul>
          </div>

          {/* Pagos y Seguridad */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-white border-b border-primary-light pb-2 inline-block">Métodos de Pago</h3>
            <p className="text-sm text-gray-300 mb-4">Aceptamos todas las tarjetas de crédito y débito de forma 100% segura.</p>
            <div className="flex flex-wrap gap-2 mb-6">
               <div className="bg-white/10 px-3 py-1 text-xs font-bold rounded">VISA</div>
               <div className="bg-white/10 px-3 py-1 text-xs font-bold rounded">MC</div>
               <div className="bg-white/10 px-3 py-1 text-xs font-bold rounded">AMEX</div>
               <div className="bg-white/10 px-3 py-1 text-xs font-bold rounded">PAYPAL</div>
               <div className="bg-white/10 px-3 py-1 text-xs font-bold rounded">CULQI</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-light pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Machu Picchu Travel Adventures. Todos los derechos reservados.</p>
          <div className="flex space-x-2 mt-4 md:mt-0">
             <Link href="#" className="hover:text-white transition-colors py-2 px-3">Facebook</Link>
             <Link href="#" className="hover:text-white transition-colors py-2 px-3">Instagram</Link>
             <Link href="#" className="hover:text-white transition-colors py-2 px-3">TikTok</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

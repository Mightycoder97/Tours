import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-serif font-bold text-text-main mb-3">
          Página no encontrada
        </h2>
        <p className="text-text-light mb-8">
          La página que buscas no existe o ha sido movida. ¿Quizás quieras explorar nuestros tours?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors"
          >
            <Home className="w-4 h-4" /> Ir al inicio
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-full font-bold text-text-main hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" /> Explorar tours
          </Link>
        </div>
      </div>
    </div>
  );
}

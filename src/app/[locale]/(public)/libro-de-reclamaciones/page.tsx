import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/brand';
import { BookOpen } from 'lucide-react';
import LibroReclamacionesForm from '@/components/reclamaciones/LibroReclamacionesForm';

export function generateMetadata(): Metadata {
  const brand = getBrandConfig();
  return {
    title: `Libro de Reclamaciones Virtual | ${brand.name}`,
    description: `Libro de Reclamaciones Virtual de ${brand.legalName} (RUC ${brand.ruc}), conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571) y D.S. N° 011-2011-PCM (INDECOPI).`,
  };
}

export default function LibroDeReclamacionesPage() {
  const brand = getBrandConfig();

  return (
    <div className="bg-surface min-h-screen pt-24 sm:pt-28 pb-20 print:bg-white print:min-h-0 print:pt-4 print:pb-4">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Encabezado */}
        <div className="mb-8 print:hidden">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> INDECOPI — Ley N° 29571 y D.S. N° 011-2011-PCM
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-2">
            Libro de Reclamaciones Virtual
          </h1>
          <p className="text-text-light text-sm">
            Razón Social: <strong>{brand.legalName}</strong> | RUC: <strong>{brand.ruc}</strong> | Establecimiento: <strong>{brand.contact.address}</strong>
          </p>
        </div>

        <LibroReclamacionesForm brand={brand} />
      </div>
    </div>
  );
}

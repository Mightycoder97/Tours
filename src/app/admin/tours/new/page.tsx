import { createClient } from '@/lib/supabase/server';
import TourForm from '@/components/admin/TourForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewTourPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  const { data: destinations } = await supabase.from('destinations').select('*').order('name');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link href="/admin/tours" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Crear Nuevo Tour</h1>
          <p className="text-sm text-text-light mt-1">Completa los datos para agregar un tour al catálogo.</p>
        </div>
      </div>
      
      <TourForm 
        categories={categories || []} 
        destinations={destinations || []} 
      />
    </div>
  );
}

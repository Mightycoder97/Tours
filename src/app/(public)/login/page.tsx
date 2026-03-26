'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background-alt flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-center text-primary mb-2">Portal Administrativo</h2>
        <p className="text-center text-text-light text-sm mb-8">Ingresa tus credenciales para administrar reservaciones y tours.</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="admin@machupicchu.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-light transition-colors disabled:opacity-70 mt-4"
          >
            {isLoading ? 'Iniciando Sesión...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

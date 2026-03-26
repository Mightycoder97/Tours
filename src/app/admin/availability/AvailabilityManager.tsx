'use client';

import { useState, useTransition } from 'react';
import { createAvailabilitySlots, updateAvailabilitySlot, deleteAvailabilitySlot } from './actions';
import { CalendarDays, Plus, Trash2, ToggleLeft, ToggleRight, Users, AlertCircle, CheckCircle2, Pencil } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  slug: string;
}

interface Slot {
  id: string;
  tour_id: string;
  available_date: string;
  max_capacity: number;
  booked_count: number;
  is_active: boolean;
  tours?: { title: string };
}

export default function AvailabilityManager({ tours, initialSlots }: { tours: Tour[], initialSlots: Slot[] }) {
  const [isPending, startTransition] = useTransition();
  const [selectedTourFilter, setSelectedTourFilter] = useState<string>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [editCapacity, setEditCapacity] = useState<string>('');

  const filteredSlots = selectedTourFilter === 'all'
    ? initialSlots
    : initialSlots.filter(s => s.tour_id === selectedTourFilter);

  async function handleCreateSlots(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createAvailabilitySlots(formData);
      if (res.error) {
        setMessage({ type: 'error', text: res.error });
      } else {
        setMessage({ type: 'success', text: `¡${res.count} fechas creadas exitosamente!` });
        (e.target as HTMLFormElement).reset();
      }
    });
  }

  async function handleToggleActive(slot: Slot) {
    setMessage(null);
    const formData = new FormData();
    formData.set('max_capacity', slot.max_capacity.toString());
    formData.set('is_active', slot.is_active ? '' : 'on');

    startTransition(async () => {
      const res = await updateAvailabilitySlot(slot.id, formData);
      if (res.error) setMessage({ type: 'error', text: res.error });
    });
  }

  async function handleUpdateCapacity(slotId: string) {
    setMessage(null);
    const formData = new FormData();
    formData.set('max_capacity', editCapacity);
    formData.set('is_active', 'on');

    startTransition(async () => {
      const res = await updateAvailabilitySlot(slotId, formData);
      if (res.error) {
        setMessage({ type: 'error', text: res.error });
      } else {
        setEditingSlot(null);
      }
    });
  }

  async function handleDelete(slotId: string) {
    if (!confirm('¿Eliminar esta fecha de disponibilidad?')) return;
    setMessage(null);

    startTransition(async () => {
      const res = await deleteAvailabilitySlot(slotId);
      if (res.error) setMessage({ type: 'error', text: res.error });
    });
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-PE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      {/* Create Slots Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-text-main mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-primary" /> Agregar Fechas Disponibles
        </h2>

        <form onSubmit={handleCreateSlots} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Tour</label>
              <select name="tour_id" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                <option value="">Seleccionar tour...</option>
                {tours.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Fecha Inicio</label>
              <input type="date" name="start_date" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Fecha Fin</label>
              <input type="date" name="end_date" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1">Capacidad Máx.</label>
              <input type="number" name="max_capacity" defaultValue={20} min={1} required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <input type="checkbox" name="exclude_sundays" id="exclude_sundays" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="exclude_sundays" className="text-xs text-text-light">Excluir Domingos</label>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                {isPending ? 'Creando...' : 'Crear Fechas'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Messages */}
      {message && (
        <div className={`flex items-center p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
          {message.text}
        </div>
      )}

      {/* Slot List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-bold text-text-main flex items-center">
            <CalendarDays className="w-5 h-5 mr-2 text-primary" /> Fechas Programadas ({filteredSlots.length})
          </h2>
          <select
            value={selectedTourFilter}
            onChange={e => setSelectedTourFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
          >
            <option value="all">Todos los tours</option>
            {tours.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </div>

        {filteredSlots.length === 0 ? (
          <div className="text-center py-12 text-text-light">
            <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No hay fechas programadas.</p>
            <p className="text-sm">Agrega fechas usando el formulario de arriba.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-sm text-text-light uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-bold">Tour</th>
                  <th className="px-6 py-3 font-bold">Fecha</th>
                  <th className="px-6 py-3 font-bold">Capacidad</th>
                  <th className="px-6 py-3 font-bold">Reservados</th>
                  <th className="px-6 py-3 font-bold">Disponibles</th>
                  <th className="px-6 py-3 font-bold">Estado</th>
                  <th className="px-6 py-3 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredSlots.map(slot => {
                  const spotsLeft = slot.max_capacity - slot.booked_count;
                  const occupancy = slot.max_capacity > 0 ? (slot.booked_count / slot.max_capacity) * 100 : 0;

                  return (
                    <tr key={slot.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-main">
                        {slot.tours?.title || '—'}
                      </td>
                      <td className="px-6 py-4 text-text-main">
                        {formatDate(slot.available_date)}
                      </td>
                      <td className="px-6 py-4">
                        {editingSlot === slot.id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editCapacity}
                              onChange={e => setEditCapacity(e.target.value)}
                              min={slot.booked_count}
                              className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => handleUpdateCapacity(slot.id)}
                              disabled={isPending}
                              className="text-primary hover:text-primary-light text-xs font-bold"
                            >
                              OK
                            </button>
                            <button
                              onClick={() => setEditingSlot(null)}
                              className="text-gray-400 hover:text-gray-600 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-bold">{slot.max_capacity}</span>
                            <button
                              onClick={() => { setEditingSlot(slot.id); setEditCapacity(slot.max_capacity.toString()); }}
                              className="text-gray-300 hover:text-primary transition-colors"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-text-main">{slot.booked_count}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                            <div
                              className={`h-2 rounded-full transition-all ${occupancy >= 90 ? 'bg-red-500' : occupancy >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${Math.min(occupancy, 100)}%` }}
                            />
                          </div>
                          <span className={`font-bold text-xs ${spotsLeft === 0 ? 'text-red-500' : spotsLeft <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {spotsLeft} restantes
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(slot)}
                          disabled={isPending}
                          className="flex items-center space-x-1"
                        >
                          {slot.is_active ? (
                            <><ToggleRight className="w-6 h-6 text-green-500" /><span className="text-xs text-green-600 font-medium">Activo</span></>
                          ) : (
                            <><ToggleLeft className="w-6 h-6 text-gray-400" /><span className="text-xs text-gray-400 font-medium">Inactivo</span></>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(slot.id)}
                          disabled={isPending || slot.booked_count > 0}
                          className="text-red-400 hover:text-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={slot.booked_count > 0 ? 'No se puede eliminar con reservas activas' : 'Eliminar'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

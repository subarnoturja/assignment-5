'use client';

import React, { useState } from 'react';
import { createBookingAction } from '../_actions/dashboard';
import { getStoredToken } from '@/utils/jwt';
import { Calendar, Wrench, User, Loader2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  technicians: { id: string; name: string }[];
  services: { id: string; title: string }[];
  onSuccess?: () => void;
}

export default function AdminBookingModal({
  isOpen,
  onClose,
  technicians,
  services,
  onSuccess,
}: ModalProps) {
  const [technicianProfileId, setTechnicianProfileId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const token = getStoredToken();
    if (!token) {
      setError('You must be logged in as an admin.');
      setLoading(false);
      return;
    }

    const res = await createBookingAction(token, {
      technicianProfileId,
      serviceId,
      scheduledAt: new Date(scheduledAt).toISOString(),
    });

    setLoading(false);

    if (res.success) {
      onClose();
      if (onSuccess) onSuccess();
    } else {
      setError(res.error || 'Failed to create booking');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Book Technician
        </h2>

        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-700 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-500" /> Select Technician
            </label>
            <select
              value={technicianProfileId}
              onChange={(e) => setTechnicianProfileId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose a Technician --</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Wrench className="h-3.5 w-3.5 text-slate-500" /> Select Service
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose a Service --</option>
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Schedule Date & Time
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
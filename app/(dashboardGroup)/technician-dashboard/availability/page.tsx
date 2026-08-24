'use client';

import React, { useState } from 'react';
import { fetcher } from '@/lib/api-client';

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState('Monday - Friday, 9:00 AM - 5:00 PM');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetcher('/technician/availability', {
      method: 'PUT',
      body: JSON.stringify({ availability }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white border rounded-2xl p-6 max-w-lg space-y-4">
      <h2 className="text-xl font-bold">Manage Working Hours</h2>
      {saved && <div className="p-3 text-xs bg-emerald-50 text-emerald-600 rounded-lg">Availability Updated!</div>}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Weekly Schedule Description</label>
          <textarea
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">
          Save Hours
        </button>
      </form>
    </div>
  );
}
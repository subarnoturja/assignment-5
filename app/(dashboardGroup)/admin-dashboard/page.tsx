'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminBookingsTable, { BookingRecord } from '../_components/adminBookingTable';
import AdminBookingModal from '../_components/adminBookingModal';

export default function AdminDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data (Replace with API responses or React Query)
  const mockTechnicians = [
    { id: 'tech-1', name: 'John Doe' },
    { id: 'tech-2', name: 'Alex Smith' },
  ];

  const mockServices = [
    { id: 'srv-1', title: 'Electrical Repair' },
    { id: 'srv-2', title: 'Plumbing Service' },
  ];

  const mockBookings: BookingRecord[] = [
    {
      id: 'b-1',
      technicianName: 'John Doe',
      serviceTitle: 'Electrical Repair',
      scheduledAt: '2026-08-25T10:00:00Z',
      status: 'PENDING' as never,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Admin Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          <Plus className="h-4 w-4" />
          Book Technician
        </button>
      </div>

      <AdminBookingsTable bookings={mockBookings} />

      <AdminBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        technicians={mockTechnicians}
        services={mockServices}
      />
    </div>
  );
}
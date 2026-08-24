'use client';

import React, { useState } from 'react';
import { updateBookingStatusAction, createPaymentSessionAction } from '../_actions/dashboard';
import { getStoredToken } from '@/utils/jwt';
import { BookingStatus } from '@/lib/types';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

export interface BookingRecord {
  id: string;
  technicianName: string;
  serviceTitle: string;
  scheduledAt: string;
  status: BookingStatus;
}

interface TableProps {
  bookings: BookingRecord[];
  onRefresh?: () => void;
}

export default function AdminBookingsTable({ bookings, onRefresh }: TableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusUpdate = async (bookingId: string, status: BookingStatus) => {
    const token = getStoredToken();
    if (!token) return alert('Authorization token not found');

    setUpdatingId(bookingId);
    const res = await updateBookingStatusAction(token, bookingId, status);
    setUpdatingId(null);

    if (res.success) {
      if (onRefresh) onRefresh();
    } else {
      alert(res.error || 'Failed to update status');
    }
  };

  const handlePayment = async (bookingId: string) => {
    const token = getStoredToken();
    if (!token) return alert('Authorization token not found');

    setUpdatingId(bookingId);
    const res = await createPaymentSessionAction(token, bookingId);
    setUpdatingId(null);

    if (res.success && res.checkoutUrl) {
      window.location.href = res.checkoutUrl;
    } else {
      alert(res.error || 'Failed to initialize payment');
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="px-4 py-3">Technician</th>
            <th className="px-4 py-3">Service</th>
            <th className="px-4 py-3">Scheduled Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-slate-50/50 transition">
              <td className="px-4 py-3 font-medium text-slate-800">{booking.technicianName}</td>
              <td className="px-4 py-3 text-slate-600">{booking.serviceTitle}</td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(booking.scheduledAt).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full ${
                    booking.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : booking.status === 'CANCELLED'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* Status update triggers */}
                  <button
                    disabled={updatingId === booking.id}
                    onClick={() => handleStatusUpdate(booking.id, BookingStatus.ACCEPTED)}
                    className="p-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-50 rounded-lg transition"
                    title="Mark Confirmed"
                  >
                    <Clock className="h-4 w-4" />
                  </button>
                  <button
                    disabled={updatingId === booking.id}
                    onClick={() => handleStatusUpdate(booking.id, BookingStatus.COMPLETED)}
                    className="p-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                    title="Mark Completed"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button
                    disabled={updatingId === booking.id}
                    onClick={() => handleStatusUpdate(booking.id, BookingStatus.CANCELLED)}
                    className="p-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Cancel Booking"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>

                  {/* Payment trigger */}
                  <button
                    disabled={updatingId === booking.id}
                    onClick={() => handlePayment(booking.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition ml-2"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    Pay
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
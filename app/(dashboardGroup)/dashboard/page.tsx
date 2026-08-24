'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api-client';
import { Booking, BookingStatus } from '@/lib/types';
import StatusBadge from '../_components/status-badge';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ['customer-bookings'],
    queryFn: () => fetcher('/booking'),
  });

  if (isLoading) return <div className="p-8 text-center text-sm">Loading your bookings...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b text-slate-600">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Scheduled Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings?.map((b) => (
                <tr key={b.id}>
                  <td className="p-4 font-semibold">{b.service?.title || 'Home Service'}</td>
                  <td className="p-4">{new Date(b.scheduledAt).toLocaleString()}</td>
                  <td className="p-4">{formatCurrency(b.totalAmount)}</td>
                  <td className="p-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="p-4 text-right">
                    {b.status === BookingStatus.ACCEPTED && (
                      <Link
                        href={`/dashboard/pay/${b.id}`}
                        className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition"
                      >
                        Pay Now
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}